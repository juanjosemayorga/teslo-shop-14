# Description

## Run in development mode

1. Clone the repository
2. Create a ```.env``` file based on ```.env.template``` and fill the variables

3. Install dependencies

```
npm install
```

4. Lift the database

```
docker-compose up -d
```

5. Run the migrations

```
npx prisma migrate dev
```

6. Run the project

```
npm run dev
```

## Run in production mode
