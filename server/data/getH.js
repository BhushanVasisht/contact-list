const models = require('./Models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getAllData = async (res) => {
    let table = []

    const contact_data = await models.Contact.findAll({
        attributes: ['contact_id', 'fname', 'lname', 'mname']
    });

    for(let i = 0; i < contact_data.length; ++i)
    {
        let contact_row = contact_data[i];
        let rowObj = {}
        rowObj['contact_id'] = contact_data[i].contact_id
        rowObj['fname'] = contact_row.fname
        rowObj['mname'] = contact_row.mname
        rowObj['lname'] = contact_row.lname
        rowObj['address_list'] = []
        rowObj['phone_list'] = []
        rowObj['date_list'] = []

        const address_data = await models.Address.findAll({
            attributes: ['address_id', 'contact_id', 'address_type', 'address', 'city', 'state', 'zip'],
            where: {
                contact_id: rowObj['contact_id']
            }
        });

        for(let j = 0; j < address_data.length; ++j)
        {
            let add_row = address_data[j];
            let addObj = {}
            addObj['contact_id'] = contact_data[i].contact_id
            addObj['address_id'] = add_row.address_id
            addObj['address_type'] = add_row.address_type
            addObj['address'] = add_row.address
            addObj['city'] = add_row.city
            addObj['state'] = add_row.state
            addObj['zip'] = add_row.zip
            await rowObj['address_list'].push(addObj)
        }

        const phone_data = await models.Phone.findAll({
            attributes: ['phone_id', 'contact_id', 'phone_type','area_code', 'number'],
            where: {
                contact_id: rowObj['contact_id']
            }
        });

        for(let j = 0; j < phone_data.length; ++j)
        {
            let phone_row = phone_data[j];
            let phoneObj = {}
            phoneObj['contact_id'] = contact_data[i].contact_id
            phoneObj['phone_id'] = phone_row.phone_id
            phoneObj['phone_type'] = phone_row.phone_type
            phoneObj['area_code'] = phone_row.area_code
            phoneObj['number'] = phone_row.number
            await rowObj['phone_list'].push(phoneObj)
        }

        const date_data = await models.Date.findAll({
            attributes: ['date_id', 'contact_id', 'date_type', 'date'],
            where: {
                contact_id: rowObj['contact_id']
            }
        });

        for(let j = 0; j < date_data.length; ++j)
        {
            let date_row = date_data[j];
            let dateObj = {}
            dateObj['contact_id'] = contact_data[i].contact_id
            dateObj['date_id'] = date_row.date_id
            dateObj['date_type'] = date_row.date_type
            dateObj['date'] = date_row.date
            await rowObj['date_list'].push(dateObj)
        }
        await table.push(rowObj)
    }
    res.json({data : table})
}

exports.getContactEntry = async (req, res) => {

    const contact_data = await models.Contact.findAll({
        where: {
            contact_id: req.query.contact_id
        }
    });

    let rowObj = {}
    rowObj['contact_id'] = contact_data[0].contact_id
    rowObj['fname'] = contact_data[0].fname
    rowObj['mname'] = contact_data[0].mname
    rowObj['lname'] = contact_data[0].lname
    rowObj['address_list'] = []
    rowObj['phone_list'] = []
    rowObj['date_list'] = []

    const address_data = await models.Address.findAll({
        where: {
            contact_id: rowObj['contact_id']
        }
    });

    for(let j = 0; j < address_data.length; ++j)
    {
        let add_row = address_data[j];
        let addObj = {}
        addObj['contact_id'] = rowObj['contact_id']
        addObj['address_id'] = add_row.address_id
        addObj['address_type'] = add_row.address_type
        addObj['address'] = add_row.address
        addObj['city'] = add_row.city
        addObj['state'] = add_row.state
        addObj['zip'] = add_row.zip
        await rowObj['address_list'].push(addObj)
    }

    const phone_data = await models.Phone.findAll({
        where: {
            contact_id: rowObj['contact_id']
        }
    });

    for(let j = 0; j < phone_data.length; ++j)
    {
        let phone_row = phone_data[j];
        let phoneObj = {}
        phoneObj['contact_id'] = rowObj['contact_id']
        phoneObj['phone_id'] = phone_row.phone_id
        phoneObj['phone_type'] = phone_row.phone_type
        phoneObj['area_code'] = phone_row.area_code
        phoneObj['number'] = phone_row.number
        await rowObj['phone_list'].push(phoneObj)
    }

    const date_data = await models.Date.findAll({
        where: {
            contact_id: rowObj['contact_id']
        }
    });

    for(let j = 0; j < date_data.length; ++j)
    {
        let date_row = date_data[j];
        let dateObj = {}
        dateObj['contact_id'] = rowObj['contact_id']
        dateObj['date_id'] = date_row.date_id
        dateObj['date_type'] = date_row.date_type
        dateObj['date'] = date_row.date
        await rowObj['date_list'].push(dateObj)
    }

    return res.json({data : rowObj});
}

