import mongoose from 'mongoose';

export const Todo = new mongoose.Schema({
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