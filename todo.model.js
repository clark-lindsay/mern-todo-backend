import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const Todo = new Schema({
    description: {
        type: String
    },
    responsible: {
        type: String
    },
    priority: {
        type: Number
    },
    completed: {
        type: Boolean
    }
});