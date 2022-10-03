<template>
    <div class="posts">
        <h4>Sussy count: {{sus}}</h4>
        <button @click="addSusCount">Sus it</button>
        <button @click="removeSusCount">No sus</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Posts",
    data() {
        return {
            sus: 0
        }
    },
    methods: {
        addSusCount() {
            this.sus += 1;
        },
        removeSusCount() {
            this.sus -= 1;
        }
    }
})
</script>