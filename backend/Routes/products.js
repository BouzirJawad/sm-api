const express = require("express");
const Product = require("../models/Product.js");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newProduct = new Product({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            message: req.body.message
        });
        await newProduct.save();
        res.status(201).json({message: "product added successfully"});
    } catch (error) {
        res.status(500).json({error: "Failed to add product"});
    }
});

router.get("/", async (req, res) => {
    try {
        const products =  await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
});

router.get('/:id', async (req, res)=>{
    try {
        const messageByID = await Product.findById(req.params.id)
        if (!messageByID) {
            return res.status(404).json({error: 'Product not found'})
        }
        res.json(messageByID);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

router.delete('/:id', async (req, res)=>{
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({error: 'NO products to display'});
        } else {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({error: 'Product not found'});
            }
            res.json({message: 'Product deleted successfully'});
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});


module.exports = router;