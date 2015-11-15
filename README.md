# stream-transform-tokens

[![Build Status](https://travis-ci.org/any-code/stream-transform-tokens.svg?branch=master)](https://travis-ci.org/any-code/stream-transform-tokens)

> Javascript stream transform tokens with replacement values. This may be useful when abstracting the mapping of templates to use tokens for different email providers. 

## Getting Started

### 1. Installation

``` bash
npm install stream-transform-tokens
```

### 2. Examples

``` javascript
var readStream = fs.createReadStream('test.html'),
    replaceTokens = require('stream-transform-tokens')({
      leftMask: "{{",
      rightMask: "}}",
      tokens: {
        user_name: "Barry",
        host: "http://example.com"
      }
    })

readStream
  .pipe(replaceTokens)
  .pipe(process.stdout)
```

Will replace 

``` html
<div>
    <h4>Hello {{user_name}},</h4>
    <p>go to <a href="{{host}}">a website</a> to find out more!</p>
</div>    
```    

with -

``` html
<div>
    <h4>Hello Barry,</h4>
    <p>go to <a href="http://example.com">a website</a> to find out more!</p>
</div>    
``` 

## Copyright and license
Copyright (c) 2015, Any Code <lee@anycode.io>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
