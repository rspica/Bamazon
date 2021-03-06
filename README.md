# Bamazon
an Amazon-like storefrontwith the MySQL :facepunch: 


Node.js & MySQL

## Overview

This Repo simulates an Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, the app should track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

This project requires the MySQL and Inquirer npm packages the app needs them for data input and storage.

## Installation

To install the Bamazon application locally follow the instructions below:

With the command line:

* 1 `git clone https://github.com/rspica/Bamazon.git`
* 2 `cd Bamazon`
* 3 `npm install`
* 4 Run the Bamazon server via the command line locally: `node server.js`

The Bamazon app will now be running locally, connecting to a MySQL DB on port 3306 via an aws hosting service

The CLI prompts will walk you through the DB experience (outlined below)


## Project overview

### Customer View -- order of execution

1. `bamazonCustomer.js`. display all of the items available for sale. this includes the ids, names, and prices of products for sale. _(see MySQL table list below)_

prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

2. MySQL Database with tables (called `products`). The products table have the following columns:

   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)

![Alt Text](https://github.com/rspica/Bamazon/blob/master/README-img/Screen%20Shot%202017-07-06%20at%203.08.37%20AM.png)



3. Once the customer has placed the order, the app checks the store for enough inventory to meet the customer's request.

   * This action updates the SQL database to reflect the remaining quantity.
   * Once executed, customer is shown the total cost of their purchase.

![Alt Text](https://github.com/rspica/Bamazon/blob/master/README-img/Screen%20Shot%202017-07-06%20at%203.11.58%20AM.png)



   * If the inventory is at 0 the app logs `sorry we are out of stock on the _product name here_`, and prevents the order from processing and the customer's order is not fullfilled.
   
![Alt Text](https://github.com/rspica/Bamazon/blob/master/README-img/Screen%20Shot%202017-07-06%20at%203.13.28%20AM.png)



* if the inventory is only partial to the requested quantity the app logs ` We are currently low on inventory for the _product name here_. we can ship only _X_` and the app log `would you like us to send _X_ amount...`
 
![Alt Text](https://github.com/rspica/Bamazon/blob/master/README-img/Screen%20Shot%202017-07-06%20at%203.28.31%20AM.png)


    
4. the order process repeats; the app log `Would you like purchase something else? (Y/n)` if yes the process continues if no the cycle ends and the app exits back to the command line.

![Alt Text](https://github.com/rspica/Bamazon/blob/master/README-img/Screen%20Shot%202017-07-06%20at%203.18.41%20AM.png)



***************************************************************************************************
# Build Setup

### install dependencies
* mysql
* inquirer
* chalk

- - -
