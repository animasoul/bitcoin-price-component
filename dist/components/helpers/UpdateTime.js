"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// UpdateTime.tsx
const react_1 = __importDefault(require("react"));
const UpdatedTime = ({ time, tag }) => {
    const DynamicTag = tag;
    return (react_1.default.createElement(DynamicTag, null,
        react_1.default.createElement("strong", null, "Updated:"),
        " ",
        time));
};
exports.default = react_1.default.memo(UpdatedTime);
