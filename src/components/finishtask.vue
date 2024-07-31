<template>
    <el-button type="success" size="small" @click="finishtask(row.id, row.name)">完成</el-button>
</template>
  
<script>

import { finishTaskService } from '@/api/task'

export default {
    name: 'deletetask',
    props: ['row'],
    methods: {
        finishtask(taskId, name) {
      this.$confirm(`确定完成："${name}", 是否继续?`, '确定完成', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          finishTaskService(taskId, name);
          this.$message.success(`已完成:"${name}"!`);
        })
        .catch(() => {
          this.$message.info('已取消完成');
        });
    },
    }
}
</script>