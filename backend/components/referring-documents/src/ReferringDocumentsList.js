import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withDocument } from 'part:@sanity/form-builder'
import {List, Item} from 'part:@sanity/components/lists/default'
import QueryContainer from 'part:@sanity/base/query-container'
import ReferringDocumentListItem from './ReferringDocumentListItem'

class ReferringDocumentsList extends Component {

  render() {
    const { props } = this

    return (
    <QueryContainer
      query="*[!(_id in path('drafts.*')) && references($docId)] [0...101] {_id, _type}"
      params={{docId: props.document._id}}>
      {({result, loading, error, onRetry}) => {
        if (error) {
          return <div>Error: {error}</div>
        }
        console.log(result, loading, error, onRetry)

        if (loading) {
          return null
        }

        const docs = result.documents
        if (docs.length === 0) {
          return null
        }

        return (
          <div>
            <h2>Referring documents:</h2>

            <List>
              {docs.map(doc =>
                <ReferringDocumentListItem key={doc._id} document={doc} />
              )}

              {docs.length > 100 && (
                <Item>+ More documents</Item>
              )}
            </List>
          </div>
        )
      }}
    </QueryContainer>
    )
  }
}

export default withDocument(ReferringDocumentsList)
