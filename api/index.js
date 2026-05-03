export default async function handler(req, res) {
  const mod = await import('../dist/ng-ecommerce/server/server.mjs');

  const fn =
    mod.default ||
    mod.app ||
    mod.handler ||
    mod.reqHandler;

  if (!fn) {
    return res.status(500).send('SSR handler not found');
  }

  return fn(req, res);
}