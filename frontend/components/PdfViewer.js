import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Document, Page } from 'react-pdf';

export default class PdfViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
    };
    autoBind(this);
  }

  onDocumentLoad({ numPages }) {
    this.setState({ numPages });
  }

  incrementPageNumber() {
    if (!this.state.numPages) {
      // do nothing
    } else if (this.state.pageNumber < this.state.numPages) {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
    }
  }

  decrementPageNumber() {
    if (!this.state.numPages) {
      // do nothing
    } else if (this.state.pageNumber > 1) {
      this.setState({ pageNumber: this.state.pageNumber - 1 });
    }
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const { file } = this.props;

    return (
      <div className="c-pdf-viewer">
        <div className="c-pdf-viewer__controls">
          <div className="u-padding">
            <button className="c-btn c-btn--primary" onClick={this.decrementPageNumber}>
              <span className="c-btn__body">Previous</span>
            </button>
          </div>
          <div className="u-padding">
            Page {pageNumber} of {numPages}
          </div>
          <div className="u-padding">
            <button className="c-btn c-btn--primary" onClick={this.incrementPageNumber}>
              <span className="c-btn__body">Next</span>
            </button>
          </div>
        </div>
        <div className="c-pdf-viewer__pdf">
          <Document file={file} onLoadSuccess={this.onDocumentLoad}>
            <Page scale="1.5" pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    );
  }
}
