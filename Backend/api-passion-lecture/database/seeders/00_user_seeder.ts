import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        id: 1,
        firstname: 'Aaron',
        lastname: 'Vichery',
        email: 'aaron.vichery@eduvaud.ch',
        password: 'lkasvbifbsizv45',
        role: 'Admin'
      }
    ])
  }
}