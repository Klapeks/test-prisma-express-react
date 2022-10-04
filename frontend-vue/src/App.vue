<template>
    <Users @addUser="selectUser"/>
    <Posts :title="selectedUser || undefined"/>
    
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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
