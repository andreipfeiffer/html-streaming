# Modern HTML Streaming using Web Standards

- Inspired by: https://lamplightdev.com/blog/2024/01/10/streaming-html-out-of-order-without-javascript/
- DSD is well supported: https://caniuse.com/declarative-shadow-dom
- Frameworks would (probably) implement this in the future
- Render Web Components (Custom Elements) on the Server
- Stream HTML out-of-order without JS

To run locally:

```
# install dependencies
npm ci

# start server
node server
# or with watch mode
npx nodemon server

# open http://localhost:3303 in browser
```
