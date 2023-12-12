"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSequencedArray = void 0;
const getSequencedArray = (start, length) => Array.from(Array(length).keys()).map((i) => i + start);
exports.getSequencedArray = getSequencedArray;
