import type { HttpContext } from '@adonisjs/core/http'

import Bus from '#models/bus'


export default class BusesController {

  async index() {
    const bus = await Bus.query().select(
      'id',
      'keberangkatan',
      'tujuan',
      'jarak',
      'durasi',
      'koordinat'
    )

    return {
      message: 'succes get all bus',
      data: bus,
    }
  }

  async store({ request }: HttpContext) { 
    const data = request.body()  

    const newBus = await Bus.create({  
      keberangkatan: data.keberangkatan,
      tujuan: data.tujuan,
      jarak: data.jarak,
      durasi: data.durasi,
      koordinat: data.koordinat,
    })

    return {
      message: 'Success create bus',
      data: newBus,
    }
  }

  async show({ params }: HttpContext) {  //menampilkan detail data, contoh : findbyid
    const id = params.id        //params = mengambil id dari parameter

    const bus = await Bus.find(id)  //cari data berdasarkan id

    return {
      message: 'success get detail bus',
      data: bus,
    }
  }

  async update({ params, request }: HttpContext) {  //method put, mengambil id 
    const id = params.id
    const data = request.body()

    const bus = await Bus.findOrFail(id)   //cari id bus, ada atau tidak

    await bus
      .merge({   
        keberangkatan: data.keberangkatan,
        tujuan: data.tujuan,
        jarak: data.jarak,
        durasi: data.durasi,
        koordinat: data.koordinat,
      })
      .save()

    return {
      message: 'succes update bus',
      data: bus,
    }
  }

  async destroy({ params }: HttpContext) {
    const id = params.id

    const bus = await Bus.findOrFail(id)

    await bus.delete()

    return {
      message: 'succes delete bus',
    }
  }
}
