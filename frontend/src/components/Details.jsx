import { useRef  , useState} from "react"
import styled from "styled-components"
export default function Details()
{

    let userNameRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();

   



    const handleSubmit = async()=>{
        let credentials = {
            username : userNameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value
        }


        console.log(credentials);



        const res = await fetch("http://localhost:3000/SignUpUser",{
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
    





    return(
        <Container>

            Username : <br />
            <input type="text" placeholder="Enter Your Name"  required id="username"  ref={userNameRef}/>
            <br /><br />

            E-mail : <br/>
            <input type="email" required placeholder="Enter Email" id="email" ref={emailRef}/>
            <br /> <br />

            Password : <br />
            <input type="password" required placeholder="Enter Your Password" id="passowrd" ref={passwordRef}/>
            <br /> <br />


            <Button id="btn" onClick={handleSubmit}>
                Sign Up
            </Button>
            <br /><br/>


            <Button id="btn" onClick={()=>{ window.location.href = '/LogIn'}}>
                Already a User
            </Button>

        </Container>
    )
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
    },


  
    
})