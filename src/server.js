/* eslint-disable import/extensions */
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-body-parser';
import http from 'http';
import Tickets from './tickets.js';

const app = new Koa();
const router = new Router();
const tickets = new Tickets();

router.get('/ticketById/:id', async (ctx) => {
  const { id } = ctx.params;

  ctx.response.body = tickets.getTicket(Number(id));
});

router.get('/allTickets', async (ctx) => {
  ctx.response.body = tickets.allTickets;
});

router.post('/createTicket', async (ctx) => {
  const { name, description, status } = ctx.request.body;

  const ticket = tickets.createTicket(name, description, status);
  ctx.response.body = ticket;
});

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7070;
http.createServer(app.callback()).listen(port);
