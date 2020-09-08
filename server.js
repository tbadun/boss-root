const express = require('express');
const app = express();

module.exports = app;
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html


// Add middware for parsing request bodies here:

const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// This conditional is here for testing purposes:
if (!module.parent) {
    // Add your code to start the server listening at PORT below:
    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`)
    })
}