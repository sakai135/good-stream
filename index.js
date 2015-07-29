var Squeeze = require('good-squeeze').Squeeze;
var SafeJson = require('good-squeeze').SafeJson;

function GoodReporterStream(events, config) {
	this.squeeze = Squeeze(events);
	this.writestream = config.stream;
	this.transform = config.transform || SafeJson(null, { separator: '\n' });
}

GoodReporterStream.prototype.init = function (readstream, emitter, callback) {
	readstream.pipe(this.squeeze).pipe(this.transform).pipe(this.writestream);
	callback();
}

module.exports = GoodReporterStream;
