import React, { useEffect } from "react";
import Login from "./pages/Login";
import Routes from "./routes";
import { parseCookies } from "nookies";
import { useSelector } from "react-redux";
import { RootState } from "./types";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { token, user } = useSelector((state: RootState) => state.clickState);

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        {token === undefined || token === '' ? <Login /> : <Routes />}
      </BrowserRouter>
    </div>
  );
}

export default App;
