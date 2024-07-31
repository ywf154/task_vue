<template>
  <el-button type="success" size="small" @click="addTaskFromKind(row.id, row.name)">添加任务</el-button>
</template>
  
<script>
import { addTaskService } from '@/api/task'
export default {
  props: ['row'],
  data() {
    return {
      addTaskForm: {
        typeId: null,
        name: ''
      },
    }
  },
  methods: {
    addTaskFromKind(tyid, tymane) {
      this.addTaskForm.typeId = tyid;
      this.addTaskForm.name = tymane;
      this.createtask(this.addTaskForm);
      // 清空
      this.addTaskForm = { typeId: null, name: '' };
      this.$router.push('/task');
    },
    createtask(taskData) {
      addTaskService(taskData).then(response => {
        this.tasks.push(response.data)
        this.$message.success('新增成功');
      }).catch(error => {
        this.$message.error('新增失败', error);
      })
    },
  }
}
</script>