const express = require("express");
const cors = require("cors");
const Utils = require("./Utils");

const app = express();
const PORT = 3005;

app.use(cors());

app.get("/home", (req,res) => {
    Utils.getData("./ShopData//Home/DailyOffer.json")
            .then(data => res.send(data))
            .catch(err => res.send(err));
})
app.get("/laptops",(req,res) => {
    Utils.getData("./ShopData/Laptops/Laptops.json")
        .then(data => res.send(data))
        .catch(err => res.send(err));
})
app.get("/mobiles", (req,res) => {
    Utils.getData("./ShopData/Mobiles/Mobiles.json")
       .then(data => res.send(data))
       .catch(err => res.send(err));
})
app.get("/components", (req,res) => {
    Utils.getData("./ShopData/Components/Components.json")
       .then(data => res.send(data))
       .catch(err => res.send(err));
})
app.get("/monitors", (req,res) => {
    Utils.getData("./ShopData/Monitors/Monitors.json")
      .then(data => res.send(data))
      .catch(err => res.send(err));
})
app.get("/network", (req,res) => {
    Utils.getData("./ShopData//Networking/Network.json")
      .then(data => res.send(data))
      .catch(err => res.send(err));
})
app.get("/tablets",(req, res) => {
    Utils.getData("./ShopData/Tablets/Tablets.json")
      .then(data => res.send(data))
      .catch(err => res.send(err));
})
app.get("/data", (req,res) => {
    Utils.getData("./ShopData/Data.json")
      .then(data => res.send(data))
      .catch(err => res.send(err));
})

app.listen(process.env.PORT || PORT, () => console.log(`listening on port ${PORT}`));