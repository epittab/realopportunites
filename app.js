//Express
const Express = require ('express');
const app = Express();

//Require packages
const bp = require('body-parser');
require('dotenv').config()

//Require Controller files
const PropertyCtlr = require('./Controllers/property_controller/property')
const ValueCtlr = require('./Controllers/value_controller/value')


//testing
// const Property = require('./Models/property');
// const DB1 = require('./DB/properties');
// const DB2 = require('./DB/values');


app.use(bp.urlencoded({extended: false}));
app.use(bp.json());


//Main method

async function run() {

    // Production

    try {
        const properties = await PropertyCtlr.getForSale()
        const values = await ValueCtlr.generateValueIndex(properties)  
        
        // await console.log(data)
    }
    catch(err) {
        console.log(`There was an error in the run function. ${err}`)
    }


    //seeding

    // DB1.deleteAll() //Properties
    // DB2.deleteAll() //Values

    // DB.update(testObj)

    
     
};

//Timer

setInterval(run, 5000)


//Route

app.get('/', (req, res) => {
    res.send("No api routes defined.");
});

//Start the browser

app.listen('3000', console.log("listening on 3000"));