import {CategoryInfo} from "../category/CategoryInfo";

export interface BlogCreateDto {
    title: string;
    author: string;
    content: string;
    category?: CategoryInfo;
    tag?: string;
}