import React from "react";
import Header from "../components/Header/Header";

function Login() {

  const errpage = {
    backgroundColor : "#E0E9F8",
    height:"calc(100vh - 1cm)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  }
  const errcontent = {
    padding:"0px",
    margin:"0px",
    fontSize:"5cm",
    color:"#0762F6"
  }

  return (
    <div >
      <Header value={"Error"}/>
      <div style = {errpage}>
          <h1 style = {errcontent} >404.</h1>
      </div>
    </div>
  );
}

export default Login;
