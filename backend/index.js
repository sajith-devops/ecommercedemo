// backend/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Your routes…
app.get('/', (req, res) => res.send('API running!'));
app.get('/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});
app.post('/products', async (req, res) => {
  const { name, price } = req.body;
  const { data, error } = await supabase
    .from('products')
    .insert([{ name, price }])
    .select();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// **Export** the app for testing
module.exports = app;

// **Only** start listening when invoked directly (e.g. `node index.js`)
if (require.main === module) {
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
}
