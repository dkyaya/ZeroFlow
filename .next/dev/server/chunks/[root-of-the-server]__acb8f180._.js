module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/prisma.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
let prisma;
// Prevent multiple Prisma instances in dev (Next.js hot reload)
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if (!/*TURBOPACK member replacement*/ __turbopack_context__.g.prisma) {
        /*TURBOPACK member replacement*/ __turbopack_context__.g.prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
    }
    prisma = /*TURBOPACK member replacement*/ __turbopack_context__.g.prisma;
}
;
}),
"[project]/app/api/food/search/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/food/search/route.js
// USDA-backed search with graceful fallback when the DB is empty or unavailable.
__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.js [app-route] (ecmascript)");
;
;
// Nutrient IDs in USDA FDC
// These do NOT change across versions
const NUTRIENTS = {
    calories: 1008,
    protein: 1003,
    carbs: 1005,
    fat: 1004
};
// Lightweight fallback dataset so autocomplete still works if the DB is empty
const FALLBACK_FOODS = [
    {
        fdcId: 1,
        name: "Apple",
        brandName: null,
        dataType: "Generic",
        macros: {
            calories: 95,
            protein: 0.5,
            carbs: 25,
            fat: 0.3
        }
    },
    {
        fdcId: 2,
        name: "Banana",
        brandName: null,
        dataType: "Generic",
        macros: {
            calories: 105,
            protein: 1.3,
            carbs: 27,
            fat: 0.4
        }
    },
    {
        fdcId: 3,
        name: "Grilled Chicken Breast (100g)",
        brandName: null,
        dataType: "Generic",
        macros: {
            calories: 165,
            protein: 31,
            carbs: 0,
            fat: 3.6
        }
    },
    {
        fdcId: 4,
        name: "White Rice (1 cup cooked)",
        brandName: null,
        dataType: "Generic",
        macros: {
            calories: 205,
            protein: 4.3,
            carbs: 45,
            fat: 0.4
        }
    },
    {
        fdcId: 5,
        name: "Broccoli (1 cup)",
        brandName: null,
        dataType: "Generic",
        macros: {
            calories: 55,
            protein: 3.7,
            carbs: 11,
            fat: 0.6
        }
    },
    {
        fdcId: 6,
        name: "Salmon (100g)",
        brandName: null,
        dataType: "Generic",
        macros: {
            calories: 208,
            protein: 20,
            carbs: 0,
            fat: 13
        }
    },
    {
        fdcId: 7,
        name: "Oats (1 cup cooked)",
        brandName: null,
        dataType: "Generic",
        macros: {
            calories: 150,
            protein: 5,
            carbs: 27,
            fat: 3
        }
    },
    {
        fdcId: 8,
        name: "Greek Yogurt (1 cup)",
        brandName: null,
        dataType: "Generic",
        macros: {
            calories: 130,
            protein: 23,
            carbs: 7,
            fat: 0
        }
    },
    {
        fdcId: 9,
        name: "Almonds (1 oz)",
        brandName: null,
        dataType: "Generic",
        macros: {
            calories: 164,
            protein: 6,
            carbs: 6,
            fat: 14
        }
    },
    {
        fdcId: 10,
        name: "Egg (1 large)",
        brandName: null,
        dataType: "Generic",
        macros: {
            calories: 78,
            protein: 6,
            carbs: 0.6,
            fat: 5
        }
    }
];
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q")?.trim().toLowerCase() || "";
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 25;
        if (!query) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                results: [],
                page,
                total: 0
            });
        }
        let foods = [];
        try {
            // SQLite doesn't support full-text search without extensions
            // but LIKE + wildcard search is still fast for your use case
            foods = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].food.findMany({
                where: {
                    OR: [
                        {
                            description: {
                                contains: query
                            }
                        },
                        {
                            brandName: {
                                contains: query
                            }
                        }
                    ]
                },
                skip: (page - 1) * limit,
                take: limit
            });
        } catch (err) {
            // Likely schema/table missing during setup — handled below with fallback
            console.warn("DB food search unavailable, using fallback data.", err?.message);
        }
        // Pull the food IDs returned in this page
        const foodIds = foods.map((f)=>f.fdcId);
        // If DB search returned nothing, use the small fallback dataset
        if (foodIds.length === 0 && foods.length === 0) {
            const filtered = FALLBACK_FOODS.filter((f)=>f.name.toLowerCase().includes(query)).slice(0, limit);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                results: filtered,
                page,
                total: filtered.length
            });
        }
        // Fetch nutrients for ONLY the foods in the current page
        const nutrientRows = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].foodNutrient.findMany({
            where: {
                foodId: {
                    in: foodIds
                },
                nutrientId: {
                    in: Object.values(NUTRIENTS)
                }
            },
            include: {
                nutrient: true
            }
        });
        // Build macro map: fdcId -> { macros }
        const macroMap = {};
        for (const row of nutrientRows){
            const fid = row.foodId;
            if (!macroMap[fid]) {
                macroMap[fid] = {
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0
                };
            }
            const n = row.nutrientId;
            if (n === NUTRIENTS.calories) macroMap[fid].calories = row.amount;
            if (n === NUTRIENTS.protein) macroMap[fid].protein = row.amount;
            if (n === NUTRIENTS.carbs) macroMap[fid].carbs = row.amount;
            if (n === NUTRIENTS.fat) macroMap[fid].fat = row.amount;
        }
        // Build final result array
        const results = foods.map((food)=>({
                fdcId: food.fdcId,
                name: food.description,
                brandName: food.brandName,
                dataType: food.dataType,
                macros: macroMap[food.fdcId] || {
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0
                }
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            results,
            page,
            total: results.length
        });
    } catch (err) {
        console.error("Food search error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to search foods"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__acb8f180._.js.map