import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Bridge to the existing CJS config to keep ESM project-wide.
const config = require("./next.config.cjs");

export default config;
