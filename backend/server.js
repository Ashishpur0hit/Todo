const express = require('express');
const { SignUpSchema , LogInSchema, AddTodoSchema } = require('./ZodSchema');
const { UserModel, DataModel } = require('./mongoSchemas');
const jwt  = require('jsonwebtoken');
const app = express();
const cors = require('cors');





app.use(cors());
app.use(express.json());                                            //Middleware to access body of request
const jwtPassword = "jwt123";

app.post('/SignUpUser',async (request,responce)=>{
    const Details = request.body;
    const validate = SignUpSchema.safeParse(Details);
    if(validate.success)
    {

        const temp = await UserModel.find({email : Details.email})

        if(temp.length>0) responce.json({
            flag : false,
            msg : "Email Already Exist"
        })

        else{

            const token = jwt.sign(Details,jwtPassword);

            UserModel.create(Details);

            DataModel.create({
                email : Details.email,
                Password : Details.password,
                task :[]
            });


            responce.json({
                flag : true,
                msg : "Data Stored" ,
                token : token
            })
        }
    }
    else 
    {
        responce.json("Please Fill Details Correctly");
        console.log(validate);
    }
})



app.get('/getAllTodo' ,async (request , responce)=>{
    const Taskarray = await DataModel.find({email : request.query.email})
    console.log(Taskarray[0].tasks);
    responce.json({
        flag : true  , 
        msg : "Every thing is OK" , 
        info : Taskarray[0].tasks
    })

})





app.post('/LogInUser',async (request,responce)=>{
    const Details= request.body;
    const validate = LogInSchema.safeParse(Details);
    if(validate.success)
    {
        const list = await UserModel.find({email : Details.email,
            password : Details.password
        })

        if(list.length>0)
        {
            const token = jwt.sign(Details,jwtPassword);
            responce.json({
                flag : true,
                msg : "LogIn Sucessfull",
                token : token
            })
        }
        else 
        {
            responce.json({
                flag  : false,
                msg : "user not found"
            })
        }
    }
});



app.post('/AddTodo',async(request,responce)=>{
    const Details = request.body;

    console.log(Details);
    const validate = AddTodoSchema.safeParse(Details);
    if(validate.success)
    {
        try{
            const temp = await DataModel.updateOne({email : Details.email},{$push :{tasks : Details.task}});
            console.log(temp);

            responce.json({
                flag : true,
                msg : "Todo Added"
            })
        }
        catch(e)
        {
            responce.json({
                flag : false,
                msg : e.message
            })
        }
        
    }
    else {

        console.log(validate);
        responce.json({
            flag : false,
            msg : "Inputs provided does not matched the format"
        })
    }
})





app.put('/UpdateTodo', async (req, res) => {
    let index = parseInt(req.query.id, 10); // Ensure index is an integer
    const details = req.body;

    if (isNaN(index)) {
        return res.status(400).json({ flag: false, msg: "Invalid index" });
    }

    try {
        console.log("Done");
        
        const temp = await DataModel.findOne({email : details.email});

        const Taskarray = await DataModel.find({email : details.email})
        if(temp.tasks[index].isCompleted) {
            res.json({
                flag : true , msg : "Already Completed" , info : Taskarray[0].tasks 
            })
            return
        }

        const updateQuery = {};
        updateQuery[`tasks.${index}.isCompleted`] = true;


        const result = await DataModel.updateOne(
            { email: details.email },
            { $set: updateQuery }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ flag: false, msg: "Task not found or already updated" });
        }

        

        res.json({ flag: true, msg: "Todo Updated" , info : Taskarray[0].tasks });
    } catch (e) {
        res.status(500).json({ flag: false, msg: e.message });
    }
});

app.get('/verify',(request,response)=>{
    let userToken = request.query.auth;
    try{
        const tokenVerify = jwt.verify(userToken,jwtPassword);
        response.json({
            flag : true
        })
    }
    catch(err)
    {
        response.json({
            flag : false,
            msg : err
        })
    }
    
    
});






app.delete('/DeleteTodo',(async(request,responce)=>{
    let id = request.query.id;

    console.log(id);
    const Details = request.body;


    const ans = await DataModel.findOne({email : Details.email});
    const list = ans.tasks;

    // if(id<0 || id>=list.length)
    // {
    //     responce.json({
    //         flag : false,
    //         msg : "Invalid Index"
    //     }) 

    //     return
    // }

    // list.splice(id);


    // console.log(list);


    try
    {
        const temp = await DataModel.updateOne({email : Details.email},{ $pull: { tasks: { id: id } }});
        console.log(temp);
        responce.json({
            flag : true,
            msg : "Todo Deleted",
        })
    }
    catch(error)
    {
        console.log("Error is "+error);
        responce.json({
            flag : false,
            msg : error.message
        })
    }

    






}))

app.listen(3000);