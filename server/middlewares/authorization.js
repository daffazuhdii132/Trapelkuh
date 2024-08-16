const { User, Product } = require("../models");

async function authorization(req, res, next){
  try {
    const {role, id} = req.user
    const productId = req.params.id
    // console.log(req);

    if(req.route.path === "/add-user" && role !== "Admin"){
      throw {name: "Forbidden"}
    }else if(req.route.path === "/add-user" && role === "Admin"){
      next()
      
    }else{
      let product = await Product.findByPk(productId)
      if(!product){
        throw {name: "NotFound"}
      }else{
        if(role === "Admin"){
          next()
        }else{
          if(product.authorId !== id){
            throw {name: "Forbidden"}
          }else{
            next()
          }
        }
      }
    }

    
    
  } catch (error) {
    next(error)
    
  }
}
module.exports = authorization
