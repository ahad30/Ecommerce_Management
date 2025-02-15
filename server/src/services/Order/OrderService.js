class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(postBody) {
        const order = await this.prisma.order.create({
            data: postBody
        })
        return order;

    }
    async getOrders() {
    const orders = await this.prisma.order.findMany({
        orderBy: {
            createdAt: 'desc',  // Sorts orders from latest to earliest
        },
    });
    return orders;
}

    async getOrderById(id) {
        const order = await this.prisma.order.findUnique({
            where: {
                id: id
            }
        })
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
                id: id
            },
            data: postBody
        })
        return order;
    }
    async deleteOrder(id) {
        const order = await this.prisma.order.delete({
            where: {
                id: id
            }
        })
        return order;
    }

    async getOrderByTrackingNumber(trackingNumber) {

        const order = await this.prisma.order.findUnique({
            where:{
                transactionId:trackingNumber
            }
        })

        return order
    }
}

module.exports = OrderService;