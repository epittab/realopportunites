
//Import API
const Realtor = require('../../API/realtor.js')

// const attom = require('./API/attom.js')
// const zillow = require('./API/zillow.js')
// const fha = require('./API/hud_fha.js')
// const rent = require('./API/hud_rent.js')

//Models
const Property = require('../../Models/property')
const Address = require('../../Models/address')
const Situation = require('../../Models/situation')



module.exports.getSold = async () => {
    try {
        let data = await Realtor.getSold();
        return data
    }
    catch(err) {
        console.log(`There was an error. ${err}`)
    }
}

module.exports.getForSale = async () => {
    try {
        let data = await Realtor.getForSale();
        
        data["properties"].forEach( async property => {
            //create instance
            
            const inst = new Property(
                property.property_id, 
                property.listing_id, 
                property.prop_status, 
                property.price, 
                property.prop_type, 
                property.rdc_web_url, 
                property.thumbnail, 
                property.baths_full, 
                property.baths, 
                property.beds, 
                property.building_size.size, 
                property.building_size.units, 
                property.last_update);
            //store in DB if new
            const creation_obj = await inst.createIf();
            //sanitize dates
            const co_last_update = creation_obj["property"]["last_update"].toISOString().split("T")[0];
            const i_last_update = inst["last_update"].split("T")[0];       
            //update if update is required
            if (!creation_obj["isNewlyCreated"] && ( co_last_update !== i_last_update )) {
                inst.requires_update = true;
                await inst.updateProp()
            } 
        })
        const prop_list = await Property.all()
        return prop_list
    }
    catch(err) {
        console.log(`There was an error in getForSale. ${err}`)
    }
}


module.exports.getProperty = async (l_id, p_status, p_id) => {
    try {
        let data = await Realtor.getProperty(l_id, p_status, p_id); // args: listing_id, property_status, property_id
        return data
    }
    catch(err) {
        console.log(`There was an error. ${err}`)
    }
}

