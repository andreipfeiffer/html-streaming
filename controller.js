import {getHead, getHeavyBody, getMenu, getFooter} from "./utils.js";

export async function homePageController(req, res) {
  const title = "Homepage";

  const head = await getHead();
  const menu = await getMenu(title);
  const footer = await getFooter();

  const body = "Homepage body";

  const content = `
  <html>
    ${head}
    <body>
      ${menu}
      <main>${body}</main>
      ${footer}
    </body>
  </html>`;

  res.send(content);
}

export async function regularPageController(req, res) {
  const title = "Regular page";

  const head = await getHead();
  const menu = await getMenu(title);
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
  </html>`;

  res.send(content);
}

export async function asyncPageController(req, res) {
  const title = "Async Client Fetch";

  const head = await getHead();
  const menu = await getMenu(title);
  const footer = await getFooter();

  // const body = await getHeavyBody();

  const content = `
  <html>
    ${head}
    <body>
      ${menu}
      <main>Loading, please wait...</main>
      ${footer}
    </body>

    <script>
      async function getBody() {
        const res = await fetch("/body");
        const body = await res.text();
        document.querySelector("main").innerHTML = body;
      }

      getBody();
    </script>
  </html>`;

  res.send(content);
}

export async function httpStreamController(req, res) {
  const title = "HTTP streaming page";

  const head = await getHead();
  const menu = await getMenu(title);

  res.write(`
    <html>
      ${head}
      <body>
        ${menu}
  `);

  res.write(`
    <main>Loading, please wait...</main>
  `);

  const footer = await getFooter();

  res.write(`
        ${footer}
      </body>
    </html>
  `);

  const body = await getHeavyBody();

  res.end(`
    <script>
      document.querySelector("main").innerHTML = \`${body}\`;
    </script>
  `);
}

export async function dsdStreamController(req, res) {
  const title = "Declarative Shadow DOM streaming page";

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
          <slot name="body"><main>Loading, please wait...</main></slot>
          <slot name="footer"></slot>
        </template>
  `);

  const menu = await getMenu(title);
  const footer = await getFooter();

  res.write(`<div slot="footer">${footer}</div>`);
  res.write(`<div slot="menu">${menu}</div>`);

  const body = await getHeavyBody();

  res.write(`<div slot="body"><main>${body}</main></div>`);

  res.end(`
      </body>
    </html>
  `);
}
