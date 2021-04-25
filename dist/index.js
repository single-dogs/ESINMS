"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var server = new koa_1.default();
server.use(function (ctx) {
    ctx.body = 'hello';
});
server.listen(80);
