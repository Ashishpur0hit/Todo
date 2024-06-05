import styled from "styled-components"
export default function ImageComponent()
{
    return <Container>
        <img src="/drawables/reading.png" alt="reading.me" />
        <h1>Todo Website</h1>
    </Container>
} 




const Container = styled.div({
    
   
    display : "flex",
    justifyContent:"start",
    alignItems : "center",
    marginBottom:"30px",




    img : {
        height : "70px",
        width : "70px"
    } , 

    h1:{
        color : "white",
        marginLeft : "20px"
    }
})



