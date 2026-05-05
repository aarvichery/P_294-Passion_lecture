import vine from '@vinejs/vine'

const bookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2).maxLength(255),
    nbPage: vine.number().positive(),
    extract: vine.string().trim().optional(),
    resume: vine.string().trim().minLength(10),
    editor: vine.string().trim().minLength(2).maxLength(255),
    editionYear: vine.number().min(1000).max(new Date().getFullYear()),
  })
)

export { bookValidator }