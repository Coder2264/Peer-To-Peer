import {Router} from 'express';
const router= Router();

import {createEntry, getEntries, getEntry, searchEntries} from '../controllers/file.controller.js';

const testFunction = (req,res)=>{
    res.send('Test function');
}

router.route('/create').post(createEntry);
router.route('/get').get(getEntries);
router.route(`/search`).get(searchEntries);
router.route('/:id').get(getEntry);
export default router;