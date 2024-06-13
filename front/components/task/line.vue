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

/**
 * 追加
 */
const insert=async()=>{
  await account().table.task.add(model.value)
}
const update=async()=>{
  await account().table.task.update(model.value)
}

</script>
<template>
  <div class="line-center">
    <span><task-type v-model="model.type"></task-type></span>
    <span class="text" style="width:10em;"><input class="line-input" type="text" v-model="model.name['value']"></span>
<!--    <span class="text"><span v-if="model.user.length!=0"><input  type="text" class="line-input" v-model="model.user[0].name"></span></span>-->
    <span class="text"><input  type="number" class="line-input" v-model="model.point['value']"></span>
    <span class="text"><task-select v-model="model.version"></task-select></span>
    <span class="text"><v-btn @click="insert">追加</v-btn></span>
    <span class="text"><v-btn @click="update">修正</v-btn></span>
</div>
</template>
<style scoped>
  .line-center{
    height:2em;
  }
  .line-center *{
    display:inline-block;
    vertical-align: middle;
  }
  .line-center .text {

    height:100%;
  }
  .line-input{
    width:100%;
    height:100%;
    border-bottom:none;
  }
</style>