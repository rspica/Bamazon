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
    connect.query("SELECT * FROM products", function(err, res) {
        if (err) {
            console.error(chalk.bold.redBright('Oops something bad just went down: '), err);
        } else {
            for (let i = 0; i < res.length; i++) {
                console.log(chalk.bold.greenBright('\n*************************************************'));
                console.log(chalk.bold.gray("Product ID: ") + chalk.bold.green(res[i].item_id + ' use this number to place order'));
                console.log(chalk.bold.gray("Product name: ") + res[i].product_name);
                console.log(chalk.bold.gray("Unit price: $") + res[i].price);
                console.log(chalk.gray("Quantity currently in stock: ") + res[i].stock_quantity + "-pc.");
                console.log(chalk.gray("Department: ") + res[i].dept_name);
            }
        }
        console.log('');
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

// function updateDBase(purchQuant, inventory) {
//     console.log('inside updateDbsase');
//     product[id].stock_quantity: product[id].stock_quantity - prodQuant;
//     connect.query("UPDATE products SET ? WHERE ?", [{
//         inventory: inventory - purchQuant;
//         console.log()

//     }])
// }

function itemPurch(product) {
    inquirer.prompt([{
        type: 'input',
        name: 'productId',
        message: 'Enter the ID of the product you would like to purchase.',
        validate: validateInput
    }]).then(function(answer) {
        let orderId = answer.productId;
        // var prod;
        for (let i = 0; i < product.length; i++) {
            console.log('i: ' + i + ' this is the current postion: ' + product[i].position + ' ' + product[i].product_name);
            console.log('current product name: ', product[i].product_name);
            if (orderId == product[i].item_id) {
            	console.log('made the if statement')
                var id = i;
                console.log('id: ',id + 'this is the prod choosen: '+ product[i].product_name);
                var prod = (product[i].product_name);
            }
        }
        // console.log('product purchase id: ', id);
        // console.log('prod inventory qty: ', product[id].stock_quantity);
        inquirer.prompt([{
            type: 'input',
            name: 'prodQuantity',
            message: 'How many units of ' + prod + 's you would like to buy.',
            validate: validateInput
        }]).then(function(quantAns) {
            var purchQuant = quantAns.prodQuantity;
            var inventory = product[id].stock_quantity;
            console.log('product[id].stock_quantity: ' + product[id].stock_quantity + ' +typeof: ' + typeof(product[id].stock_quantity)+ "this is inventory: "+inventory);
            // console.log('prod = (product[id].product_name) ',prod = (product[id].product_name))
            if (parseInt(purchQuant) <= inventory) {
                console.log('Your order has been fulfilled and is ready to ship\n');
                inventory = inventory - purchQuant;
                console.log('this is new inventory: ',inventory)
                connect.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: inventory
                    }, {
                        item_id: id
                    }],
                    function(err) {
                        if (err) {
                            console.error(chalk.bold.redBright('Oops something bad just went down: '), err);
                        } else {
                            console.log("new inventory: ", stock_quantity);
                            console.log("");
                        }
                    })
            } else {
                console.log('We are currently low on inventory for ' + prod + 'we can ship only ' + inventory);
            }
        });
    });
}



// const stk_adjuster = function quantAdj(num){
//             	var inventory = inventory - num;
//             	return inventory
//             }
