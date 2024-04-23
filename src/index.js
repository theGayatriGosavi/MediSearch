const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 5500;
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));



mongoose.connect('mongodb+srv://thegayatrigosavi:CwOpC07E9y4hzVk9@cluster0.wnlaetb.mongodb.net/?retryWrites=true&w=majority', {

useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to DB");
})
.catch(err => {
  console.error("Error connecting to database:", err);
});

// USer Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

// Create a user model
const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Handle POST request for signup
app.post("/signup.html", async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;

  // Create a new user object
  var newUser = new User({
    email: email,
    password: password,
    name: name
  });

  try {
    // Save the new user to the database
    await newUser.save();
    console.log("User registered successfully");
    res.redirect('http://127.0.0.1:5500/public/Index_after_login.html'); // Send a success response
  } catch (err) {
    console.error("Error saving user to database:", err);
    res.status(500).send("Error saving user to database.");
  }
});

app.post("/login.html", async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  try {
    // Find the user in the database
    const user = await User.findOne({ email: email, password: password });

    
    if (user) {
      // User found
      res.redirect('http://127.0.0.1:5500/public/Index_after_login.html'); 
    } else {
      // User not found, handle failed login
      res.status(401).send("Invalid credentials"); // Send an unauthorized status code and message for failed login
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Error during login");
  }
});