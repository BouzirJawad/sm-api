const express = require("express");
const mongoose = require("mongoose");
const productsRoutes = require("./Routes/products.js");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/stock').then(()=>{
    console.log('Connected to mongoDB');
}).catch((err)=>console.log(err));

app.use("/api/products", productsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});