/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { RedisClientType, createClient } from "redis";

class RedisConnection {
    private static _instance: RedisClientType<any> | null = null;

    public constructor() { }

    private async initialize() {
        let url = process.env.REDIS_URL as string;
        RedisConnection._instance = createClient({ url });
        await RedisConnection._instance
            .on("connect", () => {
                console.log("CLIENT CONNECTED TO REDIS");
            })
            .on("ready", () => {
                console.log("REDIS CLIENT READY TO BE USED");
            })
            .on("error", (err: any) => {
                console.log("ERROR : " + err.message);
            })
            .on("end", () => {
                console.log("CLIENT DISCONNECTED FROM REDIS");
            })
            .on("SIGINT", () => {
                RedisConnection._instance?.quit();
            })
            .connect();
    }

    public static async getInstance() {
        if (!this._instance) {
            const client = new RedisConnection();
            await client.initialize();
        }
        return this._instance as RedisClientType<any>;
    }

    public static async destroyInstance() {
        if (!this._instance) return;
        await this._instance.disconnect();
        this._instance = null;
    }
}

export default RedisConnection;