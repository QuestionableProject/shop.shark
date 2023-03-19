const sequelize = require("../db")
const {DataTypes} = require("sequelize")


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING, allowNull: true},
    role: {type: DataTypes.STRING, defaultValue: "user"},
})
const Products = sequelize.define('products', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    category: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    prise: {type: DataTypes.INTEGER},
    image: {type: DataTypes.STRING, allowNull: true}
})
const Information = sequelize.define('information', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING},
    timeStart: {type: DataTypes.STRING},
    timeEnd: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
})
const Reviews = sequelize.define('reviews', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    star: {type: DataTypes.INTEGER},
    text: {type: DataTypes.STRING},
})
const Curt = sequelize.define('curt', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    open: {type: DataTypes.INTEGER, defaultValue: 1},
})
const OrderProduct = sequelize.define('orderproduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Products.hasMany(OrderProduct)
OrderProduct.belongsTo(Products)

User.hasMany(Reviews)
Reviews.belongsTo(User)

Products.hasMany(Curt)
Curt.belongsTo(Products)

User.hasOne(Curt)
Curt.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)
User.sync({ alter: true }).then(() => {"База переопределена"})
// Curt.sync({ alter: true }).then(() => {"База переопределена"})
// Reviews.sync({ alter: true }).then(() => {"База переопределена"})
// products.sync({ alter: true }).then(() => {"База переопределена"})
Order.sync({ alter: true }).then(() => {"База переопределена"})
module.exports = {
    User, Products, Information, Reviews, Curt, Order, OrderProduct
}