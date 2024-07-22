<script setup>
/**
 * チェックボタン
 */
const propsValue = defineProps({
    modelValue: { type: Boolean, default: false },
    color: { type: String, default: "default" },
    class: { type: String, default: "" },
});
const localModel = ref(propsValue.modelValue)

watch(() => propsValue.modelValue, (newValue) => {
    localModel.value = newValue;
});

const emit = defineEmits(['update:modelValue'])

const input = (e) => {
    localModel.value=!localModel.value
    emit('update:modelValue', localModel.value);
}
/**
 * クラス
 */
const onClass = () => {
    let cls = propsValue.class
    if(localModel.value){
        cls+=" cycle"
    }
    return cls
}
</script>
<template>

    <div>
    <input type="checkbox" id="scales" v-model="localModel" class="pt-check" checked @click="input"/>
    <label :class="onClass()" for="scales"> <slot /></label>
  </div>
</template>
<style>
    .pt-check{
        position:fixed;
        top:-100px;
    }
    .pt-check+label{
        margin-top:0.2em;
        margin-bottom:0.2em;
        padding:0.1em;
        cursor:pointer;
    }
    .pt-check:focus + label{
        background:rgba(0,0,0,0.1);
    }
</style>