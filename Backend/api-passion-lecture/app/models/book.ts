import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'
import Author from '#models/author'
import Comment from './comment.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
   
  @column()
  declare titre: String

  @column()
  declare nbPage: Number

  @column()
  declare extract: String

  @column()
  declare resume: String

  @column()
  declare editor: String

  @column()
  declare editionYear: Number

  /* A FAIRE PLUS TARD 
  @column()
  declare coverImage: Blob*/

  @column()
  declare userId: Number

  @column()
  declare categoryId: Number

  @column()
  declare authorId: Number

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @belongsTo(() => Author)
  declare author: BelongsTo<typeof Author>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}