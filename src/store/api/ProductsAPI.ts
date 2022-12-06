import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    endpoints: (build) => ({
        getProducts: build.query({
            // query: () => `products`, /// for all products without limit
            query: (limit = '') => `products?${limit && `_limit=${limit}`}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }: {id: string}) => ({ type: 'Products' as const, id })),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        getProductById: build.query({
            query: (id) => `products/${id}`, /// for singular product
            providesTags: (result) =>
                result
                    ? [
                        { type: 'Products' as const, id: result.id },
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: 'products',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        }),
        removeProduct: build.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        })
    })
})

export const {useGetProductsQuery, useGetProductByIdQuery, useAddProductMutation,useRemoveProductMutation} = productsApi;