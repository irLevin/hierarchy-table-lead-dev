import type { StoreDefinition } from 'pinia';
import type { TableRow, TransformedTableRow } from '@/types/TableRow';
import { defineStore } from 'pinia';
import { reduce, mapValues, unset, pickBy, isEmpty, omitBy, isObject, flow,  isArray, map, assign } from 'lodash-es';
import json from '@/data/data.json';

export const transformData = (
  rows: TableRow[]
) =>
  reduce(
    rows,
    (result: Record<string, TransformedTableRow>, row: TableRow) => {
      const id = row.data[Object.keys(row.data)[0]];
      return {
        ...result,
        [id]: {
          ...row,
          kids: mapValues(row.kids, (kid) =>
            kid ? { records: transformData(kid.records) } : kid
          ),
          open: false,
          expandable: false
        },
      };
    },
    {}
  );

export const removeEmptyObjects = (obj) => {
  let updatedObj = {};
      Object.keys(obj).forEach((key) => {
          if (obj[key] && typeof obj[key] === 'object') {
              const nestedObj = removeEmptyObjects (obj[key]);
              if (Object.keys(nestedObj).length) {
                updatedObj[key] = nestedObj;
              }
          } else if (obj[key] !== '' && obj[key] !== undefined && obj[key] !== null) {
            updatedObj[key] = obj[key];
          }
      });
      return updatedObj;
}


export const useDataStore: StoreDefinition = defineStore({
  id: 'data',
  state: (): { data } => ({
    data: transformData(json),
  }),
  actions: {
    deleteItem(path: string) {
      if (unset(this.data, path)) {
        this.data = removeEmptyObjects(this.data);
      }

    },
  },
});
