<template>
  <el-button type="primary" size="small" @click="showEditModal(row)">编辑</el-button>

  <el-dialog v-model="editModalVisible" title="编辑板块" append-to-body>
    <el-form :model="editForm" label-width="80px">
      <el-form-item label="板块名">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="责任人">
        <el-input v-model="editForm.dutyuser"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editModalVisible = false">取消</el-button>
      <el-button type="primary" @click="updatePlate">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { updatePlateService } from '@/api/plate'
export default {
  props: ['row'],
  data() {
    return {
      editModalVisible: false,
      editForm: { id: null, name: '', dutyuser: '' },
    }
  },
  methods: {
    showEditModal(row) {
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.dutyuser = row.dutyuser;
      this.editModalVisible = true;
    },
    updatePlate() {
      // 发送 PUT 请求更新板块信息
      updatePlateService(this.editForm).then(() => {
        this.$message.success('更新成功');
        this.editModalVisible = false;
        // 更新 plates 数据源
      }).catch((error) => {
        this.$message.error('更新失败: ' + error.message);
      });
    },
  }
}
</script>

  