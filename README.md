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

## API Documentation: /seller/api/login
### Endpoint
**POST** /seller/api/login

**Request**
Headers: Content-Type: application/json
Body:
```json
{
  "email": "seller@example.com",
  "password": "securePassword123"
}
```
**Response**
Success
Status Code: 200 OK
```json
{
  "message": "Login successful",
  "error": false
}
```
**Failure**
Status Code: 401 Unauthorized

```json
{
  "message": "Invalid email or password",
  "error": true
}
```


# TODO
1. Landing UI for showing the products to customer
2. Customer adding them to cart.
3. Customer Ordering.
4. Seller viewing the order.
