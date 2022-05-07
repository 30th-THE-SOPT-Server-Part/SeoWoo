import { CategoryInfo } from "../category/CategoryInfo";


export interface BlogUpdateDto {
    title?: string;
    author?: string;
    content?: string;
    category?: CategoryInfo;
    tag?: string;
}