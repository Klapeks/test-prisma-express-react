<template>
    <AvatarIcon 
        :iconType="active===true ? 'active' : active+''"
        :hover="user.name"
        :icon="user.name.substring(0,1)"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AvatarIcon from './AvatarIcon.vue';

export default defineComponent({
    name: "AvatarUser",
    components: {AvatarIcon},
    props: {
        active: Boolean || String,
        user: { type: Object, required: true}
    }
})
</script>