import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    id: number,
    login: string,
    name: string,
    lastPostId: number
}
interface MinUser {
    login: string,
    name: string
}
interface Post {
    id: number,
    text: string
}


const Data = {
    async getUser(id: number): Promise<User|undefined> {
        if (Number.isNaN(id) || id===undefined) return undefined;
        return (await axios.get(`/api/v1/users/${id}`)).data;
    },
    async getPosts(user: User): Promise<Array<Post>> {
        if (!user) return [];
        return (await axios.get(`/api/v1/posts/${user.id}`)).data;
    },
    async createUser(user: MinUser): Promise<User> {
        return (await axios.post("/api/v1/users/create", user)).data;
    },
    async createPost(userid: number, text: string) {
        return (await axios.post("/api/v1/posts/create", { userid, text })).data
    }
}
function useUser(id: number): User | undefined {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (id < 0) setUser(undefined);
        else Data.getUser(id).then(setUser);
    }, [id, setUser])

    return user;
}

export type { User, Post }
export {Data, useUser}