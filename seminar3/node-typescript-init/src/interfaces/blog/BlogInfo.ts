import { CategoryInfo } from "../category/CategoryInfo";

export interface BlogInfo {
    title: string;
    author: string;
    content: string;
    category: CategoryInfo;
    tag: string;
}