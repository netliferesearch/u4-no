import React, { Component } from 'react';
import { route } from 'part:@sanity/base/router'
import Icon from './components/Icon'
import client from 'part:@sanity/base/client'



const Pane = ({ data = false }) => {
  return (<div>
    <ul>
    {
        data && data.map(({_id, _type, title, workflow}, index) => <li key={index}>
          <h2><a href={`/desk/${_type}/edit/${_id}`}>{title}</a></h2>
          {
            console.log(workflow)
          }
          <h3>Progress: {workflow.progress}</h3>
          <h3>Assigned to: {workflow.assigned.map(({ firstName, surname, _type, _id }, index) => <a key={index} href={`/desk/${_type}/edit/${_id}`}>{firstName} {surname}</a>)}</h3>
        </li>)
    }
    </ul>
  </div>)
}

class FunkyWorkflow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    const data = this.fetchData()

  }
  async fetchData() {
    const data = await client.fetch('*[_type == "publication" && defined(workflow.progress)][0..10]{_type, _id, title, "workflow": workflow{progress,"assigned": assigned[]->{firstName, surname, _id, _type}}}')
    this.setState({ data, loaded: true })
  }
  render() {
    if (!this.state.loaded) return <div>Loading…</div>
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
