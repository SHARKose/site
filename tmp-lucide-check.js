const lucide = require('./node_modules/lucide-react/dist/cjs/lucide-react.js');
const names = ['Home', 'LayoutGrid', 'List', 'Hash', 'Heart', 'Clock3', 'UploadCloud', 'User'];
for (const name of names) {
  const value = lucide[name];
  console.log(name, typeof value, value === undefined, value && value.default ? 'has default' : 'no default', value && Object.keys(value).length ? Object.keys(value).slice(0,10) : []);
}
