import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import MovieService from "../services/MovieService";
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";


/**
 * @router POST /movie
 * @desc Create Movie
 * @access Public
 */

const createMovie = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE))
    }
    const movieCreateDto: MovieCreateDto = req.body;

    try {
        const data = await MovieService.createMovie(movieCreateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_MOVIE_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}




/**
 * @route POST /movie/:movieId/comment
 * @desc Create Movie Comment
 * @access Public
 */
const createMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE))
    }

    const movieCommentCreateDto: MovieCommentCreateDto = req.body;
    const { movieId } = req.params;

    try {
        const data = await MovieService.createMovieComment(movieId, movieCommentCreateDto);
        if (!data) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_MOVIE_COMMENT_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route GET /movie/:movieId
 * @desc Get Movie By Movie Id
 * @access Public
 */
const getMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        const data = await MovieService.getMovie(movieId);
        if (!data) {
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_MOVIE_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route PUT /movie/:movieId/comments/:commentId
 * @desc update movie comment
 * @access Private
 */
const updateMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE))
    }

    const movieCommentUpdateDto: MovieCommentUpdateDto = req.body;
    const { movieId, commentId } = req.params;
    const userId = req.body.user.id;


    try {

        const data = await MovieService.updateMovieComment(movieId, commentId, req.body.user.id, movieCommentUpdateDto);
        if (!data) {
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_MOVIE_COMMENT_SUCCESS, data))
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }

}

/**
 * @route GET /movie?search=&?option=?page=
 * @desc GET Movie By Search
 * @access Public
 */
const getMovieBySearch = async (req: Request, res: Response) => {

    const page: number = Number(req.query.page || 1);

    if (req.query.search && req.query.option) {
        const { search, option } = req.query;
        const isOptionType = (option: string): option is MovieOptionType => {
            return ["title", "director", "title_director"].indexOf(option) !== -1;
        }
        if (!isOptionType(option as string)) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
        }

        try {
            const data = await MovieService.getMovieBySearch(page, search as string, option as MovieOptionType);
            res.status(statusCode.OK).send(util.success(statusCode.OK, message.SEARCH_MOVIE_SUCCESS, data));
        } catch (error) {
            console.log(error);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR))
        }
    }
    else {
        try {
            const data = await MovieService.getMovieBySearch(page);
            res.status(statusCode.OK).send(util.success(statusCode.OK, message.SEARCH_MOVIE_SUCCESS, data));
        } catch (error) {
            console.log(error);
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
        }

    }

}

export default {
    createMovie,
    createMovieComment,
    getMovie,
    updateMovieComment,
    getMovieBySearch
};