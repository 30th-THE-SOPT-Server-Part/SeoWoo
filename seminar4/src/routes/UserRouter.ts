import { Router } from "express";
import { UserController } from "../controllers";
//import { body } from "express-validator";
const { body } = require("express-validator/check");

const router: Router = Router();

// routes -> use(/user) -> post
router.post('/',
    [
        body("name").notEmpty().trim().isLength({min:2, max:15}),
        body("phone").notEmpty(),
        body("email").notEmpty().isEmail()
    ],
    UserController.createUser
);
router.put('/:userId',UserController.updateUser);
router.get('/:userId', UserController.findUserById);
router.delete('/:userId',UserController.deleteUser);
export default router;