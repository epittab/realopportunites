
//Models
const Value = require('../../Models/value')


module.exports.generateValueIndex = async data => {
    // update max and mins for normalization
    Value.norm_standards = await Value.update_norm_standards()
    
    //set todays date
    const today = new Date();
    
    // iterate through array of property hashes
    console.log(data)
    await data.forEach( property => {

        
        //check if update is required
        if ( property["requires_update"] ) {
            
            //generate score
            const prop_idx_score = Value.calculateValueIndex(property)

            //instantiate value for property
            const prop_value = new Value(property.property_id, prop_idx_score, today, today)
            
            const creation_obj = prop_value.createIf()

            if (!creation_obj["isNewlyCreated"]) {
                prop_value.updateValue()
            } 
            //assign requires_update to false

            // property["requires_update"] = false;

            //update DB

            // property.update();

            return;
        }

        
        


    })
    
}