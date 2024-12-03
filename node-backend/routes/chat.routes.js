import { getChat, getChats, getMessages, createChat, createMessage } from "../controllers/chat.controller.js";

import { Router } from 'express';
const router = Router();

const testFunction = (req,res)=>{
    res.send('Test function');
}

router.route('/create').post(createChat);
router.route('/').get(getChats);
router.route('/:id').get(getChat);
router.route('/:chatId/messages').get(getMessages);
router.route('/messages/create').post(createMessage);

export default router;