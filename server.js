const express = require('express');
const app = express();
app.use(express.json());

let latestDistance = null;

app.post('/distance', (req, res) => {
    const { distance } = req.body;
    if (distance === undefined) {
        return res.status(400).json({ error: 'distance is required' });
    }
    latestDistance = distance;
    console.log(`Distance updated: ${distance}cm`);
    res.json({ success: true });
});

app.get('/distance', (req, res) => {
    res.json({ distance: latestDistance });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});