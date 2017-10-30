import React from 'react';
import FunkyTable from '../../components/FunkyTable'

export default {
  name: 'funkyTable',
  title: 'Data table',
  type: 'object',
  inputComponent: FunkyTable,
  fields: [
    {
      name: 'title',
      title: 'Table title',
      type: 'string'
    },
    {
      name: 'rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              type: 'boolean'
            },
            {
              name: 'columns',
              type: 'array',
              of: [{type: 'string'}]
            }
          ]
        }
      ],
    }
  ],
  preview: {
    select: {
      rows: 'rows',
      title: 'title'
    },
    prepare({rows = false, title = 'No title'}) {
      if(!rows) return { title: 'No data' }
      return {
        title,
        subtitle: (<table style={{padding: '4px', borderCollapse: 'collapse' }}><tbody>{rows.map((row, index) => <tr key={index} style={{ lineHeight: '1.4em'}}>{row.columns && row.columns.map((col, index) => (<td key={index} style={{ padding: '4px', borderBottom: '1px solid black'}}>{col}</td>))}</tr>)}</tbody></table>),
      }
    }
  }
}
