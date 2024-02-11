import { NextResponse } from "next/server";
import { auth } from "~/lib/auth";

export const POST = auth((req) => {
    if (!req.auth) {
        return NextResponse.json({
            status: 401,
            error: "Unauthorized"
        })
    }

    console.log(req.auth.user)
    console.log(req)

    return NextResponse.json({
        status: 200,
        message: "Welcome to the onboarding API"
    })
})
