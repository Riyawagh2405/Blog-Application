require("dotenv").config();

const path = require("path");
const express= require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const Blog = require("./models/blog")

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkForAuthenticationCookies } = require("./middlewares/authentication");

console.log

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect("mongodb+srv://riyawagh7979:riyawagh7979@cluster0.1vynl.mongodb.net/blogify?retryWrites=true&w=majority&appName=Cluster0").then((e) => console.log("mongodb connected"));

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookies("token"));

app.use(express.static(path.resolve("./public")))

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home",{
    user : req.user,
    blogs: allBlogs,
  });
})

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, ()=> console.log(`server started at port ${PORT}`)); 