const PaymentService = require("../services/PaymentService/PaymentService");
const ResponseHandler = require("../shared/response.handaler");
const { v4: uuidv4 } = require("uuid");
class OrderCOntroller {
    constructor(orderService) {
        this.orderService = orderService;
        this.paymentService = new PaymentService()
    }
    async createOrder(req, res) {
        if (!req.user) {
            return ResponseHandler.error(res, "Authentication required", 401);
        }
        try {
            const orderData = await this.orderService.buildOrderFromCart(req.user.id, req.body);
            const transactionId = uuidv4();
            const order = await this.orderService.createOrder({
                ...orderData,
                transactionId: transactionId,
            })
            const paymentIntent = await this.paymentService.createPaymentIntent(order,transactionId);
            ResponseHandler.success(res, "You Order is being placed.. and redirect to you to the payment page ", { order, checkoutUrl: paymentIntent.url }, 201);
        } catch (error) {
            if (error.status === 400) {
                return ResponseHandler.error(res, error.message, 400, error);
            }
            console.error("Error placing order:", error.message);
            ResponseHandler.error(res, "order not placed", 500, error);
        }
    }
    async getOrders(req, res, next) {
        try {
            const orders = await this.orderService.getOrders();
            ResponseHandler.success(res, "orders fetched successfully", orders, 200);
        } catch (error) {
            ResponseHandler.error(res, "orders not fetched", 500, error);
            next(error)
        }
    }

    async getOrderById(req, res) {
        if (!req.user) {
            return ResponseHandler.error(res, "Authentication required", 401);
        }
        try {
            const id = req.params.id;
            const order = await this.orderService.getOrderById(id);
            if (!order) {
                return ResponseHandler.error(res, "order not found", 404);
            }
            if (req.user.role !== "admin" && String(order.userId) !== String(req.user.id)) {
                return ResponseHandler.error(res, "Not allowed to view this order", 403);
            }
            ResponseHandler.success(res, "order fetched successfully", order, 200);
        } catch (error) {
            ResponseHandler.error(res, "order not fetched", 500, error);
        }
    }

    async getOrdersByUserId(req, res, next) {
    try {
      const userId = req.params.userId; // Extract userId from the request parameters
      const order = await this.orderService.getOrdersByUserId(userId); // Fetch orders for the user
      ResponseHandler.success(
        res,
        "Orders fetched successfully for the user",
        order,
        200
      );
    } catch (error) {
      ResponseHandler.error(res, "Failed to fetch orders for the user", 500, error);
      next(error);
    }
  }

    
    async updateOrder(req, res, next) {
        try {
            const id = req.params.id;
            const postBody = req.body;
            const order = await this.orderService.updateOrder(id, postBody);
            ResponseHandler.success(res, "order updated successfully", order, 200);
        } catch (error) {
            ResponseHandler.error(res, "order not updated", 500, error);
            next(error)
        }
    }
    async deleteOrder(req, res, next) {
        try {
            const id = req.params.id;
            const order = await this.orderService.deleteOrder(id);
            ResponseHandler.success(res, "order deleted successfully", order, 200);
        } catch (error) {
            ResponseHandler.error(res, "order not deleted", 500, error);
            next(error)
        }
    }
    
    async paymentSuccess(req, res,next) {
        try {
            const result = await this.paymentService.paymentSuccess(req, res);
            
        } catch (error) {
            ResponseHandler.error(res, "payment failed", 500, error);
            next(error)
            
        }

    }

    async getOrderByTrackingNumber(req,res,next){

        try {
            const trackingNumber = req.params.trackingNumber;
            const order = await this.orderService.getOrderByTrackingNumber(trackingNumber);
            ResponseHandler.success(res, "order fetched successfully", order, 200);
        } catch (error) {
            ResponseHandler.error(res, "order not fetched", 500, error);
            next(error)
    }
}
}

module.exports = OrderCOntroller