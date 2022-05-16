import mysql from 'mysql'

export const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD_DB,
  database: `tourist-guide`
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log(err);
    console.log('no se pudo :c');
    return;
  } else {
    console.log('Db is connected');
  }
})

// module.exports = mysqlConnection;