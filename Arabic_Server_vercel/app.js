const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/mongoodb");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');
const https = require('https');
const colors = require("colors");
const { deleteFile } = require("./utils/cloudinary");

const PORT = process.env.PORT || 2200;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Import routes
const userRouter = require('./api/users/user');
const authRouter = require('./api/users/auth');
const adminRouter = require('./api/admin/admin');
const hotelsRouter = require('./api/hotels/hotels');
const paracticalinfoRouter = require('./api/paracticalinfo/paractical-info');
const doorsRouter = require('./api/doors/doors');
const miqatRouter = require('./api/miqats/miqats');
const toiletsRouter = require('./api/toilets/toilets');
const suggestionRouter = require('./api/suggestion/suggestion');
const sitenRouter = require('./api/sites/sites');
const toiletMadinaRouter = require('./api/toiletsMadina/toiletsMadina');
const whatsappRouter = require('./api/whatsappRoutes'); // WhatsApp-related routes

// Use routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/doors', doorsRouter);
app.use('/api/miqats', miqatRouter);
app.use('/api/toilets', toiletsRouter);
app.use('/api/toiletsMadina', toiletMadinaRouter);
app.use('/api/suggestion', suggestionRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/paratical-info', paracticalinfoRouter);
app.use('/api/sites', sitenRouter);
app.use('/api/whatsapp', whatsappRouter); // Add WhatsApp routes

// Serve static HTML files (if any)
app.use(express.static("public"));

// Default route
app.get('/', async (req, res) => {
  res.json({ message: `Server is running at port ${PORT}` });
});

// Self-ping functionality to keep the app alive
setInterval(() => {
  https.get(`${process.env.PUBLIC_URL}/status`, (res) => {
    console.log('Self-ping successful, keeping the app alive');
  }).on('error', (e) => {
    console.error(`Self-ping failed: ${e.message}`);
  });
}, 300000); // Ping every 5 minutes (300,000 milliseconds)

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`.green.underline);
  });
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
});
