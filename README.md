Demo_Social

# Setup Database
- Use 'Docker'
- Create database container via MySQL
 - create 'docker-compose.yml' in backend folder
 -
 ```
 services:
  mysql:
    image: mysql:8.4
    container_name: some-mysql
    environment:
      MYSQL_ROOT_PASSWORD: <your_root_pass>
      MYSQL_DATABASE: social
      MYSQL_ROOT_HOST: "%"
    ports:
      - "3306:3306"
 ```
 - run `docker compose up -d`
- to connect to database, we will use URL database 'mysql://root:<your_root_pass>@localhost:3306/social'

# dotenv
```
DATABASE_URL="mysql://root:<your_root_pass>@localhost:3306/social"

SECRET="f631883674df3e73d0aeafb5b316d29efaa25447c9bceffd8b1727fd15a61c99"
```

# Setup Env.
- run 'npm install' in both backend and frontend to make sure all dependencies are installed

# To test
- backend: run 'npx prisma db push
' then 'npm start'
- frontend: run 'npm run dev'
