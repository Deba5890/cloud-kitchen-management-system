
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/user", profileRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);



app.get("/",(req,res)=>{

    res.send("Cloud Kitchen API Running");

});

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});