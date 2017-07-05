const mysql = require("mysql");
const inquirer = require('inquirer');
const chalk = require('chalk');

const connect = mysql.createConnection({
    host: "jj820qt5lpu6krut.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "ybbx9ci13afauikv",
    password: "rphgd5ok2sc6qb0s",
    database: "cdl03md98f9yltb2"
});

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
                console.log(chalk.bold.gray("Unit price: $") + res[i].price);
                //console.log(chalk.gray("Quantity currently in stock: ") + res[i].stock_quantity + "-pc.");
                //console.log(chalk.gray("Department: ") + res[i].dept_name);
                console.log(chalk.gray("position: ") + res[i].position);
                console.log('');
            }
        }
        itemPurch(res);
    });
}

// validates that user enters a response to the question
function validateInput(name) {
    if (name === "" || name === " ") {
        console.log('Please enter a product name')
    } else {
        return name !== '';
    }
}

// general user confirmation to keep purchasing on Bamazon
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
            console.log(chalk.bold.redBright('OK bye, bye!'));
        }
    });
}

//. Updates current stock quantities in MySQL products database
function dbaseUpdate(purchQuant, currInvent, prod) {
    console.log("in update funct purchQuant: ", purchQuant);
        console.log("in update funct inventory: ", currInvent);
            console.log("in update funct prod: ", prod);
    console.log('\nYour order has been fulfilled and is ready to ship\n');
    currInvent -= purchQuant;
    console.log('this is the new inventory : ', currInvent)
    connect.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: currInvent
    }, {
        item_id: prod
    }], function(err, res) {
        if (err) {
            console.error(chalk.bold.redBright('Oops something bad just went down on the update: '), err);
        } else {
            console.log(res.affectedRows + ' product updated!\n');
            console.log('new inventory: ', currInvent + '\n');
            confirm();

        }
    });
}

//function that controls the CLI during the user purchase experience
function itemPurch(product) {
    inquirer.prompt([{
        type: 'input',
        name: 'productId',
        message: 'Enter the ID of the product you would like to purchase.',
        validate: validateInput
    }]).then(function(answer) {
        const orderId = answer.productId;
console.log('product.length: ',product.length);
        for (var i = 0; i < product.length; i++) {
            if (orderId == product[i].item_id) {
                var id = i;
                var prod = (product[i].product_name);
                console.log('product['+i+'].product_name: ',product[i].product_name);

            }
        }

        inquirer.prompt([{
            type: 'input',
            name: 'prodQuantity',
            message: 'How many units of ' + prod + ' you would like to buy.',
            validate: validateInput
        }]).then(function(quantAns) {
            var purchQuant = quantAns.prodQuantity;
            var inventory = product[id].stock_quantity;
            // console.log('product[id].stock_quantity: ' + inventory + ' +typeof: ' + typeof(product[id].stock_quantity));
            // console.log('prod = (product[id].product_name) ',prod = (product[id].product_name))
            if (parseInt(purchQuant) <= inventory) {
                dbaseUpdate(purchQuant, inventory, orderId);
            } else {
                console.log('\nWe are currently low on inventory for the ' + prod + ' we can ship only ' + inventory + ' ' + prod + '\n');
                inquirer.prompt([{
                    type: "confirm",
                    message: "Would you like us to send " + inventory + ' of the ' + prod,
                    name: "confirm",
                    default: true
                }]).then(function(confirmAns) {
                    if (confirmAns.confirm) {
                        purchQuant = inventory;
                        dbaseUpdate(purchQuant, inventory, answer);
                    } else {
                        confirm();
                    }
                })
            }
        });
    });
}



// const stk_adjuster = function quantAdj(num){
//              var inventory = inventory - num;
//              return inventory
//             }
