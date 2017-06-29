const mysql = require("mysql");
const inquirer = require('inquirer');

const connect = mysql.createConnection({
	host: "jj820qt5lpu6krut.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	port: 3306
	username: "ybbx9ci13afauikv,"
	password: "rphgd5ok2sc6qb0s"
});

connect.connection(function(err) {
	if (err) {
		console.error('Opps something bad just went down: ', err);
	} else {
		runDisplay();

	}
});

function runDisplay() {
	inquirer.prompt([
	{
		type: "list",
		name: "productList",
		message: "Here is the list of avialable products"
	}
		])
	}
}
