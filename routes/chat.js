import express from 'express';
import chatController from '../controllers/chat.js'

const route = express.Router();

route.post('/send', chatController.sendChat);
route.get('/get', chatController.getChat);
route.delete('/delete', chatController.deleteChat);

export default route;