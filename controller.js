import {getHead, getHeavyBody, getMenu, getFooter} from "./utils.js";

export async function homePageController(req, res) {
  const head = await getHead();
  const menu = await getMenu("Homepage");
  const footer = await getFooter();

  const content = `
  <html>
    ${head}
    <body>
      ${menu}
      <main>Homepage body</main>
      ${footer}
    </body>
  <html/>`;

  res.send(content)
}

export async function regularPageController(req, res) {
  const head = await getHead();
  const menu = await getMenu("Regular page");
  const footer = await getFooter();

  const body = await getHeavyBody();

  const content = `
  <html>
    ${head}
    <body>
      ${menu}
      <main>${body}</main>
      ${footer}
    </body>
  <html/>`;

  res.send(content);
}

export async function asyncPageController(req, res) {
  const head = await getHead();
  const menu = await getMenu("Async Client Fetch");
  const footer = await getFooter();

  // NOTE: the body is fetched by the client, from another route
  // const body = await getBody();

  const content = `
  <html>
    ${head}
    <body>
      ${menu}
      <main>...loading, please wait</main>
      ${footer}
    </body>

    <script>
      document.addEventListener("DOMContentLoaded", async () => {
        const res = await fetch("/body");
        const body = await res.text();
        document.querySelector("main").innerHTML = body;
      });
    </script>
  <html/>
  `;

  res.send(content);
}

export async function httpStreamController(req, res) {
  const head = await getHead();
  const menu = await getMenu("HTTP streaming page");

  res.write(`
    <html>
      ${head}
      <body>
        ${menu}
  `);

  res.write(`
    <main>...loading, please wait</main>
  `);

  const footer = await getFooter();

  res.write(`
        ${footer}
      </body>
    <html/>
  `);

  const body = await getHeavyBody();

  res.end(`
    <script>
      document.querySelector("main").innerHTML = \`${body}\`;
    </script>
  `);
}

export async function dsdStreamController(req, res) {
  const head = await getHead();

  res.write(`
    <html>
      ${head}
      <body>
        <template shadowrootmode="open">
          <style>
            main {
              margin-block: 3em;
            }
          </style>

          <slot name="menu"></slot>
          <slot name="body"><main>...loading, please wait</main></slot>
          <slot name="footer"></slot>
        </template>
    `);

    const menu = await getMenu("Declarative Shadow DOM streaming page");
    const footer = await getFooter();

    res.write(`<div slot="footer">${footer}</div>`);
    res.write(`<div slot="menu">${menu}</div>`);

    const body = await getHeavyBody();

    res.write(`<main slot="body">${body}</main>`);

    res.end(`
      </body>
    <html/>
  `);
}
