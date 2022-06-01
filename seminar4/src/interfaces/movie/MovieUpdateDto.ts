import mongoose from 'mongoose';

export interface MovieUpdateDto {
    title?: String;
    director?: String;
    startDate?: Date;
    story?: String;
    thumbnail?: String;
}