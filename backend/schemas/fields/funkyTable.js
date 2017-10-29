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
      name: 'grid',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'values',
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
      data: 'grid',
      title: 'title'
    },
    prepare({data = false, title = 'No title'}) {
      if(!data) return { title: 'No data' }
      return {
        title,
        subtitle: (<table style={{padding: '4px', borderCollapse: 'collapse' }}><tbody>{data.map(row => <tr style={{ lineHeight: '1.4em'}}>{row.values.map(col => (<td style={{ padding: '4px', borderBottom: '1px solid black'}}>{col}</td>))}</tr>)}</tbody></table>),
      }
    }
  }
}
