const { Curt , Products, Order, OrderProduct} = require('../models/models')
class Informationcontroller {
    async create(req, res) {
        const {productId, userId} = req.body
        const prod =  await Curt.findOne({where: {productId, userId}})
        if (prod) return  res.json('Товар есть в корзине')
        const curtCreate = await  Curt.create({productId, userId})
        return res.json("Товар добавлен в корзину")
    }
    async getAll(req, res) {
        const {userId} = req.body
        const curt = await Curt.findAll({
            where: {userId},
            attributes: { 
                exclude: ['id',  'userId', 'createdAt', 'updatedAt'], 
            },
            include: [{
                model: Products,
                attributes: [
                    "name", "prise", "image"
                ]
            }]
        })
        
        return res.json(curt)
    }
    async deleteProd(req, res) {
        const {productId, userId} = req.body   
        const curt = await Curt.destroy({
            where: {userId, productId},
        })
        return res.json("Товар удален")
    }
    async order(req, res) {
        const {userId, name, surname, phone, address} = req.body   
        const orderCreate = await Order.create({ name, surname, phone ,address, userId })
        const productCurt = await Curt.findAll({
            where: {userId},
            attributes: [
                'productId', 
            ],
        })
        productCurt.map((e) => {
            OrderProduct.create({
                productId: e.productId,
                orderId: orderCreate.id,
            })
        })
        await Curt.destroy({where: {userId}})
        return res.json("Заказ оформлен")
    }
}

module.exports = new Informationcontroller()