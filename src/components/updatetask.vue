<template>
    <el-button type="primary" size="small" @click="showEditModal(row)">编辑</el-button>
    <el-dialog v-model="editModalVisible" title="编辑任务" append-to-body>
        <el-form :model="editForm" label-width="80px">

            <el-form-item label="任务名">
                <el-input v-model="editForm.name"></el-input>
            </el-form-item>

            <el-form-item label="截止时间">
                <el-date-picker v-model="editForm.endTime" type="datetime" placeholder="选择截止时间"
                    format="YYYY-MM-DD     HH:mm:ss" value-format="YYYY-MM-DDTHH:mm:ss.sssZ" />
            </el-form-item>

            <el-form-item label="原通知">
                <el-input v-model="editForm.wxNoticeFrom"></el-input>
            </el-form-item>

            <el-form-item label="接收人">
                <el-input v-model="editForm.toWho"></el-input>
            </el-form-item>
            
            <el-form-item label="发出通知">
                <el-input v-model="editForm.wxNoticeTo"></el-input>
            </el-form-item>

        </el-form>
        <template #footer>
            <el-button @click="editModalVisible = false">取消</el-button>
            <el-button type="primary" @click="updatetask">确定</el-button>
        </template>
    </el-dialog>
</template>
  
<script>
import { kindListService } from '@/api/kind'
import { updateTaskService } from '@/api/task'

export default {
    name: 'updatetask',
    props: ['row'],
    data() {
        return {
            kinds: [],
            editModalVisible: false,
            editForm: {
                id: null,
                name: '',
                wxNoticeFrom: '',
                toWho: '',
                wxNoticeTo: '',
                endTime: '',
            },
        }
    },

    mounted() {
        this.fetchkinds();
    },

    methods: {
        fetchkinds() {
            kindListService().then(response => {
                this.kinds = response.data
            }).catch(error => {
                console.error('Error fetching kinds:', error)
            })
        },
        showEditModal(row) {
            this.editForm.id = row.id;
            this.editForm.name = row.name;
            this.editForm.endTime = row.endTime;
            this.editForm.wxNoticeFrom = row.wxNoticeFrom;
            this.editForm.toWho = row.toWho;
            this.editForm.wxNoticeTo = row.wxNoticeTo;
            this.editModalVisible = true;
        },
        updatetask() {
            // 发送 PUT 请求更新种类信息
            updateTaskService(this.editForm)
                .then(() => {
                    this.$message.success('更新成功');
                    this.editModalVisible = false;
                })
                .catch((error) => {
                    this.$message.error('更新失败: ' + error.message);
                });
        },


    }
}
</script>