import utils from "./route-utils";
import {firebaseAdmin} from "../server";
import {DecodedIdToken} from "firebase-admin/lib/auth";

const verifyUserToken = async (req, res): Promise<DecodedIdToken> => {
    const token = req.headers.token
    if (!token) return utils.unauthorizedError(res, 'Unauthorized, no token')
    return await firebaseAdmin.auth().verifyIdToken(req.headers.token)
}

export {verifyUserToken}