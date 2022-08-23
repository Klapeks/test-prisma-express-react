import './Users.scss';
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from '../Data';

function Avatar(props: {user: User, active: boolean, onClick: () => void}) {
    return (
        <div className={`avatar ${props.active?"active":""}`} onClick={props.onClick}>
            <p className='name'>{props.user.name}</p>
        </div>
    )
}

function Users(props: {selectedUser: number, selectUser: (user: number) => void}) {
    const {selectedUser, selectUser} = props;
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
            {users.map((user, i) => (
                <Avatar key={i} user={user}
                    active={user.id===selectedUser}
                    onClick={() => selectUser(user.id)}
                />
            ))}
        </div>
    );
}
  
export default Users;