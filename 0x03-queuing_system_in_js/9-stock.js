import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const port = 1245;

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Array of products
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

// Function to get an item by its ID
// const getItemById = (id) => listProducts.find((item) => item.itemId === id);
function getItemById(id) {
  for (let item of listProducts) {
    if (item["itemId"] === id) return item;
  }
}

// Route to get the list of products
app.get('/list_products', (req, res) => {
  const productList = listProducts.map((item) => ({
    itemId: item.itemId,
    itemName: item.itemName,
    price: item.price,
    initialAvailableQuantity: item.initialAvailableQuantity,
  }));

  res.json(productList);
});

// Function to reserve stock by item ID
const reserveStockById = async (itemId, stock) => {
  await setAsync(itemId, stock);
};

// Async function to get the current reserved stock by item ID
const getCurrentReservedStockById = async (itemId) => {
  const reservedStock = await getAsync(itemId);
  return reservedStock;
};

// Route to get product details by item ID
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    return res.json({ status: 'Product not found' });
  }

  const currentQuantity = await getCurrentReservedStockById(itemId);

  res.json({
    itemId: item.itemId,
    itemName: item.itemName,
    price: item.price,
    initialAvailableQuantity: item.initialAvailableQuantity,
    currentQuantity: currentQuantity,
  });
});

// Route to reserve a product by item ID
app.get("/reserve_product/:itemId", (req, res) => {
  let item = getItemById(Number(req.params.itemId));
  if (!item) res.json({ status: "Product not found" });
  if (item) {
    if (item["initialAvailableQuantity"] <= 1)
      res.json({ status: "Not enough stock available", itemId: item["itemId"] });
    reserveStockById(item["itemId"], 1);
    res.json({ status: "Reservation confirmed", itemId: item["itemId"] });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

