import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

function Exercise() {
  const { isLoading, isAuthenticated, error, logout } = useAuth0();
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [additions, setAdditions] = useState("");
  const [deletions, setDeletions] = useState("");
  const [show, setShow] = useState(false);

  const onTargetChange = (e) => setTarget(e.target.value);
  const onCurrentChange = (e) => setCurrent(e.target.value);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  function validateString() {
    const regex = /^\d+(?:,\d+)*$/;
    if (regex.test(target) && regex.test(current)) {
      calculate();
    }
  }

  function calculate() {
    let intersection = current
      .split(",")
      .filter((value) => target.split(",").includes(value));
    let tmp1 = target
      .split(",")
      .map((value) => (intersection.includes(value) ? null : value))
      .filter((n) => n)
      .join(",");
    let tmp2 = current
      .split(",")
      .map((value) => (intersection.includes(value) ? null : value))
      .filter((n) => n)
      .join(",");
    setAdditions(tmp1);
    setDeletions(tmp2);
    setShow(true);
  }

  if (isAuthenticated) {
    return (
      <Container component="main">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log out
          </Button>
        </div>
        <Grid container spacing={2}>
          <Grid item>
            <h4>Array Diff</h4>
          </Grid>
          <Grid item xs={12}>
            Write a function or program that will take 2 arrays of integers,
            "current" and "target", and produce 2 arrays representing an
            additions list and a deletions list such that applying the additions
            and deletions to the "current" array will yield the "target" array.
            For example, given the following inputs:
          </Grid>
          <Grid item xs={12}>
            current: [1,3,5,6,8,9]
          </Grid>
          <Grid item xs={12}>
            target: [1,2,5,7,9]
          </Grid>
          <Grid item xs={12}>
            The outputs would be:
          </Grid>
          <Grid item xs={12}>
            additions: [2, 7]
          </Grid>
          <Grid item xs={12}>
            deletions: [3, 6, 8]
          </Grid>
          <Grid item xs={12}>
            So that the following is true:
          </Grid>
          <Grid item xs={12}>
            current([1, 3, 5, 6, 8, 9]) + additions([2, 7]) - deletions([3, 6,
            8]) = target([1, 2, 5, 7, 9])
          </Grid>
        </Grid>
        <Box mt={5}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              validateString();
            }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Current"
                  variant="outlined"
                  onChange={onCurrentChange}
                  value={current}
                  placeholder="Enter Numbers separate by comma"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Target"
                  variant="outlined"
                  onChange={onTargetChange}
                  value={target}
                  placeholder="Enter Numbers separate by comma"
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained">
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        {show && (
          <>
            <Box mt={5}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>additions:</Grid>
                <Grid item>[{additions}]</Grid>
              </Grid>
            </Box>
            <Box>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>deletions:</Grid>
                <Grid item>[{deletions}]</Grid>
              </Grid>
            </Box>
          </>
        )}
      </Container>
    );
  }
}

export default Exercise;
