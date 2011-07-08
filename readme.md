![Postman](https://github.com/aaronpowell/Postman/raw/master/assets/Logo.png)

## What is it?

Postman is a little JavaScript library (well it's actually [Coffeescript][1] but the Cakefile handles a build for me) which is similar to a traditional pub/ sub library, just a whole lot smarter.

Postman *does* do pub/ sub, but it does it as a message bus, meaning that the order of handler subscription and message publishing isn't important.

It also has no dependencies on external projects so you can drop in the unminified or the minified version and get cracking!

## Why?

I decided to write Postman because I wanted a way which I could have a simple message bus in JavaScript so when I subscribed to messages I could get ones sent in the past.

## Getting Postman

### For web

If you want to use Postman in a website then you can grab the [development][2] or [production (a whopping 1kb!)][3] and include it.

### For Node.js

Postman support Node.js as well, and you can get it through [npm][4]:

    npm install postman
    
Then in your Node app:

    var postman = require('postman');
    
## Using Postman

If you want to send a message with Postman then you need to have them do a delivery:

    postman.deliver('some-message', [arg1, arg2, argN]);
    
To then subscribe to the messages you need to tell the Postman what you want to receive:

    postman.receive('some-message', function() { /* handle callback here */ });
    
### Handling history

Sometimes you don't care about the past so if that's the case you can subscribe and tell it to ignore history:

    postman.receive('some-message', function() { /* handle callback here */ }, true);
    
And for better memory management you can kill history:

    postman.dropMessages('some-message');
    
Or for more powerfull history management you can:

* Drop messages older than a certain date
* Drop messages based on an array filter method

## Version
0.1.0

## License

The MIT License

Copyright (c) 2011 Aaron Powell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


  [1]: http://coffeescript.org
  [2]: https://github.com/aaronpowell/Postman/raw/master/lib/postman.js
  [3]: https://github.com/aaronpowell/Postman/raw/master/lib/postman.min.js
  [4]: http://npmjs.org