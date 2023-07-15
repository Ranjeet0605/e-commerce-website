// insert a product so we can make create method for product 
// -- admin
const catchAsyncError = require("../middleware/catchAsyncError");
const productSchema = require("../models/productmodel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/userhandling");
exports.createProduct = async(req,res,next)=>{
   req.body.user = req.user.id;
   const product = await productSchema.create(req.body);
   res.status(200).json({
      success:true,
      product
   })
}
// get all products
exports.getallproduct = async(req,res,next)=>{
   const countproduct  = await productSchema.countDocuments();
const  resultPerPage = 5;
  const apifeatuers = new  ApiFeatures(productSchema.find(),req.query).search().filter().pagination(resultPerPage);
   const  products = await apifeatuers.query;
  
   if(!products){
      return next(new ErrorHandler("products not found",404));
   }
   res.status(200).json(
      {
         success:true,
         products,
         countproduct

      }
   )
}

// get single product ya product details
exports.getsingleProduct = async(req,res)=>{
   
   try{
      const productId = req.params.id.trim();

     const product = await productSchema.findById(productId);
     res.status(200).json(product)
   }
     catch(err){
       res.status(500).json(err)
     }

}
// update product -- admin
exports.updateProduct = async(req,res)=>{
   try{
      const productId = req.params.id.trim();
      const product =  await productSchema.findByIdAndUpdate(productId, req.body,{
         new:true,
         runValidators:true,
         useFindAndModify: false 
      });
      res.status(200).json(product);
   
   }catch(err){
      res.status(500).json(err);
   }
   }

   //Delete Product
   exports.deleteProduct = async(req,res)=>{
      try{
         const productId = req.params.id.trim();
       await productSchema.findByIdAndDelete(productId)
      res.status(200).json({message:"product has been deleted"})
   }catch(err){
     res.status(500).json(err);
   }

   }
   // create review or Update the review
   exports.createProductReview = catchAsyncError(async(req,res,next)=>{
      const {rating, comment, productId} = req.body;
      const review = {
         user: req.user._id,
         name:req.user.name,
         rating:Number(rating),
         comment,
      };
      const product = await productSchema.findById(productId)
      const isReviewed = product.reviews.find((rev)=> rev.user.toString()=== req.user._id.toString());
      if(isReviewed){
         product.reviews.forEach((rev)=>{
             if(rev.user.toString()=== req.user._id.toString())
             (rev.rating = rating), (rev.comment = comment);
         })
      }
      else{
         product.reviews.push(review);
         product.numOfReviews = product.reviews.length;
      }
      let avg = 0;
       product.rating = product.reviews.forEach((rev)=>{
         avg+=rev.rating;
       }) 
       product.rating = avg/ product.reviews.length;
       await product.save({validateBeforeSave: false});
       res.status(200).json({
         success: true
       })
   })

// get all reviews of product
 exports.getProductReviews =  catchAsyncError(async(req,res,next)=>{
   const product = await productSchema.findById(req.query.id);
   if(!product){
      return next(new ErrorHandler(`Product not found`,404))
   }
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    })
 })

 // delete Reviews 
 exports.deleteReviews = catchAsyncError(async(req,res,next)=>{
      const product = productSchema.findById(req.query.productId);
     if(!product){
      return next( ErrorHandler(`Product not found`,404))
     }
     const reviews = product.reviews.filter(
      (rev)=>rev._id.toString()!== req.query.id.toString()
     )
     let avg = 0;
      reviews.forEach((rev)=>{
         avg+= rev.rating;

      });
      const ratings = avg/reviews.length;
      const numOfReviews = reviews.length
      await product.findByIdAndUpdate(req.query.productId,{
         reviews,
         ratings,
         numOfReviews,
      },
      {new: true,
      runValidators: true,
      useFindAndModify:false,}
      )
      res.status(200).json({
         success: true,
      })
 })