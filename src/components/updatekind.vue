<template>
  <el-button type="primary" size="small" @click="showEditModal(row)">编辑</el-button>
  <el-dialog v-model="editModalVisible" title="编辑种类" append-to-body>
    <el-form :model="editForm" label-width="80px">
      <el-form-item label="种类名">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="执行人">
        <el-input v-model="editForm.douser"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editModalVisible = false">取消</el-button>
      <el-button type="primary" @click="updatekind">确定</el-button>
    </template>
  </el-dialog>
</template>
  
<script>
import { updateKindService } from '@/api/kind'
export default {
  props: ['row'],
  data() {
    return {
      editModalVisible: false,
      editForm: { id: null, name: '', douser: '' },
    }
  },
  methods: {
    showEditModal(row) {
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.douser = row.douser;
      this.editModalVisible = true;
    },
    updatekind() {
      // 发送 PUT 请求更新种类信息
      updateKindService(this.editForm).then(() => {
        this.$message.success('更新成功');
        this.editModalVisible = false;
      }).catch((error) => {
        this.$message.error('更新失败: ' + error.message);
      });
    },
  }
}
</script>
