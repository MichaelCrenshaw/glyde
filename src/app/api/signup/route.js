import { genSalt, hash } from "bcrypt";
import { NextResponse } from "next/server";
import {sealData} from "iron-session/edge";

import { loginQuery } from "../login/route";

import { sessionOptions } from "@/lib/session";
import pool from "@/lib/databasePool";

const saltRounds = Number(process.env.BCRYPT_SALT);

// const bcrypt = require("bcrypt");

export const signupQuery = {
    name: "signup",
    text: "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id;",
}

export async function POST(req) {
    let data = await req.json();
    const username = data.username;
    const email = data.email;
    const password = data.password;

    // Initial sanity check for parameters
    if (!email || !username || !password) {
        return NextResponse.json({
            error: "Email, Username, and Password are required fields",
        },
        {
            status: 400,
        });
    }

    // Ensure the password is at least 8 characters long, and contains a special character, a number, and a capital letter
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        return NextResponse.json({
            error: "Password must be at least 8 characters long, and contain a special character, a number, and a capital letter",
        },
        {
            status: 400,
        });
    }

    let exists = await pool.query(loginQuery, [email])
        .then((result) => {
            return result.rows.length > 0;
        });

    // This could allow for user enumeration, but avoiding this would leave the user with no indication of why the signup failed
    if (exists) {
        return NextResponse.json({
            error: "Email already in use",
        },
    {
            status: 401,
        });
    }

    let salt = await genSalt(saltRounds);

    if (salt === undefined) {
        return NextResponse.json({
            error: "Issue generating salt",
        },
    {
            status: 500,
        });
    }

    let hashedPass = await hash(password, salt);

    // If the password hash failed, return an error
    if (hashedPass === undefined) {
        return NextResponse.json({
            error: "Issue parsing password",
        },
    {
            status: 401,
        });
    }

    // Create user
    let userId = (await pool.query(signupQuery, [username, email, hashedPass])).rows[0].id;

    if (userId === undefined) {
        return NextResponse.json({
            error: "Issue creating user",
        },
    {
            status: 500,
        });
    }

    // Set session data
    let sessionData = JSON.stringify({
        id: userId,
    });

    const encryptedSessionData = await sealData(sessionData, sessionOptions);

    // Return success
    return NextResponse.json({
        ok: "Successfully registered account",
    },
{
        status: 200,
        headers: { 'Set-Cookie': `${sessionOptions.cookieName}=${encryptedSessionData}` }
    });
}
