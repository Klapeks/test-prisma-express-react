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
        where: {user: user},
        orderBy: {id: "desc"}
    }));
})

router.post("/create", async (req, res) => {
    const {userid, text} = req.body;
    if (!text) {
        res.status(404).send("No post found");
        return;
    }
    const user = await Users.getUser(userid);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    user.lastPostId += 1;
    await prisma.user.update({
        where: {id: userid},
        data: {lastPostId: user.lastPostId}
    })
    const post = await prisma.post.create({
        data: {
            userid: user.id,
            id: user.lastPostId,
            text: text
        }
    })
    res.status(200).send(post);
})
router.delete("/delete", async (req, res) => {
    const userid = parseInt(req.query.userid+"");
    const postid = parseInt(req.query.postid+"");
    if (!postid) {
        res.status(404).send("No post found");
        return;
    }
    const user = await Users.getUser(userid);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    try {
        const post = await prisma.post.delete({
            where: {id_userid: {id: postid, userid: userid}}
        });
        res.status(200).send(post);
    } catch (_) {
        res.status(404).send("Post not found");
    }
})

export default router;
