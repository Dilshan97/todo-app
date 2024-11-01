/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose, { Document } from "mongoose";

interface ITodo {
    user: string | mongoose.Types.ObjectId;
    title: string;
    description: string;
    priority: string;
    dueDate: Date;
    status: string;
}

interface ITodoModel extends ITodo, Document { }

interface ITodoCreateSanitizedInputs {
    title: string;
    description: string;
    priority: string;
    dueDate: Date;
}

interface ITodoUpdateSanitizedInputs {
    title: string;
    description: string;
    priority: string;
    dueDate: Date;
    status: string;
}

interface ITodoSanitizedResult {
    keyword: string;
    status: string;
    sortBy: string;
}

export {
    ITodo,
    ITodoModel,
    ITodoCreateSanitizedInputs,
    ITodoUpdateSanitizedInputs,
    ITodoSanitizedResult
}