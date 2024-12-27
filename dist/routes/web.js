"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProxyController_1 = __importDefault(require("../controllers/ProxyController"));
const WelcomeController_1 = __importDefault(require("../controllers/WelcomeController"));
const router = (0, express_1.Router)();
router.get("/", WelcomeController_1.default.index);
router.get("/proxy", ProxyController_1.default.index);
exports.default = router;
//# sourceMappingURL=web.js.map