const mongoose = require('mongoose');

const addProductsSchema = mongoose.Schema({
  productName: {
    type: String,
    require: true
  },
  productType: {
    type: String,
    require: false
  },
  productSeller: {
    type: String,
    require: false
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true
  }
});

module.exports = mongoose.model('addProduct', addProductsSchema);
