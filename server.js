const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "*" })); // Allows requests from any frontend

let orders = [];
let orderCounter = 1; // Ensures unique order numbers that don't reset

// ✅ Get all orders
app.get("/orders", (req, res) => {
    res.json(orders);
});

// ✅ Add a new order
app.post("/orders", (req, res) => {
    const { item, price } = req.body;

    if (!item || item.trim() === "" || typeof price !== "number") {
        return res.status(400).json({ error: "Invalid order or price!" });
    }

    let newOrder = { id: orderCounter++, item, price };
    orders.push(newOrder);
    res.json({ message: "Order added!", order: newOrder });
});

// ✅ Delete an order by ID
app.delete("/orders/:id", (req, res) => {
    const orderId = parseInt(req.params.id);
    orders = orders.filter(order => order.id !== orderId);
    res.json({ message: `Order #${orderId} deleted!` });
});

// ✅ Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
