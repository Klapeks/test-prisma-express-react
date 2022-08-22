import { Router } from "express";
import prisma from "../prisma";
import Users from "../data/users";

const router = Router();

router.get("/", async (req, res) => {
    res.status(200).send(await prisma.post.findMany());
})
router.get("/:userid", async (req, res) => {
    const {userid} = req.params;
    const user = await Users.getUser(userid);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    if (req.query) {
        const skip = req.query.skip ?? 0;
        const limit = req.query.limit ?? -1;
        // +"123" == 123
        res.status(200).send(await Users.getPosts(user, +skip, +limit))
        return;
    }
    res.status(200).send(await prisma.post.findMany({
        where: {user: user}
    }));
})

router.post("/create", async (req, res) => {
    const {userid, text} = req.body;
    if (!text) {
        res.status(404).send("No text found");
        return;
    }
    const user = await Users.getUser(userid);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    const post = await prisma.post.create({
        data: {
            userid: user.id,
            id: await Users.newPostId(user),
            text: text
        }
    })
    res.status(200).send(post);
})

export default router;
