const models = require('./Models');
const { sequelize } = require('./sequelize')

exports.updateDB = async (req, res) => {
    let data = req.body

    const contact_data = await models.Contact.findOne({
        attributes: ['contact_id'],
        where: {
            contact_id: data.contact_id
        }
    });

    if(contact_data != null)
    {
        console.log("update contact")
        await models.Contact.update({
            'fname' : data.fname,
            'mname' : data.mname,
            'lname' : data.lname
        }, {
            where: {
                'contact_id': data.contact_id
            }
        }).catch()

        if(data.address_list.length > 0)
        {
            await data.address_list.map(async item => {
                const add_data = await models.Address.findOne({
                    attributes: ['address_id','contact_id'],
                },{
                    where: {
                        'contact_id': data.contact_id,
                        'address_id': item.address_id
                    }
                }).catch()

                if(add_data != null)
                {
                    await models.Address.update({
                        'contact_id': data.contact_id,
                        'address_type' : item.address_type,
                        'address' : item.address,
                        'city' : item.city,
                        'state' : item.state,
                        'zip' : item.zip
                    }, {
                        where: {
                            'contact_id': data.contact_id,
                            'address_id': item.address_id
                        }
                    }).catch()
                }
                else
                {
                    await models.Address.create({
                        'contact_id' : Number.parseInt(cont.contact_id),
                        'address_type' : item.address_type,
                        'address' : item.address,
                        'city' : item.city,
                        'state' : item.state,
                        'zip' : item.zip
                    }).catch()
                }
            })
        }

        if(data.phone_list.length > 0)
        {
            await data.phone_list.map(async item => {

                const phone_data = await models.Phone.findOne({
                    attributes: ['phone_id', 'contact_id']
                },{
                    where: {
                        'contact_id': data.contact_id,
                        'phone_id': item.phone_id
                    }
                }).catch()

                if(phone_data != null)
                {
                    await models.Phone.update({
                        'contact_id': data.contact_id,
                        'phone_type' : item.phone_type,
                        'area_code' : item.area_code,
                        'number' : item.number
                    }, {
                        where: {
                            'contact_id': data.contact_id,
                            'phone_id': item.phone_id
                        }
                    }).catch()
                }
                else
                {
                    await models.Phone.create({
                        'contact_id' : Number.parseInt(cont.contact_id),
                        'phone_type' : item.phone_type,
                        'area_code' : item.area_code,
                        'number' : item.number
                    }).catch()
                }


            })
        }

        if(data.date_list.length > 0)
        {
            await data.date_list.map(async item => {

                const date_data = await models.Date.findOne({
                    attributes: ['date_id', 'contact_id']
                },{
                    where: {
                        'contact_id': data.contact_id,
                        'date_id': item.date_id
                    }
                }).catch()

                if(date_data != null)
                {
                    await models.Date.update({
                        'contact_id' : Number.parseInt(cont.contact_id),
                        'date_type' : item.date_type,
                        'date' : item.date
                    }, {
                        where: {
                            'contact_id': data.contact_id,
                            'date_id': item.date_id
                        }
                    }).catch()
                }
                else
                {
                    await models.Date.create({
                        'contact_id' : Number.parseInt(cont.contact_id),
                        'date_type' : item.date_type,
                        'date' : item.date
                    }).catch()
                }
            })
        }

        return res.send("OK")
    }
    else
    {
        let cont = await models.Contact.create({
            'fname' : data.fname,
            'mname' : data.mname,
            'lname' : data.lname
        }).catch()

        if(data.address_list.length > 0)
        {
            await data.address_list.map(async item => {
                await models.Address.create({
                    'contact_id' : Number.parseInt(cont.contact_id),
                    'address_type' : item.address_type,
                    'address' : item.address,
                    'city' : item.city,
                    'state' : item.state,
                    'zip' : item.zip
                }).catch()
            })
        }

        if(data.phone_list.length > 0)
        {
            await data.phone_list.map(async item => {
                await models.Phone.create({
                    'contact_id' : Number.parseInt(cont.contact_id),
                    'phone_type' : item.phone_type,
                    'area_code' : item.area_code,
                    'number' : item.number
                }).catch()
            })
        }

        if(data.date_list.length > 0)
        {
            await data.date_list.map(async item => {
                await models.Date.create({
                    'contact_id' : Number.parseInt(cont.contact_id),
                    'date_type' : item.date_type,
                    'date' : item.date
                }).catch()
            })
        }
    }

    return res.send('OK')
}
