<template>
    <div class="profile">
        <p>{{selectedUser?.name}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Profile",
    props: {
        selectedUser: Object
    }
});
</script>

<style lang="scss" scoped>
.profile {
    background: blue;
    padding: 10px;
    color: white;
}
</style>