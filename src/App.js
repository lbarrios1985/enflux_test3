import "./App.css";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Exercise from "./components/Exercise1";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

function App() {
  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return <Exercise />;
  } else {
    return (
      <Container component="main">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button onClick={loginWithRedirect} variant="contained">
            Log in
          </Button>
        </div>
      </Container>
    );
  }
}

export default App;
