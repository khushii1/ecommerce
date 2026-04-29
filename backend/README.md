# Plant Nursery Backend

Production-ready backend built with Node.js, Express, MongoDB, and Mongoose.

## Features
- JWT auth + role-based access (`user`, `admin`)
- User profile APIs
- Admin user management
- Categories, Products, Blogs CRUD
- Cart + checkout/order history
- Contact form message storage
- Joi validation, centralized errors, logging
- API version prefix: `/api/v1`
- Pagination on listing endpoints
- Image upload support with Multer

## Setup
1. `cd backend`
2. `npm install`
3. `cp .env.example .env`
4. set env values
5. `npm run dev`

## Health
`GET /health`

## API Base
`/api/v1`

## Postman
Import `postman_collection.json`.
