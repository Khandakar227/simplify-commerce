This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables
Create or Edit the `.env.local` file.

```bash
MYSQL_DATABASE=simplify
MYSQL_USER=
MYSQL_PASSWORD=
JWT_SECRET_KEY=AnyRandomString
```

## Initialize Database
Open browser or api testing tool. go to `http://localhost:3000/api/initDB`. All the tables, functions, triggers will be generated.