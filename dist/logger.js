"use strict";
/// this method will call out atlas function and will write to a doc, incase of any errors:
/// this is only for developmemt use
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
exports.ErrorLogger = void 0;
const axios_1 = __importDefault(require("axios"));
class ErrorLogger {
    constructor(data) {
        this.data = data;
    }
    log() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield axios_1.default.post("https://us-east-1.aws.data.mongodb-api.com/app/oe-phase1-tkmsy/endpoint/oe_gen_logger", {
                    data: this.data,
                }, {
                    headers: {
                        "Content-Type": ["application/json"],
                    },
                });
                return response;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.ErrorLogger = ErrorLogger;
