import express, {Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { BlogCreateDto } from "../interfaces/blog/BlogCreateDto";
import BlogService from "../services/BlogService";
import { BlogUpdateDto } from "../interfaces/blog/BlogUpdateDto";


/**
 * @route POST /blog
 * @desc Create User
 * @access Public
 */
 const createBlog = async(req: Request, res: Response) => {
    const blogCreateDto: BlogCreateDto = req.body;
    

    try{
        const data = await BlogService.createBlog(blogCreateDto);
        console.log(data);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_BLOG_SUCCESS, data ));

    } catch(error){
        console.log(error);
        // 서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
} 

/**
 * @route PUT /blog/:blogId
 * @desc Update Blog
 * @access Public
 */
const updateBlog = async(req: Request, res: Response) => {
    const blogUpdateDto: BlogUpdateDto = req.body;
    const { blogId } = req.params;
    
    try{
        await BlogService.updateBlog(blogId, blogUpdateDto);
        res.status(statusCode.NO_CONTENT).send();

    } catch (error){
        console.log(error);
        // 서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route GET /blog/:blogId
 * @desc READ Blog
 * @access Public
 */
const findBlogById = async (req:Request, res:Response) => {
    const {blogId} = req.params;
    try{
        const data = await BlogService.findBlogById(blogId);
        if(!data){
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_BLOG_SUCCESS, data));

    }catch(error){
        console.log(error);
        // 서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route DELETE /blog/:blogId
 * @desc Delete Blog
 * @access Public
 */
const deleteBlog = async (req: Request, res: Response) => {
    const {blogId} = req.params;
    try{
        await BlogService.deleteBlog(blogId);
        res.status(statusCode.NO_CONTENT).send(); //204

    }catch(error){
        console.log(error);
        // 서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));

    }
}
export default {
    createBlog,
    updateBlog,
    findBlogById,
    deleteBlog
}