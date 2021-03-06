# redrover.js 
> Makes writing JSON requests with [fetch](https://github.com/github/fetch) easier

> Originally forked from [fetchival.js](https://github.com/typicode/fetchival)

RedRover is a tiny (0.5kb min/gz) fetch wrapper that can be used in the __browser__ (IE9+) and __Node__.

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
redrover('/users').post({
  name: 'pxlPotion',
  login: 'pxlPotion'
})
.then(function(json) {
  // ...
})
```

`.get()`, `.put()`, `.patch()` and `.delete()` methods are also available.

## Installation

whatwg-fetch comes preinstalled (fetch polyfill for unsupported browsers)

__Browser__

```bash
npm install redrover --save
```

__Node__

```bash
npm install node-fetch redrover --save
```

## Usage examples

```javascript
var posts = redrover('/posts')

//posts
posts.get()
posts.post({ title: 'redrover' })

//posts?category=javascript
posts.get({ category: 'javascript' })

//posts/1
posts(1).get()
posts(1).put({ title: 'redrover is simple' })
posts(1).patch({ title: 'redrover is simple' })
posts(1).delete()

var comments = posts('1/comments')

//posts/1/comments
comments.get()

//posts/1/comments/1
comments(1).get()
```

You can also pass fetch options to `redrover()`

```javascript
var posts = redrover('/posts', fetchOptions)
var comments = posts('1/comments') // Will inherit fetchOptions
```

To catch errors (err.body holds the response)

```javascript
redrover('/posts')
  .get()
  .catch(function(err) {
    console.log(err)
  })
```

To enable CORS

```javascript
var request = redrover('/', { mode: 'cors' })
var posts = request('posts')
```

To fetch plain text (for example, HTML views)

```javascript
var request = redrover('/', { responseAs: 'text' })
var posts = request('posts')
```

`responseAs` can be `response`, `text` or `json` (default)

To use redrover in Node, you need to install `node-fetch` and configure redrover to use it

```javascript
var redrover = require('redrover')
redrover.fetch = require('node-fetch')
```

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 9+ ✔ | Latest ✔ | 6.1+ ✔ |

## License

MIT - [PxlPotion](https://github.com/pxlpotion)
