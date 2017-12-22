import * as React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import buildView from './buildView'
import getFieldList from './getFieldList'
import FieldList from './FieldList'
import TestView from './TestView'

const DemoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #e8e8e8;
  padding: 2em;
`

class View extends React.Component {

  /** Providing some initial hardcoded defaults for testing */
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      rdata: null,
      record_id: '5a3c5721ae08b284c4de251b',
      collection_id: '5a2dab8b9196db0e19067d48',
      activeFields: [
        '5a2dab8b9196db0e19067d49',
        '5a2dab8b9196db0e19067d4a'
      ]
    }
  }

  toggleField = async (i, { target:{ name, checked: isChecked }}) => {

    const { record_id, collection_id, activeFields } = this.state

    /** Make a copy of the current active fields array */
    let f = activeFields.slice()

    /** Exit if checked fields would be empty */
    if (!isChecked && f.length === 1) return

    this.setState({loading: true})

    /** Add/remove the checked field to the list, ensure unqiueness */
    f = isChecked && f.indexOf(name) === -1
      ? [ ...f, name]
      : f.filter(id => id !== name)

    /** Update the checkbox before await, to keep checkbox UI responsive */
    this.setState({activeFields: f})

    /**
     * Build new view and GraphQL query.
     * @todo Update GraphQL query directly, to avoid
     * another server roundtrip.
     */
    try {
      this.setState({
        rdata: await buildView(record_id, collection_id, f),
        loading: false
      })
    } catch(e) {
      this.setState({
        error: e,
        loading: false
      })
    }
  }

  async componentDidMount() {

    const { collection_id, activeFields, record_id } = this.state

    try {
      const [ fields, rdata ] = await Promise.all([
        getFieldList(collection_id),
        buildView(record_id, collection_id, activeFields)
      ])
      this.setState({
        loading: false,
        rdata,
        fields
      })
    } catch(e) {
      this.setState({ loading: false, error: e })
    }
  }

  recordWithData = () => {

    const { rdata } = this.state

    if (rdata && rdata.query) {

      const RecordView = graphql(gql(rdata.query), {
        options: {
          fetchPolicy: 'cache-and-network',
          variables: {}
        },
        props: ({ data }) => ({
          loading: data.loading,
          error: data.error,
          recordView: data,
          rdata,
          collection_id: this.state.collection_id
        })
      })(TestView)

      return <RecordView />

    } else {
      return <h4>No data, ensure at least one field is selected.</h4>
    }
  }

  render() {
    const { fields, activeFields } = this.state
    return (
      <DemoContainer>
        <FieldList
          toggleField={this.toggleField}
          activeFields={activeFields}
          fields={fields}
        />
        {this.recordWithData()}
      </DemoContainer>
    )
  }
}

export default withRouter(View)
