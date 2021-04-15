# API backend - Project Cashback
> Status do Projeto: Developing :warning:

[![NPM](https://img.shields.io/npm/v/@fdaciuk/use-timer.svg)](https://www.npmjs.com/package/@fdaciuk/use-timer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)]


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

### Features

*PRODUCT
  * Register
  * Update
  * Delete
  * List all
  * Show one
* Cashback
  * Register
  * Update
  * Delete
 * List all
* Order
  * Register
  * Update
  * Delete
  * List all
  * Show one

## Route description
As descrições são opcionais, mas se você quiser adicioná-las, crie um comentário php sobre cada rota
```
/**
 * @description Show the home page of the site
 */
Route::get('/home', 'HomeController@index') -> name('home.index');
```

### Resources routes
As descrições nas rotas de tipo de recurso são identificadas por seu método no controlador.
```
/**
 * @index Mostra a vista principal
 * @create Mostre a vista para criar uma foto
 * @store Salvar uma foto no banco de dados
 * @edit Mostre a vista para editar uma foto
 * @update Atualizar dados de fotos no banco de dados
 * @destroy Excluir uma foto no banco de dados
 */
Route::resource('photos', 'PhotoController');
```

## Params
Os parâmetros de rota são definidos com, você pode usar param em rotas de tipo de recurso.
```
/**
 * @description Baixe a foto com a identificação da foto.
 * @param id ID da foto no banco de dados.
 */
Route::get('/photo/{id}/download', 'PhotoController@download');
```

## Deploy
This repository is ready to run inside Heroku.
