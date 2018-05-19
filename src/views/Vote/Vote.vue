<template>
  <div class="vote">
    <ListTable :list="list"/>
  </div>
</template>

<script>
import ListTable from '@/components/ListTable.vue';

export default {
  name: 'vote',
  components: {
    ListTable
  },
  data() {
    return {
      list: [{
        name: '1'
      }]
    }
  }
}
</script>
