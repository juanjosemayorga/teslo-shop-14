import { initialData } from "./seed";

async function main() {
  console.log(initialData);

  console.log('seed database correctly executed');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();