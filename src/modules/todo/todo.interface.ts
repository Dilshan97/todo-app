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
    status: string;
}

interface ITodoModel extends ITodo, Document { }

interface ITodoCreateSanitizedInputs {
    title: string;
    description: string;
    priority: string;
}

interface ITodoUpdateSanitizedInputs {
    title: string;
    description: string;
    priority: string;
    status: string;
}

export {
    ITodo,
    ITodoModel,
    ITodoCreateSanitizedInputs,
    ITodoUpdateSanitizedInputs
}