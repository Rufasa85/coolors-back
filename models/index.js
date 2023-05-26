const User = require("./User");
const Pallet = require("./Pallet");

User.hasMany(Pallet,{
    onDelete:"CASCADE"
});
Pallet.belongsTo(User)

module.exports = {
    User,
    Pallet
}