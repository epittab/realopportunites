const {Pool} = require('pg');

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5000/reopps'
const SSL = process.env.NODE_ENV === 'production';

const tableObject = require('./tablelist');
const table = tableObject.list.values;

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

    async create(params){
        try{
            await pool.query(`INSERT INTO ${table} (property_id, index, created_on, last_updated) values ($1, $2, $3, $4)`, [params.property_id, params.index, params.created_on, params.last_updated])
            return true
        }
        catch(error) {
            console.log(`Could not insert data into Database ${error}`)
            return false
        }
    }


    async update (params) {
        try{
            await pool.query(`UPDATE ${table} SET index = $1, last_updated = $2 WHERE property_id = $3`, [params.index, params.last_updated, params.property_id  ])
            return true
        }
        catch(error) {
            console.log(error)
            return false
        }
    }

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