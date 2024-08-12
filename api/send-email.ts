import { Resend } from "resend";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.resendApiKey) {
    return new Response("Missing resendApiKey", { status: 400 });
  }
  if (!body.email) {
    return new Response("Missing email", { status: 400 });
  }
  if (!body.email.to) {
    return new Response("Missing email.to", { status: 400 });
  }
  if (!body.email.subject) {
    return new Response("Missing email.subject", { status: 400 });
  }
  const resend = new Resend(body.resendApiKey);
  let res = await resend.emails.send({
    ...body.email,
    from: "QiMail <qimail@nathansherburn.com>",
  });
  return new Response(JSON.stringify(res), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export const config = {
  runtime: "edge",
};
