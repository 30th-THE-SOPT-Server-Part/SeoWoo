import mongoose from "mongoose";

export interface MovieCreateDto {
    title: String;
    director: String;
    startDate: Date;
    story: String;
    thumbnail : String;
}