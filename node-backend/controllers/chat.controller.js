import {Chat} from "../models/chats.model.js";
import {Message} from "../models/messages.model.js";

export const createChat = async (req, res) => {
    try {
        const { participants } = req.body;
        const chat = await Chat.create({ participants });
        res.status(201).json({ id: chat._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getChats = async (req, res) => {
    try {
        const chats = await Chat.find();
        res.status(200).json(chats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getChat = async (req, res) => {
    const { id } = req.params;
    try {
        const chat = await Chat.findById(id);
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMessage = async (req, res) => {
    try {
        const { chatId, sender, text } = req.body;
        const msg = await Message.create({ chatId, sender, text });
        res.status(201).json({ id: msg._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await Message.find({ chatId });
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}