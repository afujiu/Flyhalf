<script setup>
/**
 * ボタン
 */
const propsValue = defineProps({
    color:String,
});

const emit = defineEmits(['click'])
/**
 * クリック
 */
const click =(e)=>{
    console.log(e)
    emit('click',e)
}
const onColor =()=>{
    return propsValue.color
}
</script>
<template>
        <button  class="pt-btn" @click="click">
            <div :class="onColor()">
                <slot />
            </div>
        </button>
</template>
<style>

.pt-btn{
    background:red;
}
.pt-btn div{
    display:inline-block;
    padding:0.2em;
    padding-right:1em;
    border-radius: 1px 5px 4px 4px;
    box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.7);
}

    .pt-btn:hover div,.pt-btn:focus div {
        transform: rotate(-45deg);
        transform-origin: middle left;
    }

    .pt-btn *{
        font-family: "hui-font";
    }

</style>