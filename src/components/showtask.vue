<template>
    <el-button @click="showModal" type="warning" size="small">详情 </el-button>


    <el-drawer title="任务详情" v-model="visible" :direction="rtl" append-to-body>
        <div class="task-details">
            <div class="task-item">
                <label>任务板块:</label>
                <span>{{formatValue(row, column, row.plate.name, index)  }}</span>
            </div>
            <div class="task-item">
                <label>任务类型:</label>
                <span>{{formatValue(row, column, row.kind.name, index)  }}</span>
            </div>
            <div class="task-item">
                <label>原通知:</label>
                <span>{{formatValue(row, column, row.wxNoticeFrom, index) }}</span>
            </div>
            <div class="task-item">
                <label>接收人:</label>
                <span>{{formatValue(row, column, row.toWho, index) }}</span>
            </div>
            <div class="task-item">
                <label>结束时间:</label>
                <span >{{ formatTime(row, column, row.endTime, index) }}</span>
            </div>
            <div class="task-item">
                <label>添加时间:</label>
                <span>{{ formatTime(row, column, row.addTime, index) }}</span>
            </div>
            <div class="task-item">
                <label>执行人:</label>
                <span>{{formatValue(row, column, row.kind.douser, index) }}</span>
            </div>

        </div>
    </el-drawer>
</template>
  
<script>
import dayjs from 'dayjs'
export default {
    name: 'showtask',
    props: ['row'],
    data() {
        return {
            task: {},
            visible: false,
        }
    },

    methods: {
        showModal() {
            this.visible = true
        },
        formatTime(row, column, cellValue, index) {
            if (cellValue) { return dayjs(cellValue).format('YYYY年M月D日H点m分') }
            else { return '--' }
        },
        formatValue(row, column, cellValue, index) {
            if (cellValue) { return cellValue } else { return '--' }
        },
    }
}
</script>
<style scoped>
.task-item span {
    flex: 1;
    color: #0d0d0dda;
    /* 设置文字颜色为灰色 */
    font-size: 18px;
}

.task-item label {
    flex: 1;
    color: #eb0c0cda;
    font-size: 18px;
}</style>