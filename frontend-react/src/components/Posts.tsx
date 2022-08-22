import './Posts.scss';
import axios from "axios";
import { useEffect, useState } from "react";


function Posts() {
    // const [users, setUsers] = useState<Array<any>>([]);
    // useEffect(() => {
    //     console.log("Use effect: users: " + users.length);
    //     axios.get("/api/v1/users").then((resp) => {
    //         console.log(resp);
    //         setUsers(resp.data);
    //     })
    // }, [setUsers])
    const posts = [
        "susususu",
        "susususu",
        "susususu",
        "susususu",
        "susususu",
        "susususu",
        "susususu",
        "susususu",
        "susususu",
    ]
    return (
        <div className="posts">
            {posts.map((val, i) => (
                <div key={i} className="post">
                    <p>{val}</p>
                </div>
            ))}
        </div>
    );
}
  
export default Posts;