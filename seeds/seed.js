const sequelize = require("../config/connection");
const { User, Pallet } = require("../models");

const seedMe = async () => {
  try {
    await sequelize.sync({ force: true });
    const userData = [
      {
        username: "joe",
        password: "password",
      },
      {
        username: "link",
        password: "hyahyahya!",
      },
      {
        username: "theCats",
        password: "meowmeow",
      },
    ];

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
    });
    console.log(users);
    const colorData = [
      {
        name:"salmon",
        seedColor: "#fa8072",
        UserId:1
      },
      {
        name:"bahamut",
        seedColor: "#DAA06D",
        UserId:3
      },
      {
        name:"shiva",
        seedColor: "#6B6148",
        UserId:3
      },
 
    ]

    const colors = await Pallet.bulkCreate(colorData);
    console.log(colors)
    process.exit(0);
  } catch (err) {
    console.log("oh no!");
    console.log(err);
    process.exit(0);
  }
};

seedMe();
