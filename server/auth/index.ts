// server/auth/index.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter"; // 注意包名
import { db } from "../utils/db";

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
        required: true,
        default: "user",
      },
    },
    name: "",
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

  // routes: {
  //   signUp: "/register",
  //   signIn: "/login",
  //   getSession: "/session",
  //   signOut: "/logout",
  // },

  // // ✅ 核心：重写所有接口端点路径（表单提交API）
  // endpoints: {
  //   // 邮箱密码登录接口：默认 /sign-in/email → 改为 /login
  //   signInEmail: {
  //     path: "/login",
  //   },
  //   // 邮箱注册接口：默认 /sign-up/email → 改为 /register
  //   signUpEmail: {
  //     path: "/register",
  //   },
  //   // 退出登录
  //   signOut: {
  //     path: "/logout",
  //   },
  //   // 获取会话
  //   getSession: {
  //     path: "/session",
  //   },
  // },
});

export type Session = typeof auth.$Infer.Session;
