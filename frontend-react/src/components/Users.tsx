import './Users.scss';
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from '../Data';

function Avatar(props: {user: User}) {
    return (
        <div className='avatar'>
            <p className='name'>{props.user.name}</p>
        </div>
    )
}

function Users() {
    const [users, setUsers] = useState<Array<User>>([]);
    useEffect(() => {
        console.log("Use effect: users: " + users.length);
        axios.get("/api/v1/users").then((resp) => {
            console.log(resp);
            setUsers(resp.data);
        })
    }, [setUsers])
    return (
        <div className="users">
            {users.map((user, i) => (<Avatar key={i} user={user}/>))}
        </div>
    );
}
  
export default Users;