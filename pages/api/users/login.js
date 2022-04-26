import {User} from '../../../models/user'
import {createAsyncResult, handle500Error} from '../../../lib/flowControl'
import {compare} from 'bcryptjs'
import { requestPipe, withDB } from '../../../lib/reqExtenders'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../lib/config'

export default withIronSessionApiRoute(handler, ironOptions)

async function handler(req, res) {
	if (req.method === 'POST') return requestPipe(req, res, postHandler, withDB)
}

async function postHandler(req, res) {
	if (!req.body.usernameEmail) 
		return res.status(422).json({_isError: true, error: {validationErrors: [{path: 'usernameEmail', message: 'usernamePassword is required'}]}})
	const [user, err] = await createAsyncResult(User.findOne({$or: [{username: req.body.usernameEmail}, {email: req.body.usernameEmail}]}))
	if (err) return handle500Error(res, err);
	const [isValid, compareErr] = await createAsyncResult(compare(req.body.password, user.password))
	if (compareErr) return handle500Error(res, compareErr);
	if (!isValid) return res.status(400).json({_isError: true, error: {message: 'Invalid username/email or password'}})
	req.session = {user: {username: user.username, id: user.id}}
	const [_, sessionSaveErr] = await createAsyncResult(req.session.save())
	if (sessionSaveErr) return handle500Error(res, sessionSaveErr);
	res.status(201).json({_isError: false, data: {}})
}