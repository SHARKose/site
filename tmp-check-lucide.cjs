const path = require('path');
const { pathToFileURL } = require('url');
(async () => {
  const lucide = await import(pathToFileURL(path.resolve('node_modules/lucide-react/dist/esm/lucide-react.js')).href);
  const names = ['Home', 'LayoutGrid', 'List', 'Hash', 'Heart', 'Clock3', 'UploadCloud', 'User'];
  for (const name of names) {
    const value = lucide[name];
    console.log(name, typeof value, value && value.name, value && value.default && typeof value.default, value && Object.keys(value).length ? Object.keys(value).slice(0, 10) : []);
  }
})();
