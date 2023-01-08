<template>
    <div class="container">
        <span>{{ props.content }}</span>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    content: { type: String, required: true }
})

</script>