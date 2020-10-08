const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize')

exports.Contact = sequelize.define('contact', {
    contact_id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'contact'
});

exports.Address = sequelize.define('address', {
    address_id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    contact_id: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    address_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zip: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
}, {
    tableName: 'address'
});

exports.Phone = sequelize.define('phone', {
    phone_id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    contact_id: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    phone_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    area_code:{
        type: DataTypes.NUMBER,
        allowNull: false
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'phone'
});

exports.Date = sequelize.define('date', {
    date_id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    contact_id: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    date_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'date'
});
