const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

module.exports = app;
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
// const corsOptions = {
//   origin: '',
//   optionsSuccessStatus: 200
// }

app.use(cors());

app.use(bodyParser.json());

const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// This conditional is here for testing purposes:
if (!module.parent) {
    // Add your code to start the server listening at PORT below:
    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`)
    })
}