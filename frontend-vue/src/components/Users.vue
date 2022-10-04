<template>
    <form @submit.prevent="onSubmit">
        <input 
            :value="inputStr"
            @input="inputString($event)"
            type="text" 
        />
        <input type="submit" name="Submit" />
    </form>
</template>

<script lang="ts">
import { Data, User } from '@/utils/Data';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Posts",
    data() {
        return {
            inputStr: ""
        }
    },
    methods: {
        inputString(event: any) {
            this.inputStr = event.target.value;
        },
        onSubmit() {
            this.$emit("addUser", this.inputStr);
            // props.setUser(this.inputStr)
        }
    }
})
</script>