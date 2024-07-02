import { Hono } from "hono";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { decode, sign, verify } from "hono/jwt";

const client = jwksClient({
  jwksUri: `${process.env.KINDE_AUTH_DOMAIN}/.well-known/jwks.json`,
});

export const webhookRoute = new Hono().post("/webhook", async (c) => {
  try {
    console.log("Hello");
    // Get the token from the request
    const token = await c.req.text();

    // Decode the token
    const { header, payload } = decode(token);
    //@ts-ignore
    const { kid } = header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = await jwt.verify(token, signingKey);

    //@ts-ignore
    switch (event?.type) {
      case "user.created":
        // handle user created event
        // e.g add user to database with event.data
        //@ts-ignore
        console.log(event.data);
        break;
      default:
        // other events that we don't handle
        break;
    }

    return c.json({ message: "success" }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return c.json({ message: err.message }, { status: 400 });
    }
  }
});
