# **Teslo Shop**

A modern and functional clone of the official Tesla apparel store, rebuilt from scratch using Next.js to deliver a fast, efficient, and scalable user experience. "Teslo Shop" not only emulates the design and functionality of the original store but also incorporates custom enhancements and features to stand out in modern frontend development.

Key Features:

- **User Authentication**: Secure login and registration mechanisms ensure a personalized shopping experience for each user.
- **Shopping Cart**: A dynamic shopping cart that provides users with the flexibility to add, update, or remove products seamlessly.
- **Shipping Details**: Integrated forms allow users to specify shipping addresses and preferences, ensuring a smooth checkout process.
- **Database Integration**: A solid backend with SQL database integration to manage user data, product inventory, and transaction records efficiently.
- **PayPal Payments**: Safe and secure payment processing with PayPal, offering users a convenient and trusted way to complete their purchases.
- **Administrative Dashboard**: An intuitive admin dashboard that provides comprehensive control over product listings, user accounts, and order management, facilitating easy store administration and oversight.

Teslo Shop stands out not just as a showcase of technical proficiency in modern web development but as a fully functional e-commerce platform ready to engage users with its sleek design, secure user experience, and comprehensive feature set.

![image](https://github.com/juanjosemayorga/teslo-shop-14/assets/33362582/e693e993-50c5-4994-bf72-ebad19a41286)

![image](https://github.com/juanjosemayorga/teslo-shop-14/assets/33362582/3e3c1fa8-2cdb-4b59-a858-efa4fbbc7acf)

![image](https://github.com/juanjosemayorga/teslo-shop-14/assets/33362582/441c9a69-6a1c-4dac-a6e2-6e5b0eeb5997)

---

## **Technologies Used**

- **Next.js**: A cutting-edge framework for enhanced performance and seamless page transitions, powering our frontend with server-side rendering and static site generation capabilities.
- **React.js**: The backbone of our dynamic user interfaces, facilitating the creation of a responsive and interactive shopping experience with reusable components.
- **CSS Modules & Tailwind CSS**: A synergistic blend of modular CSS for component-scoped styling, complemented by Tailwind for rapid, utility-first design, ensuring a sleek and maintainable style architecture.
- **TypeScript**: The foundation of our robust development, offering type safety and predictive coding to streamline debugging and enhance code quality.
- **SQL Database**: Our reliable data storage solution, providing structured data organization and integrity for efficient data management and retrieval.
- **Docker**: The cornerstone of our backend infrastructure, offering containerization for consistent, scalable, and seamless deployment across any environment.

---

## Run in development mode

1. Clone the repository
2. Create a `.env` file based on `.env.template` and fill the variables
3. Install dependencies

```
npm install
```

1. Lift the database

```
docker-compose up -d
```

1. Run the migrations

```
npx prisma migrate dev
```

1. Execute the seed

```
npm run seed
```

1. To clean the LocalStorage of the browser
2. Run the project

```
npm run dev
```
