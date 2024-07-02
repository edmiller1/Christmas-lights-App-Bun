import { Hono } from "hono";

import { getUser, kindeClient, sessionManager } from "../kinde";

export const authRoute = new Hono()
  .get("/login", async (c) => {
    console.log("Logging in");
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
  })
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
  })
  .get("/callback", async (c) => {
    // get called eveyr time we login or register
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    return c.redirect("/");
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get("/user", getUser, async (c) => {
    const user = c.var.user;
    return c.json({ user });
  });
