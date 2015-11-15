var fs = require('fs'),
  readStream;

exports.setUp = function(callback) {
  readStream = fs.createReadStream('./test/test.html')
  readStream.setEncoding('utf-8')
  callback()
}

exports.tearDown = function(callback) {
  callback();
}

exports.test = function(test) {
  var replaceTokens = require('../index')({
      leftMask: "{{",
      rightMask: "}}",
      tokens: {
        user_name: "Barry",
        host: "http://example.com"
      }
    }),
    data = '';

  readStream.pipe(replaceTokens).on('data', function(chunk) { data += chunk }).on('finish', function() {
    test.ok(data.indexOf("Barry") > -1 && data.indexOf("http://example.com") > -1, "replacements did not occur");
    test.ok(data.indexOf("{{user_name}}") === -1 && data.indexOf("{{host}}") === -1, "replacements did not occur");
    test.done();
  })
}
