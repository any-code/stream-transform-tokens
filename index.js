/*
            _                   ____          _
           / \   _ __  _   _   / ___|___   __| | ___
          / _ \ | '_ \| | | | | |   / _ \ / _` |/ _ \
         / ___ \| | | | |_| | | |__| (_) | (_| |  __/
        /_/   \_\_| |_|\__, |  \____\___/ \__,_|\___|
                       |___/

        stream-transform-tokens
 */

var defaultConfig = {
  maskLeft: "{{",
  maskRight: "}}",
  tokens: {}
}

module.exports = function(_config_) {
  var obj = require('javascript-object-paraphernalia'),
    config = obj.merge(defaultConfig, _config_),
    mask = new RegExp(config.maskLeft + "(.)+?" + config.maskRight, "ig"),
    stream = new require('stream').Transform({objectMode: true})

  stream._transform = function(data, encoding, done) {
    data = data.replace(mask, function(match) {
      return config.tokens[match.substring(config.maskLeft.length, match.length - config.maskRight.length)] || match
    });
    this.push(data);
    done();
  };

  return stream;
}

