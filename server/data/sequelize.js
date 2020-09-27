const { Sequelize } = require("sequelize");

exports.sequelize = new Sequelize('phone_directory', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
    define: {
        timestamps: false
    }
});
