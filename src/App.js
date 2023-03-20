
import "./App.css";
import { useEffect, useState } from "react";
import Signup from "./shortener/signup";
import {  Route, Router, Routes, useNavigate } from 'react-router-dom';


function App() {
  const [shortData, setShortData] = useState([]);
  const [longUrl, setlongUrl] = useState("");
  const history = useNavigate()

  const getShortData = async () => {
    try {
      const response = await fetch(
        "https://url-shortener-phi-eight.vercel.app/urlRoutes",
        {
          method: "GET",
          headers: {
            "x-auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGIyOTVlOGQzNGIwY2NjODBkOTRhMyIsImlhdCI6MTY3ODUyOTU5Nn0.4Y7jgthFVmFtJidlOKAteC-KFKCw2Fwc1K0WMeE6r7M",
          },
        }
      );
      const data = await response.json();
      setShortData(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getShortData();
  }, []);

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
            "x-auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGIyOTVlOGQzNGIwY2NjODBkOTRhMyIsImlhdCI6MTY3ODUyOTU5Nn0.4Y7jgthFVmFtJidlOKAteC-KFKCw2Fwc1K0WMeE6r7M",
          },
        }
      );

      const data = await res.json();
      getShortData();
      console.log("Successfully added");
      setlongUrl("");
    } catch (error) {
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
            "x-auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGIyOTVlOGQzNGIwY2NjODBkOTRhMyIsImlhdCI6MTY3ODUyOTU5Nn0.4Y7jgthFVmFtJidlOKAteC-KFKCw2Fwc1K0WMeE6r7M",
          },
        }
      );
      getShortData();
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async()=>{
    try {
      const res = await fetch(
        "https://url-shortener-phi-eight.vercel.app/signup",
        {
          method:"POST",
          
        }
      )
    } catch (error) {
      
    }
  }

  return (
    <div className="App">

      
        {/* <Routes>
          <Route exact path="/" element={<App/>}></Route>
          <Route path="/signup" element={<Signup signUp={signUp}/>}>
        </Route>
        </Routes>
       */}
      
      <div className="container-lg titlebar">
        <h1>Welcome to BIG SH0(R)T</h1>
      </div>
      <div className="container-lg accbar">
        <button type="button" className="btn btn-primary" onClick={()=>history.push("/signup")} >
          SignUp
        </button>
        <button type="button" className="btn btn-primary">
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

export default App;
