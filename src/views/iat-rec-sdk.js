import Recorder from 'js-audio-recorder';

const frameSize = 1280
const format = 'audio/L16;rate=16000'
const encoding = 'raw'
export default class IatRecSdk {
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
        Object.defineProperty(this, 'recorder', {
            configurable: false,
            value: new Recorder({
                sampleBits: 16,
                sampleRate: 16000,
                numChannels: 1,
                compiling: true
            }),
            writable: false,
            enumerable: false
        })
        Object.defineProperty(this, 'queue', {
            configurable: false,
            value: [],
            writable: true,
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
        this.init()
    }

    init () {
        this.recorder.onprogress = (param) => {
            this.progressAudio(param)
        }
    }

    start () {
        this.recorder.start().then(value => {
            const ws = new WebSocket(this.url)
            ws.onmessage = (e) => {
                this.wsMessage(e)
            }
            ws.onerror = () => {
                this.wsError()
            }
            ws.onclose = () => {
                this.wsClose()
            }
            ws.onopen = () => {
                this.interval = setInterval(() => {
                    // 最后一帧
                    if (this.status === 2) {
                        clearInterval(this.interval);
                        const data = {};
                        data.status = 2;
                        data.format = format;
                        data.encoding = encoding;
                        data.audio = '';
                        const frame = {data};
                        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                            this.ws.send(JSON.stringify(frame));
                        }
                        return;
                    }
                    let datas = null;
                    // console.log(queue.length);
                    if (this.queue.length > frameSize) {
                        datas = this.queue.splice(0, frameSize);
                    }
                    // console.log('queue length', this.queue.length);
                    if (datas && datas.length > 0) {
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
                            this.status = 1;
                            if (ws && ws.readyState === WebSocket.OPEN) {
                                ws.send(JSON.stringify(frame));
                            }
                        } else if (this.status === 1) {
                            // 中间帧
                            const data = {};
                            data.status = 1;
                            data.format = format;
                            data.encoding = encoding;
                            data.audio = window.btoa(String.fromCharCode(...datas));
                            const frame = {data};
                            if (ws && ws.readyState === WebSocket.OPEN) {
                                ws.send(JSON.stringify(frame));
                            }
                        }
                    }
                }, 10);
            }
            this.ws = ws
        })
    }

    progressAudio (params) {
        const data = this.recorder.getNextData();
        if (data && data.length) {
            for (let i = 0; i < data.length; i++) {
                // 在队列中追加录音数据
                this.queue.push(...new Uint8Array(data[i].buffer));
            }
        }
    }

    wsMessage (e) {
        if (e.data) {
            const json = JSON.parse(e.data);
            if (json && json.code === 0) {
                if (json.data && json.data.status === 2) {
                    // 当返回最后一帧时，关闭webSocket连接
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
                this.ws.close()
            }
        }
    }

    wsError (param) {
        console.error('ws error', param)
        this.stop()
    }

    wsClose () {
        console.log('ws close')
        this.stop()
    }

    getWav () {
        return this.recorder.getWAVBlob()
    }

    stop () {
        try {
            this.recorder.stop();
            this.recorder.destroy().then(() => {
            });
            this.status = 2
        } catch (e) {
            console.error('ws error', e);
        }
    }
}
