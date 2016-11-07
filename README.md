# fetcher.js 
> Makes writing JSON requests with [fetch](https://github.com/github/fetch) easier

> Originally forked from [fetcher.js](https://github.com/typicode/fetcher)

Fetcher is a tiny (0.5kb min/gz) fetch wrapper that can be used in the __browser__ (IE9+) and __Node__.

__Before__

```javascript
// POST /users
fetch('/users', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'pxlPotion',
    login: 'pxlPotion',
  })
})
.then(function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }
  throw new Error(response.statusText)
})
.then(function(json) {
  // ...
})
```

__After__

```javascript
// POST /users
fetcher('/users').post({
  name: 'pxlPotion',
  login: 'pxlPotion'
})
.then(function(json) {
  // ...
})
```

`.get()`, `.put()`, `.patch()` and `.delete()` methods are also available.

## Installation

fetcher is available on npm

__Browser__

```bash
npm install es6-promise whatwg-fetch --save # polyfills
npm install fetcher --save # Browserify
```

__Node__

```bash
npm install node-fetch fetcher --save
```

## Usage examples

```javascript
var posts = fetcher('/posts')

//posts
posts.get()
posts.post({ title: 'fetcher' })

//posts?category=javascript
posts.get({ category: 'javascript' })

//posts/1
posts(1).get()
posts(1).put({ title: 'fetcher is simple' })
posts(1).patch({ title: 'fetcher is simple' })
posts(1).delete()

var comments = posts('1/comments')

//posts/1/comments
comments.get()

//posts/1/comments/1
comments(1).get()
```

You can also pass fetch options to `fetcher()`

```javascript
var posts = fetcher('/posts', fetchOptions)
var comments = posts('1/comments') // Will inherit fetchOptions
```

To catch errors

```javascript
fetcher('/posts')
  .get()
  .catch(function(err) {
    console.log(err)
  })
```

To enable CORS

```javascript
var request = fetcher('/', { mode: 'cors' })
var posts = request('posts')
```

To fetch plain text (for example, HTML views)

```javascript
var request = fetcher('/', { responseAs: 'text' })
var posts = request('posts')
```

`responseAs` can be `response`, `text` or `json` (default)

To use fetcher in Node, you need to install `node-fetch` and configure fetcher to use it

```javascript
var fetcher = require('fetcher')
fetcher.fetch = require('node-fetch')
```

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 9+ ✔ | Latest ✔ | 6.1+ ✔ |

## License

MIT - [PxlPotion](https://github.com/pxlpotion)
