import React, { Fragment } from 'react';
import styles from './HighChartsEditorPreview.css'
import Button from 'part:@sanity/components/buttons/default'

export default class HighChartsEditorPreview extends React.Component {
  state = {
    isOpen: false
  }

  onOpenHandler = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const {value: {htmlStr = '', svgStr = '', title = ''} = {}} = this.props
    const {isOpen = false} = this.state
    const activeClasses = [styles['c-wrapper']]
    if (isOpen) {
      activeClasses.push(styles['c-wrapper--is-open'])
    }
    return <Fragment>
      <Button style={{margin: '12px'}} inverted onClick={this.onOpenHandler}>
        {isOpen ? 'Minimize' : 'Expand'}
      </Button>
      {title && <p>{title}</p>}
      <div className={activeClasses.join(' ')} dangerouslySetInnerHTML={{ __html: svgStr }}></div>
      <Button style={{margin: '12px'}} inverted onClick={this.onOpenHandler}>
        {isOpen ? 'Minimize' : 'Expand'}
      </Button>
    </Fragment>;
  }
}
