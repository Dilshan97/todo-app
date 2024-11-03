/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose from "mongoose";
import { promisify } from "util";
import { extname, join } from "path";
import { readdir, readFile } from "fs";
import { MongoMemoryReplSet } from "mongodb-memory-server";

let mongod: MongoMemoryReplSet = new MongoMemoryReplSet();

const connectToMemoryDatabase = async () => {
    mongod = await MongoMemoryReplSet.create({ replSet: { count: 3 } });

    const uri = mongod.getUri();
    const options = {
        dbName: "test-db",
    };
    await mongoose.connect(uri, options);
};

const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

const clearMemoryDatabase = async () => {
    const db = mongoose.connection.db;
    if (!db) return;
    const collections = await db.listCollections().toArray();
    for (const collection of collections) {
        await db.collection(collection.name).deleteMany({});
    }
};

const loadTestDataToMemoryDb = async () => {
    await clearMemoryDatabase();

    const folderPath = `${process.cwd()}/src/__tests__/test-data`;

    const readDirAsync = promisify(readdir);
    const dirFiles = await readDirAsync(folderPath);

    const jsonFiles = dirFiles.filter((file) => extname(file) === ".json");

    const db = mongoose.connection.db;
    if (!db) return;

    for (const file of jsonFiles) {
        const filePath = join(folderPath, file);

        const readFileAsync = promisify(readFile);
        const fileData = await readFileAsync(filePath, "utf-8");

        const collectionName = file.split(".json")[0];
        const parsedData: Array<any> = JSON.parse(fileData);

        const modifiedData = parseMongoDBDocument(parsedData);

        await db.collection(collectionName).insertMany(modifiedData);
    }
};

const parseMongoDBDocument = (data: any): any => {
    if (Array.isArray(data)) {
        return data.map(parseMongoDBDocument);
    } else if (typeof data === "object" && data !== null) {
        const parsedData: any = {};

        for (const key in data) {
            if (key === "$oid") {
                return new mongoose.Types.ObjectId(data[key]);
            } else if (key === "$date") {
                return new Date(data[key]);
            } else {
                parsedData[key] = parseMongoDBDocument(data[key]);
            }
        }

        return parsedData;
    }

    return data;
};

export default {
    connectToMemoryDatabase,
    clearMemoryDatabase,
    closeDatabase,
    loadTestDataToMemoryDb,
};