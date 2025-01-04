class BrandService{
    constructor(prisma){
        this.prisma = prisma;
    }

    async create(data){
        return this.prisma.brand.create({
            data:data
        })
    }

    async getAll(){
        return this.prisma.brand.findMany();
    }
    async getById(id){
        return this.prisma.brand.findUnique({
        where:{
            id: id
        }
        })
    }

    async update(id,data){
        return this.prisma.brand.update({
            where:{
                id: parseInt(id)
            },
            data:data
        })
    }

    async delete (id){
        return this.prisma.brand.delete({
            where:{
                id: parseInt(id)
            }
        })
    }

}

module.exports = BrandService;