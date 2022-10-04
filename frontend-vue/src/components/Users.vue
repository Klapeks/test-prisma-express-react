<template>
    <div class="users">
        <AvatarIcon icon="✚" icon-type="half" hover="Create account" @click="openUseCreateMenu"/>
        <div class='separate'></div>
        <AvatarUser 
            v-for="user in users"
            :active="user.id === selectedUser?.id"
            :user="user"
            @click="selectUser(user)"
        />
    </div>
</template>

<script lang="ts">
import { Data, User } from '@/utils/Data';
import { defineComponent } from 'vue';
import AvatarIcon from '@/components/AvatarIcon.vue';
import AvatarUser from '@/components/AvatarUser.vue';

interface UserData {
    users: Array<User>,
}

export default defineComponent({
    name: "Users",
    components: {AvatarIcon, AvatarUser},
    data(): UserData {
        return {
            users: []
        }
    },
    props: {
        selectedUser: Object,
    },
    methods: {
        selectUser(user: User) {
            this.$emit("selectUser", user);
        },
        openUseCreateMenu(){
            alert("Мне лень делать))0");
        }
    },
    async mounted() {
        this.users = await Data.getUsers();
    },
})
</script>

<style scoped lang="scss">
.users {
    width: 70px;
    background-color: rgb(72, 56, 143);
    display: flex;
    flex-direction: column;
    .separate {
        height: 2px;
        width: 50%;
        background-color: #666;
        margin: 2px;
        margin-left: auto;
        margin-right: auto;
    }
}
</style>