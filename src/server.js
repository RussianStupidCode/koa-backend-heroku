/* eslint-disable import/extensions */
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-body-parser';
import http from 'http';
import cors from 'koa-cors';
import Tickets from './tickets.js';

const app = new Koa();
const router = new Router();
const tickets = new Tickets();

router.get('/ticketById/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const ticket = tickets.getTicket(Number(id));
    ctx.response.body = ticket;
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.body = { error: String(err) };
  }
});

router.delete('/ticketById/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    tickets.deleteTicket(Number(id));
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.body = { error: String(err) };
    return;
  }

  ctx.response.body = { ok: 'ok' };
});

router.get('/allTickets', async (ctx) => {
  ctx.response.body = tickets.allTickets;
});

router.put('/ticketById/:id', async (ctx) => {
  const { name, description, status } = ctx.request.body;
  const { id } = ctx.params;

  try {
    const ticket = tickets.updateTicket(Number(id), name, description, status);
    ctx.response.body = ticket;
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.body = { error: String(err) };
  }
});

router.post('/createTicket', async (ctx) => {
  const { name, description, status } = ctx.request.body;

  const ticket = tickets.createTicket(name, description, status);
  ctx.response.body = ticket;
});

app
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

const port = process.env.PORT || 7070;
http.createServer(app.callback()).listen(port);
