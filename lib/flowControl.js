import { createServiceErrorBody } from "./responseBodies";

export async function createAsyncResult(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (e) {
    return [null, e];
  }
}

export function handle500Error(res, e) {
  console.log(e);
  return res.status(500).json(createServiceErrorBody());
}
