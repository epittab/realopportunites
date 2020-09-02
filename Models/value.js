const DB = require('../DB/values')

const Property = require('./property')

class Value {

    static async all(){
        const result = await DB.getAll(this)
        return result
    }

    static norm_standards = {
        price: [0, false],
        baths_full: [0, true],
        baths: [0, true], // baths - baths_full
        size: [0, true],
        beds: [0, true]
    }
    
    static criteria_weight = {
        price: .5,
        baths_full: .1,
        baths: .1,
        size: .15,
        beds: .15,
    }

    static async update_norm_standards() {
     
        const min_price = await Property.min("price");
        const max_bath_f = await Property.max("baths_full");
        const max_bath = await Property.max("baths");
        const max_size = await Property.max("size");
        const max_bed = await Property.max("beds");

        return {
            price: [min_price[0]["min"], false],
            baths_full: [max_bath_f[0]['max'], true],
            baths: [max_bath[0]['max'], true],
            size: [max_size[0]['max'], true],
            beds: [max_bed[0]['max'], true]
        }

    }

    //create a getTopTen or similar function

    static max(column){
        return DB.getMax(column)
    }

    static min(column){
        return DB.getMin(column)
    }

    static avg(column) {
        return DB.getAve(column)
    }

    static calculateValueIndex(obj) {

        const propInstanceValueArray = []

        Object.entries(obj).forEach((k, v) => {
            
            if (this.norm_standards.hasOwnProperty(k[0])) {
                console.log(this.norm_standards)
                if (this.norm_standards[k[0]][1]) {
                    propInstanceValueArray.push(k[1]/this.norm_standards[k[0]][0]*this.criteria_weight[k[0]])
                } else {
                    propInstanceValueArray.push(this.norm_standards[k[0]][0]*this.criteria_weight[k[0]]/k[1])
                }
            }
        })
   
        return propInstanceValueArray.reduce( (acc, curr ) =>  { return acc + curr } )

    }

    constructor(property_id, index, created_on, last_updated) {

        this.property_id = property_id
        this.index = index
        this.created_on = created_on
        this.last_updated = last_updated
       
    }


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

    updateValue(){
        // update resource find value with id
        const result = DB.update(this)
        return result
    }


}

module.exports = Value;