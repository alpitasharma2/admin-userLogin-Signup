const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const app = express();
const collection = require("./src/config");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine','ejs');
// use ejs as the view engine.
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.get("/",(req,res) => {
    res.render("login");
})

app.get("/signup",(req,res) => {
    res.render("signup");
})

app.post("/signup", async (req, res) => {
    try {
        const{username,password} = req.body;
        console.log("Form Data:", req.body); // Log the form data

        if(!username || !password)
        {
            return res.render("signup", { errorMessage: "All fields are required." });
            console.log("All fields are required.");
        }

        if(password.length<8)
        {
            return res.render("signup", { errorMessage: "password must have 8 chars" });
        }

        const existingUser = await collection.findOne({name:username});
        if(existingUser)
        {
            return res.render("signup", { errorMessage: "Username already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = {
            name: username,
            password: hashedPassword
        };

        // Save user to the database
        const userdata = await collection.create(data);
        console.log("User created:", userdata);
        res.redirect("/"); // Redirect to login or another page upon success
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("An error occurred during signup. Please try again.");
    }
});

const port = 7000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
console.log("Views directory path:", path.join(__dirname, "views"));
