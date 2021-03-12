const fs = require('fs');
const data = require('../data.json');

module.exports = {
  create(req,res){
    return res.json({ message: 'Product create!'});
  },
  post(req,res){
    const keys = Object.keys(req.body);

    for(key of keys){
      if(req.body[key] == ''){
        return res.json({ message : 'Please, fill all fields!' });
      }
    }

    let {name, price} = req.body;
    let id = Number(data.products.length + 1);

    data.products.push({
      id,
      name,
      price
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
      if(err){ return res.json({message : 'Write file error!' }); }
      return;
    });

    res.json(data.products);
  },
  show(req,res){
    const {id} = req.params;
    const foundProduct = data.products.find( function(product){
      return product.id == id;
    });

    if(!foundProduct){
      return res.json({ message : 'Product not found!'});
    }

    return res.json(foundProduct);
  }
}