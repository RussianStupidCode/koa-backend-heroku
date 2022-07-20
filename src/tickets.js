import moment from 'moment';

export default class Tickets {
  constructor() {
    this.currentId = 0;
    this.tickets = [];
    this.descriptions = [];
  }

  get allTickets() {
    return this.tickets;
  }

  getTicket(id) {
    const ticketIndex = this.tickets.findIndex((ticket) => ticket.id === id);

    if (ticketIndex === -1) {
      throw Error('ticket not found');
    }

    return {
      ...this.tickets[ticketIndex],
      description: this.descriptions[ticketIndex],
    };
  }

  deleteTicket(id) {
    const ticketIndex = this.tickets.findIndex((ticket) => ticket.id === id);

    if (ticketIndex === -1) {
      throw Error('ticket not found');
    }

    this.tickets.splice(ticketIndex, 1);
    this.descriptions.slice(ticketIndex, 1);
  }

  updateTicket(id, name, description, status) {
    const ticketIndex = this.tickets.findIndex((ticket) => ticket.id === id);

    if (ticketIndex === -1) {
      throw Error('ticket not found');
    }

    const ticket = this.tickets[ticketIndex];
    ticket.name = name === undefined ? ticket.name : name;
    ticket.status = status === undefined ? ticket.status : status;

    if (description !== undefined) {
      this.descriptions[ticketIndex] = description;
    }

    return { ...ticket, description: this.descriptions[ticketIndex] };
  }

  createTicket(name, description, status) {
    this.currentId += 1;

    const ticket = {
      name,
      status,
      id: this.currentId,
      created: moment().unix(),
    };

    this.tickets.push(ticket);
    this.descriptions.push(description);

    return { ...ticket, description };
  }
}
