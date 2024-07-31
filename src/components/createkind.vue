<template>
  <el-button type="success" size="small" @click="showCreatekindDialog">新增种类</el-button>
  <el-dialog title="新增种类" v-model="createkindDialogVisible">
    <el-form :model="newkindData" label-width="80px">
      
      <el-form-item label="板块">
          <el-input v-model="plate.name" readonly/>
      </el-form-item>

      <el-form-item label="种类名称">
        <el-input v-model="newkindData.name"/>
      </el-form-item>
      <el-form-item label="执行人">
        <el-input v-model="newkindData.douser"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="createkindDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="createNewkind">确认</el-button>
    </template>
  </el-dialog>
</template>

<script>

import { addKindService } from '@/api/kind'
export default {
  props: ['plate'],
  data() {
    return {
      createkindDialogVisible: false,
      newkindData: {
        plateId: this.plateId,
        name: '',
        douser: '',
      },
    }
  },

  methods: {
    showCreatekindDialog() {
      this.createkindDialogVisible = true;
      this.fetchplates(); // 获取 plate 数据
    },
    createNewkind() {
      this.createkindDialogVisible = false;
      this.createkind(this.newkindData);
      this.newkindData = { name: '', douser: '', plateId: this.plateId }
    },
    createkind(kindData) {
      addKindService(kindData).then(response => {
        this.kinds.push(response.data)
        this.$message.success('新增成功');
      }).catch(error => {
        this.$message.error('新增失败', error);
      })
    },
  }
}
</script>