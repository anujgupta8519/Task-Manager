import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: true
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    taskid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true

    }

},

    {
        timestamps: true

    })


export const Comment = mongoose.model('Comment', commentSchema);

