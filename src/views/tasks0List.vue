<template>
  <div id="tasks0List">
    <div class="container_top">
      <createtask />
      <createtaskFormNotice />
      <el-button type="success" @click="goToKind">按种类添加</el-button>
      <el-button type="warning" @click="goToAll">任务总表</el-button>
      <div>
        <span>需要完成的任务</span>
      </div>
    </div>

    <div class="container_main">
      <!-- 列表 --------------------------------------------------------------------------------------------------->
      <el-table :data="tasks">

        <el-table-column prop="kind.name" label="任务种类" width="150" />
        <el-table-column prop="name" label="任务名" width="200" show-overflow-tooltip />
        <el-table-column prop="endTime" label="截止时间" width="180" :formatter="formatTime" />
        <el-table-column label="剩余时间" width="300">
          <template v-slot="scope">
            {{ getLeftTime(scope.row.endTime) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="300">
          <template v-slot="{ row }">
            <finishtask :row="row" />
            <showtask :row="row" />
            <updatetask :row="row" />
            <deletetask :row="row" />
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>
  
<script>
import createtask from '@/components/createtask.vue'
import updatetask from '@/components/updatetask.vue'
import deletetask from '@/components/deletetask.vue'
import finishtask from '@/components/finishtask.vue'
import showtask from '@/components/showtask.vue'
import createtaskFormNotice from '@/components/createtaskFormNotice.vue'
import dayjs from 'dayjs'
import { tasks0ListService } from '@/api/task'
export default {
  name: 'tasks0List',
  components: { createtask, updatetask, deletetask, finishtask, createtaskFormNotice,showtask },
  data() {
    return {
      tasks: [],
    }
  },
  mounted() {
    this.fetchtasks();
    this.setPageTitle()
  },

  watch: {
    tasks: {
      handler() { this.fetchtasks() },
      deep: true
    }
  },

  methods: {
    setPageTitle() {
      document.title = '任务管理'
    },
    goBack() {
      this.$router.push('/task');
    },
    goToAll() {
      this.$router.push('/task/all');
    },
    goToKind() {
      this.$router.push('/kind');
    },
    goToPlate() {
      this.$router.push('/plate');
    },
    getLeftTime(endTime) {
      const now = new Date();
      const end = new Date(endTime);
      const remainingTime = end.getTime() - now.getTime(); // 剩余时间(毫秒)

      // 如果剩余时间小于0，说明已经过期
      if (remainingTime < 0) {
        return '已过截止时间';
      } else {
        // 计算天、时、分、秒
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

        return `${days}天 ${hours}时 ${minutes}分`;
      }
    },
    // (row, column, cellValue, index)必须写完站位
    formatTime(row, column, cellValue, index) {
      return dayjs(cellValue).format('YY年M月D日H点m分')
    },
    getDefaultEndTime() {
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      return tomorrow;
    },
    fetchtasks() {
      tasks0ListService().then(response => {
        this.tasks = response.data
      }).catch(error => {
        console.error('Error fetching tasks:', error)
      })
    },
  },
}
</script>
  
<style>
.container_top {
  display: flex;
  gap: 5px;
  /* 增加元素之间的间隔 */
  align-items: center;
  /* 垂直居中 */
}

.el-table-wrapper {
  display: flex;
  justify-content: center;
}

.el-table {
  width: 100%;
  max-width: 2000px; /* 设置表格最大宽度为 1200px */
  table-layout: fixed;
}

.el-table th {
  background-color: #f5f5f5;
  color: #333;
}

.el-table td {
  padding: 5px 0;
}

.el-table tr {
  background-color: #fff;
  border-bottom: 1px solid #eeeeee;
}

.el-table tr:hover {
  background-color: #ebe308;
  color: #bc0c0c;
  border-bottom: 1px solid #230606;
  font-size: 25px;
}





.el-table th, .el-table td {
  font-variant: small-caps;
}

</style>
  