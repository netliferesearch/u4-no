import React, { Component, Fragment } from 'react';
import { route } from 'part:@sanity/base/router'
import client from 'part:@sanity/base/client'
import Spinner from 'part:@sanity/components/loading/spinner'
import Icon from './components/Icon'

const Pane = ({ data = [] }) => {
  return <Fragment>
    <ul>
    {
        data.map(({_id, _type, title, workflow = {}}, index) =>{
          const {progress, assigned = []} = workflow
          return <li key={index}>
          <h2><a href={`/desk/${_type}/edit/${_id}`}>{title}</a></h2>
          <h3>Progress: {progress}</h3>
          <h3>Assigned to: {assigned.map(({ firstName, surname, _type, _id }, index) => <a key={index} href={`/desk/${_type}/edit/${_id}`}>{firstName} {surname}</a>)}</h3>
        </li>}
      )
    }
    </ul>
  </Fragment>
}

class FunkyWorkflow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }
  componentWillMount() {
    const data = this.fetchData()

  }
  fetchData() {
    client.fetch('*[_type == "publication" && defined(workflow.progress)][0..100] | order(_updatedAt){_type, _id, title, "workflow": workflow{progress,"assigned": assigned[]->{firstName, surname, _id, _type}}}').then(data => this.setState({ data, loaded: true })).catch(err => console.log(err))
  }
  render() {
    if (!this.state.loaded) return <Spinner fullscreen center message="Loading documents" />
    return (<div>
      <Pane data={this.state.data} />
    </div>)
  }
}


export default {
  router: route('/workflow'),
  name: 'funkyWorkflow',
  title: 'Workflow',
  icon: Icon,
  component: FunkyWorkflow
}
