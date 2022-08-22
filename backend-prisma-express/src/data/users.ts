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
    async getPosts(user: User, skip?: number, count?: number) {
        if (count === undefined || count < 0) {
            return await prisma.post.findMany({
                where: { userid: user.id },
                skip: skip
            });
        }
        return await prisma.post.findMany({
            where: { userid: user.id },
            take: count,
            skip: skip
        });
    },
}

export default Users;