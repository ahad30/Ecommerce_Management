class AttributesService {
    constructor(prisma) {
      this.prisma = prisma;
    }
  
    // Create a new attribute
    async createAttribute(data) {
      return await this.prisma.attributes.create({
        data,
      });
    }
  
    // Get all attributes
    async getAllAttributes() {
      return await this.prisma.attributes.findMany();
    }
  
    // Get a single attribute by ID
    async getAttributeById(id) {
      return await this.prisma.attributes.findUnique({
        where: { id },
      });
    }
  
    // Update an attribute by ID
    async updateAttribute(id, data) {
      return await this.prisma.attributes.update({
        where: { id },
        data,
      });
    }
  
    // Delete an attribute by ID
    async deleteAttribute(id) {
      return await this.prisma.attributes.delete({
        where: { id },
      });
    }
  }
  
  module.exports = AttributesService;
  