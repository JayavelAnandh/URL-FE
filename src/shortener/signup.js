import { useState } from "react"

const Signup =(signup)=>{
    const [name,setName]= useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    return(
        <div className="container-lg">
            <form onsubmit={signup}>

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
            <button type="submit" class="btn btn-success">Submit</button>

            </form>
        </div>
        
    )
}
export default Signup