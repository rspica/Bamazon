# Bamazon
an Amazon-like storefront :facepunch: with the MySQL


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
   
<img width="815" alt="screen shot 2017-07-06 at 3 08 37 am" src="https://user-images.githubusercontent.com/3219942/27899545-a0d7aecc-61f8-11e7-9dfd-922f6be314ea.png">

3. Once the customer has placed the order, the app checks the store for enough inventory to meet the customer's request.

   * This action updates the SQL database to reflect the remaining quantity.
   * Once executed, customer is shown the total cost of their purchase.
    
<img width="808" alt="screen shot 2017-07-06 at 3 11 58 am" src="https://user-images.githubusercontent.com/3219942/27899873-027d0d4c-61fa-11e7-8d2b-6eddfd94f3e6.png">

   * If the inventory is at 0 the app logs `sorry we are out of stock on the _product name here_`, and prevents the order from processing and the customer's order is not fullfilled.
    
<img width="808" alt="screen shot 2017-07-06 at 3 13 28 am" src="https://user-images.githubusercontent.com/3219942/27899935-3eb067fa-61fa-11e7-81f6-65962cf792d4.png">

    
   * if the inventory is only partial to the requested quantity the app logs ` We are currently low on inventory for the _product name here_. we can ship only _X_` and the app log `would you like us to send _X_ amount...`
    
<img width="808" alt="screen shot 2017-07-06 at 3 28 31 am" src="https://user-images.githubusercontent.com/3219942/27900194-5dad2ff2-61fb-11e7-82c3-d7a5dd0b6cfe.png">
    
4. the order process repeats; the app log `Would you like purchase something else? (Y/n)` if yes the process continues if no the cycle ends and the app exits back to the command line.

<img width="808" alt="screen shot 2017-07-06 at 3 18 41 am" src="https://user-images.githubusercontent.com/3219942/27900264-a4753c18-61fb-11e7-8dd6-b5043391bc68.png">

- - -
