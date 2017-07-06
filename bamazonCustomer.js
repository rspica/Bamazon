const mysql = require("mysql");
const inquirer = require('inquirer');
const chalk = require('chalk');
var totalAmt = 0;

/// establishes the credentials for connecting to the database
const connect = mysql.createConnection({
    host: "jj820qt5lpu6krut.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "ybbx9ci13afauikv",
    password: "rphgd5ok2sc6qb0s",
    database: "cdl03md98f9yltb2"
});

// makes connection to the MySQL database
connect.connect(function(err) {
    if (err) {
        console.error('Oops something bad just went down: ', err);
    } else {
        console.log(chalk.gray('\n\n**************************************************'));
        console.log(chalk.gray('Attention you are connected with an id of: ' + connect.threadId));
        console.log(chalk.gray('**************************************************'));

        afterConnection();
    }
});

// pulls and displays required data from MySQL
function afterConnection() {
    const productsQuery = "SELECT * FROM products";
    connect.query(productsQuery, function(err, res) {
        if (err) {
            console.error(chalk.bold.redBright('Oops something bad just went down: '), err);
        } else {
            for (let i = 0; i < res.length; i++) {
                console.log(chalk.bold.greenBright('\n*********************************************************'));
                console.log(chalk.bold.gray("Product ID: ") + chalk.bold.redBright(res[i].item_id) + ' ' + chalk.gray.bold.underline('use this number to place order'));
                console.log(chalk.bold.gray("Product name: ") + res[i].product_name);
                console.log(chalk.bold.gray("Unit price: $") + res[i].price + '\n');
                //console.log(chalk.gray("Quantity currently in stock: ") + res[i].stock_quantity + "-pc.");
                //console.log(chalk.gray("Department: ") + res[i].dept_name);
                // console.log(chalk.gray("position: ") + res[i].position);
            }
        }
        itemPurch(res);
    });
}

// validates that user enters a response to the question
function validateInput(name) {
    if (name === "" || name === " ") {
        console.log('Please enter a product ID')
    } else {
        return name !== '';
    }
}

// user confirmation to continue the purchasing cycle on Bamazon
function confirm() {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Would you like purchase something else? ',
        name: 'confirm',
        default: true
    }]).then(function(confirmAns) {
        if (confirmAns.confirm) {
            afterConnection();
        } else {
            console.log(chalk.bold.redBright('\nOK bye, bye!\n\n'));
            process.exit(0);
        }
    });
}

//. Updates current stock quantities in MySQL products database
function dbaseUpdate(purchQuant, currInvent, price, prod) {
    console.log(chalk.bold.bgYellowBright('\n Your order has been fulfilled and is ready to ship '));
    console.log(chalk.bold(' Your total for your purchase of the ' + prod + ' is: ' + chalk.bold.greenBright(price.toFixed(2)) + '\n'));

    totalAmt += price
    console.log(chalk.bold(' The total amount spent currently is: ' + chalk.bold.greenBright(totalAmt.toFixed(2)) + '\n'));
    console.log(chalk.rgb(200, 200, 200)('********** FOR STORE USE ONLY **********'));
    console.log(chalk.gray('previous inventory: ', currInvent));

    currInvent -= purchQuant;
    console.log(chalk.gray('current inventory: ', currInvent));
    console.log(chalk.rgb(200, 200, 200)('****************************************\n'));

    connect.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: currInvent
    }, {
        product_name: prod
    }], function(err, res) {
        if (err) {
            console.error(chalk.bold.redBright('Oops something bad just went down on the update: '), err);
        } else {
            confirm();
        }
    });
}

//function that controls the CLI during the user purchase experience: what item
function itemPurch(product) {
    inquirer.prompt([{
        type: 'input',
        name: 'productId',
        message: 'Enter the ID of the product you would like to purchase.',
        validate: validateInput
    }]).then(function(answer) {
        const orderId = answer.productId;
        for (var i = 0; i < product.length; i++) {
            if (orderId == product[i].item_id) {
                var id = i;
                var purchItem = {
                    id: i,
                    name: product[i].product_name,
                    price: product[i].price,
                    qty: product[i].stock_quantity
                }
            }
        }
        productAmt(purchItem);
    });
}

//function that controls the CLI during the user purchase experience; how many
function productAmt(item) {
    var inventory = item.qty;
    var price = item.price;
    var name = item.name;
    inquirer.prompt([{
        type: 'input',
        name: 'prodQuantity',
        message: 'How many ' + name + ' you would like to buy.',
        validate: validateInput
    }]).then(function(quantAns) {
        var purchQuant = parseInt(quantAns.prodQuantity);
        if (inventory === 0) {
            console.log('\nsorry we are out of stock on the ' + name + '\n');
            confirm();
        } else if (purchQuant <= inventory) {
            var amount = purchQuant * price
            dbaseUpdate(purchQuant, inventory, amount, name);
        } else {
            console.log(chalk.redBright('\nWe are currently low on inventory ' + chalk.bold('we can ship only ' + inventory) + ' of the ' + name )+ '\n');
            inquirer.prompt([{
                type: "confirm",
                message: "Would you like us to send " + inventory + ' of the ' + name,
                name: "confirm",
                default: true
            }]).then(function(confirmAns) {
                if (confirmAns.confirm) {
                    purchQuant = inventory;
                    var amount = purchQuant * price
                    dbaseUpdate(purchQuant, inventory, amount, name);
                } else {
                    confirm();
                }
            })
        }
    });
}
