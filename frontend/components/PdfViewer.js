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
    } else if (this.state.pageNumber > 0) {
      this.setState({ pageNumber: this.state.pageNumber - 1 });
    }
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const { file } = this.props;

    return (
      <div>
        <div className="o-layout">
          <div className="o-layout__item u-padding u-2/12">
            <button onClick={this.decrementPageNumber}>Previous</button>
          </div>
          <div className="o-layout__item u-padding u-2/12">
            <button onClick={this.incrementPageNumber}>Next</button>
          </div>
          <Document
            className="o-layout__item u-padding u-1/1"
            file={file}
            onLoadSuccess={this.onDocumentLoad}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}
