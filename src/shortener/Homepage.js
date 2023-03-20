import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Homepage(){
    const [shortData, setShortData] = useState([]);
    const [longUrl, setlongUrl] = useState("");
    const navigate = useNavigate()
  
    useEffect(()=>{
        if(!(localStorage.getItem("x-auth-token"))){
            navigate("/signup")
            alert("Signup to continue")
        }
        else getShortData();
    })

    const getShortData = async () => {
      try {
        const response = await fetch(
          "https://url-shortener-phi-eight.vercel.app/urlRoutes",
          {
            method: "GET",
            headers: {
              "x-auth-token": localStorage.getItem("x-auth-token") },
          }
        );
        const data = await response.json();
        setShortData(data);
      } catch (error) {
        if(!(localStorage.getItem("x-auth-token"))){
            navigate("/signup")
            alert("Signup to continue")
        }
        console.log("Error", error);
      }
    };
  
    
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const res = await fetch(
          "https://url-shortener-phi-eight.vercel.app/urlRoutes/create",
          {
            method: "POST",
            body: JSON.stringify({
              longUrl,
            }),
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("x-auth-token")},
          }
        );
  
        const data = await res.json();
        getShortData();
        console.log("Successfully added");
        setlongUrl("");
      } catch (error) {
        if(!(localStorage.getItem("x-auth-token"))){
            navigate("/signup")
            alert("Signup to continue")
        }
        console.log(error);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        const res = await fetch(
          `https://url-shortener-phi-eight.vercel.app/urlRoutes/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "x-auth-token":localStorage.getItem("x-auth-token")},
          }
        );
        getShortData();
      } catch (error) {
        if(!(localStorage.getItem("x-auth-token"))){
            navigate("/signup")
            alert("Signup to continue")
        }
        
        console.log(error);
      }
    };
  
    
  
    return (
      <div className="App">
  
        
        <div className="container-lg titlebar">
          <h1>Welcome to BIG SH0(R)T</h1>
        </div>
        <div className="container-lg accbar">
          <button type="button" className="btn btn-primary" onClick={()=>navigate("/signup")} >
            SignUp
          </button>
          <button type="button" className="btn btn-primary" onClick={()=>navigate("/login")}>
            LogIn
          </button>
        </div>
  
        <div className="container-lg urlbar">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3 ">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Paste url here{" "}
                </span>
              </div>
              <input
                type="url"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={longUrl}
                onChange={(event) => setlongUrl(event.target.value)}
              />
            </div>
  
            <button type="submit" className="btn btn-success">
              submit
            </button>
          </form>
        </div>
  
        <div className="container-lg display">
          <div className="row">
            {shortData.map((data, index) => {
              return (
                <div
                  className="card col-3"
                  style={{ width: "20rem", margin: "10px" }}
                  key={index}
                >
                  <div className="card-body">
                    <h5 className="card-title">{data.longUrl}</h5>
                    <a href={data.longUrl} className="card-link" target="_blank">
                      {data.shortenedUrl}
                    </a>
                    <br />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(data._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
}
export default Homepage;