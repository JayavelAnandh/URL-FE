import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Signup =(signup)=>{
    const [name,setName]= useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const navigate = useNavigate();

    const signUp = async(event)=>{
        event.preventDefault();
      try {
        const res = await fetch(
          "https://url-shortener-phi-eight.vercel.app/signup",
          {
            method:"POST",
            body:JSON.stringify({
              name,
              email,
              password
            }
            ),
            headers: {
              "Content-Type": "application/json",
            }
          }
        );

        const data = await res.json();
        localStorage.setItem("x-auth-token",data.Authtoken);
        navigate("/homepage")

      } catch (error) {
        console.log(error)
      }
    }
    return(
        <div className="container-lg">
            <form onSubmit={(event)=>signUp(event)}>

            <div className="input-group mb-3 ">

            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                    Enter your name
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />


           <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Enter a valid E-mail
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
                create a password
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

            <br/>
            <div>
              <button type="button" onClick={()=>navigate("/login")}>Already Have a account?</button>
            </div>
        </div>
        
    )
}
export default Signup