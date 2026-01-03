import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    productList: [],
    ollPrice: 0,
    ProductPrice: 0,
    kvt: 0,
    kvtlist: [],
}

const redusers = createSlice({
    name: "Attractor",
    initialState,
    reducers: {
        kv: (state, action) => {
            const k = action.payload || 0;
            const acc = 200000 * k;
            const cost = 300000 * k;
            const OllkvtPrise = acc + cost;
            state.kvt = k
            state.kvtlist = {
                acc,
                cost,
                OllkvtPrise,
            };

        },
        increment: (state, action) => {
            const newdata = state.productList.map((item) => {
                if (item.id == action.payload.id) {
                    return {
                        ...item,
                        count: item.count,
                        userPrice: item.price * (item.count + 1),
                    }
                }
                return item
            });
            return { ...state, productList: newdata }
        }

    }
})


export default redusers.reducer;
export const { increment, kv } = redusers.actions;