// Runs before the storefront build. The storefront imports @chikbo/shared,
// which must be compiled first — hosting platforms that build from apps/web
// (Hostinger) never run the monorepo's root build, so do it here.
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const run = (cmd, cwd = root) => execSync(cmd, { cwd, stdio: 'inherit' });

// typescript / vite are devDependencies; some platforms install without them.
if (!existsSync(join(root, 'node_modules/typescript')) || !existsSync(join(root, 'node_modules/vite'))) {
  run('npm install --include=dev --workspace packages/shared --workspace apps/web --workspace apps/admin');
}
run('npm run build --workspace packages/shared');
