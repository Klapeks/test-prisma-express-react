import './Posts.scss';
import axios from "axios";
import { useEffect, useState } from "react";


function Posts(props: {user: number}) {
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