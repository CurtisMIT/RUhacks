const express = require('express');
const path = require('path');


const app = express();


// Init Middleware: TODO 





app.use(express.json({ extended: false, limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));