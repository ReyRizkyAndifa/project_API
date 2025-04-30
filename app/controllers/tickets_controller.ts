import type { HttpContext } from '@adonisjs/core/http'

import Ticket from '#models/ticket'

export default class TicketsController {
  // Menampilkan daftar tiket
  async index() {
    const tickets = await Ticket.query().select('id', 'bus_id', 'penumpang', 'harga', 'tanggal')

    return {
      message: 'success get all tickets',
      data: tickets,
    }
  }

  // Menyimpan tiket baru
  async store({ request }: HttpContext) {
    const data = request.body()

    const newTicket = await Ticket.create({
      busId: data.bus_id,
      penumpang: data.penumpang,
      harga: data.harga,
      tanggal: data.tanggal,
    })

    return {
      message: 'Success create ticket',
      data: newTicket,
    }
  }

  // Menampilkan detail tiket berdasarkan id
  async show({ params }: HttpContext) {
    const id = params.id
    const ticket = await Ticket.find(id)

    return {
      message: 'success get detail ticket',
      data: ticket,
    }
  }

  // Mengupdate tiket berdasarkan id
  async update({ params, request }: HttpContext) {
    const id = params.id
    const data = request.body()

    const ticket = await Ticket.findOrFail(id)

    await ticket
      .merge({
        busId: data.bus_id,
        penumpang: data.penumpang,
        harga: data.harga,
        tanggal: data.tanggal,
      })
      .save()

    return {
      message: 'success update ticket',
      data: ticket,
    }
  }

  // Menghapus tiket berdasarkan id
  async destroy({ params }: HttpContext) {
    const id = params.id

    const ticket = await Ticket.findOrFail(id)

    await ticket.delete()

    return {
      message: 'success delete ticket',
    }
  }
}
