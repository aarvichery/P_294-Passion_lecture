import vine from '@vinejs/vine'

const authorValidator = vine.compile(
    vine.object({
    name: vine.string().trim().minLength(2).maxLength(255), 
    firstname: vine.string().trim().minLength(2).maxLength(255),
    })
)
export { authorValidator } 