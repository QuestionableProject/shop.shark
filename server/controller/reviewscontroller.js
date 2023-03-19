const { Reviews, User } = require('../models/models')

class Informationcontroller {
    async create(req, res) {

    }
    async getAll(req, res) {
        let reviews = await Reviews.findAll({
            attributes: [
                "id", "star", "text"
            ],
            include: [{
                model: User,
                attributes: [
                    "name", "image"
                ]
            }]
        })
        return res.json(reviews)
    }
}

module.exports = new Informationcontroller()