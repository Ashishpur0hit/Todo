import styled from "styled-components"
import { useRef } from "react";
export default function DeatilsLogIn() {

    let username = useRef();
    let password = useRef();

    const handleSubmition = async()=>{
        let credentials = {
            email : username.current.value,
            password : password.current.value
        }

        console.log(credentials);



        const res = await fetch("http://localhost:3000/LogInUser",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)});

        const ans = await res.json();

        if(ans.flag)
        {
            localStorage.setItem('token' , ans.token);
            localStorage.setItem('email',credentials.email);
            window.location.href = '/Home'
        }
        else 
        {
            console.log(ans.msg);
            alert("Something Went Wrong")
        }
    }





    return <Container>

        Email : <br />
        <input type="text" placeholder="Enter Your Email" required id="UserName" ref={username}/>
        <br /><br />


        Password : <br />
        <input type="password" required placeholder="Enter Your Password" id="passowrd" ref={password}/>
        <br /> <br />


        <Button id="btn" onClick={handleSubmition}>
            Sign In
        </Button>
        <br />
        <br />


        <Button id="btn" onClick={() => { window.location.href = "/" }}>
            New User ?
        </Button>

    </Container>
}


const Container  = styled.div({
    padding : "20px",
    display : "flex",
    flexDirection : "column",
    textAlign:"start",



    input :{
        width: "220px",
        height: "35px",
        borderRadius: "7px",
        border: "none",
        paddingLeft: "10px" /* Padding inside the input */
    }
})


const Button = styled.button({
    background : "black",
    color : "white",

    height: "44px",
    width: "224px",
    borderRadius : "7px",

   
    "&:hover": {
        background: "white",
        color :"black",
        transform: "scale(1.05)",
        transition : "ease-in  0.5"
    },


  
    
})