module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.jsx [app-rsc] (ecmascript)"));
}),
"[project]/app/dashboard/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { jsxDEV: _jsxDEV } = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
{}/*#__PURE__*/ _jsxDEV("div", {
    className: "bg-white shadow-lg rounded-xl p-6 border border-slate-100 flex flex-col gap-6",
    children: [
        /*#__PURE__*/ _jsxDEV("div", {
            className: "flex items-center gap-6",
            children: [
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "relative h-24 w-24",
                    children: [
                        /*#__PURE__*/ _jsxDEV("svg", {
                            className: "h-full w-full transform -rotate-90",
                            children: [
                                /*#__PURE__*/ _jsxDEV("circle", {
                                    cx: "48",
                                    cy: "48",
                                    r: "42",
                                    stroke: "#E2E8F0",
                                    strokeWidth: "10",
                                    fill: "none"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.jsx",
                                    lineNumber: 10,
                                    columnNumber: 9
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                /*#__PURE__*/ _jsxDEV("circle", {
                                    cx: "48",
                                    cy: "48",
                                    r: "42",
                                    stroke: "#1E40AF",
                                    strokeWidth: "10",
                                    fill: "none",
                                    strokeDasharray: 2 * Math.PI * 42,
                                    strokeDashoffset: (1 - caloriesConsumed / caloriesTarget) * 2 * Math.PI * 42,
                                    strokeLinecap: "round",
                                    className: "transition-all duration-700 ease-out"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.jsx",
                                    lineNumber: 16,
                                    columnNumber: 9
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 9,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "absolute inset-0 flex items-center justify-center",
                            children: /*#__PURE__*/ _jsxDEV("span", {
                                className: "text-lg font-semibold text-slate-800",
                                children: [
                                    Math.round(caloriesConsumed / caloriesTarget * 100),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 32,
                                columnNumber: 9
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 31,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.jsx",
                    lineNumber: 8,
                    columnNumber: 5
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV("div", {
                    children: [
                        /*#__PURE__*/ _jsxDEV("h2", {
                            className: "text-xl font-semibold mb-3",
                            children: "Daily Calories"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 40,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("p", {
                            children: [
                                /*#__PURE__*/ _jsxDEV("span", {
                                    className: "font-medium",
                                    children: "Target:"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.jsx",
                                    lineNumber: 41,
                                    columnNumber: 10
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                " ",
                                caloriesTarget,
                                " cal"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 41,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("p", {
                            children: [
                                /*#__PURE__*/ _jsxDEV("span", {
                                    className: "font-medium",
                                    children: "Consumed:"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.jsx",
                                    lineNumber: 42,
                                    columnNumber: 10
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                " ",
                                caloriesConsumed,
                                " cal"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 42,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("p", {
                            className: `font-medium mt-2 ${remaining === 0 ? "text-red-600" : "text-green-700"}`,
                            children: [
                                "Remaining: ",
                                remaining,
                                " cal"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 43,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.jsx",
                    lineNumber: 39,
                    columnNumber: 5
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/page.jsx",
            lineNumber: 5,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
        /*#__PURE__*/ _jsxDEV("div", {
            className: "mt-1",
            children: [
                /*#__PURE__*/ _jsxDEV("p", {
                    className: "font-medium text-slate-700 mb-2",
                    children: "Macros"
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/page.jsx",
                    lineNumber: 55,
                    columnNumber: 5
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "flex items-center gap-2 text-xs text-slate-500 mb-1",
                    children: [
                        /*#__PURE__*/ _jsxDEV("span", {
                            children: "Protein"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 59,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("span", {
                            children: "·"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 60,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("span", {
                            children: "Carbs"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 61,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("span", {
                            children: "·"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 62,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("span", {
                            children: "Fat"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 63,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.jsx",
                    lineNumber: 58,
                    columnNumber: 5
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "w-full h-3 bg-slate-200 rounded-full overflow-hidden flex",
                    children: [
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "bg-blue-700 h-full",
                            style: {
                                width: "30%"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 69,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "bg-blue-400 h-full",
                            style: {
                                width: "50%"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 75,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "bg-blue-900 h-full",
                            style: {
                                width: "20%"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 81,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.jsx",
                    lineNumber: 66,
                    columnNumber: 5
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/page.jsx",
            lineNumber: 54,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
    ]
}, void 0, true, {
    fileName: "[project]/app/dashboard/page.jsx",
    lineNumber: 2,
    columnNumber: 1
}, /*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/app/dashboard/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/page.jsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7c9e6c3a._.js.map