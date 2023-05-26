const sequelize = require("../config/connection");
const { User } = require("../models");

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
    process.exit(0);
  } catch (err) {
    console.log("oh no!");
    console.log(err);
    process.exit(0);
  }
};

seedMe();
