<script setup>
/**
 * マグネット
 * 押すとカードを表示
 */
const propsValue = defineProps({
    modelValue: Boolean,
    color:String,
});
const localModel = ref(propsValue.modelValue)
const emit = defineEmits(['update.modelValue'])
watch(localModel, (newValue) => {
    emit('update:modelValue', newValue);
});

onMounted(() => {
})
const pushButton =()=>{
    localModel.value =true
    emit('update:modelValue', localModel.value);
}
const close = ()=>{
    localModel.value =false
    emit('update:modelValue', localModel.value);
}

const onClass = ()=>{
    let cls = propsValue.color
    if(localModel.value){
        cls+=' selected-magnet'
    }
    return cls
}
</script>
<template>
    <span class="magnet">
        <button class="magnet" :class="onClass()"
            @pointerdown="pushButton"
            @click="pushButton"
        ></button>
            <div class="shadow"
                v-if="localModel"
                @click.stop="close()"
            >
            </div>
            <span v-if="localModel" class="magnet-card" ><slot /></span>
            
    </span>
</template>
<style>
    .magnet{
        position:static;
        height:100%;
        float:left;
        width:2em;
        height:2em;
    }
    .magnet button{
        position:static;
        display:flex;
        justify-content: center;
        margin:0.1em;
        width:1.8em;
        height:1.8em;
        box-shadow: 0px 2px 1px 3px rgba(0, 0, 0, 0.5);
        border-radius: 50%;
    }
    .magnet button:hover,.magnet button:focus{
        margin:0.05em;
        width:1.9em;
        height:1.9em;
        box-shadow: 0px 5px 2px 6px rgba(0, 0, 0, 0.5);
    }
    .magnet button:active{
        margin:0;
        width:2em;
        height:2em;
        box-shadow: 0px 5px 20px 6px rgba(0, 0, 0, 0.5);
    }

    .magnet button.selected-magnet{
        margin:0.1em;
        width:1.8em;
        height:1.8em;
        z-index:999;
        box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 1);
        filter: brightness(1.5);
        position:absolute;
    }
    .magnet .shadow{
        z-index:980;
        position:fixed;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
    }
    .magnet-card{
        padding-top:1em;
        position:absolute;
        display:inline-block;
        z-index:990;
        animation: magnet-card-slide 500ms;
        transform-origin:top left;
    }

    @keyframes magnet-card-slide {
  0% {
    transform: translate(0,100vh) rotate(0deg);
  }
  30%{
    transform: translate(0,0) rotate(0deg);
  }
  50% {
    transform: translate(0,0) rotate(4deg);
  }
  100% {
    transform: translate(0,0) rotate(-1deg);
  }
}
</style>