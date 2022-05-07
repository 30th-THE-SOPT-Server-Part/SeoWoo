import mongoose from "mongoose";
import { BlogInfo } from "../interfaces/blog/BlogInfo";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 30
    },
    author: {
        type: String,
        required: true,
        maxlength: 15
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        mainCategory: { type: String },
        subCategory: { type: String }
    },
    tag: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }

});

export default mongoose.model<BlogInfo & mongoose.Document>("Blog", BlogSchema);