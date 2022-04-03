const mongoose = require('mongoose');

const addCustomerSchema = mongoose.Schema({
  customerName: {
    type: String,
    require: true
  },
  customerPhoneNumber: {
    type: String,
    require: true
  },
  additionalCustomerPhoneNumber: {
    type: String,
    require: true
  },
  customerTower: {
    type: String,
    require: false
  },
  customerAddress: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('addCustomers', addCustomerSchema);
