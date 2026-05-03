export default async (req, res) => {
  const { default: handler } = await import('../dist/ng-ecommerce/server/server.mjs');
  return handler(req, res);
};