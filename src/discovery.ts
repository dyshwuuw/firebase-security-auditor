import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { AuditContext, AuditFile } from './types.js';

const ignored = new Set(['node_modules', '.git', 'dist', 'coverage', '.firebase']);
const allowed = /\.(rules|json|js|cjs|mjs|ts|tsx|jsx|html|yml|yaml|config)$/i;
async function walk(root: string, dir: string, out: AuditFile[]): Promise<void> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(root, path, out);
    else if (allowed.test(entry.name) || /(^|\/)(\.env.*|.*\.pem|.*\.key)$/i.test(relative(root, path))) {
      const content = await readFile(path, 'utf8').catch(() => '');
      out.push({ path, relativePath: relative(root, path) || entry.name, content, lines: content.split(/\r?\n/) });
    }
  }
}
export async function discover(root: string): Promise<AuditContext> { const files: AuditFile[] = []; await walk(root, root, files); return { root, files }; }
