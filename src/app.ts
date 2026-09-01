import express from 'express';
import { json } from 'body-parser';
import { setRoutes } from './routes/instagram.routes';
import { config } from './config/env';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(express.urlencoded({ extended: true }));

setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});