// Runs after the storefront build: builds the admin console and places it at
// dist/admin, so one deployment serves the store at / and the admin at /admin.
// Skipped with SKIP_ADMIN_BUNDLE=1 (used when the admin is built separately).
import { execSync } from 'node:child_process';
import { cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.env.SKIP_ADMIN_BUNDLE === '1') process.exit(0);

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const run = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit', env: { ...process.env, SKIP_ADMIN_BUNDLE: '1' } });

if (!existsSync(join(root, 'node_modules/recharts'))) {
  run('npm install --include=dev --workspace apps/admin');
}
run('npm run build --workspace apps/admin');

const target = join(root, 'apps/web/dist/admin');
rmSync(target, { recursive: true, force: true });
cpSync(join(root, 'apps/admin/dist/admin'), target, { recursive: true });
console.log('Admin console bundled at dist/admin');
