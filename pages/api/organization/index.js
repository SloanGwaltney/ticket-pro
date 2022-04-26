import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../lib/config'
import { createAsyncResult } from '../../../lib/flowControl'
import {authenticate, requestPipe, withDB} from '../../../lib/reqExtenders'
import {Organization} from '../../../models/organization'
export default withIronSessionApiRoute(handler, ironOptions)

async function handler(req, res) {
	if (req.method === 'POST') return requestPipe(req, res, postHandler, withDB, authenticate)
}

async function postHandler(req, res) {
	const org = new Organization(req.body)
	const timestamp = Date.now()
	org.auditData = {
		createdByName: req.session.user.username,
		createdBy: req.session.user.id,
		createdAt: timestamp,
		lastUpdatedByName: req.session.user.username,
		lastUpdatedBy: req.session.user.id,
		lastUpdatedAt: Date.now()
	}
	const [savedOrg, err] = await createAsyncResult(org.save())
	if (err) {
		console.log(err)
	}
	res.status(201).json({_isError: false, data: {organization: savedOrg}})
}