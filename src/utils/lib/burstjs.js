// Node to use
import { NODEToUse } from "../globalParameters";

// Signum.js
import { ApiSettings, composeApi } from "@burstjs/core";

// Setup burstjs connection
const apiSettings = new ApiSettings(NODEToUse);
const api = composeApi(apiSettings);

export default api;
