<template>
    <el-button @click="goBack">返回</el-button>
</template>
<script>
export default {
    methods: {
        goBack() {
            this.$router.push('/task');
        },
    }
}
</script>