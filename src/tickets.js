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
      return {};
    }

    return {
      ...this.tickets[ticketIndex],
      description: this.descriptions[ticketIndex],
    };
  }

  createTicket(name, description, status) {
    this.currentId += 1;

    const ticket = {
      name,
      status,
      id: this.currentId,
      created: moment(),
    };

    this.tickets.push(ticket);
    this.descriptions.push(description);

    return { ...ticket, description };
  }
}
