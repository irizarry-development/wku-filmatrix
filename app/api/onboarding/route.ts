import { NextResponse } from "next/server";
import { auth } from "~/lib/auth";

export const POST = auth((req) => {
    if (!req.auth) {
        return NextResponse.json({
            status: 401,
            error: "Unauthorized"
        });
    }

    return NextResponse.json({
        status: 200,
        message: "Welcome to the onboarding API"
    });
});
