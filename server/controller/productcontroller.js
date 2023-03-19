const {Products} = require('../models/models')
class Productcontroller {
    async create(req,res) {

    }
    async getAll(req,res) {
        const CheckProduct = await Products.findAll()
        return res.json(CheckProduct)
    }
    async getOne(req,res) {
        const {id} = req.params
        const product = await Products.findOne({
            where: {id},
        })
        return res.json(product)
    }
}

module.exports = new Productcontroller()