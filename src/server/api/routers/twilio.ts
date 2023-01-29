import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const senderNumber = process.env.TWILIO_NUMBER;

const client = require("twilio")(accountSid, authToken);

function test_message(receiver: string) {
  client.messages.create({
    from: senderNumber,
    body: "Hi there",
    to: receiver,
  });
}

export const twilioRouter = createTRPCRouter({
  verificationService: publicProcedure.query(async () => {
    const service = await client.verify.v2.services.create({
      friendlyName: "My First Verify Service",
    });
    return { sid: service.sid };
  }),

  sendToken: publicProcedure
    .input(z.object({ serviceSid: z.string(), receivingNumber: z.string() }))
    .mutation(async ({ input }) => {
      const verification = await client.verify.v2
        .services(input.serviceSid)
        .verifications.create({ to: input.receivingNumber, channel: "sms" });
      return { verification_status: verification.status };
    }),

  checkToken: publicProcedure
    .input(
      z.object({
        serviceSid: z.string(),
        receivingNumber: z.string(),
        code: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const verification_check = await client.verify.v2
        .services(input.serviceSid)
        .verificationChecks.create({
          to: input.receivingNumber,
          code: input.code,
        });

      return { verification_check: verification_check.status };
    }),
});
