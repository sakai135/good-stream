var stream = require('stream');
var Squeeze = require('good-squeeze').Squeeze;
var SafeJson = require('good-squeeze').SafeJson;

function Formatter(options, formatter) {
	options = options || {};
    options.objectMode = true;
	stream.Transform.call(this, options);
	this.formatter = formatter;
}
Formatter.prototype._transform = function (data, enc, next) {
	this.push(this.formatter(data));
	next(null);
};

function GoodReporterStream(events, config) {
	this.squeeze = Squeeze(events);
	this.writestream = config.stream;
	this.transform = config.transform || SafeJson(null, { separator: '\n' });
	this.formatter = new Formatter(null, config.formatter || function (data) { return data; });
}

GoodReporterStream.prototype.init = function (readstream, emitter, callback) {
	readstream
		.pipe(this.squeeze)
		.pipe(this.formatter)
		.pipe(this.transform)
		.pipe(this.writestream);
	callback();
}

module.exports = GoodReporterStream;
