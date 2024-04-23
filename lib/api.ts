import { NextAuthRequest } from "next-auth/lib";
import { NextResponse } from "next/server";

// AUTH FUNCTIONS

export function checkAuthentication(req: NextAuthRequest) {
    if (!req.auth || !req.auth.user || !req.auth.user.email)
        return null

    return req.auth.user.email
}

export const unauthorizedResponse = NextResponse.json("You are not authorized", { status: 401 })
export const forbiddenResponse = NextResponse.json("You are not permitted to perform this action", { status: 403 })

// RESOURCE FUNCTIONS

export const resourceNotFound = NextResponse.json("The resource you have requested was not found", { status: 404 })
export const successWithMessage = (data: any) => NextResponse.json(data, { status: 200 })

export const resourceUpdateSuccess = NextResponse.json("The resource was updated successfully", { status: 200 })
export const resourceDeleteSuccess = NextResponse.json("The resource was deleted successfully", { status: 200 })

// REQUEST CONSTS

export const invalidRequest = NextResponse.json("The request that was sent was invalid", { status: 400 })
export const invalidRequestWithError = (message: string | undefined) => NextResponse.json(message, { status: 400 })
export const requestConflict = (message: string | undefined) => NextResponse.json(message, { status: 409 })

// GLOBAL CONSTS

export const unexpectedError = NextResponse.json("An unexpected error occurred", { status: 500 })

// URL SPLITTER

export const splitUrl = (url: string) => url.split('/').pop()
