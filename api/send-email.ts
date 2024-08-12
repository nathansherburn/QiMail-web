import { Resend } from "resend";

export async function POST(req: Request) {
  const body = await req.json();
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
