import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Document, Page } from 'react-pdf';
import throttle from 'lodash/throttle';

/**
 * PDF viewer that uses Mozillas tried and true pdf viewer underneath.
 *
 * This component listens for resize events and triggers re-renders of the pdf.
 * This is because the rendered pdf element cannot be simply resized with css.
 *
 * TODO: The react-pdf library has potential for leveraging service workers for rendering.
 */
export default class PdfViewer extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      numPages: null,
      pageNumber: 1,
      pdfWidth: 700,
      // resizing a browser triggers a ton of events this is to
      // prevent it from nedlessly triggering re-renders
      resizeHandler: throttle(() => this.updateWindowWidth(), 3000),
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyPressHandler);
    window.addEventListener('resize', this.state.resizeHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyPressHandler);
    window.removeEventListener('resize', this.state.resizeHandler);
  }

  onDocumentLoad({ numPages }) {
    this.setState({ numPages }, this.updateWindowWidth);
  }

  keyPressHandler(e) {
    const left = 37;
    const right = 39;
    if (left === e.keyCode) {
      this.decrementPageNumber();
    } else if (right === e.keyCode) {
      this.incrementPageNumber();
    }
  }

  updateWindowWidth() {
    if (typeof window === 'undefined') {
      // do nothing
    } else {
      const windowWidth = window.innerWidth;
      // let's make the pdf slightly narrower than the fullwidth window
      this.setState({ pdfWidth: windowWidth - 50 });
    }
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
    const { pageNumber, numPages, pdfWidth } = this.state;
    const { file } = this.props;
    return (
      <div className="c-pdf-viewer">
        <div className="c-pdf-viewer__controls">
          <div className="u-padding">
            <button className="c-btn c-btn--primary" onClick={this.decrementPageNumber}>
              <span className="c-btn__body">Previous</span>
            </button>
          </div>
          <div className="u-padding u-tc">
            {pageNumber} of {numPages}
          </div>
          <div className="u-padding">
            <button className="c-btn c-btn--primary" onClick={this.incrementPageNumber}>
              <span className="c-btn__body">Next</span>
            </button>
          </div>
        </div>
        <p className="u-tc">
          Tip: You can use the left/right arrows on your keyboard to navigate the pdf.
        </p>
        <div className="c-pdf-viewer__pdf">
          <Document file={file} onLoadSuccess={this.onDocumentLoad}>
            <Page width={pdfWidth} pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    );
  }
}
