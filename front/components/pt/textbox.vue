<script setup>
/**
 * テキストボックス
 */
const propsValue = defineProps({
    modelValue: { type: String, default: "" },
    label: { type: String, default: "" },
    type: { type: String, default: "text" },
    color: String,
});
const localModel = ref(propsValue.modelValue)

watch(() => propsValue.modelValue, (newValue) => {
    localModel.value = newValue;
});

const emit = defineEmits(['update:modelValue'])

const input = (e) => {
    emit('update:modelValue', localModel.value);
}

</script>
<template>
    <input v-model="localModel" :type="type" :placeholder="label" @input="input" />
</template>
<style>
.pt-card input {
    font-family: "hui-font";
    color: black;
}

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