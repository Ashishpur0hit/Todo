import styled from "styled-components"

export default function AddTask(){

    const handleLogout = async()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        window.location.href = '/';
    }
    
    return (<Container>
        <button onClick={handleLogout}>LogOut</button>
        <br />
        <h1>Add Todo Here !!</h1>



        
    </Container>)



}



const Container = styled.div({
    width : '400px',
    display : "flex",
    justifyContent : "top",
    flexDirection : "column",
    alignItems : "center",
    color : "white",
    // background : "aqua",



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
        },
    },



    h1:{
        color : "white"
    },

    // input :{
    //     width: "220px",
    //     height: "35px",
    //     borderRadius: "7px",
    //     border: "none",
    //     paddingLeft: "10px" /* Padding inside the input */
    // }
})