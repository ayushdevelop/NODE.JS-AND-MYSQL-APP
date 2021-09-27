const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("db " + connection.state);
  }
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertNewName(name, filetype) {
    try {
      const date = new Date();
      console.log(date);
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO names (name,  date ) VALUES (?,?);";

        connection.query(query, [name, date], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        });
      });
      // console.log(insertId);
    } catch (error) {
      console.log(error);
    }
  }

  async searchByName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names WHERE name = ?;";

        connection.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService;
