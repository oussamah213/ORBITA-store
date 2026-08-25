# ORBITA Store

## Local backend setup

1. Create a PostgreSQL database named `orbita_store` (or use another database name in the connection string).
2. Copy `.env.example` to `.env` and set `DATABASE_URL` and a long random `AUTH_SECRET`.
3. Install dependencies with `npm install`.
4. Generate Prisma Client and apply the development migration with `npm run prisma:generate` and `npm run prisma:migrate`.
5. Start the app with `npm run dev`.

The authentication layer uses credentials, bcrypt password hashes, and signed HttpOnly session cookies. Products remain static mock data; wishlist rows persist only product IDs.

Auth endpoints include a lightweight in-memory login/register limiter for local portfolio use. Use a distributed rate limiter before deploying across multiple instances.
