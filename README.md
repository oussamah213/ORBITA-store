# ORBITA Store
## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/oussamah213/ORBITA-store.git
cd ORBITA-store

2. Install dependencies
npm install

3. Configure environment variables

Copy the example environment file:
cp .env.example .env

On Windows PowerShell:
Copy-Item .env.example .env

Then open .env and configure:
DATABASE_URL="your_postgresql_connection_string"
AUTH_SECRET="your_long_random_secret"

4. Set up the database

Make sure PostgreSQL is running and the database configured in DATABASE_URL exists.

Generate the Prisma client:
npm run prisma:generate
Apply the development migration:
npm run prisma:migrate

5. Start the development server
npm run dev

## Screenshots

<p align="center">
  <img src="screenshots/home.png" width="100%" alt="ORBITA Store Home" />
</p>

<p align="center">
  <img src="screenshots/products.page.png" width="100%" alt="Products Page" />
</p>

<p align="center">
  <img src="screenshots/cart.png" width="100%" alt="Cart Page" />
</p>

<p align="center">
  <img src="screenshots/wishlist.png" width="100%" alt="Wishlist Page" />
</p>

<p align="center">
  <img src="screenshots/profile.png" width="100%" alt="Profile Page" />
</p>

## Local backend setup

1. Create a PostgreSQL database named `orbita_store` (or use another database name in the connection string).
2. Copy `.env.example` to `.env` and set `DATABASE_URL` and a long random `AUTH_SECRET`.
3. Install dependencies with `npm install`.
4. Generate Prisma Client and apply the development migration with `npm run prisma:generate` and `npm run prisma:migrate`.
5. Start the app with `npm run dev`.

The authentication layer uses credentials, bcrypt password hashes, and signed HttpOnly session cookies. Products remain static mock data; wishlist rows persist only product IDs.

Auth endpoints include a lightweight in-memory login/register limiter for local portfolio use. Use a distributed rate limiter before deploying across multiple instances.
