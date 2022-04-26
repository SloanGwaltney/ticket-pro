import dbConnect from "./dbConnect";
import { createAsyncResult } from "./flowControl";

export async function withDB(req, res, next) {
	req.db = await dbConnect();
	next()
}

export function authenticate(req, res, next) {
	if (!req.session.user) {
		res.status(401).json({_isError: true, error: {message: 'You are not logged in'}})
		return next(true)
	}
	next()
}

export function requestPipe(req, res, fn, ...handlers) {
	let index = -1;
	
	function next(shouldEnd = false) {
		if (shouldEnd) return;
		if (index === handlers.length - 1) return fn(req, res)
		index++;
		handlers[index](req, res, next)
	}

	next()
}