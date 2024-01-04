# Personal finance web app to learn NextJS app router

Still in progress..

Built with NextJS, Tailwind, PostgreSQL, Typescript

## Installation

```bash
git clone https://github.com/daugardas/expense-explorer.git && cd expense-explorer && npm install && npx prisma migrate dev
```

Set up ``.env`` file in root directory with your database credentials

```bash
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db_name
DB_LOCAL_PORT=5432
DB_DOCKER_PORT=5432
APP_LOCAL_PORT=3000
APP_DOCKER_PORT=3000
DATABASE_URL=postgres://your_username:your_password@localhost:5432/your_db_name
```

Build the app for docker and then start the database

```bash
npm run docker-build && npm run docker-start-db
```

If you want to generate default income and expense categories, run

```bash
npm run seed
```

Start the app

```bash
npm run dev
```

## TODO

- [ ] charts
- [ ] budgeting
