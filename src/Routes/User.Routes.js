import express from 'express';
import {createUser ,createAdmin,Login} from '../Controllers/User.controller.js';
import auth from '../Middleware/auth.middleware.js';
import Rbac from '../Middleware/Rbac.middleware.js';

let Router = express.Router();

Router.post("/admin",createAdmin);
Router.post("/user/:adminId",auth,Rbac(["Admin"]),createUser);
Router.post("/login", Login);


export default Router