import {type Request, type Response} from "express"

export async function testController(_: Request, res: Response) {
    res.status(200)
    res.json({
        message: "hello"
    })
}