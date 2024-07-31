
<template>
  <div id="kindList">
    <div>
      <createplate />
      <goBackToTask />
    </div>
    <div v-for="plate in plates" :key="plate.id">
      <div class="container_top">
        <h1>{{ plate.name }}</h1>
        <span>{{ plate.dutyuser }}</span>
        <createkind :plate="plate" />
        <updateplate :row="plate" />
        <deleteplate :row="plate" />
      </div>
      
      <el-table :data="plate.kinds">
        <el-table-column prop="name" label="种类名" width="200" />
        <el-table-column prop="douser" label="执行人" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <addtaskFormKind :row="scope.row" />
            <updatekind :row="scope.row" />
            <deletekind :row="scope.row" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>

import { plateListService } from '@/api/plate'
import addtaskFormKind from '@/components/addtaskFormKind.vue'
import updatekind from '@/components/updatekind.vue'
import updateplate from '@/components/updateplate.vue'
import deletekind from '@/components/deletekind.vue'
import deleteplate from '@/components/deleteplate.vue'
import createplate from '@/components/createplate.vue'
import createkind from '@/components/createkind.vue'
import goBackToTask from '@/components/goBackToTask.vue'
export default {
  name: 'kindList',
  components: {
    addtaskFormKind, 
    updatekind, 
    deletekind, 
    createplate,
    createkind, 
    goBackToTask,
    updateplate,
    deleteplate,
  },
  data() {
    return { plates: [], }
  },
  mounted() {
    this.fetchplates();
  },
  watch: {
    plates: {
      handler() {
        this.fetchplates()
      },
      deep: true
    }
  },
  methods: {
    fetchplates() {
      plateListService().then(response => {
        this.plates = response.data
      }).catch(error => {
        console.error('Error fetching plates:', error)
      })
    },
  }
}
</script>
