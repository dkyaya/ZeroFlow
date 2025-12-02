import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Bridge to the existing CJS Tailwind config.
export default require("./tailwind.config.cjs");
