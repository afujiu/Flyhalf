<script setup>
/**
 * セレクトボックス
 */
const propsValue = defineProps({
    modelValue: { type: String, default: "" },
    label: { type: String, default: "" },
    class: { type: String, default: "" },
    items: { type: Array, default: [] },
});
const localModel = ref(propsValue.modelValue)

watch(() => propsValue.modelValue, (newValue) => {
    localModel.value = newValue;
});

const emit = defineEmits(['update:modelValue'])

const input = (e) => {
    localModel.value = e.target.value
    emit('update:modelValue', localModel.value);
}
</script>
<template>
    <select v-model="localModel" :class="class" @input="input">
        <option disabled hidden value="">{{ label }}</option>
        <option v-for="(item, idx) in items" :key="idx" ::value="item.key">{{ item.value }}</option>
    </select>
</template>
<style>
select {
    width: inherit;
    font-family: "chalks-font";
    color: white;
    background: black;
    background: transparent !important;
    border: none;
    outline: none;
}

select option {
    font-family: "hui-font";
    background-color: white;
    color: black;
}

/**
 * カード内の場合
 */
.pt-card select {
    font-family: "hui-font";
    color: black;
}

.pt-card select option {
    font-family: "hui-font";
}

.nonselected {
    color: rgba(0, 0, 0, 0.5);
}
</style>