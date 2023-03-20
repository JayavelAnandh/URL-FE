import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Login(){

    const [email,setEmail]= useState();
    const [password,setPassword]=useState();
    const navigate = useNavigate();


    const login=async(event)=>{
        event.preventDefault();

        const res = await fetch(
            "https://url-shortener-phi-eight.vercel.app/login",
            {
                method:"POST",
                body:JSON.stringify({
                    email,
                    password
                }),
                headers:{
                    "Content-Type": "application/json",
                }
            }
        );

        const data = await res.json();
        alert(data.message)
        localStorage.setItem("x-auth-token",data.token);
        navigate("/")
    }
    return(
        <div className="container-lg">
            <form onSubmit={(event)=>{login(event)}}>

            <div className="input-group mb-3 ">

           <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Enter your Registered E-mail
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />


            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Enter your password
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            </div>
            <button type="submit" className="btn btn-success">Submit</button>

            </form>
            </div>
    )
}

export default Login;