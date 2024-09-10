import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { env } from "@/env.mjs";
import { sendVerificationRequest } from "@/lib/email";


export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Resend({
      apiKey: "re_7Qto9z49_LfKodxQ12stxKJexSmYjFTFW",
      from: "SCHOOLZ <onboarding@resend.dev>",
    }),
  ],
} satisfies NextAuthConfig;
