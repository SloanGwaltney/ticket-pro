export async function createAsyncResult(promise) {
	try {
		const data = await promise
		return [data, null]
	} catch (e) {
		return [null, e]
	}
}