const {Pool} = require('pg');

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5000/reopps'
const SSL = process.env.NODE_ENV === 'production';

const tableObject = require('./tablelist');
const table = tableObject.list.properties;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

class Database {
    constructor() {

    }

    async connectDB () {
        try{
            await pool.connect()
        }
        catch(error) {
            console.log(`Could not connect to database ${error}...`)
         }
    }


    //tested and passed
    async getAll(){
        try{
            const results = await pool.query(`select * from ${table}`)
            return results.rows
        }
        catch(error) {
            console.log(`Could not retreive data from DB ${error}...`)
            return [];
        }
       
    }

    //tested and passed
    async find( id ){
        try{
            const results = await pool.query(`select * from ${table} where id = $1`, [id])
            if (results.rows.length > 0) {
                return results.rows
            } else {
                return false
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    // tested and passed
    async findBy( column, param ){
        try{
            const results = await pool.query(`select * from ${table} where ${column} = $1`, [param])
            if (results.rows.length === 0) {
                return false
            } else {
                return results.rows
            }
        }
        catch(error) {
            console.log(error)
            return false
        }
    }

    async getMax( column ){
        try{
            const result = await pool.query(`select MAX(${column}) from ${table}`)
            return result.rows
        }
        catch(error) {
            console.log(error)
        }
    }

    async getMin( column ){
        try{
            const result = await pool.query(`select MIN(${column}) from ${table}`)
            return result.rows
        }
        catch(error) {
            console.log(error)
        }
    }

    async getAve( column ){
        try{
            const result = await pool.query(`select AVG(${column}) from ${table}`)
            return result.rows
        }
        catch(error) {
            console.log(error)
        }
    }

    // tested and passed
    async create(params){
        try{
            await pool.query(`INSERT INTO ${table} (property_id, listing_id, prop_status, price, prop_type, web_url, photo_url, baths_full, baths, size, units, beds, last_update, requires_update) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`, [params.property_id, params.listing_id, params.prop_status, params.price, params.prop_type, params.web_url, params.photo_url, params.baths_full, params.baths, params.size, params.units, params.beds, params.last_update, params.requires_update])
            return true
        }
        catch(error) {
            console.log(`Could not insert data into Database ${error}`)
            return false
        }
    }

    // modified
    async update (params) {
        try{
            
            await pool.query(`UPDATE ${table} SET prop_status = $1, price = $2, prop_type = $3, web_url = $4, photo_url = $5, last_update = $6, requires_update = $7 WHERE property_id = $8`, [params.prop_status, params.price, params.prop_type, params.web_url, params.photo_url, params.last_update, params.requires_update, params.property_id  ])
            return true
        }
        catch(error) {
            console.log(error)
            return false
        }
    }

    // tested and passed
    async deleteById(id) {
        try{
            await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id])
            return true
        }
        catch(error) {
            console.log(`Could not delete data from Database ${error}...`)
            return false
        }
    }

    async deleteAll() {
        try{
            await pool.query(`DELETE FROM ${table}`)
            return true
        }
        catch(error) {
            console.log(`Could not delete all data from Database ${error}...`)
            return false
        }
    }


    async endConnect () {
        try{
            await pool.end()
        }
        catch(error) {
            console.log(error)
        }
    }
}

module.exports = new Database();