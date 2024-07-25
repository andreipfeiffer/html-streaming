import { URL } from 'url';
import { readFile } from 'fs/promises';

export const __dirname = getDirname();

export async function getHead() {
  return getFileContent("/pages/head.html");
}

export async function getMenu(title = "Page title") {
  const content = await getFileContent("/pages/menu.html");

  return content.toString().replace("{{title}}", title);
}

export async function getFooter() {
  return getFileContent("/pages/footer.html");
}

export async function getHeavyBody(content) {
  await wait(2);
  return getFileContent("/pages/body.html");
}

async function getFileContent(file) {
  return readFile(__dirname + file);
}

async function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  })
};

function getDirname() {
  return new URL('.', import.meta.url).pathname;
}