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

// app.get(`/users`, async (req, res, next) => {
//     console.log("ssususuauusususususuus");
//     next();
//     // res.status(200).send(await prisma.user.findMany())
// });
// app.get(`/users/:id`, async (req, res) => {
//     const {id} = req.params;
//     const user = await prisma.user.findFirst({
//         where: {login: id}
//     });
//     if (!user) {
//         res.status(404).send("User not found");
//         return;
//     }
//     res.status(200).send(user);
// });
// app.get(`/users/:id/posts`, async (req, res) => {
//     const {id} = req.params;
//     const posts = await prisma.post.findMany({
//         where: {userid: parseInt(id)}
//     });
//     if (!posts) {
//         res.status(404).send("No posts found");
//         return;
//     }
//     res.status(200).send(posts);
// });
// app.get(`/users/:id/posts/:post`, async (req, res) => {
//     const {id, post} = req.params;
//     const posts = await prisma.post.findFirst({
//         where: {userid: parseInt(id), id: parseInt(post)}
//     });
//     if (!posts) {
//         res.status(404).send("No posts found");
//         return;
//     }
//     res.status(200).send(posts);
// });
// app.get(`/post/create/:id/:text`, async (req, res) => {
//     const {id, text} = req.params;
//     const user = await prisma.user.findFirst({
//         where: {login: id.toLowerCase()},
//     });
//     if (!user) {
//         res.status(404).send("User not found");
//         return;
//     }
//     const post = await prisma.post.create({
//         data: {
//             userid: user.id,
//             id: Math.floor(Math.random() * 100000),
//             text: text
//         }
//     })
//     res.status(200).send(post);
// });
