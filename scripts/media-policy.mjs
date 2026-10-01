import { readdir } from 'node:fs/promises';
import { dirname, basename } from 'node:path';

// A user-renamed x-prefixed file retires that asset, including its derivatives.
export async function isExcluded(output) {
  const name=basename(output).replace(/-mobile(?=\.)/,'');
  const files=await readdir(dirname(output)).catch(()=>[]);
  return files.some(file=>/^x[-_ ]?/i.test(file)&&file.replace(/^x[-_ ]?/i,'').replace(/-mobile(?=\.)/,'')===name);
}
