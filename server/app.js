const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.listen(3000, () => 
    console.log(`Server started at port 3000`)
);