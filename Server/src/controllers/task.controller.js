import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import mongoose from "mongoose";
import { Task } from "../models/Task.models.js";


const createTask = asyncHandler(async (req, res) => {

    const { title, description,  priority, assignedTo } = req.body;
    const user = User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if (user.role !=="Manager") {
        
        throw new ApiError(400, "Unauthorized access");
    }
    if (!title) {
        throw new ApiError(400, "Title is required");
    }

    if (!description) {
        throw new ApiError(400, "Description is required");
    }

    if (!priority) {
        throw new ApiError(400, "Priority is required");
    }

    if (priority !== "Low" && priority !== "Medium" && priority !== "High") {
       
        throw new ApiError(400, "Invalid priority");
    }

    if (!assignedTo) {
        throw new ApiError(400, "AssignedTo is required");
    }

    if (!mongoose.isValidObjectId(assignedTo)) {
       
        throw new ApiError(400, "Invalid assignedTo");
        
    }

    const createdTask = await Task.create({
        title,
        description,
        priority,
        createdBy: user._id,
        assignedTo
    });
    return res.status(201).json(new ApiResponse(201, createdTask, "Task created successfully"));

});

const markasCompleted = asyncHandler(async (req, res) => {

    const user = User.findById(req.user?._id);
    if (!user) {
        
        throw new ApiError(400, "User not found");
    }

    if (user.role !=="Developer") {
        
        throw new ApiError(400, "Unauthorized access");
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
        throw new ApiError(400, "Task not found");
    }

    if (task.completed) {
        throw new ApiError(400, "Task already completed");
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
        completed: true
    }, { new: true });

    return res.status(200).json(new ApiResponse(200, updatedTask, "Task marked as completed successfully"));
});

const deletetask = asyncHandler(async (req, res) => {

    const user = User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(400, "User not found");
        
    }

    if (user.role !=="Manager") {
        
        throw new ApiError(400, "Unauthorized access");
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
        throw new ApiError(400, "Task not found");
    }

    await Task.findByIdAndDelete(req.params.id);

    return res.status(200).json(new ApiResponse(200, null, "Task deleted successfully"));

});

const gettask = asyncHandler(async (req, res) => {

    const user = User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(400, "User not found");
    }
    const task = await Task.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "assignedTo",
                foreignField: "_id",
                as: "assignedTo"
            }
        },
        {
            $addFields: {
                assignedTo: {
                    $first: "$assignedTo"
                }
            }
        },{
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdBy"
            }
        },
        {
            $addFields: {
                createdBy: {
                    $first: "$createdBy"
                }
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "taskid",
                as: "comments"
            }
        }
    ]);

    if (!task) {
        throw new ApiError(400, "Task not found");
    }

    return res.status(200).json(new ApiResponse(200, task, "Task retrieved successfully"));

});

const updatetask = asyncHandler(async (req, res) => {

    const user = User.findById(req.user?._id);

    const {title, description, priority, assignedTo} = req.body;

    if (!title) {
        throw new ApiError(400, "Title is required");
    }

    if (!description) {
        throw new ApiError(400, "Description is required");
        
    }

    if (!priority) {
        throw new ApiError(400, "Priority is required");
        
    }

    if (priority !== "Low" && priority !== "Medium" && priority !== "High") {
        throw new ApiError(400, "Invalid priority");   
    }

    if (!assignedTo) {
        throw new ApiError(400, "AssignedTo is required");  
    }

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if (user.role !=="Manager") {
        throw new ApiError(400, "Unauthorized access");
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
        throw new ApiError(400, "Task not found");
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description, priority, assignedTo }, { new: true });
    return res.status(200).json(new ApiResponse(200, updatedTask, "Task updated successfully"));
});


export { createTask, markasCompleted, deletetask, gettask, updatetask };

 






 


  