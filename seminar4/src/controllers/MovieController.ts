import express, {Request, Response} from "express";
import { validationResult } from "express-validator";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import MovieService from "../services/MovieService";


/**
 * @router POST /movie/:movieId
 * @desc Create Movie
 * @access Public
 */

const createMovie = async(req: Request, res: Response) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE))   
    }
    const movieCreateDto: MovieCreateDto = req.body;
    
    try{
        const data = await MovieService.createMovie(movieCreateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_MOVIE_SUCCESS, data));
    } catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route GET /movie/:movieId
 * @desc READ Movie
 * @access Public
*/
 const findMovieById = async (req:Request, res:Response) => {
    const { movieId } = req.params;

    try{
        const data = await MovieService.findMovieById(movieId);

        if(!data){
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_MOVIE_SUCCESS, data));

    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}


/**
 * @route PUT /movie/:movieId
 * @desc Update Blog
 * @access Public
 */
 const updateMovie = async(req: Request, res: Response) => {
    const movieUpdateDto: MovieUpdateDto = req.body;
    const { movieId } = req.params;
    
    try{
        await MovieService.updateMovie(movieId, movieUpdateDto);
        res.status(statusCode.NO_CONTENT).send();

    } catch (error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route DELETE /movie/:movieId
 * @desc Delete Movie
 * @access Public
 */
const deleteMovie = async (req: Request, res: Response) => {
    const {movieId} = req.params;
    try{
        await MovieService.deleteMovie(movieId);
        res.status(statusCode.NO_CONTENT).send(); //204

    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));

    }
}

export default { 
    createMovie, 
    updateMovie,
    findMovieById,
    deleteMovie
};