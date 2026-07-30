# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# better-auth 用来自动处理用户认证、授权、会话管理等任务
# 支持拓展和自定义，具体配置在/server/auth/index.ts中

# 他内置了4个表，通过下面的cli来自动生成。为了在drizzle-orm的表结构文件schema.ts中统一管理，所以需要将生成的表结构复制到schema.ts中
npx @better-auth/cli generate --config ./server/auth/index.ts --output ./server/db/auth-schema.ts -y

# 因为better-auth自动实现了接口的cookie、session管理，不需要手动调用接口
# 只需要在前端调用better-auth的接口，即可实现用户认证、授权、会话管理等功能
# 例如：
# 注册用户
await auth.signUp({
  name: 'testuser',
  password: '123456',
  role: 'user',
})

# 有几个问题未解决： 1、better-auth的默认路由没法修改