const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://thegayatrigosavi:CwOpC07E9y4hzVk9@cluster0.wnlaetb.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true
}).then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.log(`No connection: ${e.message}`);
});
