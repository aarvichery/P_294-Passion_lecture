import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Category.createMany([


{
  id: 1,
  name: "Documentaire"
},
{
  id: 2,
  name: "SCI-FI"
},
{
  id: 3,
  name: "Bande-Dessinée"
},
{
  id: 4,
  name: "Roman"
},
{
  id: 5,
  name: "Manga"
},
{
  id: 6,
  name: "Policier"
},
{
  id: 7,
  name: "Autre"
}
    ])
  }
}