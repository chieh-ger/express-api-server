const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const chatRoutes = require('./routes/chat');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h3>DB API</h3>');
});
app.use(express.json());
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);

app.listen(process.env.PORT || 3200, () => {
    console.log('Connected on port 3200');
})
