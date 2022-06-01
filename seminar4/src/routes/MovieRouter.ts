import { Router } from 'express';
//import { body } from 'express-validator';
import MovieController from '../controllers/MovieController';
const { body } = require("express-validator/check");

const router: Router = Router();

router.post(
    '/',[
        body('title').notEmpty().isLength({max:25}),
        body('director').notEmpty().trim(),
        body('startDate').notEmpty(),
        body('thumbnail').notEmpty(),
        body('story').notEmpty(),
    ], MovieController.createMovie,
);

//router.post('/', MovieController.createMovie);

router.get('/:movieId', MovieController.findMovieById);
router.put('/:movieId', MovieController.updateMovie);
router.delete('/:movieId', MovieController.deleteMovie);

export default router;