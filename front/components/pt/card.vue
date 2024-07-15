<script setup>
/**
 * カード
 */
const propsValue = defineProps({
    modelValue: Boolean,
    color:String,
});
</script>
<template>
    <div class="pt-card">
        <slot></slot>
    </div>
</template>
<style>

/*******************
カード
********************/
.card input {
    color: black;
    font-family: "hui-font";
    border-bottom: 2px dashed;
    border-color: rgba(0, 0, 0, 0.5);
}

.card input:focus {
    border: none;
    outline: none;
    border-bottom: solid 1px;
    border-color: rgba(0, 0, 0, 1);
}

.card input:-webkit-autofill {
    color: white;
    box-shadow: 0 0 0 1000px white inset;
}

.card {
    font-family: "hui-font";
    background: white;
    color: black;
    border-radius: 2px 2px 10px 2px;
    box-shadow: 0px 5px 4px 4px rgba(0, 0, 0, 0.7);
}
</style>