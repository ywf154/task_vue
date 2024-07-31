<template>
    <el-button type="danger" size="small" @click="deletetask(row.id, row.name)">删除</el-button>
</template>
  
<script>

import { deleteTaskService } from '@/api/task'

export default {
    name: 'deletetask',
    props: ['row'],
    methods: {
        deletetask(taskId, name) {
            this.$confirm(`此操作将永久删除"${name}", 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteTaskService(taskId);
                this.$message.success('删除成功!');
            }).catch((err) => {
                this.$message.info('已取消删除',err);
            });
        },
    }
}
</script>