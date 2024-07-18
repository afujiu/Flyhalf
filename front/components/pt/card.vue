<script setup>
/**
 * カード
 */
const propsValue = defineProps({
    width: { type: String, default: null },
    class: { type: String, default: null }
});

const onClass = () => {
    return propsValue.class
}
const onStyle = () => {
    let style = ''
    if (propsValue.width != null) {
        style += `width:${propsValue.width};`
    }
    return style
}

</script>
<template>
    <div class="pt-card" :style="onStyle()" :class="onClass()">
        <slot></slot>
    </div>
</template>
<style>
/*******************
カード
********************/
.pt-card {
    font-family: "hui-font";
    background: rgba(255, 255, 255, 1);
    color: black;
    border-radius: 2px 2px 2px 2px;
    box-shadow: 0px 2px 0px 4px rgba(0, 0, 0, 0.9);
}

.pt-card .pt-card {
    box-shadow: 0px 1.5px 1px 1.5px rgba(0, 0, 0, 0.4);
}
</style>