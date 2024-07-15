<script setup>
/**
 * テキストボックス
 */
const propsValue = defineProps({
    modelValue: Boolean,
    type:{type:String,default:"text"},
    color:String,
});
</script>
<template>
    <input :type="type"/>
</template>
<style>

input {
    font-family: "chalks-font";
    color: white;
    background: transparent !important;
    border: none;
}

input:focus {
    outline: none;
}

#password-input {
    color: black;
    font-family: Georgia;
}


</style>