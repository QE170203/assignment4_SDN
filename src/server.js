const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = "mongodb+srv://assignment1:123123123@thucluster0.9hej0.mongodb.net/assignment4";

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));

// Information Route
app.get('/info', (req, res) => {
    res.json({
        data: {
            fullName: "Nguyen Thi Van Thu",
            studentCode: "QE170203"
        }
    });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
