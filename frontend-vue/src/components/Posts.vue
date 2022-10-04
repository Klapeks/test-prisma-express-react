<template>
    <div v-if="!selectedUser" class="posts">
        <h3>Choose account</h3>
    </div>
    <div v-else-if="posts===null||posts===undefined" class="posts">
        <h3 className='nopost'>Loading... {{selectedUser.name}}</h3>
    </div>
    <div v-else class="posts">
        <NewPost @createPost="createPost"/>
        <h3 v-if="posts.length===0" className='nopost'>No posts</h3>
        <div v-else class="posts">
            <div v-for="post in posts" className="post">
                <p>{{post.id}} {{post.text}}</p>
                <div className='delpost' @click="deletePost(post)">✖</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Data, Post, User } from '@/utils/Data';
import { defineComponent } from 'vue';
import NewPost from './NewPost.vue';

interface PostData {
    posts: Post[] | null
}

const cache = new Map<number, Array<Post>>();

export default defineComponent({
    name: "Posts",
    components: {NewPost},
    data(): PostData {
        return {
            posts: null
        }
    },
    props: {
        selectedUser: Object,
    },
    methods: {
        async deletePost(post: Post) {
            if (!this.selectedUser) return;
            if (!this.posts) return;
            this.posts = this.posts.filter((p, _) => post.id!==p.id);
            cache.set(this.selectedUser.id, this.posts);
            await Data.removePost(this.selectedUser.id, post.id);
        },
        async createPost(text: string) {
            if (!this.selectedUser) return;
            const user = this.selectedUser;
            user.lastPostId += 1;
            this.$emit("selectUser", user);
            let post: Post = { id: user.lastPostId, text };
            this.posts = !this.posts ? [post] : [post, ...this.posts]; 
            cache.set(this.selectedUser.id, this.posts);
            await Data.createPost(user.id, post.text);
        },
        async updatePosts() {
            console.log("update");
            if (!this.selectedUser) {
                this.posts = null;
                return;
            }
            this.posts = cache.get(this.selectedUser.id) || this.posts;
            this.posts = await Data.getPosts(this.selectedUser as User);
            cache.set(this.selectedUser.id, this.posts)
        }
    },
    async mounted() {
        this.updatePosts();
    },
    watch: {
        'selectedUser': {
            handler() { this.updatePosts() },
            immediate: true
        }
    }
})
</script>

<style scoped lang="scss">
.posts {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    .post {
        color: black;
        background-color: white;
        margin-bottom: 10px;
        padding: 5px;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        .delpost {
            margin-right: 10px;
            margin-left: 5px;
            color: red;
            cursor: pointer;
            height: 20px;
            user-select: none;
        }
    }
    h3 {
        text-align: center;
        color: white;
    }
}
</style>