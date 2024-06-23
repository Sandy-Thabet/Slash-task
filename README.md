# Order Management System (OMS)

This project is an implementation of an Order Management System (OMS) for an e-commerce mobile app as a part of the Backend Intern Task. The project is built using NestJS as the backend framework, Prisma as the ORM, and PostgreSQL as the database.

## Table of Contents

- [Order Management System (OMS)](#order-management-system-oms)
  - [Table of Contents](#table-of-contents)
  - [Environment Setup](#environment-setup)
  - [Database Schema](#database-schema)
  - [API Endpoints](#api-endpoints)
  - [Documentation](#documentation)
  - [ERD Diagram](#erd-diagram)
  - [Postman Collection](#postman-collection)
  - [Running the Application](#running-the-application)
  - [Testing the Application](#testing-the-application)

## Environment Setup

Ensure you have the following tools and technologies installed and set up:

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Postman](https://www.postman.com/) (for testing API endpoints)

## Database Schema

The database schema includes the following entities:

1. **Users**

   - userId (Int, primary key, autoincrement)
   - name (String)
   - email (String, unique)
   - password (String)
   - address (String)

2. **Products**

   - productId (Int, primary key, autoincrement)
   - name (String)
   - description (String)
   - price (Float)
   - stock (Boolean, default: true)

3. **Orders**

   - orderId (Int, primary key, autoincrement)
   - orderDate (DateTime, default: now())
   - status (Enum: created, preparing, shipping, delivered, default: created)
   - subTotal (Float)
   - total (Float)
   - discount (Float, nullable)
   - userId (Int, foreign key)

4. **OrderItems**

   - orderId (Int, foreign key, primary key, references Orders(orderId), onDelete: Cascade)
   - productId (Int, foreign key, primary key, references Products(productId), onDelete: Cascade)
   - quantity (Int)

5. **Cart**

   - cartId (Int, primary key, autoincrement)
   - userId (Int, unique, foreign key)

6. **CartItems**

   - cartId (Int, foreign key, primary key, references Cart(cartId), onDelete: Cascade)
   - productId (Int, foreign key, primary key, references Products(productId), onDelete: Cascade)
   - quantity (Int)

7. **Coupons**
   - id (Int, primary key, autoincrement)
   - code (String, unique)
   - discountPercentage (Float)

## API Endpoints

### User Management

- **Create User**

  - **Endpoint:** `POST /api/users`
  - **Description:** Creates a new user.

- **Get All Users**

  - **Endpoint:** `GET /api/users`
  - **Description:** Returns all users.

- **Order History Retrieval**

  - **Endpoint:** `GET /api/users/:userId/orders`
  - **Description:** Retrieves the order history of a user.

### Cart Management

- **Add to Cart**

  - **Endpoint:** `POST /api/cart/add`
  - **Description:** Adds a product to the user's cart or updates the quantity if the product is already in the cart.

- **View Cart**

  - **Endpoint:** `GET /api/cart/:userId`
  - **Description:** Retrieves the user's cart.

- **Update Cart**

  - **Endpoint:** `PUT /api/cart/update`
  - **Description:** Updates the quantity of a product in the cart.

- **Remove From Cart**
  - **Endpoint:** `DELETE /api/cart/remove`
  - **Description:** Removes a product from the cart.

### Order Management

- **Create Order**

  - **Endpoint:** `POST /api/orders`
  - **Description:** Creates a new order for the specified user with the products in their cart.

- **Get Order by ID**

  - **Endpoint:** `GET /api/orders/:orderId`
  - **Description:** Retrieves the order details by order ID.

- **Update Order Status**

  - **Endpoint:** `PUT /api/orders/:orderId/status`
  - **Description:** Updates the status of an order.

- **Apply Coupon**

  - **Endpoint:** `POST /api/orders/apply-coupon`
  - **Description:** Applies a coupon to an order.

### Additional Features

- **Order History Retrieval - Users Module**

  - **Endpoint:** `GET /api/users/:userId/orders`
  - **Description:** Retrieves the order history of a user.

- **Apply Coupon - Orders Module**
  - **Endpoint:** `POST /api/orders/apply-coupon`
  - **Description:** Applies a coupon to an order.

## Documentation

The API documentation is generated using Swagger. To access the Swagger UI, run the application and navigate to `http://localhost:3000/api` by changing 3000 with PORT assigned in .env file.

To install Swagger in your project, use the following command:

```sh
npm install --save @nestjs/swagger
```

## ERD Diagram

![ERD Diagram](images/ERD.vpd.png)

## Postman Collection

You can import the Postman collection to test the API endpoints. Here is the link to the [Postman collection](https://documenter.getpostman.com/view/32928987/2sA3XWdeSf).

Additionally, you can find the extracted Postman collection file in the repository.

## Running the Application

1. Clone the repository:

   ```sh
   git clone https://github.com/Sandy-Thabet/Slash-task
   cd Sandy-Thabet/Slash-task
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Set up the database:

   - Ensure PostgreSQL is running.
   - Create a `.env` file and add your database URL:
     ```env
     PORT= 2345
     DATABASE_URL=postgresql://user:password@localhost:5432/your-database-name
     ```

4. Run the migrations to set up the database schema:

   ```sh
   npx prisma migrate dev
   ```

5. Start the application:

   ```sh
   npm run start:dev
   ```

6. The application should now be running at `http://localhost:3000/api` by changing 3000 with PORT assigned in .env file.

## Testing the Application

You can use Postman to test the API endpoints. Import the provided Postman collection and run the requests to verify the functionality.
