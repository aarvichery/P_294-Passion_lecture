import vine from '@vinejs/vine'
const commentValidator = vine.compile(
  vine.object({
    text: vine.string().trim().maxLength(100),
    appreciation: vine.number().min(1).max(5),
    userId: vine.number().positive().withoutDecimals(),
    bookId: vine.number().positive().withoutDecimals(),
  })
)

export { commentValidator }