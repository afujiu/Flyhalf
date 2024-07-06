<script setup>
import draggable from "vuedraggable";
const { login } = apiStore()
const props = defineProps({
    modelValue: Object
});
const localModel = ref(props.modelValue)
const emit = defineEmits(['update.modelValue'])
watch(localModel, (newValue) => {
    emit('update:modelValue', newValue);
});

</script>
<template>
    <div class="list-one-line-border">
        <v-contaienr class="pa-0 ma-0">
            <v-row>
                <v-col>
                    <input type="text" v-model="localModel.title" />
                </v-col>
                <v-col>
                    <select v-model="localModel.type">
                        <option value="goal">ゴール</option>
                        <option value="pbl">プロダクトBL</option>
                        <option value="sbl">スプリントBL</option>
                        <option value="task">タスク</option>
                    </select>
                </v-col>
                <v-col class="pa-0 ma-0"></v-col>
                <v-col class="pa-0 ma-0"></v-col>
                <v-col class="pa-0 ma-0"></v-col>
                <v-col class="pa-0 ma-0"></v-col>
            </v-row>
        </v-contaienr>
    </div>
</template>
<style>
.list-one-line-border {
    filter: blur(1px);
}
</style>