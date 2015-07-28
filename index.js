var Squeeze = require('good-squeeze');

function GoodReporterStream(events, config) {
	this.squeeze = Squeeze(events);
	this.writestream = config.stream;
}

GoodReporterStream.prototype.init = function (readstream, emitter, callback) {
	readstream.pipe(this.squeeze).pipe(this.writestream);
	callback();
}

module.exports = GoodReporterStream;
