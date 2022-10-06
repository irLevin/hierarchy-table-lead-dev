<template>
  <h4 class="px-2 font-bold uppercase text-neutral-600">
    {{ name }}
  </h4>
  <section v-if="!isEmpty(data)" v-bind="$attrs">
    <header class="flex">
      <div
        class="w-8 shrink-0 border-y border-neutral-900 bg-primary-300 px-2 py-1"
      ></div>
      <div
        class="min-w-[8rem] flex-1 break-all border-y border-neutral-900 bg-primary-300 px-2 py-1 sm:min-w-0"
        v-for="a in fields()"
        :key="a"
      >
        {{ a }}
      </div>
      <div
        class="w-8 shrink-0 border-y border-neutral-900 bg-primary-300 px-2 py-1"
      ></div>
    </header>
    <main>
      <template v-for="(a, b) in props.data">
        <div
          class="flex"
          @click="view(a)"
          data-test="table-row"
          :class="{ 'cursor-pointer': !isEmpty(a.kids) }"
        >
          <div
            class="flex w-8 shrink-0 items-center border-y border-neutral-900 px-2 py-1"
          >
            <div v-if="props.name != 'has_phone' && !isEmpty(a.kids)">
              <chevron-up-icon class="h-4 w-4" v-if="a.open"/>
              <chevron-down-icon class="h-4 w-4" v-else/>
            </div>
          </div>
          <div
            class="flex min-w-[8rem] flex-1 items-center break-all border-y border-neutral-900 px-2 py-1 sm:min-w-0"
            v-for="field in fields()"
            :key="field"
          >
            {{ a.data[field] }}
          </div>
          <div class="w-8 shrink-0 border-y border-neutral-900 px-2 py-1">
            <button
              class="flex h-full items-center"
              @click.stop="del(`${path}${path ? '.' : ''}${b}`)"
              data-test="table-delete-button"
            >
              <x-icon class="h-4 w-4 text-error-500"/>
            </button>
          </div>
        </div>
        <template v-if="!isEmpty(a.kids)">
          <div v-show="a.open" class="my-2 pl-4" data-test="table-subblock">
            <HierarchyTable
              :data="a.kids[Object.keys(a.kids)[0]].records"
              :name="Object.keys(a.kids)[0]"
              :path="`${path}${path ? '.' : ''}${b}.kids.${
                Object.keys(a.kids)[0]
              }.records`"
              @del="del"
            />
          </div>
        </template>
      </template>
    </main>
  </section>
</template>

<script setup lang="ts">
import type { TransformedTableRow } from '@/types/TableRow';
import { ChevronUpIcon, ChevronDownIcon, XIcon } from '@heroicons/vue/outline';
import { isEmpty, values, keys} from 'lodash-es';

const props = withDefaults(
  defineProps<{
    data: Record<string, TransformedTableRow>;
    name?: string;
    path?: string;
  }>(),
  {name: 'Table', path: ''}
);
const emit = defineEmits(['del']);
const fields = () =>
  isEmpty(props.data) ? [] : keys(values(props.data)[0].data);
const rowHasKids = (row: TransformedTableRow) => {
  return Object.keys(row.kids).length > 0;
};
const view = (row: TransformedTableRow) => {
  const doOpen = rowHasKids(row);
  row.open = doOpen ? !row.open : false;
};
const del = (p: string) => {
  emit('del', p);
};
</script>
