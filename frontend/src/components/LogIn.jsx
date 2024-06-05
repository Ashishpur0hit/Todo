import styled from "styled-components"
import DeatilsLogIn from "./DetailsLogIn"
import ImageComponent from "./ImageComponent"
export default function LogIn()
{
    return <Container>
            <Box>
               
                <Form>
                    <h1>Sign In</h1>
                    <DeatilsLogIn/>
                </Form>
                <Instruction>
                    <ImageComponent/>
                    A Todo Application is a versatile productivity tool designed to help users organize and manage their tasks efficiently. By allowing users to create, update, prioritize, and track their tasks, a todo application enhances productivity and ensures nothing important is overlooked. Key features include task categorization, due dates, reminders, and the ability to mark tasks as completed. With a user-friendly interface and support for multiple devices, it serves as an essential tool for anyone looking to streamline their daily activities and achieve their goals more effectively
                </Instruction>
            </Box>
        </Container>
    
}



const Container = styled.div({
    height : '100vh',
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
})


const  Box = styled.div({
    display : "flex",
    padding : "20px"
    
})

const Instruction = styled.div({
    width : "500px",
    background :"black",
    color:"white",
    padding : "20px"
    
}) 


const Form = styled.div({
    width : "500px",
    background:"#e7e7e7",
    padding : "20px",
    display : "flex",
    flexDirection:"column",
    justifyContent : "center",
    alignItems : "center",
    textAlign : "center"
    
})