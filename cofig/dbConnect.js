const dotev = require("dotenv")
dotev.config({path:"./.env"})
const { Sequelize } = require("sequelize")

const sequalize = new Sequelize("user", "root", "zamayarasaran", {
    host: "localhost",
    dialect:"mysql"
})

sequalize.authenticate().then(()=>console.log('Database connected successfully.')).catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  module.exports = sequalize