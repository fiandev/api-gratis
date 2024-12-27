import { Router } from "express";
import ProxyController from "../controllers/ProxyController";
import WelcomeController from "../controllers/WelcomeController";

const router = Router();

router.get("/", WelcomeController.index);
router.get("/proxy", ProxyController.index);

export default router;
