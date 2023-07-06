const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const auth = require("../middlewares/auth");
module.exports = router;

router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.json(allProducts);
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.post("/", express.json(), auth, async (req, res) => {
  const { productName, productImage, price, brandName, gender, type } =
    req.body;

  try {
    let product = { productName, productImage, price, brandName, gender, type };
    const createdProduct = await Product.create(product);
    res.json(createdProduct);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, {});
});
router.post("/:id/comments", express.json(), async (req, res) => {
  const { id } = req.params;
 const {comment, username} = req.body
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      $push: { comments: { text: comment, user: username } },
    },{new: true});

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json("Comment Added!")
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
    console.log(req.body.comment);
  }
});
router.get("/:id/comments", async (req,res) =>{
  const {id} = req.params
  try{
    const comments = await Product.findById(id, 'comments')
    if(!comments){
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(comments)
  }catch(error){
   console.log(error);
  }
})