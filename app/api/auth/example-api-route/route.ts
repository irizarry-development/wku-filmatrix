import { auth } from "~/lib/auth";

export const GET = auth((req) => {
    if (req.auth) {
        return {
            status: 200,
            body: {message: "You are authorized"}
        }
    } else {
        return {
            status: 403,
            body: {message: "You are not authorized"}
        }
    }
})