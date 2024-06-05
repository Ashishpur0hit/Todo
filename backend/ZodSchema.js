const zod = require('zod');

const SignUpSchema = zod.object({
    username : zod.string(),
    email : zod.string().email(),
    password : zod.string().min(6)
});




const LogInSchema = zod.object({
    email : zod.string().email(),
    password : zod.string()
})


const AddTodoSchema = zod.object({
    
    email : zod.string().email(),
    task : zod.object({
        id: zod.string(),
        title : zod.string(),
        desc : zod.string(),
        isCompleted : zod.boolean()
    })
})

module.exports = {
    SignUpSchema,
    LogInSchema,
    AddTodoSchema
  };




