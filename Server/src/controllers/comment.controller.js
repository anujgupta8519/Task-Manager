import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import { Task } from "../models/Task.models.js";
import { Comment } from "../models/Comment.models.js";

const createComment = asyncHandler(async (req, res) => {

    const { taskId, comment } = req.body;
    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if (user.role !=="Developer" && user.role !=="Manager") {
        throw new ApiError(400, "Unauthorized access");

    }

    if (!taskId) {
        throw new ApiError(400, "TaskId is required");
    }

    if (!comment) {
        throw new ApiError(400, "Comment is required");
    }
    const task = await Task.findById(taskId);

    if (!task) {
        throw new ApiError(400, "Task not found");
    }
    
    if ((task.assignedTo.toString() === user._id.toString()) || (task.createdBy.toString() === user._id.toString())) {

        if (task.completed) {
            throw new ApiError(400, "Task already completed");
        }
    
    
        const createdComment = await Comment.create({
            comment,
            commentBy: user._id,
            taskid : taskId
    
        });
        task.comments.push(createdComment);
        await task.save();
    
        
    
    
        return res.status(201).json(new ApiResponse(201, createdComment, "Comment created successfully"));
        
    }else{
        throw new ApiError(400, "Unauthorized access");
    }

 




})

const deleteComment = asyncHandler(async (req, res) => {

    const { taskId, commentId } = req.body;
    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if (!taskId) {
        throw new ApiError(400, "TaskId is required");
    }

    if (!commentId) {
        throw new ApiError(400, "CommentId is required");
    }

    const task = await Task.findById(taskId);

    if (!task) {
        throw new ApiError(400, "Task not found");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(400, "Comment not found");
    }

    
    if (user._id.toString() !== comment.commentBy.toString()) {
        throw new ApiError(400, "Unauthorized access");
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    task.comments.pull(commentId);
    await task.save();

    return res.status(200).json(new ApiResponse(200, deletedComment, "Comment deleted successfully"));



})


export { createComment, deleteComment }

 