server.use(jsonServer.rewriter({ '/books/:id': '/books/:id?_embed=reviews' }));
server.use(router);
