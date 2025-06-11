const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" })); // Allows all requests
app.use(bodyParser.json());

let orders = []; // Temporary storage for orders

// Get all orders
app.get("/orders", (req, res) => {
    res.json(orders);
});

// Add a new order
app.post("/orders", (req, res) => {
    if (!req.body.order || req.body.order.trim() === "") {
        return res.status(400).json({ error: "Order cannot be empty!" });
    }

    orders.push(req.body.order);
    res.json({ message: "Order added!", orders });
});

// Delete an order
app.delete("/orders/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index < 0 || index >= orders.length) {
        return res.status(404).json({ error: "Order not found!" });
    }

    orders.splice(index, 1);
    res.json({ message: "Order deleted!", orders });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
