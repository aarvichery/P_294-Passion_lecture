import vine from '@vinejs/vine' 

export const loginValidator = vine.compile( 
  vine.object({ 
    email: vine.string().email(), 
    password: vine.string().minLength(8).maxLength(512),
  }) 
) 

export const registerValidator = vine.compile( 
  vine.object({ 
    firstname: vine.string().trim().minLength(2).maxLength(255), 
    lastname: vine.string().trim().minLength(2).maxLength(255),
    email: vine 
      .string() 
      .trim()
      .email()     
      .unique(async (query, field) => { 
        const user = await query.from('users').where('email', field).first() 
        return !user 
      }), 
    password: vine.string().minLength(8).maxLength(512),
    role: vine.string()
  }) 
)