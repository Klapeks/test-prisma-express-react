import { Router } from "express";
import prisma from "../prisma";
import Users from "../data/users";

const router = Router();

router.get("/", async (req, res) => {
    res.status(200).send(await prisma.user.findMany());
})

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const user = await Users.getUser(id);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    res.status(200).send(user);
})

export default router;
