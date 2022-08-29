"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
// create a request object
const request = supertest_1.default(server_1.default);
// test resize request with name without width and height
describe('Test endpoint response', () => {
    it('Status Codes tests', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/api/images?filename=hn&width=500&height=500');
        expect(response.status).toBe(200);
    }));
    //check all query params
    it('should enter width if undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=hn&width=&height=45');
        expect(response.text).toBe('{"message":"You must enter width!"}');
    }));
    //check all query params
    it('should enter height if undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/api/images?filename=hn&width=500&height=');
        expect(response.text).toBe('{"message":"You must enter height!"}');
    }));
    //check all query params
    it('should enter height if undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/api/images?filename=&width=500&height=41');
        expect(response.text).toBe('{"message":"You must enter filename!"}');
    }));
});
// test resize request if height was string
