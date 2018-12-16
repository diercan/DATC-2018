"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const PORT = 8081;
App_1.default.listen(PORT, "0.0.0.0", () => {
    console.log('server listening on port ' + PORT);
});
