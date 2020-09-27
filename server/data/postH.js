const models = require('./Models');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { sequelize } = require('./sequelize')

exports.restoreDB = async (req, res) => {

    await sequelize.query('SET GLOBAL FOREIGN_KEY_CHECKS = 0;', {raw: true});

    // Do Some Action
    await models.Contact.destroy({ truncate: {cascade: true} })
    await models.Address.destroy({ truncate: {cascade: true} })
    await models.Date.destroy({ truncate: {cascade: true} })
    await models.Phone.destroy({ truncate: {cascade: true} })

    await sequelize.query('SET GLOBAL FOREIGN_KEY_CHECKS = 1;', {raw: true});

    const fileStream = fs.createReadStream(path.resolve(__dirname, './Contacts.csv'))
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        let row = line.split(',')

        if(row[0] !== 'contact_id')
        {
            await models.Contact.create({
                'contact_id' : Number.parseInt(row[0].trim()),
                'fname' : row[1].trim(),
                'mname' : row[2].trim(),
                'lname' : row[3].trim()
            }).catch()

            if(row[4] !== '')
            {
                let ph = row[4].split('-')
                models.Phone.create({
                    'contact_id' : Number.parseInt(row[0].trim()),
                    'phone_type' : 'Home',
                    'area_code' : ph[0].trim(),
                    'number' : ph[1].trim() + (ph[2] !== undefined? '-' + ph[2].trim() : '')
                }).catch()
            }

            if(row[5] !== '')
            {
                let ph = row[5].split('-')
                models.Phone.create({
                    'contact_id' : Number.parseInt(row[0].trim()),
                    'phone_type' : 'Mobile',
                    'area_code' : ph[0].trim(),
                    'number' : ph[1].trim() + (ph[2] !== undefined? '-' + ph[2].trim() : '')
                }).catch()
            }

            if(row[6] !== '')
            {
                models.Address.create({
                    'contact_id' : Number.parseInt(row[0].trim()),
                    'address_type' : 'Home',
                    'address' : row[6].trim(),
                    'city' : row[7].trim(),
                    'state' : row[8].trim(),
                    'zip' : row[9].trim()
                }).catch()
            }

            if(row[10] !== '')
            {
                let ph = row[10].split('-')
                models.Phone.create({
                    'contact_id' : Number.parseInt(row[0].trim()),
                    'phone_type' : 'Work'.trim(),
                    'area_code' : ph[0].trim(),
                    'number' : ph[1].trim() + (ph[2] !== undefined? '-' + ph[2].trim() : '')
                }).catch()
            }

            if(row[11] !== '')
            {
                models.Address.create({
                    'contact_id' : Number.parseInt(row[0].trim()),
                    'address_type' : 'Work',
                    'address' : row[11].trim(),
                    'city' : row[12].trim(),
                    'state' : row[13].trim(),
                    'zip' : row[14].trim()
                }).catch()
            }

            if(row[15] !== '')
            {
                models.Date.create({
                    'contact_id' : Number.parseInt(row[0].trim()),
                    'date_type' : 'Birthday',
                    'date' : row[15].trim()
                }).catch()
            }
        }
    }
    res.send('OK')
}
