const models = require('./Models');

exports.updateDB = async (req, res) => {
    let data = req.body

    const cont = await models.Contact.findOne({
        where: {
            contact_id: parseInt(data.contact_id)
        }
    });

    if(cont != null) {
        await models.Contact.update({
            'fname': data.fname,
            'mname': data.mname,
            'lname': data.lname
        }, {
            where: {
                'contact_id': data.contact_id
            }
        }).catch()


        let prev_data = await models.Address.findAll({
            where: {
                'contact_id': data.contact_id
            }
        }).catch()

        let idSet = new Set()

        if (data.address_list.length > 0) {
            await data.address_list.map(async item => {
                const add_data = await models.Address.findOne({
                    where: {
                        'address_id': item.address_id,
                        'contact_id': data.contact_id
                    }
                }).catch()

                if (add_data != null) {
                    idSet.add(item.address_id)
                    await models.Address.update({
                        'contact_id': data.contact_id,
                        'address_id': item.address_id,
                        'address_type': item.address_type,
                        'address': item.address,
                        'city': item.city,
                        'state': item.state,
                        'zip': item.zip
                    }, {
                        where: {
                            'contact_id': data.contact_id,
                            'address_id': item.address_id
                        }
                    }).catch()
                } else {
                    await models.Address.create({
                        'contact_id': Number.parseInt(cont.contact_id),
                        'address_type': item.address_type,
                        'address': item.address,
                        'city': item.city,
                        'state': item.state,
                        'zip': item.zip
                    }).catch()
                }
            })
        }

        await prev_data.map(async item => {
            if (!idSet.has(item.address_id)) {
                await models.Address.destroy({
                    where: {
                        contact_id: data.contact_id,
                        address_id: item.address_id
                    }
                })
            }
        })

        prev_data = await models.Phone.findAll({
            where: {
                'contact_id': data.contact_id
            }
        }).catch()

        idSet = new Set()

        if (data.phone_list.length > 0) {
            await data.phone_list.map(async item => {

                const phone_data = await models.Phone.findOne({
                    where: {
                        'phone_id': item.phone_id
                    }
                }).catch()

                idSet.add(item.phone_id)

                if (phone_data != null) {
                    await models.Phone.update({
                        'contact_id': Number.parseInt(data.contact_id),
                        'phone_type': item.phone_type,
                        'area_code': item.area_code,
                        'number': item.number
                    }, {
                        where: {
                            'contact_id': data.contact_id,
                            'phone_id': item.phone_id
                        }
                    }).catch()
                } else {
                    await models.Phone.create({
                        'contact_id': Number.parseInt(data.contact_id),
                        'phone_type': item.phone_type,
                        'area_code': item.area_code,
                        'number': item.number
                    }).catch()
                }
            })
        }

        await prev_data.map(async item => {
            if (!idSet.has(item.phone_id)) {
                await models.Phone.destroy({
                    where: {
                        'phone_id': item.phone_id,
                        'contact_id': data.contact_id
                    }
                })
            }
        })

        prev_data = await models.Date.findAll({
            where: {
                'contact_id': data.contact_id
            }
        }).catch()

        idSet = new Set()

        if(data.date_list.length > 0)
        {
            await data.date_list.map(async item => {

                const date_data = await models.Date.findOne({
                    where: {
                        'contact_id': Number.parseInt(data.contact_id),
                        'date_id': item.date_id
                    }
                }).catch()

                if(date_data != null)
                {
                    idSet.add(item.date_id)
                    await models.Date.update({
                        'contact_id' : Number.parseInt(cont.contact_id),
                        'date_type' : item.date_type,
                        'date' : item.date
                    }, {
                        where: {
                            'date_id': item.date_id,
                            'contact_id': data.contact_id
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

        await prev_data.map(async item => {
            if(!idSet.has(item.date_id))
            {
                await models.Date.destroy({
                    where:{
                        date_id: item.date_id
                    }
                })
            }
        })

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
