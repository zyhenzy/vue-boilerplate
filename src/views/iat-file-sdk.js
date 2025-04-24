const frameSize = 1280
const format = 'audio/L16;rate=16000'
const encoding = 'raw'
export default class IatFileSdk {
    /**
     *
     * @param  {{url: string, apiKey: string, apiSecret: string}} config
     * @param {{newMessage: (string)=>void}} options
     */
    constructor (config, options = {}) {
        Object.defineProperty(this, 'url', {
            configurable: false,
            value: config.url,
            writable: false,
            enumerable: false
        })

        Object.defineProperty(this, 'newMessage', {
            configurable: false,
            value: options.newMessage || (() => {}),
            writable: false,
            enumerable: false
        })

        Object.defineProperty(this, 'ws', {
            configurable: false,
            value: null,
            writable: true,
            enumerable: false
        })
        Object.defineProperty(this, 'interval', {
            configurable: false,
            value: null,
            writable: true,
            enumerable: false
        })
        Object.defineProperty(this, 'status', {
            configurable: false,
            value: 0,
            writable: true,
            enumerable: false
        })
        Object.defineProperty(this, 'resolve', {
            configurable: false,
            value: 0,
            writable: true,
            enumerable: false
        })
        Object.defineProperty(this, 'reject', {
            configurable: false,
            value: 0,
            writable: true,
            enumerable: false
        })
    }

    start (file) {
        return new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
            const ws = new WebSocket(this.url)
            ws.onmessage = (e) => {
                this.wsMessage(e)
            }
            ws.onerror = () => {
                this.wsError()
            }
            ws.onclose = this.wsClose

            ws.onopen = () => {
                const fileReader = new FileReader();
                fileReader.onload = async () => {
                    const result = fileReader.result
                    for (let i = 0; i < result.byteLength; i++) {
                        try {
                            this.fileLoaded(fileReader.result, i)
                        } catch (e) {
                            this.reject(e)
                            return
                        }
                        if (this.status === 2) {
                            return
                        }
                        await this.sleep(10)
                    }
                }
                fileReader.readAsArrayBuffer(file)
            }

            this.ws = ws
        })
    }

    async sleep (time) {
        return new Promise(resolve => {
            if (time <= 0) {
                resolve()
                return
            }
            setTimeout(resolve, time)
        })
    }

    fileLoaded (result, i) {
        let datas = null;
        if (i >= result.byteLength / frameSize) {
            this.status = 2;
        } else {
            datas = new Uint8Array(result.slice(frameSize * i, frameSize * (i + 1)));
        }

        // 首帧
        if (this.status === 0) {
            const data = {};
            data.status = 0;
            data.format = format;
            data.encoding = encoding;
            data.audio = window.btoa(String.fromCharCode(...datas));
            const frame = {};
            frame.common = {
                app_id: 'MIME1000'
            }
            frame.business = {
                domain: 'iat',
                language: 'zh_cn',
                uid: new Date().getTime().toString()
            };
            frame.data = data;
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify(frame));
            }
            this.status = 1;
        } else if (this.status === 1) {
            // 中间帧
            const data = {};
            data.status = 1;
            data.format = format;
            data.encoding = encoding;
            data.audio = window.btoa(String.fromCharCode(...datas));
            const frame = {};
            frame.data = data;
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify(frame));
            }
        } else {
            // 最后一帧
            const data = {};
            data.status = 2;
            data.format = format;
            data.encoding = encoding;
            data.audio = '';
            const frame = {};
            frame.data = data;
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify(frame));
            }
            this.stop()
        }
    }

    wsMessage (e) {
        if (e.data) {
            const json = JSON.parse(e.data);
            if (json && json.code === 0) {
                if (json.data && json.data.status === 2) {
                    // 当返回最后一帧时，关闭webSocket连接
                    this.resolve()
                    this.ws.close()
                }
                if (json.data && json.data.result && json.data.result.ws && json.data.result.ws.length) {
                    let str = '';
                    const ws = json.data.result.ws;
                    for (let i = 0; i < ws.length; i++) {
                        const cw = ws[i].cw;
                        if (cw && cw.length > 0) {
                            for (let j = 0; j < cw.length; j++) {
                                str += cw[j].w;
                            }
                        }
                    }
                    this.newMessage(str)
                }
            } else {
                this.resolve()
                this.ws.close()
            }
        }
    }

    wsError (param) {
        console.error('ws error', param)
        this.stop()
        this.reject(param)
    }

    wsClose () {
        console.log('ws close')
    }

    stop () {
        try {
            this.status = 2
        } catch (e) {
            console.error('stop error', e);
        }
    }
}
