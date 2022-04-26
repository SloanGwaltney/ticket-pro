import { withDB } from "../../../lib/reqExtenders"
import { User } from "../../../models/user"
import { createAsyncResult } from "../../../lib/flowControl"
import { createServiceErrorBody } from "../../../lib/responseBodies"
import { withIronSessionApiRoute } from "iron-session/next";
import {ironOptions} from '../../../lib/config'

export default withIronSessionApiRoute(handler, ironOptions)

export async function handler (req, res) {
	if (req.method === 'POST') await withDB(req, res, postHandler) 
}

async function postHandler(req, res) {
	const user = new User(req.body)
	const [savedUser, saveErr] = await createAsyncResult(user.save());
	if (saveErr) {
		if (saveErr?.code === 11000) return res.status(409).json({_isError: true, error: {message: 'username or email already in use'}})
		return res.status(500).json(createServiceErrorBody());
	}
	req.session = {user: {username: savedUser.username, id: savedUser.id}}
	const [_, err] = await createAsyncResult(req.session.save())
	if (err) {
		console.log(err)
		return res.status(500).json(createServiceErrorBody());
	}
	return res.status(201).json({_isError: true, data: {}})
}