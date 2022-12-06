import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./slice/usersSlice";
import usersApi from "./api/UsersAPI";
import {productsApi} from "./api/ProductsAPI";

const store = configureStore({
    reducer: {
        users:usersReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware).concat(productsApi.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
// ReturnType is typescript utility
// store має декілька методів
// визначає возвращаємий тип значення методу getState

export type AppDispatch = typeof store.dispatch;