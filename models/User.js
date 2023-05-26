const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt =require("bcrypt")

class User extends Model {}

User.init({
    // add properites here, ex:
    username: {
         type: DataTypes.STRING,
         unique:true,
         allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        validate:{
            len:[8]
        }
    }
},{
    sequelize,
    hooks:{
        beforeCreate:userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,4);
            return userObj
        }
    }
});

module.exports=User