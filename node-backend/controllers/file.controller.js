import { File } from '../models/file.model.js';
//Here we deal with file metadata only, the actual file is stored in the client system

export const createEntry = async (req, res) => {
    try {
        const { fileName, filePath, fileType, fileSize, author,currentIP, description } = req.body;
        const file = await File.create({ fileName, filePath, fileType, fileSize, author, description,currentIP });
        res.status(201).json({ id: file._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getEntries = async (req, res) => {
    try {
        const files = await File.find();
        res.status(200).json(files);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getEntry = async (req, res) => {
    const { id } = req.params;
    try {
        const file
            = await File.findById(id);
        res.status(200).json(file);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const searchEntries = async (req, res) => {
    try {
        const searchQuery = req.query.q; // Get the search query from the request
        console.log(searchQuery);
        if (!searchQuery) {
            return res.status(400).json({ error: 'Search query is required' });
        }
        // Perform a case-insensitive search on specified fields
        const results = await File.find({
            $or: [
                { fileName: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
                { fileType: { $regex: searchQuery, $options: 'i' } },
                { author: { $regex: searchQuery, $options: 'i' } }
            ]
        });

        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};