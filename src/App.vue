<template>
  <HierarchyTable :data="data" @del="removeRow" />
</template>

<script setup lang="ts">
import HierarchyTable from '@/components/hierarchy/HierarchyTable.vue';
import { computed } from 'vue'
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const data = computed(() => dataStore.data);

const removeRow = (path: string) => {
  dataStore.deleteItem(path);
};
</script>
