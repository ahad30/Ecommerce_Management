const PaymentService = require("../services/PaymentService/PaymentService");
const ResponseHandler = require("../shared/response.handaler");
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY)
const { v4: uuidv4 } = require("uuid");
class OrderCOntroller {
    constructor(orderService) {
        this.orderService = orderService;
        this.paymentService = new PaymentService()
    }
    async createOrder(req, res, next) {
        const postBody = req.body;
        try {
            const transactionId = uuidv4();
            const order = await this.orderService.createOrder({
                ...postBody,
                transactionId: transactionId,
            })
            const paymentIntent = await this.paymentService.createPaymentIntent(order,transactionId);

            res.redirect(paymentIntent.url)
            // ResponseHandler.success(res, "order placed successfully", order, 201);
        } catch (error) {

            ResponseHandler.error(res, "order not placed", 500, error);
            next(error)

        }
    }

}

module.exports = OrderCOntroller