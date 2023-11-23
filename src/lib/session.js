export const sessionOptions = {
    password: process.env.SESSION_SECRET_PASSWORD,
    cookieName: "GlydeSession",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    }
};