"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./api/routes"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 3000;
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join('assets')));
app.use(express_1.default.json({ type: 'application/json' }));
app.use(express_session_1.default({
    secret: 'flashblog',
    saveUninitialized: true,
    resave: true,
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(connect_flash_1.default());
// application routing
app.use(routes_1.default);
app.use(helmet_1.default({ crossOriginEmbedderPolicy: false, originAgentCluster: true }));
app.use(helmet_1.default.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        'img-src': ["'self'", 'https: data: blob:'],
    },
}));
app.listen(PORT, () => {
    console.log(`Servert running on ${PORT}`);
});
exports.default = app;
