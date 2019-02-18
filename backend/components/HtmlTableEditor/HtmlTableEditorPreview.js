import React, {Fragment} from 'react';
import styles from './HtmlTableEditorPreview.css'
import Button from 'part:@sanity/components/buttons/default'

export default class HtmlTableEditorPreview extends React.Component {
  state = {
    isOpen: false
  }

  onOpenHandler = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const {value: {htmlStr = ''} = {}} = this.props
    const {isOpen = false} = this.state
    const activeClasses = [styles['c-table']]
    if (isOpen) {
      activeClasses.push(styles['c-table--is-open'])
    }
    return <Fragment>
      <Button style={{margin: '12px'}} inverted onClick={this.onOpenHandler}>
        {isOpen ? 'Minimize' : 'Expand'}
      </Button>
      <div className={activeClasses.join(' ')} dangerouslySetInnerHTML={{ __html: htmlStr }}></div>
      <Button style={{margin: '12px'}} inverted onClick={this.onOpenHandler}>
        {isOpen ? 'Minimize' : 'Expand'}
      </Button>
    </Fragment>;
  }
}
