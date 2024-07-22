<script setup>
/**
 * テキストボックス
 */
const propsValue = defineProps({
    modelValue: { type: String, default: "" },
    label: { type: String, default: "" },
    type: { type: String, default: "text" },
    class: { type: String, default: "" },
});
const localModel = ref(propsValue.modelValue)

watch(() => propsValue.modelValue, (newValue) => {
    localModel.value = newValue;
});

const emit = defineEmits(['update:modelValue'])

const input = (e) => {
    emit('update:modelValue', localModel.value);
}

const onClass = () => {
    return propsValue.class
}
</script>
<template>
    <span class="pt-textbox">
        <div class="text-label">{{ label }}</div>
        <input v-model="localModel" :type="type" :class="onClass()" @input="input" />
    </span>
    
</template>
<style>
.pt-textbox{
    width: inherit;
}
.text-label{
    width: inherit;
    text-align:left;
    font-size:0.6em;
}
/**
 * 黒板の場合
 */
input {
    width: inherit;
    font-family: "chalks-font";
    color: white;
    background: transparent;
    border: 2px solid;
    border-color: transparent;
}
input:focus {
    outline: none;
    background:rgba(0,0,0,0.1);
}

/**
 * カード内の場合
 */
.pt-card input {
    font-family: "hui-font";
    color: black;
}


#password-input {
    color: black;
    font-family: Georgia;
}

input[type="password"]{
    color: black!important;
    font-family: Georgia!important;
}
input[type="password"]:focus{
    color: black!important;
    font-family: Georgia!important;
}
</style>