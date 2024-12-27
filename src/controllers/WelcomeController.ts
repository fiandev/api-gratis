import { Request, Response } from "express";

export default class WelcomeController {
    static async index(req: Request, res: Response): Promise<void> {
        res.render("hello world!");
    }
}
