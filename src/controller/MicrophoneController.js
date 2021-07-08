import { ClassEvent } from '../utils/classEvent'

export class MicrophoneController extends ClassEvent {

    constructor() {

        super()

        this._mimeType = 'audio/webm'

        this._available = false

        navigator.mediaDevices.getUserMedia({
            audio: true

        }).then(stream => {

            this._available = true
            this._stream = stream


            this.trigger('ready', this._stream)

        }).catch(err => {

            console.error(err)

        })

    }

    stop() {

        console.log(this)

        this._stream.getTracks().forEach(track => {

            track.stop()

        })

    }

    isAvailable() {


        return this._available


    }

    startRecorder() {

        if (this.isAvailable()) {
            this._mediaRecorder = new MediaRecorder(this._stream, { MimeType: this._mimeType })

            this._recordedChunks = []

            this._mediaRecorder.addEventListener('dataavailable', event => {

                if (e.data.size > 0) {
                    this._recordedChunks.push(e.data)
                }

            })

            this._mediaRecorder.addEventListener('stop', event => {

                let blob = new Blob(this._recordedChunks, {

                    type: this._mimeType

                })

                let filename = `rec${Date.now()}.webm`

                let audioContext = new AudioContext()

                let reader = new FileReader()

                reader.onload = event => {

                    audioContext.decodeAudioData(reader.result).then(decode=>{

                        let file = new File([blob], filename, {
                            type: this._mimeType,
                            lastModified: Date.now()
                        })

                        this.trigger('recorded', file, decode)

                    })




                  

                }

                reader.readAsArrayBuffer(blob)





                let reader2 = new FileReader()

                reader2.onload = event => {

                    console.log('reader file', file)

                    let audio = new Audio(reader2.result)

                    audio.play()

                }

                reader2.readAsDataURL(file)

            })

            this._mediaRecorder.start()
            this.startTimer()

        }

    }

    stopRecorder() {


        if (this.isAvailable()) {
            this._mediaRecorder.stop()
            this.stop()
            this.stopTimer()
        }

    }

    startTimer() {

        let start = Date.now()

        this._recordMicrophoneInterval = setInterval(() => {

            this.trigger('recordtimer', (Date.now() - start))

        }, 100);

    }

    stopTimer() {

        clearInterval(this._recordMicrophoneInterval)


    }
}