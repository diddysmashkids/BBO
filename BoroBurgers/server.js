const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let orders = [];

app.get("/orders", (req, res) => res.json(orders));

app.post("/orders", (req, res) => {
    orders.push(req.body.order);
    res.json({ message: "Order added!" });
});

app.delete("/orders/:index", (req, res) => {
    orders.splice(req.params.index, 1);
    res.json({ message: "Order deleted!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));