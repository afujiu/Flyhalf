<script setup>
  import { ref } from 'vue'
  const props = defineProps({
  modelValue: {type:Object,default(){return {}}},
})
const emit = defineEmits(['update:modelValue'])
const model = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  model.value = newValue;
});

const updateParent = () => {
  emit('update:modelValue', model.value);
};

</script>
<template>
  <select v-model="model" @change="updateParent">
    <option value="1">サンプル1</option>
    <option value="2">サンプル2</option>
    <option value="3">サンプル3</option>
  </select>
</template>
<style scoped>
select {
    color: white;
    background: transparent;
    border: none;
    border-bottom: solid 0.5px;
    border-color: white;
    outline: none;
    opacity: 1;
    border-radius: 0;

}
option{
  color: black;
}
</style>