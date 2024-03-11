"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
//handle middleware
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//application route
/* app.use('/api/v1/users/', UserRoutes) */
app.use('/api/v1/', routes_1.default);
app.get("/", (req, res) => {
    res.send("application is running successfully");
});
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Ooops! not found",
        errorMessages: [{
                path: req.originalUrl,
                message: 'api not found'
            }]
    });
    next();
});
exports.default = app;
