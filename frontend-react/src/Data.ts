import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    id: number,
    login: string,
    name: string,
    lastPostId: number
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