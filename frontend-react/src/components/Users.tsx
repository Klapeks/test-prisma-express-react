import './Users.scss';
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from '../Data';

function Avatar(props: {user: User, active: boolean | "half", onClick: () => void}) {
    const active = props.active === true ? "active" : (props.active || "");
    return (
        <Icon className={`avatar ${active}`} 
            hover={props.user.name}
            icon={props.user.name.substring(0, 1)}
            onClick={props.onClick}
        />
    )
}
function Icon(props: {icon?: any, hover: string, className: string, onClick?: () => void}) {
    return (
        <div className={`icon ${props.className}`} onClick={props.onClick}>
            {typeof props.icon === "string" && <p className={`img i${props.icon.length}`}>{props.icon}</p>}
            <p className='name'>{props.hover}</p>
        </div>
    )
}
interface UsersProps {
    selectedUser: User|undefined,
    selectUser: (user: User) => void,
    openUserCreateMenu: ()=>void,
    users: Array<User>,
    setUsers: (user: Array<User>) => void
}
function Users(props: UsersProps) {
    const {selectedUser, selectUser} = props;
    useEffect(() => {
        axios.get("/api/v1/users").then((resp) => {
            props.setUsers(resp.data);
        })
    }, [props.setUsers])
    return (
        <div className="users">
            <Icon icon="✚" className="half" hover="Create account" onClick={props.openUserCreateMenu}/>
            <div className='separate'></div>
            {props.users.map((user, i) => (
                <Avatar key={i} user={user}
                    active={user.id===selectedUser?.id}
                    onClick={() => selectUser(user)}
                />
            ))}
        </div>
    );
}
  
export default Users;