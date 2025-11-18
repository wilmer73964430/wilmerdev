import { execa } from 'child_process';

async function run(cmd: string, args: string[]) {
  const subprocess = execa(cmd, args, { stdio: 'inherit' });
  await subprocess;
}

async function main() {
  console.log('> Levantando dependencias con docker-compose');
  await run('docker-compose', ['up', '-d', '--build', '--wait']);

  console.log('> Ejecutando migraciones y seed');
  await run('pnpm', ['db:push']);
  await run('pnpm', ['db:seed']);

  console.log('> Corriendo pruebas E2E headless');
  await run('pnpm', ['test:e2e', '--', '--headed=false']);

  console.log('Smoke test finalizado');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
