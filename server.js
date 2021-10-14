import express from 'express';
import { getDatabase } from './index.js';

const getData = getDatabase();

const port = 8000;
const app = express();
app.use(express.static("public"));

app.get("/rooms", async(req, res) => {
    const rooms = await getDatabase();
    res.json(rooms);
});

app.listen(port, console.log(`Server started on ${port}`));