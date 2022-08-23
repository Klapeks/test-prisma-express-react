import { Ref, RefObject } from "react";
import "./NewUser.scss"

function NewUser(props: {refr: RefObject<HTMLDivElement>}) {
    const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!(event.target as HTMLElement).classList.contains("new-user")) return;
        if (!props.refr) return;
        props.refr.current?.classList.remove("activate");
    };
    return (
        <div className="new-user" ref={props.refr} {...{onClick}} >
            <div className="window">
                <input type="text" />
            </div>
        </div>
    )
}


export default NewUser;