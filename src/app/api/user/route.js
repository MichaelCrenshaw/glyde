import { unsealData } from "iron-session/edge";
import { sessionOptions } from "@/lib/session";
import pool from "@/lib/databasePool";
import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(req) {
    // Get the relevant cookie, and unseal it
    let cookie = cookies().get(sessionOptions.cookieName);
    let unsealed = JSON.parse(await unsealData(cookie.value, { password: process.env.SESSION_SECRET_PASSWORD }));
    let id = unsealed.id;

    if (!id) {
        return NextResponse.json({
            isLoggedIn: false,
        });
    }

    let userData = (await pool.query("SELECT * FROM users WHERE id = $1", [id])).rows[0];

    return NextResponse.json({
        isLoggedIn: true,
        id: id,
        username: userData.username,
        email: userData.email,
    });
}
