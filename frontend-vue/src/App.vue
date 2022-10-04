<template>
    <div className="container">
        <Posts/>
    </div>
</template>


<script lang="ts">
import Posts from '@/components/Posts.vue';
import Users from '@/components/Users.vue';
import { Data } from '@/utils/Data';
import { defineComponent } from 'vue';

type User = string;

interface AppData {
    selectedUser: User | null,
    users: User[]
}

export default defineComponent({
    name: 'App',
    components: {
        Posts,
        Users
    },
    data(): AppData {
        return {
            selectedUser: null,
            users: []
        }
    },
    methods: {
        setUsers(users: User[]): void {
            this.users = users;
        },
        addUsers(user: User): void {
            console.log("New user: " + user)
            this.users = [...this.users, user];
        },
        selectUser(user: User): void {
            this.selectedUser = user;
        },
    }
});
</script>


<style lang="scss" scoped>
.container {
    margin: auto;
    background: rgb(55, 41, 119);
    width: 800px;
    display: flex;
    min-height: 100vh;
    .right {
        width: 100%;
    }
}
</style>
<style>
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: rgb(43, 36, 109);
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
</style>