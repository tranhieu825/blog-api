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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    constructor(model) {
        // Create
        this.create = (item) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = new this.model(item);
                yield newItem.save();
                return newItem;
            }
            catch (error) {
                console.log(error);
            }
        });
        // Update
        this.updateOne = (item, plus) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateone = yield this.model.updateOne({ _id: item }, { $set: plus });
                return updateone;
            }
            catch (error) {
                console.log(error);
            }
        });
        // Delete
        this.deleteOne = (item, plus) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteone = yield this.model.findByIdAndUpdate({ _id: item }, { $set: { status: plus }, });
                return deleteone;
            }
            catch (error) {
                console.log(error);
            }
        });
        // Kiểm tra email
        this.findByEmail = (item) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checkedEmail = yield this.model.find({ email: item.email });
                return checkedEmail;
            }
            catch (error) {
                console.log(error);
            }
        });
        this.model = model;
    }
}
exports.BaseService = BaseService;
