import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './store';

export type Field = {
  name: string;
  type: string;
};

export type Table = {
  name: string;
  fields?: Field[];
};

export type TableState = {
  tables: Table[];
};

type Range = {
  start: string;
  end: string;
};

const initialState: TableState = {
  tables: [],
};

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.tables = action.payload;
    },
    updateTable: (state, action: PayloadAction<Table>) => {
        const index = state.tables.findIndex((table) => table.name === action.payload.name);
        if (index !== -1) {
            state.tables[index] = action.payload;
        }
    },
    updateTables: (state, action: PayloadAction<Table[]>) => {
        action.payload.forEach((table) => {
            const index = state.tables.findIndex((t) => t.name === table.name);
            if (index !== -1) {
                state.tables[index] = table;
            }
        });
    }
  },
});

export const TablesReducer = tablesSlice.reducer;
export const selectTablesState = (state: AppState) => state.tables;
export const {setTables, updateTable, updateTables} = tablesSlice.actions;

export default tablesSlice;
