export default {
    name: 'keywords',
    description: 'Choose from drop-down menu of the available U4 keywords.',
    type: 'array',
    of: [
      {
        type: 'reference',
        to: [
          {
            type: 'keyword'
          }
        ]
      }
    ],
}