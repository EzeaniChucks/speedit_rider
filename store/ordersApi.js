import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define your base URL
const BASE_URL = 'https://speedit-server.onrender.com/v1/api/riders/'; // For iOS simulator
// const BASE_URL = 'http://10.0.2.2:3000/api/riders/'; // For Android emulator

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['AvailableOrders', 'CurrentOrder', 'OrderHistory', 'Order'], // For cache invalidation
  endpoints: (builder) => ({
    getAvailableOrders: builder.query({
      query: ({ radius, riderLocation }) =>
        `orders/available/?radius=${radius}&rider_location=[${riderLocation.join(',')}]`,
      providesTags: ['AvailableOrders'],
    }),
    acceptOrder: builder.mutation({
      query: (orderId) => ({
        url: `orders/${orderId}/accept/`,
        method: 'POST',
      }),
      invalidatesTags: ['AvailableOrders', 'CurrentOrder', 'Order'],
    }),
    cancelOrder: builder.mutation({
      query: ({ orderId, reason }) => ({
        url: `orders/${orderId}/cancel`,
        method: 'PATCH',
        body: reason ? { reason } : {}, // Only send reason if provided
      }),
      invalidatesTags: ['AvailableOrders', 'CurrentOrder', 'Order'],
    }),
    getOrderHistory: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `orders/history/?page=${page}&limit=${limit}`,
      providesTags: ['OrderHistory'],
    }),
    getCurrentOrder: builder.query({
      query: () => 'orders/current/',
      providesTags: ['CurrentOrder', 'Order'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `orders/${orderId}/status/`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['CurrentOrder', 'OrderHistory', 'Order'],
    }),
    confirmVendorPayment: builder.mutation({
      query: (orderId) => ({
        url: `orders/${orderId}/confirm-vendor-payment`,
        method: 'POST',
      }),
      // Potentially invalidate CurrentOrder or Order if it affects its state
      invalidatesTags: ['CurrentOrder', 'Order'],
    }),
    getOrderDetails: builder.query({ // Example: if you need details of a specific order
        query: (orderId) => `orders/${orderId}/`, // Assuming such an endpoint exists
        providesTags: (result, error, orderId) => [{ type: 'Order', id: orderId }],
    }),
  }),
});

export const {
  useGetAvailableOrdersQuery,
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useGetOrderHistoryQuery,
  useGetCurrentOrderQuery,
  useUpdateOrderStatusMutation,
  useConfirmVendorPaymentMutation,
  useGetOrderDetailsQuery, // Export if you use it
} = ordersApi;