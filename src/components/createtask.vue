<template>
    <el-button type="success" @click="showCreatetaskDialog">新增任务</el-button>
    <el-dialog title="编辑任务" v-model="DialogVisible">
        <el-form :model="form" label-width="80px">
            <el-form-item label="种类">
                <el-select v-model="form.typeId" placeholder="请选择种类">
                    <el-option v-for="kind in kinds" :key="kind.id" :value="kind.id" :label="kind.name"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="截止时间">
                <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择截止时间"
                    value-format="YYYY-MM-DDTHH:mm:ss.sssZ" :default-value="getDefaultEndTime()">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="任务名称">
                <el-input v-model="form.name" @keyup.enter="createNewtask"></el-input>
            </el-form-item>

        </el-form>
        <template #footer>
            <el-button @click="DialogVisible = false">取消</el-button>
            <el-button type="primary" @click="createNewtask">确认</el-button>
        </template>
    </el-dialog>
    <!-- 新增  弹窗-------------------------------------------------- -->
</template>
  
<script>
import { kindListService } from '@/api/kind'
import { addTaskService } from '@/api/task'

export default {
    name: 'createtask',
    data() {
        return {
            DialogVisible: false,
            kinds: [],
            form: { typeId: '', name: '', endTime: this.getDefaultEndTime(), },
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

        showCreatetaskDialog() {
            this.DialogVisible = true;
        },

        createNewtask() {
            this.DialogVisible = false;
            this.createtask(this.form);
            // 清空
            this.form = { name: '', endTime: '', typeId: '' };

        },

        createtask(taskData) {
            addTaskService(taskData).then(response => {
                this.tasks.push(response.data)
                this.$message.success('新增成功');
            }).catch(error => {
                this.$message.error('新增失败', error);
            })
        },
        getDefaultEndTime() {
            const now = new Date();
            const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            return tomorrow;
        },
    }
}
</script>