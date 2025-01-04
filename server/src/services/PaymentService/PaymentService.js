const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

class PaymentService {
    // Create payment intent for checkout session
    async createPaymentIntent(order, transactionId,) {
        try {
            const paymentIntent = await stripe.checkout.sessions.create({
                client_reference_id: transactionId,
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: order.productName || "",
                            },
                            unit_amount: order.amount || 0,
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${process.env.CLIENT_URL}/success`,
                cancel_url: `${process.env.CLIENT_URL}/cancel`,
            });
            return paymentIntent;
        } catch (error) {
            console.log(error);
            
            throw new Error("Payment Intent creation failed");
        }
    }


    async paymentSuccess(req, res) {
        try {
            const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
            if (session.payment_status === "paid") {
                // Update order status in your database
                const updatedOrder = await this.updateOrderStatus(session.client_reference_id, session.payment_intent, "paid");
                return res.redirect(`${process.env.CLIENT_URL}/success`);
            } else {
                return res.redirect(`${process.env.CLIENT_URL}/cancel`);
            }
        } catch (error) {
            console.error("Error processing payment success:", error);
            return res.redirect(`${process.env.CLIENT_URL}/cancel`);
        }
    }
    async paymentCancel(req, res) {
        return res.redirect(`${process.env.CLIENT_URL}/cancel`);
    }

    // Handle the stripe webhook event and update the order
    async handleStripeWebhook(event) {
        try {
            // Check the type of event from Stripe
            if (event.type === "checkout.session.completed") {
                const session = event.data.object; // Contains the session details

                // Find the order based on the session ID (session.payment_intent will be used to link)
                const paymentIntentId = session.payment_intent;
                const orderId = session.client_reference_id; // Assuming order ID is passed here

                // Update order status in your database (for example: OrderService)
                // You can update the order status based on payment intent completion
                const updatedOrder = await this.updateOrderStatus(orderId, paymentIntentId, "paid");

                return updatedOrder;
            } else {
                throw new Error("Unhandled Stripe event");
            }
        } catch (error) {
            console.error("Error processing Stripe webhook:", error);
            throw new Error("Webhook handling failed");
        }
    }

    // Method to update the order status in the database (simplified)
    async updateOrderStatus(orderId, paymentIntentId, status) {
        // Assuming you have a function in your orderService to update order status
        // This should update the order's status in your database and store the transaction ID
        return await OrderService.updateOrder(orderId, { status, paymentIntentId });
    }
}

module.exports = PaymentService;
