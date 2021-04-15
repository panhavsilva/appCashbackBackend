# API backend - Project Cashback
> Project Status: Developing :warning:

[![NPM](https://img.shields.io/badge/npm-V6.14.11-yellow)](https://www.npmjs.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Heroku](https://img.shields.io/badge/heroku-deployed-blueviolet)](https://www.heroku.com/)


## Usage
[https://backend-cashback.herokuapp.com/](https://backend-cashback.herokuapp.com/)

## Install
* Install dependencies `npm install`
## Running server
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
* PRODUCT
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
* ORDER
  * Register
  * Update
  * Delete
  * List all
  * Show one

## Deploy
This repository is ready to run inside Heroku.

---
## PRODUCTS

**Products List**
Returns json data about all products.

* **URL**
/products

* **Method:**
  `GET`

*  **URL Params**
None

* **Success Response:**
  * **Code:** 200 <br />
    **Content:**
    ```
    [{
      "id": "f71ce1c6-079d-43e4-88ab-b6ccde593168",
      "name": "product name1",
      "price": 14.48
      },
      {
      "id": "9366e349-0c3f-4300-b3b7-76a806b5e2aa",
      "name": "product name2",
      "price": 20.21
    }]
    ```
* **Error Response:**
  * **Code:** 400 NOT FOUND <br />
    **Content:** `{ message: "Error in the list of products!", error: true }`
