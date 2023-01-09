<template>
    <div class="container">
        <span class="title">{{ title }}</span>
    <br/>
        <a :href="props.href" class="link">{{ props.hrefText }}</a>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    title: { type: String, required: true },
    hrefText: { type: String, required: true },
    href: { type: String, required: true }
})

const clicked = () => {
    window.location.href = props.href
}

</script>

<style scoped lang="scss">

.title {
    font-size: 1.2rem;
    font-weight: 500;
    color: #fff;
}

.link {
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
}


</style>