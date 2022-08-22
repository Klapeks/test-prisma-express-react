import express from './src/express';
import prisma from './src/prisma';
import users from './src/routes/users';
import posts from './src/routes/posts';

const port = process.env.PORT;

express.use("/api/v1/users", users);
express.use("/api/v1/posts", posts);

async function main() {
    console.log(`Connecting to database...`);
    await prisma.$connect();
    console.log(`Starting server...`);
    express.listen(port, () => {
        console.log(`Server started at port ${port}`);
    })
}

main();
