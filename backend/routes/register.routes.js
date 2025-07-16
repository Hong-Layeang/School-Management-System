import express from 'express';
import { register } from '../controllers/register.controllers.js';

const registerRoutes = express.Router();
registerRoutes.post('/', register);

export default registerRoutes;
