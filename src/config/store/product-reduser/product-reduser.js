import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  ollPrice: 0,
  ProductPrice: 0,
  kvt: 0,
  kvtlist: {
    acc: 0,
    cost: 0,
    OllkvtPrise: 0,
  },
};

const redusers = createSlice({
  name: "Attractor",
  initialState,
  reducers: {
    kv: (state, action) => {
      const payload = action.payload || {};

      const newKvt =
        payload.kvt !== undefined ? Number(payload.kvt) : state.kvt;
      const newAcc =
        payload.acc !== undefined ? Number(payload.acc) : state.kvtlist.acc;
      const newCost =
        payload.cost !== undefined ? Number(payload.cost) : state.kvtlist.cost;

      let finalAcc = newAcc;
      let finalCost = newCost;

      if (payload.kvt !== undefined) {
        if (payload.acc === undefined) {
          finalAcc = 200000 * newKvt;
        }
        if (payload.cost === undefined) {
          finalCost = 300000 * newKvt;
        }
      }

      const OllkvtPrise = finalAcc + finalCost;

      state.ollPrice = OllkvtPrise;

      state.kvt = newKvt;
      state.kvtlist = {
        acc: finalAcc,
        cost: finalCost,
        OllkvtPrise,
      };
    },
    addProduct: (state, action) => {
      const product = state.productList.find((p) => p.id == action.payload.id);
      const price = Number(action.payload.selling_price) || 0;
      if (!product) {
        state.productList.push({
          ...action.payload,
          count: 1,
          total_amount: price,
          ollPrice: price,
        });
      }
    },
    increment: (state, action) => {
      const newdata = state.productList.map((item) => {
        if (item.id == action.payload.id) {
          const newcount = item.count + 1;
          const price = Number(item.selling_price) || 0;
          return {
            ...item,
            count: newcount,
            total_amount: price * newcount,
            
          };
        }
        return item;
      });
      return { ...state, productList: newdata };
    },
    decrement: (state, action) => {
      const newdata = state.productList.map((item) => {
        if (item.id == action.payload.id) {
          const newCount = item.count - 1;
          const price = Number(item.selling_price) || 0;
          return {
            ...item,
            count: newCount,
            total_amount: newCount > 0 ? price * newCount : 0,
            ollPrice: price * newCount,
          };
        }
        return item;
      });
      const filtered = newdata.filter((item) => item.count > 0);
      return { ...state, productList: filtered };
    },
  },
});

export default redusers.reducer;
export const { increment, kv, decrement, addProduct } = redusers.actions;
