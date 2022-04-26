import dbConnect from "./dbConnect";

export async function withDB(req, res, handler) {
	req.db = await dbConnect();
	handler(req, res)
}