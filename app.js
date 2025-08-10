import express from 'express';
const app = express();
app.use(express.json());

const VERIFY_TOKEN = 'MonitorMarketSecret123';

// Handle GET request for webhook verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Handle POST request for webhook events
app.post('/webhook', (req, res) => {
  console.log('Webhook event received:', req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
