<template>
    <form class="what-new" @submit.prevent="onSubmit">
        <input 
            :value="text"
            @input="setText($event)"
            type="text" 
            placeholder="What's new?" 
            id='post'
        />
        <input type='submit' value='Post' class='submit' />
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "NewPost",
    data(): {text?: string} {
        return {
            text: undefined
        }
    },
    methods: {
        setText(event: any){
            this.text = event.target.value;
        },
        onSubmit() {
            this.$emit("createPost", this.text);
            this.text = undefined;
        }
    }
})
</script>

<style scoped lang="scss">
.what-new {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    input {
        font-size: 20px;
        width: 70%;
        &.submit {
            width: 10%;
            cursor: pointer;
            &:hover {
                background-color: #e0e0e0;
            }
        }
        &:focus{
            outline: none;
        }
        padding: 4px;
        border: none;
        border-radius: 3px;
    }
}
</style>