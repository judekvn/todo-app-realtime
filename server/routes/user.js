import express from 'express';
import { userSignup, userLogin, getUser } from '../controllers/user.js';
import { auth } from '../controllers/auth';

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/get', auth, getUser);

export default router;