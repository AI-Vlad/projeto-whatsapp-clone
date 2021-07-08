import { reject } from "async"
// const pdfjsLib = require('pdfjs-dist')
// const path = require('path')

// pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js')

export class DocumentPreviewController {


    constructor(file) {

        this._file = file

    }

    getPreviewData() {

        return new Promise((s, f) => {

            switch (this._file.type) {
                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':

                    let reader = new FileReader()

                    reader.onload = event => {

                        s({

                            src: reader.result,
                            info: this._file.name

                        })

                    }
                    reader.onerror = event => {

                        f(event)

                    }

                    reader.readAsDataURL(this._file)

                    break;

                case 'application/pdf':



                    break;

                default:

                    f()




            }

        })

    }

}