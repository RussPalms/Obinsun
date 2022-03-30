// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export interface DB {
//   id: number;
//   text: string;
//   active: boolean;
//   done: boolean;
// }

// export const dbApi = createApi({
//   reducerPath: 'dbApi',
//   baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXTAUTH_URL}/` }),
//   tagTypes: ['DBs'],
//   endpoints: (builder) => ({
//     getAll: builder.query<DB[], void>({
//       query: () => `dbs`,
//       providesTags: [{ type: 'DBs', id: 'LIST' }],
//     }),
//     updateDB: builder.mutation<DB, DB>({
//       query(db) {
//         return {
//           url: `api/dbs/[${db.id}]`,
//           method: 'PUT',
//           body: db,
//         };
//       },
//       invalidatesTags: [{ type: 'DBs', id: 'LIST' }],
//     }),
//     deleteDB: builder.mutation<DB, DB>({
//       query(db) {
//         return {
//           url: `api/dbs/[${db.id}]`,
//           method: 'DELETE',
//           body: db,
//         };
//       },
//       invalidatesTags: [{ type: 'DBs', id: 'LIST' }],
//     }),
//     addDB: builder.mutation<string, string>({
//       query(text) {
//         return {
//           url: `dbs`,
//           method: 'POST',
//           body: {
//             text,
//           },
//         };
//       },
//       invalidatesTags: [{ type: 'DBs', id: 'LIST' }],
//     }),
//   }),
// });
