<script setup>
/**
 * セレクトボックス
 */
const propsValue = defineProps({
    modelValue: Boolean,
    type:{type:String,default:"text"}
    color:String,
});
</script>
<template>
    <input :type="type"/>
</template>
<style>
    select {
        font-family: "chalks-font";
        color: white;
        background: black;
        background: transparent !important;
        border: none;
        outline: none;
    }

    select option {
        background-color: white;
        color: black;
    }
</style>