import styled from "styled-components"
import { useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function FillTitle({todos,setTodos})
{
    let title = useRef();
    let desc = useRef();

    const AddTodoBtn = async()=>{

        const details = {

            email : localStorage.getItem('email'),
            task : {
                id :uuidv4(),
                title : title.current.value,
                desc : desc.current.value,
                isCompleted : false
            }
        }



        console.log(details);


        const res = await fetch('http://localhost:3000/AddTodo',{
            method : 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
         });

        


         const ans = await res.json();

         if(ans.flag)
            {
                {setTodos([...todos ,  details.task]);}
            }

         else alert(ans.msg);
    }


    return (<Container>
        
        Title : 
        <br />
        <input  type="text" placeholder="Enter Title ...." ref={title}/>
        <br /> <br />
        Description : 
        <textarea placeholder="Enter Description of Todo ...."  ref={desc}/>

        <br /> <br /> <br />
        <button onClick={AddTodoBtn}>Add Todo</button>
        
        
    </Container>)
}


const Container = styled.div({
    width : "400px",
    display : "flex",
    flexDirection : "column",
    justifyContent : "center",
    alignItems : "center",

    color : "white",
    fontFamily : 'sans-serif',
    fontWeight : "200" , 


    input :{
        width: "220px",
        height: "35px",
        borderRadius: "7px",
        border: "none",
        paddingLeft: "10px" /* Padding inside the input */
    }



    ,
    textarea:{
        width: "350px",
        height: "95px",
        borderRadius: "7px",
        border: "none",
        paddingLeft: "10px" ,
        fontFamily : "sans-serif"
    },
    button:{
        background : "white",
        color : "black",
        fontFamily : "sans-serif",
        height: "44px",
        width: "224px",
        borderRadius : "7px",


        "&:hover": {
            background: "black",
            color :"white",
            border : "1px solid white",
            transform: "scale(1.05)",
            transition: "ease-in-out 0.2s"
        },
    }
})


