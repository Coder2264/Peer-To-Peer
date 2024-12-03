import {Router} from 'express';
const router= Router();
import {register, login } from '../controllers/user.controller.js';

const testFunction = (req,res)=>{
    res.send('Test function');
}

router.route('/register').post(register);
router.post('/login', login);

export default router;