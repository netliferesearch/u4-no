// import React from 'react';
// import FunkyTable from '../../components/FunkyTable'

// const TablePreview = (props = { value: {}}) => {
//   if(!props.value) return (<div></div>)
//   const {rows = [], title = 'Untitled'} = props.value
//   return(
//     <div style={{padding: '4px'}}>
//       <h2>{title}</h2>
//       <table style={{padding: '4px', borderCollapse: 'collapse' }}>
//         <tbody>{rows.map(({ columns = [] }, index) => (
//         <tr key={index} style={{ lineHeight: '1.4em'}}>
//           { columns && columns.map((col, index) => (
//             <td
//               key={index} style={{ padding: '4px', borderBottom: '1px solid black'}}>
//               {col}
//             </td>)
//             )}
//         </tr>)
//       )}</tbody></table>
//     </div>
//   )}

// export default {
//   name: 'funkyTable',
//   title: 'Data table',
//   type: 'object',
//   inputComponent: FunkyTable,
//   fields: [
//     {
//       name: 'title',
//       title: 'Table title',
//       type: 'string'
//     },
//     {
//       name: 'display',
//       title: 'Display as',
//       type: 'string',
//       options: {
//         list: [
//           { title: 'table', value: 'table' },
//           { title: 'Line chart', value: 'line' },
//           { title: 'Bar chart', value: 'bar' },
//         ],
//       },
//     },
//     {
//       name: 'rows',
//       type: 'array',
//       of: [
//         {
//           type: 'object',
//           fields: [
//             {
//               name: 'heading',
//               type: 'boolean'
//             },
//             {
//               name: 'columns',
//               type: 'array',
//               of: [{type: 'string'}]
//             }
//           ]
//         }
//       ],
//     }
//   ],
//   preview: {
//     select: {
//       rows: 'rows',
//       title: 'title'
//     },
//     component: TablePreview,
//   },
// }
