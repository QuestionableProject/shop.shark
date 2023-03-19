const {Information} = require('../models/models')
class Informationcontroller {
    async create(req,res) {

    }
    async getAll(req,res) {
        let information = await Information.findAll()
        return res.json(information)
    }
}

module.exports = new Informationcontroller()