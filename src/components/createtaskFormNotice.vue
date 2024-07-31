<template>
    <el-button type="success" @click="showAddNoticeDialog">按通知添加任务</el-button>

    <el-dialog v-model="noticeModalVisible" title="添加通知">
        <el-form :model="notice" label-width="80px">
            <el-form-item label="通知">
                <el-input v-model="notice.text"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="noticeModalVisible = false">取消</el-button>
            <el-button type="primary" @click="addTaskFromNotice">确定</el-button>
        </template>
    </el-dialog>

</template>
  
<script>
import { noticeService } from '@/api/task'

export default {
    name: 'createtask',
    data() {
        return {
            noticeModalVisible: false,
            notice: { text: ''},
        }
    },

    methods: {
        showAddNoticeDialog() {
            this.noticeModalVisible = true;
        },

        addNotice(notice) {
            noticeService(notice).then(response => {
                this.tasks.push(response.data)
                this.$message.success('新增成功');
            }).catch(error => {
                this.$message.error('新增失败', error);
            })
        },

        addTaskFromNotice() {
            this.addNotice(this.notice)
            this.noticeModalVisible = false;
            // 清空
            this.notice = { text: '' };
            this.fetchtasks();
        },
    }
}
</script>