exports.searchResults = async (req, res) => {
    let table = []
    let idSet = new Set()

    const fname_search = await models.Contact.findAll({
        where:{
            fname: {
                [Op.or] : [
                    Sequelize.where(Sequelize.col('fname'), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('UPPER', Sequelize.col('fname')), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('fname')), 'LIKE', `%${req.query.key}%`)
                ]
            }
        }
    }).catch()

    const mname_search = await models.Contact.findAll({
        where:{
            mname: {
                [Op.or] : [
                    Sequelize.where(Sequelize.col('mname'), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('UPPER', Sequelize.col('mname')), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('mname')), 'LIKE', `%${req.query.key}%`)
                ]
            }
        }
    }).catch()

    const lname_search = await models.Contact.findAll({
        where:{
            lname: {
                [Op.or] : [
                    Sequelize.where(Sequelize.col('lname'), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('UPPER', Sequelize.col('lname')), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('lname')), 'LIKE', `%${req.query.key}%`)
                ]
            }
        }
    }).catch()

    const address_search = await models.Address.findAll({
        where:{
            address: {
                [Op.or] : [
                    Sequelize.where(Sequelize.col('address'), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('UPPER', Sequelize.col('address')), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('address')), 'LIKE', `%${req.query.key}%`)
                ]
            }
        }
    }).catch()

    const city_search = await models.Address.findAll({
        where:{
            city: {
                [Op.or] : [
                    Sequelize.where(Sequelize.col('city'), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('UPPER', Sequelize.col('city')), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('city')), 'LIKE', `%${req.query.key}%`)
                ]
            }
        }
    }).catch()

    const state_search = await models.Address.findAll({
        where:{
            state: {
                [Op.or] : [
                    Sequelize.where(Sequelize.col('state'), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('UPPER', Sequelize.col('state')), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('state')), 'LIKE', `%${req.query.key}%`)
                ]
            }
        }
    }).catch()

    const zip_search = await models.Address.findAll({
        where:{
            zip: {
                [Op.or] : [
                    Sequelize.where(Sequelize.col('zip'), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('UPPER', Sequelize.col('zip')), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('zip')), 'LIKE', `%${req.query.key}%`)
                ]
            }
        }
    }).catch()

    const area_code_search = await models.Phone.findAll({
        where:{
            area_code: {
                [Op.or] : [
                    Sequelize.where(Sequelize.col('area_code'), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('UPPER', Sequelize.col('area_code')), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('area_code')), 'LIKE', `%${req.query.key}%`)
                ]
            }
        }
    }).catch()

    const number_search = await models.Phone.findAll({
        where:{
            number: {
                [Op.or] : [
                    Sequelize.where(Sequelize.col('number'), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('UPPER', Sequelize.col('number')), 'LIKE', `%${req.query.key}%`),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('number')), 'LIKE', `%${req.query.key}%`)
                ]
            }
        }
    }).catch()

    for(let i = 0; i < fname_search.length; ++i)
    {
        let row = fname_search[i]

        if(!idSet.has(row.contact_id))
        {
            idSet.add(row.contact_id)

            let rowObj = {}
            rowObj['contact_id'] = row.contact_id
            rowObj['name'] = row.fname + ' ' + row.mname + ' ' + row.lname
            await table.push(rowObj)
        }
    }

    for(let i = 0; i < mname_search.length; ++i)
    {
        let row = mname_search[i]

        if(!idSet.has(row.contact_id))
        {
            idSet.add(row.contact_id)

            let rowObj = {}
            rowObj['contact_id'] = row.contact_id
            rowObj['name'] = row.fname + ' ' + row.mname + ' ' + row.lname
            await table.push(rowObj)
        }
    }

    for(let i = 0; i < lname_search.length; ++i)
    {
        let row = lname_search[i]

        if(!idSet.has(row.contact_id))
        {
            idSet.add(row.contact_id)

            let rowObj = {}
            rowObj['contact_id'] = row.contact_id
            rowObj['name'] = row.fname + ' ' + row.mname + ' ' + row.lname
            await table.push(rowObj)
        }
    }

    for(let i = 0; i < address_search.length; ++i)
    {
        let row = address_search[i]

        if(!idSet.has(row.contact_id))
        {
            idSet.add(row.contact_id)

            const cont = await models.Contact.findOne({
                where: {
                    contact_id: row.contact_id
                }
            })

            let rowObj = {}
            rowObj['contact_id'] = row.contact_id
            rowObj['name'] = cont.fname + ' ' + cont.mname + ' ' + cont.lname
            await table.push(rowObj)
        }
    }

    for(let i = 0; i < city_search.length; ++i)
    {
        let row = city_search[i]

        if(!idSet.has(row.contact_id))
        {
            idSet.add(row.contact_id)

            const cont = await models.Contact.findOne({
                where: {
                    contact_id: row.contact_id
                }
            })

            let rowObj = {}
            rowObj['contact_id'] = row.contact_id
            rowObj['name'] = cont.fname + ' ' + cont.mname + ' ' + cont.lname
            await table.push(rowObj)
        }
    }

    for(let i = 0; i < state_search.length; ++i)
    {
        let row = state_search[i]

        if(!idSet.has(row.contact_id))
        {
            idSet.add(row.contact_id)

            const cont = await models.Contact.findOne({
                where: {
                    contact_id: row.contact_id
                }
            })

            let rowObj = {}
            rowObj['contact_id'] = row.contact_id
            rowObj['name'] = cont.fname + ' ' + cont.mname + ' ' + cont.lname
            await table.push(rowObj)
        }
    }

    for(let i = 0; i < zip_search.length; ++i)
    {
        let row = zip_search[i]

        if(!idSet.has(row.contact_id))
        {
            idSet.add(row.contact_id)

            const cont = await models.Contact.findOne({
                where: {
                    contact_id: row.contact_id
                }
            })

            let rowObj = {}
            rowObj['contact_id'] = row.contact_id
            rowObj['name'] = cont.fname + ' ' + cont.mname + ' ' + cont.lname
            await table.push(rowObj)
        }
    }

    for(let i = 0; i < area_code_search.length; ++i)
    {
        let row = area_code_search[i]

        if(!idSet.has(row.contact_id))
        {
            idSet.add(row.contact_id)

            const cont = await models.Contact.findOne({
                where: {
                    contact_id: row.contact_id
                }
            })

            let rowObj = {}
            rowObj['contact_id'] = row.contact_id
            rowObj['name'] = cont.fname + ' ' + cont.mname + ' ' + cont.lname
            await table.push(rowObj)
        }
    }

    for(let i = 0; i < number_search.length; ++i)
    {
        let row = number_search[i]

        if(!idSet.has(row.contact_id))
        {
            idSet.add(row.contact_id)

            const cont = await models.Contact.findOne({
                where: {
                    contact_id: row.contact_id
                }
            })

            let rowObj = {}
            rowObj['contact_id'] = row.contact_id
            rowObj['name'] = cont.fname + ' ' + cont.mname + ' ' + cont.lname
            await table.push(rowObj)
        }
    }

    table.sort((a,b) => (a.contact_id < b.contact_id) ? -1 : 1)

    return res.json({data: table})
}
