const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<div>aha!</div>'
});

app.listen(3000);
console.log('app start at port 3000...');
