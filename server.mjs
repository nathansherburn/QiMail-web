// a basic express server that serves the static files in the public directory and listens on port 3000 for resend emails
import express from "express";
import path from "path";
import { Resend } from "resend";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));

app.post("/send-email", async (req, res) => {
  const resend = new Resend(req.body.resendApiKey);
  let response = await resend.emails.send({
    ...req.body.email,
    from: "QiMail <qimail@nathansherburn.com>",
  });
  res.json(response);
  console.log(response);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
