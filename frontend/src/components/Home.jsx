import styled from "styled-components";
import AddTask from "./AddTask";
import { useState , useEffect } from "react";
import FillTitle from "./FillTitle";
import ShowTodo from "./ShowTodo";
export default function Home()
{

    const [todos , setTodos] = useState([]);


    useEffect(()=>{

        const getTasks = async()=>{
            const res = await fetch('http://localhost:3000/getAllTodo?email='+localStorage.getItem('email'));
            const ans = await res.json();

            setTodos(ans.info);
        }
        

        getTasks()
    },[])




    



    return <Container>
        <Box>
            <AddTask></AddTask>
            <FillTitle todos = {todos}  setTodos={setTodos}></FillTitle>
        </Box>
        <TasksBox>
            <h1>Todo List</h1>
            {todos.map((value , index)=>{
                return <ShowTodo key={value.id} keyProp={index} value={value} todos={todos} setTodos={setTodos}/>
            })}
        </TasksBox>
    </Container>
}



const Container = styled.div({
    background:"#e7e7e7",
    height:"100vh",
    display : "flex"
})


const Box = styled.div({
    background : "black",
    minheight:"100vh",
    width:"400px",
    padding : "30px"
    
})


const TasksBox = styled.div({
    minHeight : "100vh",
    padding : "20px",
    width : "calc(100% - 400px)",
    justifyContent : "top",
    alignItems : "center",
    display : "flex",
    flexDirection:"column" , 
    height : "auto" ,
    overflow : "auto"
})