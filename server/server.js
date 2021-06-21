const express = require('express');
const path = `${__dirname}/build`;
const app = express();
const PORT = 3000;
const history = require('connect-history-api-fallback');

app.use(express.static(path));
app.use(history());
app.use(express.static(path));
app.get('/', (req, res) => {
    res.sendFile(`${path}/index.html`);
});
app.get('/api/other', async (req, res) => {
    try {
        const other = {
            value: "Json with data"
        };
        res.send(other);
    } catch (err) {
        res.send(err);
    }
});
app.listen(PORT, () => {
    console.log(`Running on port 3000`);
});