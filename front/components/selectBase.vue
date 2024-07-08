<script setup>
import draggable from "vuedraggable";
const { login } = apiStore()
const props = defineProps({
    modelValue: Object
});
const localModel = ref(props.modelValue)
const userList = ref([{ id: 1, key: 'hoge', name: 'ほげほげ' },
{ id: 2, key: 'fuga', name: 'ふが' }])

const emit = defineEmits(['update.modelValue'])
watch(localModel, (newValue) => {
    emit('update:modelValue', newValue);
});

onMounted(() => {
})
</script>
<template>
    <div class="list-one-line-border">
        <v-contaienr class="pa-0 ma-0">
            <v-row class="pa-0 ma-0">
                <v-col class="pa-0 ma-0" cols="12">
                    <select v-model="localModel.type">
                        <option value="goal">ゴール</option>
                        <option value="pbl">プロダクトBL</option>
                        <option value="sbl">スプリントBL</option>
                        <option value="task">タスク</option>
                    </select>
                    <input type="number" v-model="localModel.version" style="width:7em;" placeholder="スプリント" />
                    <input type="text" v-model="localModel.title" style="width:30em;" placeholder="タスク" />
                    <select v-model="localModel.user" placeholder="担当">
                        <option v-for="(item, idx) in userList" :key="idx" :value="item.key">
                            {{ item.name }}
                        </option>
                    </select>
                </v-col>
            </v-row>
        </v-contaienr>
    </div>
</template>
<style>
.list-one-line-border * {
    font-size: 0.9em;
}

.list-one-line-border .one-line-input {
    width: 100%;
}
</style>