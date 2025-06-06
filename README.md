# Backend_Assignment

# 📦 SaaS Subscription Microservice

This repository is part of a **Backend Development Assignment** focused on building a **Subscription-Based Model** microservice. It allows users to subscribe to various SaaS plans, manage their subscriptions, and retrieve related details. The project is built using **Node.js (Express.js)** and **MongoDB**, and follows modern backend development best practices.

---

## 📚 Assignment Details

**Assignment Title**: Backend Assignment – Subscription Based Model  
**Objective**: Build a microservice to manage user subscriptions for a SaaS platform.  
**Tech Stack**:

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Architecture**: MVC pattern
- **Message Queue (optional)**: Redis (for future enhancement)

---

## ✅ Functional Requirements

- **User Subscription Management**

  - `POST /subscriptions`: Create a new subscription
  - `GET /subscriptions/:userId`: Get a user's current subscription
  - `PUT /subscriptions/:userId`: Update a subscription (upgrade/downgrade)
  - `DELETE /subscriptions/:userId`: Cancel a subscription

- **Plan Management**

  - `GET /plans`: Retrieve all available subscription plans

- **Subscription Status Handling**
  - Manage statuses: `ACTIVE`, `INACTIVE`, `CANCELLED`, `EXPIRED`
  - Auto-expiry of subscriptions after the defined duration

---

## 🛠 Features

- Modular code using MVC design
- Environment variables for sensitive configurations
- JWT-based secure authentication
- Input validation and error handling
- Follows RESTful API standards
- Ready for scalability and performance optimization
- Fault-tolerant design with retry logic (in progress)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/VedankWakalkar/Backend_Assignment.git

```
