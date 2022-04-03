const AddProduct = require('../models/addProducts');

exports.createProduct = (req,res,next) => {
  const addProduct = new AddProduct({
    productName: req.body.productName,
    productType: req.body.productType,
    productSeller: req.body.productSeller,
    creator: req.userData.userId
  });
  addProduct.save().then(createdProduct => {
    res.status(201).json({
      message: 'Product added successfully',
      product: {
        ...createdProduct,
        id: createdProduct._id
      }
    });
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: "creating a product failed"
    })
  });
};

exports.getProducts = (req,res,next) => {
  let fetchedProducts;
  console.log(req.params.customerId);
  AddProduct.find({creator: req.params.customerId})
  .then(document => {
    fetchedProducts = document;
    console.log(document);
    return AddProduct.count();
  }).then(count => {
    res.status(200).json({
      message: 'Products fetched successfully',
      products: fetchedProducts,
      maxProducts: count
    });
  }).catch(error => {
    res.status(200).json({
      message: "Fetching posts failed!"
    });
  });
};

exports.deleteProducts = (req,res,next) => {
  AddProduct.deleteOne({_id: req.params.productId})
  .then(result => {
    res.json(200).json({
      message: 'Product successfully deleted',
    });
  }).catch(error => {
    res.json(500).json({
      message: 'failed to delete product',
    })
  });
};

exports.editProducts = (req,res,next) => {
  console.log('sdsmdsk' , req.body);
  console.log('creatorname' , req.userData.userId);
  const addProd = new AddProduct({
    _id: req.body.id,
    productName: req.body.productName,
    productType: req.body.productType,
    productSeller: req.body.productSeller,
    creator: req.userData.userId,
  });
  AddProduct.updateOne({_id: req.body.id, creator: req.userData.userId}, addProd)
  .then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
    // res.status(200).json({
    //   message: 'updated successfully',
    //   prods: {
    //     ...result
    //   }
    // });
  })
  .catch(error => {
    res.status(400).json({
      message: 'updated successfully',
      prods: {
        ...result
      }
    });
  })
}
