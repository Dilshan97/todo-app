/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */

import Todo from "./todo.model";
import mongoose from "mongoose";
import {IPagination} from "../common/common.interface";

const findById = (id: string | mongoose.Types.ObjectId) => {
    return Todo.findById(id);
}

const getPaginatedTodos = async (pagination: IPagination) => {
    const { page, limit, orderBy } = pagination as IPagination;

    const result = await Todo.aggregate([
        {
            $sort: {
                _id: orderBy === "desc" ? -1 : 1
            }
        },
        {
            $facet: {
                metadata: [{ $count: "totalElements" }],
                data: [
                    { $skip: (page - 1) * limit },
                    { $limit: limit },
                ],
            },
        }
    ]);

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