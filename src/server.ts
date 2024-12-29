import express from 'express';
import { setupWebSocket } from './websocket';

const app = express();

setupWebSocket(app);

app.listen(process.env.PORT);