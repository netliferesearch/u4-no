/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

class ViewSDKClient {
  constructor() {
    this.readyPromise = new Promise(resolve => {
      if (window.AdobeDC) {
        resolve();
      } else {
        /* Wait for Adobe Document Services PDF Embed API to be ready */
        document.addEventListener('adobe_dc_view_sdk.ready', () => {
          resolve();
        });
      }
    });
    this.adobeDCView = undefined;
  }

  ready() {
    return this.readyPromise;
  }

  previewFile(divId, viewerConfig) {
    const config = {
      /* Pass your registered client id */
      clientId: process.env.ADOBE_PDF_API_KEY || '03eb8a44fac943518b5182b7b590c007',
    };
    if (divId) {
      /* Optional only for Light Box embed mode */
      /* Pass the div id in which PDF should be rendered */
      config.divId = divId;
    }
    /* Initialize the AdobeDC View object */
    this.adobeDCView = new window.AdobeDC.View(config);

    /* Invoke the file preview API on Adobe DC View object */
    const previewFilePromise = this.adobeDCView.previewFile(
      {
        /* Pass information on how to access the file */
        content: {
          /* Location of file where it is hosted 'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf' */
          location: {
            url: viewerConfig.src,
            /*
                    If the file URL requires some additional headers, then it can be passed as follows:-
                    headers: [
                        {
                            key: "<HEADER_KEY>",
                            value: "<HEADER_VALUE>",
                        }
                    ]
                    */
          },
        },
        /* Pass meta data of file */
        metaData: {
          /* file name 'Bodea Brochure.pdf' */
          fileName: viewerConfig.title,
          /* file ID */
          id: '',
        },
      },
      viewerConfig
    );

    return previewFilePromise;
  }

  previewFileUsingFilePromise(divId, filePromise, fileName) {
    /* Initialize the AdobeDC View object */
    this.adobeDCView = new window.AdobeDC.View({
      /* Pass your registered client id */
      clientId: process.env.ADOBE_PDF_API_KEY || '03eb8a44fac943518b5182b7b590c007',
      /* Pass the div id in which PDF should be rendered */
      divId,
    });

    /* Invoke the file preview API on Adobe DC View object */
    this.adobeDCView.previewFile(
      {
        /* Pass information on how to access the file */
        content: {
          /* pass file promise which resolve to arrayBuffer */
          promise: filePromise,
        },
        /* Pass meta data of file */
        metaData: {
          /* file name */
          fileName,
        },
      },
      {}
    );
  }

  registerSaveApiHandler() {
    /* Define Save API Handler */
    const saveApiHandler = (metaData, content, options) => {
      console.log(metaData, content, options);
      return new Promise(resolve => {
        /* Dummy implementation of Save API, replace with your business logic */
        setTimeout(() => {
          const response = {
            code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
            data: {
              metaData: Object.assign(metaData, { updatedAt: new Date().getTime() }),
            },
          };
          resolve(response);
        }, 2000);
      });
    };

    this.adobeDCView.registerCallback(
      window.AdobeDC.View.Enum.CallbackType.SAVE_API,
      saveApiHandler,
      {}
    );
  }

  registerEventsHandler() {
    /* Register the callback to receive the events */
    this.adobeDCView.registerCallback(
      /* Type of call back */
      window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
      /* call back function */
      event => {
        console.log(event);
      },
      /* options to control the callback execution */
      {
        /* Enable PDF analytics events on user interaction. */
        enablePDFAnalytics: true,
      }
    );
  }
}

export default ViewSDKClient;
