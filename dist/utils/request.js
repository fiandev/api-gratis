"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const defaultOptions = {
    method: "GET",
    agent: null,
};
async function request(url, options = defaultOptions) {
    let response = null;
    let content = null;
    try {
        response = await fetch(url, Object.assign({}, options));
        content = await response.text();
    }
    catch (error) {
    }
    return {
        response: response,
        content: content,
    };
}
exports.request = request;
//# sourceMappingURL=request.js.map