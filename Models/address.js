
class Address {

    //Public Class Method
    static all = []

    //Constructor
    constructor(prop_id, city, neighborhood, state, zip, lat, long){
    this.prop_id = prop_id;
    this.city = city;
    this.neighborhood = neighborhood;
    this.state = state;
    this.zip = zip;
    this.lat = lat;
    this.long = long;
    Address.all.push(this)
    }

}

module.exports = Address;


// Address

// city = hash["listing"]["address"]["city"]
// neighborhood = hash["listing"]["address"]["neighborhood_name"]
// state = hash["listing"]["address"]["state"]
// zip = hash["listing"]["address"]["postal_code"]
// lat = hash["listing"]["address"]["lat"]
// long = hash["listing"]["address"]["long"]

