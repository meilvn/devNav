// server/auth/index.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter"; // 注意包名
import { db } from "../utils/db";
import { emailOTP } from "better-auth/plugins";
import { sendResetEmail } from "../utils/mail";

export const auth = betterAuth({
  // 使用 drizzleAdapter，传入 db 实例
  database: drizzleAdapter(db, {
    provider: "sqlite", // 关键：指定为 sqlite
  }),

  user: {  // 自定义数据库中用户表的字段
    fields: {
      name: "nickname",
    },
    additionalFields: {  // 自定义数据库中用户表的额外字段
      role: {
        type: "string",
        // default: "user",
      },
    }
  },

  secret: process.env.NUXT_BETTER_AUTH_SECRET!,
  baseURL: process.env.NUXT_PUBLIC_BETTER_AUTH_URL!,

  emailAndPassword: {  // 自定义邮箱和密码登录
    enabled: true,
  },

  // 社交登录（可选）
  socialProviders: {
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // },
  },

  // 开启实验性 joins 支持（Better Auth v1.4.0+，可提升性能）
  experimental: {
    joins: true,
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type}) {
        // 实现发送 OTP 到邮箱的逻辑
        console.log(email, otp);
        if(type === 'forget-password') {
          console.log(email, otp);
          // 发送忘记密码 OTP 到邮箱
          await sendResetEmail(email, otp);
        }
      },
    })
  ]  
});

export type Session = typeof auth.$Infer.Session;
