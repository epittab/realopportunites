const {Pool} = require('pg');

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5000/reopps'
const SSL = process.env.NODE_ENV === 'production';

const tableObject = require('./tablelist');
const table = tableObject.list.situations;

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

    async findByOneCondition(param, column ){
        try{
            const results = await pool.query(`select * from ${table} where ${column} = $1`, [param])
            return results.rows
        }
        catch(error) {
            console.log(error)
        }
    }

    async create(param){
        try{
            await pool.query(`INSERT INTO ${table} (user_created, user_lastlogin, username, user_password, user_email) values ($1, $2, $3, $4, $5)`, ['2019-10-25', '2019-10-25', param.username, param.password, param.email])
            return true
        }
        catch(error) {
            console.log(`Could not insert data into Database ${error}`)
            return false
        }
    }

  

    async updateDb () {
        try{
            await pool.query(`INSERT INTO ${table} (user_created, user_lastlogin, username, user_password, user_email) values ($1, $2, $3, $4, $5)`, ['2019-10-25', '2019-10-25', param.username, param.password, param.email])
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