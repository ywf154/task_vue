<template>
  <div id="tasksList">
    <div class="container_top">
      <createtask/>
      <goBackToTask/>
      <div>
        <span>任务总表</span>
      </div>
    </div>

    <div class="container_main">
      <!-- 列表 --------------------------------------------------------------------------------------------------->
      <el-table :data="tasks" stripe style="width: 100%">
        <el-table-column prop="kind.name" label="任务种类" width="150" :formatter="formatValue" />
        <el-table-column prop="kind.douser" label="执行人" width="100" />
        <el-table-column prop="name" label="任务名" width="150" show-overflow-tooltip />
        <el-table-column prop="endTime" label="截止时间" width="180" :formatter="formatTime" />

        <el-table-column prop="status" label="状态" width="90">
          <template v-slot="scope">
            <el-button v-if="scope.row.status" size="small" type="success"
              @click="notfinishtask(scope.row.id, scope.row.name)">
              已完成
            </el-button>
            <el-button v-else type="danger" size="small" @click="finishtask(scope.row.id, scope.row.name)">
              待完成
            </el-button>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="180">
          <template v-slot="{ row }">
            <updatetask :row="row"/>
            <deletetask :row="row"/>
          </template>
        </el-table-column>
        <el-table-column prop="finishTime" label="完成时间" width="180" :formatter="formatTime" />
        <el-table-column prop="wxNoticeFrom" label="原通知" width="100" show-overflow-tooltip />
        <el-table-column prop="wxNoticeTo" label="发出通知" width="100" show-overflow-tooltip />
        <el-table-column prop="toWho" label="接收人" width="100" :formatter="formatValue" />
        <el-table-column prop="addTime" label="更新时间" width="180" :formatter="formatTime" />
      </el-table>
 
    </div>

  </div>
</template>
  
<script>
import createtask from '@/components/createtask.vue'
import updatetask from '@/components/updatetask.vue'
import deletetask from '@/components/deletetask.vue'
import goBackToTask from '@/components/goBackToTask.vue'
import dayjs from 'dayjs'
import {
  tasksListService,
  finishTaskService,
  notfinishTaskService,
} from '@/api/task'

export default {
  name: 'tasksList',
  components: { createtask,updatetask,deletetask, goBackToTask},
  data() {
    return {
      tasks: [],
    }
  },
  mounted() {
    this.fetchtasks();
  },

  watch: {
    tasks: {
      handler() {
        this.fetchtasks()
      },
      deep: true
    }
  },

  methods: {
    goBack() {
      this.$router.push('/task');
    },
    // (row, column, cellValue, index)必须写完站位
    formatTime(row, column, cellValue, index) {
      if (cellValue) { return dayjs(cellValue).format('YYYY年M月D日H点m分') }
      else { return '--' }
    },
    formatValue(row, column, cellValue, index) {
      if (cellValue) { return cellValue } else { return '--' }
    },

    fetchtasks() {
      tasksListService().then(response => {
        this.tasks = response.data
      }).catch(error => {
        console.error('Error fetching tasks:', error)
      })
    },

    finishtask(taskId, name) {
      this.$confirm(`确定完成："${name}", 是否继续?`, '确定完成', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          finishTaskService(taskId, name);
          this.$message.success(`已完成:"${name}"!`);
        })
        .catch(() => {
          this.$message.info('已取消完成');
        });
    },

    notfinishtask(taskId, name) {
      this.$confirm(`确定取消完成："${name}", 是否继续?`, '取消完成', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          notfinishTaskService(taskId, name);
          this.$message.success(`已取消完成:"${name}"!`);
        })
        .catch(() => {
          this.$message.info('已取消操作');
        });
    },

  }

}

</script>
  