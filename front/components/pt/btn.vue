<script setup>
/**
 * ボタン
 */
const propsValue = defineProps({
    cls: String,
});

const emit = defineEmits(['click'])
/**
 * クリック
 */
const click = (e) => {
    console.log(e)
    emit('click', e)
}
const onClass = () => {
    return propsValue.cls
}
</script>
<template>
    <button class="pt-btn" @click="click">
        <div class="pt-btn-back">
            <div class="pt-btn-left" :class="onClass()">
                <slot />
            </div>
            <div class="pt-btn-right" :class="onClass()"></div>
        </div>
    </button>
</template>
<style>
.pt-btn {
    outline: none;
    opacity: 0.9;
}

.pt-btn * {
    font-family: "hui-font";
}

.pt-btn-back {
    height: 100%;
}

.pt-btn-left {
    height: 100%;
    padding-right: 1em;
    display: inline;
    box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0.7);
}

.pt-btn-right {
    display: inline;
    width: 1em;
    height: 100%;
    box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0.7);
}

/**ホバー **/
.pt-btn:hover .pt-btn-back,
.pt-btn:focus .pt-btn-back {
    transform: rotate(-15deg);
    animation: btn-focus 150ms;
}

@keyframes btn-focus {
    0% {
        transform: rotate(0deg);
    }

    70% {
        transform: rotate(10deg);
    }

    100% {
        transform: rotate(-15deg);
    }
}


/**アクティブ **/
.pt-btn:active .pt-btn-back {
    padding-right: 1em;
    animation: btn-active-back 100ms;
}

@keyframes btn-active-back {
    0% {
        padding-right: 0em;
    }

    100% {
        padding-right: 1em;
    }
}

.pt-btn:active .pt-btn-left {
    padding-right: 0em;
    animation: btn-active-left 100ms;
}

@keyframes btn-active-left {
    0% {
        padding-right: 1em;
    }

    100% {
        padding-right: -1em;
    }
}

.pt-btn:active .pt-btn-right {
    position: absolute;
    width: 2em;
    transform: translate(-1.4em, 4px) rotate(25deg);
    transform-origin: right;
    border-radius: 0 2px 5px 0;
    box-shadow: -4px 2px 1px 1px rgba(0, 0, 0, 0.7);
    animation: btn-active-right 100ms;
}

@keyframes btn-active-right {
    0% {
        width: 0em;
        border-radius: 0 0 0 0;
        transform: translate(0em, -2px);
    }

    70% {
        width: 0.5em;
        border-radius: 0 0 0 0;
        transform: translate(0em, -2px) rotate(0deg);
    }

    75% {
        width: 0.5em;
        border-radius: 0 0 0 0;
        transform: translate(0em, -2px) rotate(0deg);
    }


    100% {
        width: 2em;
        border-radius: 0 2px 5px 0;
    }
}
</style>