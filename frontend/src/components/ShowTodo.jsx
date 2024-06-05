import styled from "styled-components"
import { useEffect, useState } from "react";
export default function ShowTodo({value , todos , setTodos , keyProp})
{
    const [isCompleted, setIsCompleted] = useState(value.isCompleted);

    const markDone = async () => {
        const res = await fetch(`http://localhost:3000/UpdateTodo?id=${keyProp}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem('email') })
        });

        const ans = await res.json();

        if (ans.flag) {
           
            setTodos(ans.info);
            setIsCompleted(true); // Update local state
        }

          else   alert(ans.msg);
        
    };


    const removeTodo = async () => {
        const res = await fetch(`http://localhost:3000/DeleteTodo?id=${value.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem('email') })
        });
    
        const ans = await res.json();
        if (ans.flag) {
            const updatedTodos = todos.filter(todo => todo.id !== value.id);
            console.log(updatedTodos);
            setTodos(updatedTodos);
        } else {
            alert(ans.msg);
        }
    };
    

    return <Container >
        {value.title}
        <br />
        {value.desc}
        <br /><br />
        <button
                onClick={markDone}
                style={{ backgroundColor: isCompleted ? "green" : "black" }}>
                {isCompleted ? "Completed" : "Mark As Done"}
            </button>
        <button onClick={removeTodo}>Delete</button>
        
    </Container>
}


const Container = styled.div({
    button:{
        background : "black",
        color : "white",
        fontFamily : "sans-serif",
        height: "44px",
        width: "224px",
        borderRadius : "7px",
        margin:"20px",


        "&:hover": {
            background: "white",
            color :"black",
            border : "1px solid white",
            transform: "scale(1.05)",
            transition: "ease-in-out 0.2s"
        },
    }
})