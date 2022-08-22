import { User } from "@prisma/client";
import prisma from "../prisma";

const Users = {
    async getUser(id: string | number): Promise<User | null> {
        if (typeof id === "string") id = parseInt(id);
        return await prisma.user.findFirst({
            where: {id: id}
        });
    },
    async getPostCount(user: User) {
        return await prisma.post.count({where: { user: user }});
    },
    async newPostId(user: User) {
        return await Users.getPostCount(user);
    },
}

export default Users;