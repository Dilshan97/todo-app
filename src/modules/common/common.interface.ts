/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
interface IPagination {
    page: number;
    limit: number;
    orderBy: "asc" | "desc";
}

interface IPaginationResponse {
    content: any;
    totalElements: number;
    totalPages: number;
}

interface IStringDictionary {
    [index: string]: string | number;
}

export { IPagination, IStringDictionary, IPaginationResponse };
