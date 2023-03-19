const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const JWT = require("jsonwebtoken")
const { User } = require('../models/models')

const generatejwt = (id, login, name, image, role) => {
    return JWT.sign(
        { id, login, name, image, role },
        process.env.SECRET_KEY,
        { expiresIn: '365d' }
    )
}

class usercontroller {
    async registration(req, res, next) {
        const { login, password } = req.body
        if (!login || !password) return next(ApiError.badRequest("Пустой запрос"))
        const OldUser = await User.findOne({ where: { login } })
        if (OldUser) return next(ApiError.badRequest("Вы не можете использовать такой логин"))
        const HashPass = await bcrypt.hash(password, 5)
        const user = await User.create({ login, password: HashPass, name: "User",image: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" })
        return res.json("Пользователь зарегистрирован")
    }
    async login(req, res, next) {
        const { login, password } = req.body
        const user = await User.findOne({ where: { login } })
        if (!user) return next(ApiError.badRequest("Пользователь не найден"))
        let checkpass = bcrypt.compareSync(password, user.password)
        if (!checkpass) return next(ApiError.badRequest("Не верный пароль"))
        const token = generatejwt(user.id, user.login, user.name, user.image, user.role)
        return res.json({ token })
    }
    async auth(req, res) {
        const token = generatejwt(req.user.id, req.user.login, req.user.name, req.user.image, req.user.role)
        return res.json({ token })
    }
    async rename(req, res) {
        const { userId, newName } = req.body
        await User.update(
            {
                name: newName,
            },
            {
                where: {
                    id: userId,
                },
            }
        )
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        const token = generatejwt(user.id, user.login, user.name, user.image, user.role)
        return res.json({ token })
    }

}

module.exports = new usercontroller()