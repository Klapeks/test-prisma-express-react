import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    id: number,
    login: string,
    name: string
}

const Data = {
    async getUser(id: number): Promise<User> {
        return (await axios.get(`/api/v1/users/${id}`)).data;
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

export type { User }
export {Data, useUser}