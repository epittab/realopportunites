const fetch = require('node-fetch');

const city = "Washington";
const state_code = "DC";
const amount_of_props = "5";
const radius = "50";
const key = process.env.REALTOR_KEY;


module.exports.getSold = async () => {
        
        const url = `https://realtor.p.rapidapi.com/properties/v2/list-sold?sort=sold_date&city=${city}&offset=0&state_code=${state_code}&limit=${amount_of_props}`;
        try {
            let response = await fetch(url, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "realtor.p.rapidapi.com",
                    "x-rapidapi-key": key
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse;
            }
            throw new Error('Error: Fetched response false-y');
        }
        catch(err){
            console.log(`Error getting sold data: ${err}`)
        }
    }

// listing_id = 608763437
// prop_status = for_sale
// property_id = 4599450556


module.exports.getProperty = async (l_id, p_status, p_id) => {
        const URL = `https://realtor.p.rapidapi.com/properties/detail?listing_id=${l_id}&prop_status=${p_status}&property_id=${p_id}`;
            try{
                let response = await fetch(URL, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "realtor.p.rapidapi.com",
                            "x-rapidapi-key": key
                    }
                });
                console.log(response)
                    if (response.ok) {
                        const jsonResponse = await response.json();
                        return jsonResponse;   
                    }
                    throw new Error('Error: Fetched response false-y');
                }
            catch (error) {
                console.log(error)
            }
            
            
        }


module.exports.getForSale = async () => {

    const url =  `https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&postal_code=20001&radius=${radius}&city=${city}&limit=${amount_of_props}&offset=0&state_code=${state_code}`
    try {
        const response = await fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "realtor.p.rapidapi.com",
                "x-rapidapi-key": key
            }
        })
        if (response.ok){
            const jsonResponse = await response.json();
            return jsonResponse;
        }
        throw new Error('Error: Fetched response false-y');
    }
    catch(err) {
        console.log(`Error getting for sale data, ${err}`)
    }

}

//  GET properties/v2/list-for-sale
//  GET properties/v2/list-sold



// For getPropertyInfo()


// General Info

// raw_prop_type = hash["listing"]["raw_prop_type"]
// property_id = hash["listing"]["property_id"]
// prop_status = hash["listing"]["prop_status"]
// listing_id = hash["listing"]["listing_id"]
// web_url = hash["listing"]["web_url"]
// listing_date_value = hash["listing"]["client_display_text"]["listing_date_value"]
// photo_url = hash["listing"]["photo"]["href"]


// Address

// city = hash["listing"]["address"]["city"]
// neighborhood = hash["listing"]["address"]["neighborhood_name"]
// state = hash["listing"]["address"]["state"]
// zip = hash["listing"]["address"]["postal_code"]
// lat = hash["listing"]["address"]["lat"]
// long = hash["listing"]["address"]["long"]

// Characteristics

// baths_full = hash["listing"]["baths_full"]
// baths = hash["listing"]["baths"]
// sqft = hash["listing"]["sqft"]
// beds = hash["listing"]["beds"]
// year_built = hash["listing"]["year_built"]
// price = hash["listing"]["price"]


// Dates

// list_date = hash["listing"]["list_date"]
// last_update = hash["listing"]["last_update"]


// Situation

// presentation_status = hash["listing"]["client_display_flags"]["presentation_status"]
// price_change = hash["listing"]["client_display_flags"]["price_change"]
// is_foreclosure = hash["listing"]["client_display_flags"]["is_foreclosure"]
// is_short_sale = hash["listing"]["client_display_flags"]["is_short_sale"]



// For getSoldData

// hash with array of hashes

// listing_id = data["properties"][0]["listing_id"]
// property_id = data["properties"][0]["property_id"]
// prop_type = data["properties"][0]["prop_type"]
// prop_status = data["properties"][0]["prop_status"]
// list_date = data["properties"][0]["list_date"]
// last_update = data["properties"][0]["last_update"]
// rdc_web_url = data["properties"][0]["rdc_web_url"]

//Characteristics

// year_built = data["properties"][0]["year_built"]
// beds = data["properties"][0]["beds"]
// baths_full = data["properties"][0]["baths_full"]
// baths = data["properties"][0]["baths"]
// last_update = data["properties"][0]["last_update"]
// price = data["properties"][0]["price"]
// building_size = data["properties"][0]["building_size"]

//Address

// address = data["properties"][0]["address"] => Object

// Situation

// client_display_flag = data["properties"][0]["client_display_flags"] => Object



// For getForSaleData

// hash with array of hashes