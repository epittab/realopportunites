
class Situation {

    static all = []

    constructor(prop_id, presentation_status, price_change, is_foreclosure, is_short_sale,){
    this.prop_id = prop_id;
    this.presentation_status = presentation_status;
    this.price_change = price_change;
    this.is_foreclosure = is_foreclosure;
    this.is_short_sale = is_short_sale;
    Situation.all.push(this)
    }

}

module.exports = Situation;

// Situation

// presentation_status = hash["listing"]["client_display_flags"]["presentation_status"]
// price_change = hash["listing"]["client_display_flags"]["price_change"]
// is_foreclosure = hash["listing"]["client_display_flags"]["is_foreclosure"]
// is_short_sale = hash["listing"]["client_display_flags"]["is_short_sale"]

