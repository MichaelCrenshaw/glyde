import { compare } from "bcrypt";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { sealData } from "iron-session/edge";

import { sessionOptions } from "@/lib/session";
import pool from "@/lib/databasePool";

export const loginQuery = {
    name: "login",
    text: "SELECT * FROM users WHERE email = $1;",
}

// Handles login requests
export async function POST(req) {
    // Require a JSON body
    if (headers().get("content-type") !== "application/json") {
        return NextResponse.json({
            error: "Invalid content-type",
        },
    {
            status: 400,
        });
    }

    let data = await req.json();
    const email = data.email;
    const password = data.password;

    // Initial sanity check for parameters
    if (!email || !password) {
        return NextResponse.json({
            error: "Email and password are required",
        },
    {
            status: 400,
        });
    }

    let userData = (await pool.query(loginQuery, [email])).rows[0];

    // Returning a different error message here is more clear, but allows for user enumeration and password brute-forcing in the same page.
    if (userData === undefined) {
        return NextResponse.json({
            error: "Invalid email or password",
        },
    {
            status: 401,
        });
    }

    let matched = compare(password, userData.password_hash, (err, result) => {
        return result
    });

    if (matched) {
        return NextResponse.json({
            error: "Invalid email or password",
        },
    {
            status: 401,
        });
    }

    // Set session data
    let sessionData = JSON.stringify({
        id: userData.id,
    });

    const encryptedSessionData = await sealData(sessionData, sessionOptions);

    // Return success
    return NextResponse.json({
        ok: "Successfully logged in",
    },
{
        status: 200,
        headers: { 'Set-Cookie': `${sessionOptions.cookieName}=${encryptedSessionData}` }
    });
}
