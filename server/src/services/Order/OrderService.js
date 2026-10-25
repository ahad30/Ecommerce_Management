const SendEmailUtility = require("../../shared/SendEmailUtility ");
const { calculatePrice } = require("../../utility/priceUtils");

const DELIVERY_FEE = 10;
const TAX_AMOUNT = 20;
const OBJECT_ID = /^[a-f0-9]{24}$/i;

const badRequest = (message) => {
    const error = new Error(message);
    error.status = 400;
    return error;
};

const requiredString = (value, field) => {
    if (typeof value !== "string" || value.trim() === "") {
        throw badRequest(`${field} is required`);
    }
    return value;
};

const toCents = (amount) => Math.round(Number(amount) * 100);

class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
        this.adminEmail =  "hossainsazza9079@gmail.com";
    }

    // Only ids and quantities are taken from the client; prices, totals and statuses come from the DB and server constants.
    async buildOrderFromCart(userId, body = {}) {
        const { orderItems, phone } = body;

        if (!Array.isArray(orderItems) || orderItems.length === 0) {
            throw badRequest("orderItems must be a non-empty array");
        }
        if (phone !== undefined && phone !== null && typeof phone !== "string") {
            throw badRequest("phone must be a string");
        }

        const requestedPerVariant = {};
        const items = [];
        let itemsCents = 0;

        for (const rawItem of orderItems) {
            const { productId, variantId, quantity } = rawItem || {};

            if (typeof productId !== "string" || !OBJECT_ID.test(productId)) {
                throw badRequest("Each item needs a valid productId");
            }
            if (typeof variantId !== "string" || !OBJECT_ID.test(variantId)) {
                throw badRequest("Each item needs a valid variantId");
            }
            if (!Number.isInteger(quantity) || quantity <= 0) {
                throw badRequest("Quantity must be a positive whole number");
            }

            const variant = await this.prisma.variant.findUnique({
                where: { id: variantId },
                include: { product: true },
            });

            if (!variant || !variant.product) {
                throw badRequest(`Variant ${variantId} not found`);
            }
            if (variant.productId !== productId) {
                throw badRequest(`Variant ${variantId} does not belong to product ${productId}`);
            }

            requestedPerVariant[variantId] = (requestedPerVariant[variantId] || 0) + quantity;
            if (requestedPerVariant[variantId] > variant.stock) {
                throw badRequest(`Only ${variant.stock} in stock for ${variant.product.name}`);
            }

            const basePrice = variant.price ?? variant.product.price;
            const priceTiers = Array.isArray(variant.priceTiers) ? variant.priceTiers : [];
            const unitCents = toCents(calculatePrice(quantity, basePrice, priceTiers));

            if (!Number.isFinite(unitCents) || unitCents < 0) {
                throw badRequest(`Price unavailable for ${variant.product.name}`);
            }

            itemsCents += unitCents * quantity;
            items.push({
                productId,
                variantId,
                quantity,
                price: unitCents / 100,
                name: variant.product.name,
                selectedAttributes: variant.attributes || {},
            });
        }

        const totalCents = itemsCents + toCents(DELIVERY_FEE) + toCents(TAX_AMOUNT);

        return {
            userId,
            name: requiredString(body.name, "name"),
            email: requiredString(body.email, "email"),
            phone: phone || null,
            shippingAddress: requiredString(body.shippingAddress, "shippingAddress"),
            billingAddress: requiredString(body.billingAddress, "billingAddress"),
            orderItems: items,
            deliveryFee: DELIVERY_FEE,
            taxAmount: TAX_AMOUNT,
            orderTotal: totalCents / 100,
            paymentStatus: "pending",
            orderStatus: "pending",
        };
    }

    async createOrder(postBody) {
        try {
            // Create the order
            const order = await this.prisma.order.create({
                data: postBody,
            });
        //  if (order.email) {
        //         const customerEmailSubject = "Your Order Has Been Placed";
        //         const customerEmailBody = `
        //             <h1>Thank you for your order!</h1>
        //             <p>Your order has been successfully placed. Below are the details:</p>
        //             <ul>
        //                 <li><strong>Order ID:</strong> ${order.id}</li>
        //                 <li><strong>Transaction ID:</strong> ${order.transactionId}</li>
        //                 <li><strong>Total Amount:</strong> $${order.orderTotal}</li>
        //             </ul>
        //             <p>We will notify you once your order is shipped.</p>
        //         `;

        //         await SendEmailUtility.sendEmail(order.email, customerEmailBody, customerEmailSubject);
        //     }

         
        //     const adminEmailSubject = "New Order Notification";
        //     const adminEmailBody = `
        //         <h1>New Order Received</h1>
        //         <p>A new order has been placed. Below are the details:</p>
        //         <ul>
        //             <li><strong>Order ID:</strong> ${order.id}</li>
        //             <li><strong>Transaction ID:</strong> ${order.transactionId}</li>
        //             <li><strong>Customer Email:</strong> ${order.email || "Not provided"}</li>
        //             <li><strong>Total Amount:</strong> $${order.orderTotal}</li>
        //         </ul>
        //         <p>Please review the order and proceed with the next steps.</p>
        //     `;

        //     await SendEmailUtility.sendEmail(this.adminEmail, adminEmailBody, adminEmailSubject);

            return order;
        } catch (error) {
            console.error("Error creating order:", error);
            throw new Error("Failed to create order");
        }
    }

    async getOrders() {
        const orders = await this.prisma.order.findMany({
            orderBy: {
                createdAt: "desc", // Sorts orders from latest to earliest
            },
        });
        return orders;
    }

    async getOrderById(id) {
        const order = await this.prisma.order.findUnique({
            where: {
                id: id,
            },
        });
        return order;
    }

    async getOrdersByUserId(userId) {
        const orders = await this.prisma.order.findMany({
            where: {
                userId: userId, // Fetch orders for the specific user
            },
        });
        return orders;
    }

    async updateOrder(id, postBody) {
        const order = await this.prisma.order.update({
            where: {
                id: id,
            },
            data: postBody,
        });
        return order;
    }

    async deleteOrder(id) {
        const order = await this.prisma.order.delete({
            where: {
                id: id,
            },
        });
        return order;
    }

    async getOrderByTrackingNumber(trackingNumber) {
        const order = await this.prisma.order.findUnique({
            where: {
                transactionId: trackingNumber,
            },
        });
        return order;
    }
}

module.exports = OrderService;