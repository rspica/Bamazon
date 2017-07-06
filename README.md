# Bamazon
an Amazon-like storefront with the MySQL


# Week of 12 HW: Node.js & MySQL

## Overview

This Repo simulates an Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, the app should track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

This project requires the MySQL and Inquirer npm packages the app needs them for data input and storage.

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

3. Once the customer has placed the order, the app checks the store for enough inventory to meet the customer's request.

    * if ther store _does_ have enough of the product, the customer's order is fullfilled.
    * This action updates the SQL database to reflect the remaining quantity.
    * Once executed, customer is shown the total cost of their purchase.
    * if the inventory is only partial to the requested quantity the app logs ` We are currently low on inventory for the _product name here_. we can ship only _X_` and the app log `would you like us to send _X_ amount...`
    * If the inventory is at 0 the app logs `sorry we are out of stock on the _product name here_`, and prevents the order from processing.
    
4. the order process repeats; the app log `Would you like purchase something else? (Y/n)` if yes the process continues if no the cycle ends and the app exits back to the command line.

- - -
