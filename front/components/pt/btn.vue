<script setup>
/**
 * ボタン
 */
const propsValue = defineProps({
    class: String,
});

const emit = defineEmits(['click'])
/**
 * クリック
 */
const click = (e) => {
    emit('click', e)
}
const onClass = () => {
    return propsValue.class
}
</script>
<template>
    <button class="pt-btn" @click="click">
        <div class="pt-btn-back">
            <div class="pt-btn-left" :class="onClass()">
                <slot />
            </div>
            <div class="pt-btn-right" :class="onClass()">　</div>
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
    box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0.7);
}

.pt-btn-left {
    display: inline-block;
    height: inherit;

}

.pt-btn-right {
    display: inline-block;
    height: inherit;
    width: 2em;
}

/**ホバー **/
.pt-btn:hover .pt-btn-back,
.pt-btn:focus .pt-btn-back {
    transform: rotate(-10deg);
    animation: btn-focus 150ms;
}

@keyframes btn-focus {
    0% {
        transform: rotate(0deg);
    }

    70% {
        transform: rotate(5deg);
    }

    100% {
        transform: rotate(-10deg);
    }
}


/**アクティブ **/
.pt-btn:active .pt-btn-back {
    padding-right: 1.5em;
    box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0);
}

@keyframes btn-active-back {
    0% {
        padding-right: 0em;
    }

    100% {
        padding-right: 1.5em;
    }
}

.pt-btn:active .pt-btn-left {
    padding-right: 0.5em;
    box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0.7);
}

@keyframes btn-active-left {
    0% {
        padding-right: 0em;
    }

    100% {
        padding-right: 0.5em;
    }
}

.pt-btn:active .pt-btn-right {
    position: absolute;
    right: 0.5em;
    top: 0;
    display: inline;
    width: 2em;
    height: 100%;
    box-shadow: -4px 4px 2px 1px rgba(0, 0, 0, 0.7);
    transform: rotate(25deg);
    animation: btn-active-right 100ms;
    border-radius: 0px 0px 6px 0px;
}

@keyframes btn-active-right {
    0% {
        width: 0em;
        right: 0em;
    }

    100% {
        width: 2em;
        right: 0.5em;
        border-radius: 0px 0px 6px 0px;
    }
}
</style>