"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const parking_1 = require("./parking");
process.env.GOOGLE_APPLICATION_CREDENTIALS = config_1.configuration.GOOGLE_APPLICATION_CREDENTIALS;
new parking_1.Parking();
//# sourceMappingURL=index.js.map