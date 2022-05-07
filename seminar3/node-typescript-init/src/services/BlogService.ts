import { BlogCreateDto } from "../interfaces/blog/BlogCreateDto";
import { BlogResponseDto } from "../interfaces/blog/BlogResponseDto";
import { BlogUpdateDto } from "../interfaces/blog/BlogUpdateDto";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import Blog from "../models/Blog";

const createBlog = async(blogCreateDto: BlogCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const blog = new Blog({
            title: blogCreateDto.title,
            author: blogCreateDto.author,
            content: blogCreateDto.content,
            category: blogCreateDto.category,
            tag: blogCreateDto.tag
        });

        await blog.save();

        const data = {
            _id: blog.id
        };

        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateBlog = async(blogId: string, blogUpdateDto: BlogUpdateDto) => {
    try{
        await Blog.findByIdAndUpdate(blogId, blogUpdateDto);
    
    } catch(error){
        console.log(error);
        throw error;
    }
}

const findBlogById = async (blogId: string):Promise<BlogResponseDto | null> => {
    try{
        const blog = await Blog.findById(blogId);
        if(!blog){
            return null;
        }
        return blog;
    } catch(error){
        console.log(error);
        throw error;
    }
}

const deleteBlog = async(blogId: string): Promise<void> => {
    try{
        await Blog.findByIdAndDelete(blogId);

    }catch(error){
        console.log(error);
        throw error;
    }
}

export default{
    createBlog,
    updateBlog,
    findBlogById,
    deleteBlog
}