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
  <div class="line-center">
    <span><task-type v-model="model.type"></task-type></span>
    <span class="text" style="width:20em;"><input class="list-input" type="text" v-model="model.name"></span>
    <span class="text"><input class="list-input" type="text" v-model="model.user[0].name"></span>
    <span class="text"></span>
    <span class="text"></span>
    <span class="text"></span>
    <span class="text"></span>
    <span class="text"></span>
    <span class="text"></span>
</div>
</template>
<style scoped>
  .line-center{
    height:3em;
  }
  .line-center *{
    display:inline-block;
    vertical-align: middle;
  }
  .line-center .text {

    height:100%;
  }
  .list-input{
    width:100%;
    height:100%;
    border-bottom:none;
  }
</style>