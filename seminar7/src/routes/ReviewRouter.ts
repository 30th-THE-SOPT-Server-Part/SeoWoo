import { Router } from "express";
import ReviewController from "../controllers/ReviewController"
import auth from "../middleware/auth";
const { body } = require("express-validator/check");

const router: Router = Router();

router.post('/movies/:movieId', [
    body("title").notEmpty(),
    body("content").notEmpty(),
    body("writer").notEmpty()

], ReviewController.createReview);

router.get('/movies/:movieId', auth, ReviewController.getReviews);

export default router;