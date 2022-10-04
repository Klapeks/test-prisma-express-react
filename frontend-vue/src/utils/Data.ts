import axios from "axios";

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
    async getUsers() {
        return (await axios.get(`/api/v1/users`)).data;
    },
    async getPosts(user: User): Promise<Array<Post>> {
        if (!user) return [];
        return (await axios.get(`/api/v1/posts/${user.id}`)).data;
    },
    async createUser(login: string, name: string): Promise<User> {
        return (await axios.post("/api/v1/users/create", {login, name})).data;
    },
    async createPost(userid: number, text: string) {
        return (await axios.post("/api/v1/posts/create", { userid, text })).data
    },
    async removePost(userid: number, postid: number) {
        return (await axios.delete(`/api/v1/posts/delete?userid=${userid}&postid=${postid}`)).data;
    }
}

export type { User, Post }

export { Data }