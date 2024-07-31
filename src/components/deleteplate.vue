<template>
  <el-button type="danger" size="small" @click="deletePlate(row.id, row.name)">删除</el-button>
</template>

<script>
import { deletePlateService } from '@/api/plate'

export default {
  props:['row'],
  methods: {
    deletePlate(plateId, name) {
      this.$confirm(`此操作将永久删除"${name}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletePlateService(plateId);
          this.$message.success('删除成功!');
        })
        .catch(() => {
          this.$message.info('已取消删除');
        });
    }
  }
}
</script>

  