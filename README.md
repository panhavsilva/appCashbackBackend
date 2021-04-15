# API backend - Project Cashback
> Project Status: Developing :warning:

[![NPM](https://img.shields.io/badge/npm-v6.14.11-yellow)](https://www.npmjs.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Heroku](https://img.shields.io/badge/heroku-deployed-blueviolet)](https://www.heroku.com/)

## Table of contents
<!--ts-->
  * [Usage](#usage)
  * [Install](#install)
  * [Running server](#running-server)
  * [Environment Variable](#environment-variable)
  * [Features](#features)
  * [Deploy](#deploy)
  * [Products](#products)
    * [List All](#list-all-products)
    * [Show one](#show-one-product)
    * [Create](#create-product)
    * [Update](#update-product)
    * [Delete](#delete-product)
  * [Orders](#orders)
    * [List All](#list-all-orders)
    * [Show one](#show-one-order)
    * [Create](#register-order)
    * [Update](#update-order)
    * [Delete](#delete-order)
  * [Cashback](#cashback)
    * [List all](#list-all-cashback)
    * [Create](#register-cashback)
    * [Update](#update-cashback)
    * [Delete](#delete-cashback)
<!--te-->

## Usage
[https://backend-cashback.herokuapp.com/](https://backend-cashback.herokuapp.com/)

## Install
* Install dependencies `npm install`
## Running Server
Use the npm start to running server.
```bash
npm start
```
## Environment Variable
Create a file called .env. Then, just set some environment variables within this file:
* `PORT`
* `MONGO_URL`
* `MONGO_DB_NAME`
* `CORS_ORIGINS`

## Features
* PRODUCTS
  * Register
  * Update
  * Delete
  * List all
  * Show one
* ORDERS
  * Register
  * Update
  * Delete
  * List all
  * Show one
* CASHBACK
  * Register
  * Update
  * Delete
  * List all

## Deploy
This repository is ready to run inside Heroku.

---
## PRODUCTS

### List All Products
  Returns json data about all products.

* **URL** <br />
  /products

* **Method** <br />
  `GET`

*  **URL Params** <br />
  None

* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    ```
    [
      {
        "id": "f71ce1c6-079d-43e4-88ab-b6ccde593168",
        "name": "product name1",
        "price": 14.48
      },
      {
        "id": "9366e349-0c3f-4300-b3b7-76a806b5e2aa",
        "name": "product name2",
        "price": 20.21
      }
    ]
    ```
* **Error Response** <br />
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Error in the list of products!", error: true }`

### Show One Product
  Returns json data about one product.

* **URL** <br />
  /products/:id/show

* **Method** <br />
  `GET`

*  **URL Params** <br />
  **Required:** <br />
   `id=[string]`

* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    ```
    {
      "id": "f71ce1c6-079d-43e4-88ab-b6ccde593168",
      "name": "product name1",
      "price": 14.48
    }
    ```
* **Error Response** <br />
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "Product not found!", error: true }` <br />
  OR <br />

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Error show product!", error: true }`

### Create Product
  Creates a product and returns json data about the created product.

* **URL** <br />
  /products

* **Method** <br />
  `POST`

*  **URL Params** <br />
  None

* **Expected frontend data** <br />
  Required: name and price of the product to be created. <br />
  ```
    {
      "name": "string",
      "price": number
    }
  ```
* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
      ```
      {
        "id": "f71ce1c6-079d-43e4-88ab-b6ccde593168",
        "name": "product name1",
        "price": 14.48
      }
      ```
* **Error Response** <br />
  * **Code:** 400 BAD REQUEST  <br />
    **Content:** `{ message: "Error creating new product!", error: true }` <br />
  OR <br />

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Please, correctly fill fields!", error: true }`
### Update Product
  Updates product data and returns json data about the updated product.

* **URL** <br />
  /products/:id

* **Method** <br />
  `PUT`

*  **URL Params** <br />
  **Required:** <br />
   `id=[string]`

* **Expected frontend data** <br />
  Name and price, just the name or just the price. <br />
  ```
    {
      "name": "string",
      "price": number
    }
  ```
* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    ```
    {
      "id": "f71ce1c6-079d-43e4-88ab-b6ccde593168",
      "name": "product name1",
      "price": 14.48
    }
    ```
* **Error Response** <br />
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "Product not found!", error: true }` <br />
  OR <br />

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Please, correctly fill fields!", error: true }` <br />
    OR <br />
    **Content:** `{ message: "Error edit product!", error: true }`

### Delete Product
  Deletes the product and returns json data about with deleted product id.

* **URL** <br />
  /products/:id

* **Method** <br />
  `DELETE`

*  **URL Params** <br />
  **Required:** <br />
   `id=[string]`

* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    ```
    {
      "id": "f71ce1c6-079d-43e4-88ab-b6ccde593168"
    }
    ```
* **Error Response** <br />
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "Product not found!", error: true }` <br />
  OR <br />

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Error delete product!", error: true }` <br />

---
## ORDERS

### List All Orders
  Returns json data about all orders.

* **URL** <br />
  /orders

* **Method** <br />
  `GET`

*  **URL Params** <br />
  None

* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    ```
    [
      {
        "id": "050db035-371c-4328-a6c6-77028291cfca",
        "total": 288278.08,
        "quantity": 15,
        "products": [
          {
            "id": "9366e349-0c3f-4300-b3b7-76a806b5e2aa",
            "quantity": 10
          },
          {
            "id": "f71ce1c6-079d-43e4-88ab-b6ccde593168",
            "quantity": 1
          },
          {
            "id": "b5438b80-db8d-400b-9579-6167d91187c3",
            "quantity": 4
          }
        ]
      },
      {
        "id": "1647938b-629f-4167-96ce-497e6f31cf87",
        "total": 7267.26,
        "quantity": 3,
        "products": [
          {
            "id": "f71ce1c6-079d-43e4-88ab-b6ccde593168",
            "quantity": 3
          }
        ]
      }
    ]
    ```
* **Error Response** <br />
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Error in the list of orders!", error: true }`

### Show One Order
  Returns json data about one order.

* **URL** <br />
  /orders/:id/show

* **Method** <br />
  `GET`

*  **URL Params** <br />
  **Required:** <br />
   `id=[string]`

* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    ```
    {
      "id": "050db035-371c-4328-a6c6-77028291cfca",
      "total": 288278.08,
      "quantity": 15,
      "products": [
        {
          "id": "9366e349-0c3f-4300-b3b7-76a806b5e2aa",
          "quantity": 10
        },
        {
          "id": "f71ce1c6-079d-43e4-88ab-b6ccde593168",
          "quantity": 1
        },
        {
          "id": "b5438b80-db8d-400b-9579-6167d91187c3",
          "quantity": 4
        }
      ]
    }
    ```
* **Error Response** <br />
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "Order not found!", error: true }` <br />
  OR <br />

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Error show order!", error: true }` <br />

### Create Order
  Creates a order and returns json data about the created order.

* **URL** <br />
  /orders

* **Method** <br />
  `POST`

*  **URL Params** <br />
  None

* **Expected frontend data** <br />
  Required: Array of objects containing id and quantity of the products of order. <br />
  ```
    [
      {
        "id":"string",
        "quantity": number
      },
      {
        "id":"string",
        "quantity": number
      }
    ]
  ```
* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    Object containing id, price total of order, quantity total of products of order and array of objects with products of order.
    ```
    {
      "id": "f4049dd9-d4ea-4227-a622-5bb70bcf43b9",
      "total": 166.95,
      "quantity": 9,
      "products": [
        {
          "id": "87b74638-333d-483b-99ed-65abca0ceba5",
          "name": "product name1",
          "price": 13.57,
          "quantity": 3
        },
        {
          "id": "aefadeaa-9262-42ce-919a-17c24db80aa3",
          "name": "product name2",
          "price": 21.04,
          "quantity": 6
        }
      ]
    }
    ```
* **Error Response** <br />
  * **Code:** 400 BAD REQUEST  <br />
    **Content:** `{ message: "Error creating new order!", error: true }` <br />
  OR <br />

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Please, fill all fields!", error: true }` <br />

### Update Order
  Updates order data and returns json data about the updated order.

* **URL** <br />
  /orders/:id

* **Method** <br />
  `PUT`

*  **URL Params** <br />
  **Required:** <br />
   `id=[string]`

* **Expected frontend data** <br />
  Required: New array of objects containing id and quantity of the products of order. <br />
  ```
    [
      {
        "id":"string",
        "quantity":number
      },
      {
        "id":"string",
        "quantity":number
      }
    ]
  ```
* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    ```
    {
      "id": "f4049dd9-d4ea-4227-a622-5bb70bcf43b9",
      "total": 138.44,
      "quantity": 8,
      "products": [
        {
          "id": "87b74638-333d-483b-99ed-65abca0ceba5",
          "name": "Update Name em 05/04",
          "price": 13.57,
          "quantity": 4
        },
        {
          "id": "aefadeaa-9262-42ce-919a-17c24db80aa3",
          "name": "product",
          "price": 21.04,
          "quantity": 4
        }
      ]
    }
    ```
* **Error Response** <br />
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "Order not found!", error: true }` <br />
  OR <br />

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Please, fill all fields!", error: true }` <br />
    OR <br />
    **Content:** `{ message: "Error edit order!", error: true }` <br />

### Delete Order
  Deletes the order and returns json data about with deleted order id.

* **URL** <br />
  /orders/:id

* **Method** <br />
  `DELETE`

*  **URL Params** <br />
  **Required:** <br />
   `id=[string]`

* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    ```
    {
      "id": "9b8152b8-3999-4690-8e37-d19e16f43798"
    }
    ```
* **Error Response** <br />
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "Error delete order!", error: true }` <br />
  OR <br />

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Error delete order!", error: true }` <br />

---
## CASHBACK

### List All Cashback
  Returns json data about all cashback.

* **URL** <br />
  /cashback

* **Method** <br />
  `GET`

*  **URL Params** <br />
  None

* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    ```
    [
      {
        "id": "e4f35560-4cd8-45ef-b261-236b1d6ae0bf",
        "name": "cashback name1",
        "initial": 100,
        "final": 200
      },
      {
        "id": "dc79a257-9f83-43dd-8f5b-abcc44fdca95",
        "name": "cashback name2",
        "initial": 200,
        "final": 300
      }
    ]
    ```
* **Error Response** <br />
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Error in the list of cashback ranges!", error: true }`

### Create Cashback
  Creates a cashback ranges and returns json data about the created cashback ranges.

* **URL** <br />
  /cashback

* **Method** <br />
  `POST`

*  **URL Params** <br />
  None

* **Expected frontend data** <br />
  Required: Name, value initial and value final of the cashback ranges. <br />
  ```
    {
      "name":"string",
      "initial": number,
      "final": number
    }
  ```
* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    ```
    {
      "id": "e4f35560-4cd8-45ef-b261-236b1d6ae0bf",
      "name": "cashback name",
      "initial": 100,
      "final": 200
    }
    ```
* **Error Response** <br />
  * **Code:** 400 BAD REQUEST  <br />
    **Content:** `{ message: "Error creating new cashback range!", error: true }` <br />
  OR <br />

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Please, fill all fields!", error: true }` <br />

### Update Cashback
  Updates cashback ranges data and returns json data about the updated cashback ranges.

* **URL** <br />
  /cashback/:id

* **Method** <br />
  `PUT`

*  **URL Params** <br />
  **Required:** <br />
   `id=[string]`

* **Expected frontend data** <br />
  Required: Only one of the properties or more. <br />
  ```
    {
      "name":"string",
      "initial": number,
      "final": number
    }
  ```
* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    ```
    {
      "id": "17e5dc83-4acb-403d-af7e-8133f50461a4",
      "name": "cashback name",
      "initial": 500,
      "final": 600
    }
    ```
* **Error Response** <br />
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "Cashback range not found!", error: true }` <br />
    OR <br />

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Please, fill all fields!", error: true }` <br />
    OR <br />
    **Content:** `{ message: "Error edit cashback range!", error: true }` <br />

### Delete Cashback
  Deletes the cashback ranges and returns json data about with deleted cashback ranges id.

* **URL** <br />
  /cashback/:id

* **Method** <br />
  `DELETE`

*  **URL Params** <br />
  **Required:** <br />
   `id=[string]`

* **Success Response** <br />
  * **Code:** 200 <br />
    **Content:** <br />
    ```
    {
      "id": "339b1e16-4c00-4894-8b81-7312db98e531"
    }
    ```
* **Error Response** <br />
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "Cashback range not found!", error: true }` <br />
    OR <br />

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Error delete cashback range!", error: true }` <br />
