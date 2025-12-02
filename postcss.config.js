import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Bridge to the existing CJS PostCSS config.
export default require("./postcss.config.cjs");
