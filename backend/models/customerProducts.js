const mongoose  = require('mongoose');
const { nodeModuleNameResolver } = require('typescript');

const customerProductsSchema = mongoose.Schema({
  customerName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addCustomers",
    require: true,
  },
  productList: [ {
    productName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addProducts",
      require: true
    },
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addProducts",
      require: false
    },
    productQuantity: {
      type: Number,
      require: false
    },
    productWeight: {
      type: Number,
      require: false
    },
    productUnit: {
      type: String,
      require: false
    },
    productPrice: {
      type: Number,
      require: true
    }
  }
  ],
  productSaleTotal: {
    type: Number,
    require: true
  }
});

module.exports = mongoose.model('customerProducts', customerProductsSchema);
