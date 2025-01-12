# Teeyanah Store

## Table of Contents
1. Overview
2. Live Link
3. Features
4. Project Structure
5. Installation



### Overview
Teeyanah Store is a mini e-commerce store where users can register, buy an items, request payment request and check the request they have made previously. This project integrates 3 paystack api endpoints (Create Customer, Create Payment request and retreive payment request) and the react-paystack library. This project was built using NextJS, tailwind and local storage to store user credentials.

<img src="/public/assets/readme-image.png" alt="readme-image" />

### Live link 

https://paystack-assessment-psi.vercel.app/

### Features
1. Create user using the create customer endpoint
2. Make Payment using react-paystack library
3. Create Payment request for a product using the Create payment endpoint
4. Retreiving Payment requests using the list payment request endpoint and querying with the customer id stored in the local storage

### Project Structure
```
teeyanah-store/
├── public/
│   ├── assets
│   ├── next.svg
│   └── vercel.svg
├── src/
│   ├── app
│   ├── components
│   └── lib
├── .gitignore
├── components.json
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

### Installation
```
git clone https://github.com/Teeyana/paystack-assessment.git
cd teeyanah-store
npm install
npm run dev
```