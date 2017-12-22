import * as React from 'react'
import styled from 'styled-components'

const PreviewContainer = styled.div`
  background: #333;
  color: #fff;
  padding: 1em 2em 1em 2em;
  margin-right: 1em;
`

const TestView = ({ rdata, collection_id, recordView }) => {
  const col = rdata.r_collections[collection_id]
  return (
    <div>
      <h3>{col.record.nameSingular} | Data</h3>
      <PreviewContainer>
        <code>
          <pre>
            {JSON.stringify(recordView[col.gql.typeName], null, 2)}
          </pre>
        </code>
      </PreviewContainer>
    </div>
  )
}

export default TestView
