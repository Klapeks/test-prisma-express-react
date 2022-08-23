import React, { Ref, RefObject, useRef, useState } from "react";
import { User, Data } from "../Data";
import "./NewUser.scss"

function NewUser(props: {refr: RefObject<HTMLDivElement>, addUser: (user: User) => void}) {
    const [creating, setCreating] = useState(false);
    const hide = () => {
        if (!props.refr?.current) return;
        props.refr.current.classList.remove("show");
        setTimeout(() => props.refr.current?.classList.remove("activate"), 400);
    }
    const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if ((event.target as HTMLElement).classList.contains("new-user")) hide();
    };
    function validName(name: string): boolean {
        if (name.length===0) return false;
        return true;
    }
    function validLogin(login: string): boolean {
        if (login.length===0) return false;
        return true;
    }

    const inputLoginRef = useRef<HTMLInputElement>(null);
    const inputNameRef = useRef<HTMLInputElement>(null);
    return (
        <div className="new-user" ref={props.refr} {...{onClick}} >
            <form className="window" onSubmit={(event) => {
                event.preventDefault();
                if (creating) return;
                if (!inputLoginRef.current) return;
                if (!inputNameRef.current) return;
                if (!validLogin(inputLoginRef.current.value)) return;
                if (!validName(inputNameRef.current.value)) return;
                setCreating(true);
                Data.createUser({
                    login: inputLoginRef.current.value,
                    name: inputNameRef.current.value
                }).then(user => {
                    props.addUser(user);
                    hide();
                    setTimeout(() => setCreating(false), 400);
                });
                inputLoginRef.current.value = "";
                inputNameRef.current.value = "";
            }}>
                <h1>Create Account</h1>
                <input type="text" placeholder="Login" id="login" className="text" ref={inputLoginRef}/>
                <input type="text" placeholder="Your Name" id="name" className="text" ref={inputNameRef}/>
                <input type="submit" value={creating?"...":"Create"} className={`button ${creating?"creating":""}`}/>
            </form>
        </div>
    )
}


export default NewUser;