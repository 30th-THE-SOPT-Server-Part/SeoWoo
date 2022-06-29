import { Router } from 'express';
import { body } from 'express-validator/check';
import MovieController from '../controllers/MovieController';
import auth from '../middleware/auth';
import Movie from '../models/Movie';
//const { body } = require("express-validator/check");

const router: Router = Router();

router.get('/', MovieController.getMovieBySearch);

router.post('/', [
    body('title').notEmpty(),
    body('director').notEmpty()
], MovieController.createMovie);


router.post('/:movieId/comment', [
    body('writer').notEmpty(),
    body('comment').notEmpty()
], MovieController.createMovieComment);

router.get('/:movieId', MovieController.getMovie);

router.put('/:movieId/comments/:commentId', [
    body('comment').notEmpty()
], auth, MovieController.updateMovieComment)


export default router;