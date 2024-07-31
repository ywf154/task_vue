<template>
    <el-button type="success" @click="showCreatePlateDialog">新增板块</el-button>
    <el-dialog title="新增板块" v-model="createPlateDialogVisible">
        <el-form :model="newPlateData" label-width="80px">
          <el-form-item label="板块名称">
            <el-input v-model="newPlateData.name"></el-input>
          </el-form-item>
          <el-form-item label="责任人">
            <el-input v-model="newPlateData.dutyuser"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="createPlateDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="createNewPlate">确认</el-button>
        </template>
      </el-dialog>
</template>
  
<script>

import { addPlateService } from '@/api/plate'

export default {
  name: 'createplate',
  data() {
    return {
      createPlateDialogVisible: false,
      newPlateData: {
        name: '',
        dutyuser: ''
      },
    }
  },

  methods: {
    showCreatePlateDialog() {
      this.createPlateDialogVisible = true;
    },

    createNewPlate() {
      this.createPlateDialogVisible = false;
      this.createPlate(this.newPlateData);
      // 清空
      this.newPlateData = { name: '', dutyuser: '' };
      this.fetchPlates();
    },

    createPlate(plateData) {
      addPlateService(plateData).then(response => {
        this.plates.push(response.data)
        this.$message.success('新增成功');
      }).catch(error => {
        this.$message.error('新增失败', error);
      })
    },
  }
}
</script>

  