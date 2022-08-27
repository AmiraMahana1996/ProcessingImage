"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default();
const caching = (duration) => (req, res, next) => {
    if (req.method !== 'GET') {
        console.error('Cannot cache not GET method');
        return next();
    }
    const key = req.originalUrl;
    console.log(key);
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
        /* eslint no-console: "error" */
        // custom console
        console.log(`cached hit for key ${key}`);
        res.send(cachedResponse);
    }
    else {
        console.log(`cached miss for key ${key}`);
        res.originalSend = res.send;
        res.send = (body) => {
            res.originalSend(body);
            cache.set(key, body, duration);
        };
        next();
    }
};
exports.default = caching;
