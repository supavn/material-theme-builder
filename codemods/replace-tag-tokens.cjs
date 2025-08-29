#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const isDry = args.includes('--dry');
const root = process.cwd();

const TAG_SUFFIXES = ['TagText', 'TagBackground', 'TagBorder'];

function isTagToken(token) {
  return TAG_SUFFIXES.some(s => token.endsWith(s));
}

function ensureImport(code) {
  if (code.includes("getExtendedHex(")) {
    if (!code.includes("from \"@/theme\"")) {
      // insert after last import or at top
      const lines = code.split('\n');
      let lastImport = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) lastImport = i;
        else if (lastImport !== -1 && !lines[i].startsWith('import ')) break;
      }
      const importLine = "import { getExtendedHex } from \"@/theme\";";
      if (lastImport >= 0) {
        lines.splice(lastImport + 1, 0, importLine);
        return lines.join('\n');
      }
      return importLine + '\n' + code;
    }
  }
  return code;
}

function processFile(filePath, summary) {
  const src = fs.readFileSync(filePath, 'utf8');

  // Matches theme.schemes.(light|dark).<AnyTagToken>, with optional chaining variants
  const pattern = /(theme)\.(schemes)\??\.(light|dark)\??\.([a-zA-Z]+Tag(?:Text|Background|Border))/g;

  let replacedCount = 0;
  let out = src.replace(pattern, (match, theme, schemes, mode, token) => {
    if (!isTagToken(token)) return match;
    replacedCount++;
    return `getExtendedHex(${theme}, "${token}")`;
  });

  if (replacedCount > 0) {
    out = ensureImport(out);
  }

  if (replacedCount > 0 && !isDry) {
    fs.writeFileSync(filePath, out, 'utf8');
  }

  if (replacedCount > 0) {
    summary.changed.push({ file: filePath, count: replacedCount });
  } else {
    summary.unchanged.push(filePath);
  }
}

function walk(dir, cb) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.')) continue;
      walk(full, cb);
    } else if (entry.isFile() && (full.endsWith('.ts') || full.endsWith('.tsx') || full.endsWith('.js') || full.endsWith('.jsx'))) {
      cb(full);
    }
  }
}

function main() {
  const summary = { changed: [], unchanged: [] };
  const srcDir = path.join(root, 'src');
  if (fs.existsSync(srcDir)) {
    walk(srcDir, (file) => processFile(file, summary));
  }

  console.log(`Codemod ${isDry ? '(dry-run)' : ''} complete.`);
  for (const item of summary.changed) {
    console.log(`Updated ${item.file}: ${item.count} replacement(s)`);
  }
  console.log(`Unchanged files: ${summary.unchanged.length}`);
}

main();
