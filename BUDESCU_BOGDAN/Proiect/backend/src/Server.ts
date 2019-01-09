import app from "./App";
const PORT = 8081;

app.listen(PORT, "0.0.0.0", () => {
    console.log('server listening on port ' + PORT);
})

