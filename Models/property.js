const DB = require('../DB/properties')

class Property {
    
    static async all(){
        const result = await DB.getAll()
        return result
    }
    
    static max(column){
        return DB.getMax(column)
    }
    
    static min(column){
        return DB.getMin(column)
    }
    
    static avg(column) {
        return DB.getAve(column)
    }

    constructor(property_id, listing_id, prop_status, price, prop_type, web_url, photo_url, baths_full, baths, beds, size, units, last_update){
        this.property_id = property_id;
        this.listing_id = listing_id;
        this.prop_status = prop_status;
        this.price = price;
        this.prop_type = prop_type;
        this.web_url = web_url;
        this.photo_url = photo_url;
        this.baths_full = baths_full;
        this.baths = baths;
        this.beds = beds;
        this.size = size;
        this.units = units;
        this.last_update = last_update;
        this.requires_update = true;
    }

    //tested and passed 
    async createIf(){
        // check if property instance exists
        let existence = await DB.findBy( "property_id", this.property_id) 
        if ( existence ) {
            // if it does, return record
            return {isNewlyCreated: false, property: existence[0]}
        }
        // create record
        await DB.create(this)
        existence = await DB.findBy( "property_id", this.property_id) 

        //return record
        return {isNewlyCreated: true, property: existence[0]}
    }

    //tested and passed
    updateProp(){
        // update resource with property_id
        // return true or false
        const result = DB.update(this)
        return result
    }


}

module.exports = Property;

// Property.prototype.whatAmI = function() {
//     return `i am a ${this.name}`
// }

// General Info

// property_id = hash["listing"]["property_id"]
// listing_id = hash["listing"]["listing_id"]
// prop_status = hash["listing"]["prop_status"]
// price = hash["listing"]["price"]
// raw_prop_type = hash["listing"]["raw_prop_type"]
// web_url = hash["listing"]["web_url"]
// photo_url = hash["listing"]["photo"]["href"]
// listing_date_value = hash["listing"]["client_display_text"]["listing_date_value"]
// list_date = hash["listing"]["list_date"]
// last_update = hash["listing"]["last_update"]
