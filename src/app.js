const express = require("express");
const app = express();
require("./db/conn");
const port = process.env.PORT || 5500;
app.get("/",(req, res) =>
{
    res.send("hello from Medisearch")
});
app.listen(port, ()=>
{
    console.log(`server is running at port no ${port}`);
})
