const { EventEmitter } = require('events');

const globalEmitter = new EventEmitter({ captureRejections: true });

globalEmitter.on('error', console.log)

module.exports = globalEmitter;
