const models = require('./Models');

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
        attributes: ['contact_id', 'fname', 'mname', 'lname'],
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
        attributes: ['address_id', 'contact_id', 'address_type', 'address', 'city', 'state', 'zip'],
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
        attributes: ['phone_id', 'contact_id', 'phone_type','area_code', 'number'],
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
        attributes: ['date_id', 'contact_id', 'date_type', 'date'],
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

exports.searchResults = (req, res) => {
    return res.json({data: [{contact_id: 0, fname: 'fname', mname: 'mname', lname: 'lname', address_list: [], date_list: [], phone_list: []}]})
}
