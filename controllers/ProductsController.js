const fs = require('fs');
const data = require('../data.json');
const uuid = require('uuid');

module.exports = {
  list(req,res){
    return res.json(data.products);
  },
  post(req,res){
    const keys = Object.keys(req.body);

    for(key of keys){
      if(req.body[key] == ''){
        return res.json(createErrorMessage('Please, fill all fields!'));
      }
    }

    const {name, price} = req.body;
    const id = uuid.v4();
        
    const priceNumber = onlyNumber(price);

    if (priceNumber == '') {
      return res.json(createErrorMessage('Please, fill the price field with numbers only!'));
    }

    data.products = data.products.concat({
      id,
      name,
      price: priceNumber
    });

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) =>{
      if(err){ return res.json(createErrorMessage('Write file error!')); }
      return res.json(data.products);
    });
    
  },
  show(req,res){
    const {id} = req.params;

    if(!findProduct(id)){
      return res.json(createErrorMessage('Product not found!'));
    };

    return res.json(findProduct(id));
  },
  edit(req,res){
    const {id} = req.params;

    if(!findProduct(id)){
      return res.json(createErrorMessage('Product not found!'));
    }

    return res.json(findProduct(id));
  },
  put(req,res){
    const {id} = req.params;

    const foundProduct = findProduct(id);

    if(!foundProduct){
      return res.json(createErrorMessage('Product not found!'));
    }

    const index = data.products.findIndex((product) => { 
      return product.id == id 
    });

    const price = req.body.price || foundProduct.price;
    const priceNumber = onlyNumber(price);

    if (priceNumber == '') {
      return res.json(createErrorMessage('Please, fill the price field with numbers only!'));
    }
    
    const product = {
      ...foundProduct,
      ...req.body,
      id: id,
      price: priceNumber 
    };

    data.products[index] = product;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if(err){return res.json(createErrorMessage('Write error!'))}
      return res.json(product);
    })
  },
  delete(req,res){
    const {id} = req.params;

    if(!findProduct(id)){
      return res.json(createErrorMessage('Product not found!'));
    }

    const filterProducts = data.products.filter((product) => {
      return product.id != id;
    });

    data.products = filterProducts;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if(err){ return res.json(createErrorMessage('Write File Error!')); }
      return res.json({id:id});
    })
  }
}

function createErrorMessage(message) {
  return {message: message, error: true};
};

function findProduct(id){
 const results = data.products.find((product) =>{
    return product.id == id
  });
  return results;
};

function onlyNumber (price) {
  const priceString = String(price);
  const regex = /\D*/g;
  const priceNumber = Number( priceString.replace(regex, '') );

  return priceNumber; 
}