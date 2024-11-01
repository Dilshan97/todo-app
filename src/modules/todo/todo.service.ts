/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import Todo from "./todo.model";
import mongoose from "mongoose";
import {constants} from "../constants";
import {IPagination} from "../common/common.interface";
import {ITodoSanitizedResult} from "./todo.interface";

const findById = (id: string | mongoose.Types.ObjectId) => {
    return Todo.findById(id);
}

const getPaginatedTodos = async (
    pagination: IPagination,
    userId: string | mongoose.Types.ObjectId,
    sanitizedResult: ITodoSanitizedResult
) => {

    const { page, limit } = pagination as IPagination;
    const { keyword, sortBy, status } = sanitizedResult as ITodoSanitizedResult;

    let queryObj: any = {};
    let sortObj: any = {};
    let pipeline: any[] = [];

    //filter by keyword
    if (keyword){
        queryObj.$or = [
            {
                title: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: keyword,
                    $options: "i",
                },
            },
        ];
    }

    //filter by status
    if (status){
        queryObj.status = {
            $eq: status,
        };
    }

    pipeline.push({
        $match: {
            ...queryObj,
            user: {
                $eq:  new mongoose.Types.ObjectId(userId)
            }
        }
    });

    //sort
    if (sortBy){
        if (sortBy === constants.TODO.SORT_BY.PRIORITY_DESC || sortBy === constants.TODO.SORT_BY.PRIORITY_ASC) {
            pipeline.push({
                $addFields: {
                    priorityOrder: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$priority", "high"] }, then: 1 },
                                { case: { $eq: ["$priority", "medium"] }, then: 2 },
                                { case: { $eq: ["$priority", "low"] }, then: 3 },
                            ],
                            default: 4,
                        }
                    }
                }
            });
            sortObj = { priorityOrder: sortBy === constants.TODO.SORT_BY.PRIORITY_DESC ? -1 : 1 };
        }
        else if (sortBy === constants.TODO.SORT_BY.DUE_DATE_DESC || sortBy === constants.TODO.SORT_BY.DUE_DATE_ASC) {
            sortObj = { dueDate: sortBy === constants.TODO.SORT_BY.DUE_DATE_DESC ? -1 : 1 };
        }

        pipeline.push({
            $sort: sortObj
        });
    }

    pipeline.push({
        $facet: {
            metadata: [{ $count: "totalElements" }],
            data: [
                { $skip: (page - 1) * limit },
                { $limit: limit },
            ],
        },
    });

    const result = await Todo.aggregate(pipeline);

    const content = result[0].data;
    const totalElements = result[0]?.metadata[0]?.totalElements || 0;

    return {
        content,
        totalElements,
        totalPages: Math.ceil(totalElements / limit),
    };
};

export default {
    findById,
    getPaginatedTodos
}