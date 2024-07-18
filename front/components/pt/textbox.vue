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
    <input
        v-model="localModel"
        :type="type"
        :placeholder="label"
        :class="onClass()"
        @input="input" />
</template>
<style>
/**
 * 黒板の場合
 */
input {
    width:inherit;
    font-family: "chalks-font";
    color: white;
    background: transparent !important;
    border:2px solid;
    border-color:transparent;
}

input:focus {
    outline: none;
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
</style>