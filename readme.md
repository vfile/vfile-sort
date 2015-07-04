# mdast-message-sort [![Build Status](https://img.shields.io/travis/wooorm/mdast-message-sort.svg?style=flat)](https://travis-ci.org/wooorm/mdast-message-sort) [![Coverage Status](https://img.shields.io/coveralls/wooorm/mdast-message-sort.svg?style=flat)](https://coveralls.io/r/wooorm/mdast-message-sort?branch=master)

[**mdast**](https://github.com/wooorm/mdast) plug-in to sort messages by
line/column (ascending).

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install mdast-message-sort
```

**mdast-message-sort** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](mdast-message-sort.js) and
[compressed](mdast-message-sort.min.js).

## Usage

```js
/*
 * Dependencies.
 */

var mdast = require('mdast');
var sort = require('mdast-message-sort');

/*
 * Example plug-in which warns.
 */

function warnings() {
    return function (ast, file) {
        file.warn('Error!', ast.children[1]);
        file.warn('Another Error!', ast.children[0]);
    };
}

/*
 * Process.
 */

mdast.use(warnings).use(sort).process(`# foo

*   bar.
`, function (err, output, file) {
    console.log(file.messages.map(String));
    /*
     * [
     *   '1:1-1:6: Another Error!',
     *   '3:1-3:9: Error!'
     * ]
     */
});
```

## CLI

```bash
mdast [options] file|dir ... -u mdast-message-sort
```

## API

### [mdast](https://github.com/wooorm/mdast#api).[use](https://github.com/wooorm/mdast#mdastuseplugin-options)(sort)

Sorts messages.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
