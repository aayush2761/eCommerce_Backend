const express=require('express');
const cors= require("cors");
require('./db/config');
const User=require("./db/User")
const Product= require("./db/Product")

// const Jwt=require('jsonwebtoken');
// const jwtKey='e-com';

const corsOptions = {
    origin: ['https://123ecommerce.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
};

const app=express();

app.use(express.json());
app.use(cors(corsOptions));

app.post("/register", async (req, resp) => {
  let user=new User(req.body);
  let result=await user.save();
  result=result.toObject();
  delete result.password;
 
    resp.send(result);


})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
                
                    resp.send(user)
                
                
            }
        else {
            resp.send({ result: "No User found" })
        }
    } else {
        resp.send({ result: "No User found" })
    }
});

app.post("/add-product",async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products",async (req, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Product found" })
    }
});

app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result)

    

})

    app.get("/product/:id",async (req, resp) => {
        let result = await Product.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ result: "No Record Found." })
        }
    })
 

    app.put("/product/:id",async (req, resp) => {
        let result = await Product.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        )
        resp.send(result)
    });


    app.get("/search/:key",async (req, resp) => {
        let result = await Product.find({
            "$or": [
                {
                    name: { $regex: req.params.key }  
                },
                {
                    company: { $regex: req.params.key }
                },
                {
                    category: { $regex: req.params.key }
                }
            ]
        });
        resp.send(result);
    });
    
    


    // function verifyToken(req, resp, next) {
    //     let token = req.headers['authorization'];
    //     if (token) {
    //         token = token.split(' ')[1]; // Extract token from "Bearer <token>"
    //         Jwt.verify(token, jwtKey, (err, valid) => {
    //             if (err) {
    //                 resp.status(401).send({ result: "Please provide a valid token" });
    //             } else {
    //                 next();  // Allow the request to continue
    //             }
    //         })
    //     } else {
    //         resp.status(403).send({ result: "Please add token with header" });
    //     }
    // }

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running and connected on port ${PORT}`);
});


