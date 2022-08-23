import './Posts.scss';
import axios from "axios";
import { useEffect, useState } from "react";
import { Data, Post, User } from '../Data';

const cache = new Map<number, Array<Post>>();

function NewPost(props: {user: User, addPost: (post: Post) => void}) {
    const {user, addPost} = props;
    return (
        <form className='what-new' onSubmit={(event) => {
            event.preventDefault();
            const element = document.querySelector("form.what-new input#post") as HTMLInputElement;
            if (!element) return;
            if (!element.value) return;
            user.lastPostId += 1;
            const post: Post = {
                id: user.lastPostId,
                text: element.value
            };
            element.value = "";
            addPost(post);
        }}>
            <input type="text" placeholder="What's new?" id='post'/>
            <input type='submit' value='Post' className='submit' />
        </form>
    );
}

function Posts(props: {user?: User}) {
    const {user} = props;
    const [posts, setPosts] = useState<Array<Post>|undefined>();

    useEffect(() => {
        if (!user) return;
        if (cache.has(user.id)) setPosts(cache.get(user.id));
        else setPosts(undefined);
        Data.getPosts(user).then(p => {
            cache.set(user.id, p);
            setPosts(p);
        });
    }, [user, setPosts]);

    if (!user) {
        return (
            <div className="posts">Choose account</div>
        );
    }
    if (!posts){
        return (<div className="posts">Loading....</div>);
    }
    if (posts.length===0){
        return (
            <div className="posts">
                {user && <NewPost user={user} addPost={addPost}/>}
                <h3 className='nopost'>No posts</h3>
            </div>
        );
    }
    function addPost(post: Post) {
        if (!user) return;
        const narr: Post[] = !posts ? [post] : [post, ...posts];
        setPosts(narr);
        cache.set(user.id, narr);

        axios.post("/api/v1/posts/create", {
            userid: user.id,
            text: post.text
        })
    }
    function deletePost(post: Post) {
        if (!user) return;
        if (!posts) return;
        let narr: Post[] = [...posts];
        narr = narr.filter((p, _) => post.id!==p.id);
        setPosts(narr);
        cache.set(user.id, narr);

        axios.delete(`/api/v1/posts/delete?userid=${user.id}&postid=${post.id}`);
    }
    return (
        <div className="posts">
            {user && <NewPost user={user} addPost={addPost}/>}
            {posts.map((post, i) => (
                <div key={i} className="post">
                    <p>{post.text}</p>
                    <div className='delpost' onClick={() => deletePost(post)}>✖</div>
                </div>
            ))}
        </div>
    );
}
  
export default Posts;