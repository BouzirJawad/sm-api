const express = require("express");
const Product = require("../models/Product.js");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            descreption: req.body.descreption,
            price: req.body.price,
            quantity: req.body.quantity
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

router.put('/:id', async (req, res)=>{
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({error: 'No product to update'});
        }
        else{
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                overwrite: true,
            });
            if (!product) {
                return res.status(404).json({error: 'Product not found'})
            }
            res.json(product);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
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