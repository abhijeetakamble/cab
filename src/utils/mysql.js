const mysql = require('mysql');

class MysqlClient {

  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'local_db'
    });
    this.connection.connect((err) => {
      if(err){
        console.log('Error connecting to Db',err);
        return;
      }
      console.log('Connection established');
    });
  }

  close() {
    if(this.connection !== null) {
      this.connection.end((err) => {
        if(err){
          console.log('Error closing to Db');
          return;
        }
        console.log('Connection closed');
      });
    }
  }

}

module.exports = new MysqlClient();