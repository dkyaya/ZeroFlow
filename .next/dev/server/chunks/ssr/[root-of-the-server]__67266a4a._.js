module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/components/BarcodeScanner.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BarcodeScanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$quagga$2f$dist$2f$quagga$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/quagga/dist/quagga.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function BarcodeScanner({ onDetected, onClose }) {
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initialize scanner
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$quagga$2f$dist$2f$quagga$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].init({
            inputStream: {
                type: "LiveStream",
                target: videoRef.current,
                constraints: {
                    facingMode: "environment"
                }
            },
            decoder: {
                readers: [
                    "ean_reader",
                    "upc_reader",
                    "upc_e_reader"
                ]
            }
        }, (err)=>{
            if (err) {
                console.error(err);
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$quagga$2f$dist$2f$quagga$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].start();
        });
        // When barcode detected
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$quagga$2f$dist$2f$quagga$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].onDetected((data)=>{
            const code = data.codeResult.code;
            onDetected(code);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$quagga$2f$dist$2f$quagga$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].stop();
        });
        return ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$quagga$2f$dist$2f$quagga$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].offDetected();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$quagga$2f$dist$2f$quagga$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].stop();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-xl shadow-xl p-4 w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-semibold mb-4",
                    children: "Scan Barcode"
                }, void 0, false, {
                    fileName: "[project]/app/components/BarcodeScanner.jsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: videoRef,
                    className: "w-full h-64 bg-black rounded-lg overflow-hidden"
                }, void 0, false, {
                    fileName: "[project]/app/components/BarcodeScanner.jsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "mt-4 w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 transition",
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/app/components/BarcodeScanner.jsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/BarcodeScanner.jsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/BarcodeScanner.jsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/food.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FOOD_DB",
    ()=>FOOD_DB
]);
const FOOD_DB = [
    {
        "name": "Apple",
        "calories": 95
    },
    {
        "name": "Banana",
        "calories": 105
    },
    {
        "name": "Orange",
        "calories": 62
    },
    {
        "name": "Strawberries (1 cup)",
        "calories": 53
    },
    {
        "name": "Blueberries (1 cup)",
        "calories": 85
    },
    {
        "name": "Raspberries (1 cup)",
        "calories": 64
    },
    {
        "name": "Blackberries (1 cup)",
        "calories": 62
    },
    {
        "name": "Grapes (1 cup)",
        "calories": 104
    },
    {
        "name": "Watermelon (1 cup)",
        "calories": 46
    },
    {
        "name": "Pineapple (1 cup)",
        "calories": 82
    },
    {
        "name": "Mango",
        "calories": 201
    },
    {
        "name": "Peach",
        "calories": 59
    },
    {
        "name": "Pear",
        "calories": 101
    },
    {
        "name": "Plum",
        "calories": 30
    },
    {
        "name": "Kiwi",
        "calories": 42
    },
    {
        "name": "Papaya (1 cup)",
        "calories": 55
    },
    {
        "name": "Cantaloupe (1 cup)",
        "calories": 53
    },
    {
        "name": "Honeydew (1 cup)",
        "calories": 61
    },
    {
        "name": "Apricot",
        "calories": 17
    },
    {
        "name": "Pomegranate (1 cup)",
        "calories": 144
    },
    {
        "name": "Tomato",
        "calories": 22
    },
    {
        "name": "Cucumber (1 cup)",
        "calories": 16
    },
    {
        "name": "Carrots (1 cup)",
        "calories": 52
    },
    {
        "name": "Broccoli (1 cup)",
        "calories": 55
    },
    {
        "name": "Cauliflower (1 cup)",
        "calories": 25
    },
    {
        "name": "Spinach (1 cup)",
        "calories": 7
    },
    {
        "name": "Kale (1 cup)",
        "calories": 33
    },
    {
        "name": "Lettuce (1 cup)",
        "calories": 5
    },
    {
        "name": "Onion (1 cup)",
        "calories": 64
    },
    {
        "name": "Bell Pepper (1 cup)",
        "calories": 39
    },
    {
        "name": "Sweet Potato (1 medium)",
        "calories": 112
    },
    {
        "name": "Potato (1 medium)",
        "calories": 164
    },
    {
        "name": "Corn (1 cup)",
        "calories": 143
    },
    {
        "name": "Peas (1 cup)",
        "calories": 134
    },
    {
        "name": "Zucchini (1 cup)",
        "calories": 21
    },
    {
        "name": "Green Beans (1 cup)",
        "calories": 44
    },
    {
        "name": "Asparagus (1 cup)",
        "calories": 27
    },
    {
        "name": "Brussels Sprouts (1 cup)",
        "calories": 38
    },
    {
        "name": "Eggplant (1 cup)",
        "calories": 20
    },
    {
        "name": "Mushrooms (1 cup)",
        "calories": 21
    },
    {
        "name": "Chicken Breast (100g)",
        "calories": 165
    },
    {
        "name": "Chicken Thigh (100g)",
        "calories": 209
    },
    {
        "name": "Turkey Breast (100g)",
        "calories": 135
    },
    {
        "name": "Ground Turkey (100g)",
        "calories": 203
    },
    {
        "name": "Beef Steak (100g)",
        "calories": 242
    },
    {
        "name": "Ground Beef 80/20 (100g)",
        "calories": 254
    },
    {
        "name": "Ground Beef 90/10 (100g)",
        "calories": 176
    },
    {
        "name": "Pork Chop (100g)",
        "calories": 231
    },
    {
        "name": "Ham (100g)",
        "calories": 145
    },
    {
        "name": "Bacon (1 slice)",
        "calories": 42
    },
    {
        "name": "Salmon (100g)",
        "calories": 208
    },
    {
        "name": "Tuna (100g)",
        "calories": 132
    },
    {
        "name": "Tilapia (100g)",
        "calories": 129
    },
    {
        "name": "Shrimp (100g)",
        "calories": 99
    },
    {
        "name": "Cod (100g)",
        "calories": 82
    },
    {
        "name": "Sardines (100g)",
        "calories": 208
    },
    {
        "name": "Crab (100g)",
        "calories": 97
    },
    {
        "name": "Lobster (100g)",
        "calories": 89
    },
    {
        "name": "Scallops (100g)",
        "calories": 111
    },
    {
        "name": "Trout (100g)",
        "calories": 148
    },
    {
        "name": "White Rice (1 cup)",
        "calories": 205
    },
    {
        "name": "Brown Rice (1 cup)",
        "calories": 216
    },
    {
        "name": "Quinoa (1 cup)",
        "calories": 222
    },
    {
        "name": "Oats (1 cup cooked)",
        "calories": 150
    },
    {
        "name": "Pasta (1 cup cooked)",
        "calories": 221
    },
    {
        "name": "Bread (1 slice)",
        "calories": 80
    },
    {
        "name": "Tortilla (1 medium)",
        "calories": 120
    },
    {
        "name": "Bagel",
        "calories": 245
    },
    {
        "name": "English Muffin",
        "calories": 132
    },
    {
        "name": "Granola (1/2 cup)",
        "calories": 200
    },
    {
        "name": "Black Beans (1 cup)",
        "calories": 227
    },
    {
        "name": "Pinto Beans (1 cup)",
        "calories": 245
    },
    {
        "name": "Chickpeas (1 cup)",
        "calories": 269
    },
    {
        "name": "Lentils (1 cup)",
        "calories": 230
    },
    {
        "name": "Kidney Beans (1 cup)",
        "calories": 225
    },
    {
        "name": "Tofu (100g)",
        "calories": 76
    },
    {
        "name": "Tempeh (100g)",
        "calories": 192
    },
    {
        "name": "Edamame (1 cup)",
        "calories": 188
    },
    {
        "name": "Hummus (2 tbsp)",
        "calories": 70
    },
    {
        "name": "Falafel (1 piece)",
        "calories": 57
    },
    {
        "name": "Cheddar Cheese (1 slice)",
        "calories": 113
    },
    {
        "name": "Mozzarella Cheese (1 slice)",
        "calories": 85
    },
    {
        "name": "Swiss Cheese (1 slice)",
        "calories": 106
    },
    {
        "name": "Cottage Cheese (1 cup)",
        "calories": 206
    },
    {
        "name": "Greek Yogurt (1 cup)",
        "calories": 130
    },
    {
        "name": "Regular Yogurt (1 cup)",
        "calories": 149
    },
    {
        "name": "Milk (1 cup)",
        "calories": 103
    },
    {
        "name": "Almond Milk (1 cup)",
        "calories": 30
    },
    {
        "name": "Soy Milk (1 cup)",
        "calories": 80
    },
    {
        "name": "Ice Cream (1 cup)",
        "calories": 267
    },
    {
        "name": "Butter (1 tbsp)",
        "calories": 102
    },
    {
        "name": "Mayonnaise (1 tbsp)",
        "calories": 94
    },
    {
        "name": "Olive Oil (1 tbsp)",
        "calories": 119
    },
    {
        "name": "Canola Oil (1 tbsp)",
        "calories": 124
    },
    {
        "name": "Peanut Butter (2 tbsp)",
        "calories": 190
    },
    {
        "name": "Almond Butter (2 tbsp)",
        "calories": 196
    },
    {
        "name": "Nutella (2 tbsp)",
        "calories": 200
    },
    {
        "name": "Cream Cheese (2 tbsp)",
        "calories": 100
    },
    {
        "name": "Sour Cream (2 tbsp)",
        "calories": 60
    },
    {
        "name": "Heavy Cream (1 tbsp)",
        "calories": 52
    },
    {
        "name": "Egg (1 large)",
        "calories": 78
    },
    {
        "name": "Egg White (1 large)",
        "calories": 17
    },
    {
        "name": "Egg Yolk (1 large)",
        "calories": 55
    },
    {
        "name": "Scrambled Eggs (1 cup)",
        "calories": 197
    },
    {
        "name": "Omelette (1)",
        "calories": 154
    },
    {
        "name": "Fried Egg (1)",
        "calories": 90
    },
    {
        "name": "Boiled Egg (1)",
        "calories": 78
    },
    {
        "name": "Poached Egg (1)",
        "calories": 72
    },
    {
        "name": "Quiche (1 slice)",
        "calories": 296
    },
    {
        "name": "Deviled Egg (1 half)",
        "calories": 62
    },
    {
        "name": "Hamburger (1)",
        "calories": 354
    },
    {
        "name": "Cheeseburger (1)",
        "calories": 370
    },
    {
        "name": "Hot Dog (1)",
        "calories": 151
    },
    {
        "name": "French Fries (medium)",
        "calories": 365
    },
    {
        "name": "Chicken Nuggets (6 pcs)",
        "calories": 280
    },
    {
        "name": "Chicken Sandwich (1)",
        "calories": 440
    },
    {
        "name": "Pizza Slice (cheese)",
        "calories": 285
    },
    {
        "name": "Pizza Slice (pepperoni)",
        "calories": 313
    },
    {
        "name": "Taco (1)",
        "calories": 170
    },
    {
        "name": "Burrito (1)",
        "calories": 480
    },
    {
        "name": "Sushi Roll (1)",
        "calories": 45
    },
    {
        "name": "California Roll (1 roll)",
        "calories": 255
    },
    {
        "name": "Spicy Tuna Roll (1 roll)",
        "calories": 290
    },
    {
        "name": "Salmon Sashimi (6 pcs)",
        "calories": 240
    },
    {
        "name": "Tempura Shrimp (1)",
        "calories": 60
    },
    {
        "name": "Udon (1 bowl)",
        "calories": 310
    },
    {
        "name": "Ramen (1 bowl)",
        "calories": 430
    },
    {
        "name": "Miso Soup (1 cup)",
        "calories": 40
    },
    {
        "name": "Edamame (1 cup)",
        "calories": 188
    },
    {
        "name": "Gyoza (1)",
        "calories": 70
    },
    {
        "name": "Tortilla Chips (1 oz)",
        "calories": 138
    },
    {
        "name": "Potato Chips (1 oz)",
        "calories": 154
    },
    {
        "name": "Pretzels (1 oz)",
        "calories": 108
    },
    {
        "name": "Popcorn (3 cups)",
        "calories": 93
    },
    {
        "name": "Crackers (5)",
        "calories": 70
    },
    {
        "name": "Granola Bar (1)",
        "calories": 100
    },
    {
        "name": "Protein Bar (1)",
        "calories": 200
    },
    {
        "name": "Trail Mix (1 oz)",
        "calories": 137
    },
    {
        "name": "Beef Jerky (1 oz)",
        "calories": 116
    },
    {
        "name": "Rice Cakes (1)",
        "calories": 35
    },
    {
        "name": "Chocolate Bar (1)",
        "calories": 210
    },
    {
        "name": "Candy (1 fun size)",
        "calories": 70
    },
    {
        "name": "Gummy Bears (10 pieces)",
        "calories": 87
    },
    {
        "name": "Ice Cream Bar (1)",
        "calories": 160
    },
    {
        "name": "Brownie (1)",
        "calories": 160
    },
    {
        "name": "Cookie (1)",
        "calories": 78
    },
    {
        "name": "Cupcake (1)",
        "calories": 215
    },
    {
        "name": "Muffin (1)",
        "calories": 265
    },
    {
        "name": "Donut (1)",
        "calories": 250
    },
    {
        "name": "Cake Slice (1)",
        "calories": 235
    },
    {
        "name": "Pancakes (2)",
        "calories": 175
    },
    {
        "name": "Waffles (2)",
        "calories": 195
    },
    {
        "name": "French Toast (2 slices)",
        "calories": 300
    },
    {
        "name": "Cereal (1 cup)",
        "calories": 120
    },
    {
        "name": "Granola (1/2 cup)",
        "calories": 200
    },
    {
        "name": "Bagel with Cream Cheese",
        "calories": 350
    },
    {
        "name": "Breakfast Burrito",
        "calories": 450
    },
    {
        "name": "Hash Browns (1 patty)",
        "calories": 140
    },
    {
        "name": "Oatmeal Packet",
        "calories": 150
    },
    {
        "name": "Protein Shake (1 scoop)",
        "calories": 120
    },
    {
        "name": "BBQ Chicken (1 cup)",
        "calories": 287
    },
    {
        "name": "Mashed Potatoes (1 cup)",
        "calories": 237
    },
    {
        "name": "Baked Beans (1 cup)",
        "calories": 240
    },
    {
        "name": "Mac and Cheese (1 cup)",
        "calories": 310
    },
    {
        "name": "Baked Salmon (1 fillet)",
        "calories": 230
    },
    {
        "name": "Grilled Shrimp (6)",
        "calories": 60
    },
    {
        "name": "Roasted Vegetables (1 cup)",
        "calories": 180
    },
    {
        "name": "Lasagna (1 slice)",
        "calories": 336
    },
    {
        "name": "Meatballs (3)",
        "calories": 250
    },
    {
        "name": "Chili (1 cup)",
        "calories": 250
    },
    {
        "name": "Sandwich (turkey)",
        "calories": 290
    },
    {
        "name": "Sandwich (ham & cheese)",
        "calories": 320
    },
    {
        "name": "BLT Sandwich",
        "calories": 340
    },
    {
        "name": "Sub Sandwich (6-inch)",
        "calories": 450
    },
    {
        "name": "Chicken Wrap",
        "calories": 350
    },
    {
        "name": "Tuna Salad (1 cup)",
        "calories": 383
    },
    {
        "name": "Egg Salad (1 cup)",
        "calories": 350
    },
    {
        "name": "Caesar Salad (1 bowl)",
        "calories": 330
    },
    {
        "name": "Garden Salad (1 bowl)",
        "calories": 150
    },
    {
        "name": "Cobb Salad (1 bowl)",
        "calories": 623
    },
    {
        "name": "Banana Bread (1 slice)",
        "calories": 196
    },
    {
        "name": "Cornbread (1 piece)",
        "calories": 180
    },
    {
        "name": "Garlic Bread (1 slice)",
        "calories": 150
    },
    {
        "name": "Dinner Roll (1)",
        "calories": 82
    },
    {
        "name": "Croissant (1)",
        "calories": 231
    },
    {
        "name": "Biscuit (1)",
        "calories": 211
    },
    {
        "name": "Pita Bread (1)",
        "calories": 170
    },
    {
        "name": "Naan Bread (1)",
        "calories": 260
    },
    {
        "name": "Sourdough Bread (1 slice)",
        "calories": 120
    },
    {
        "name": "Rye Bread (1 slice)",
        "calories": 83
    },
    {
        "name": "Avocado (1 whole)",
        "calories": 240
    },
    {
        "name": "Guacamole (2 tbsp)",
        "calories": 50
    },
    {
        "name": "Salsa (2 tbsp)",
        "calories": 10
    },
    {
        "name": "Hummus (2 tbsp)",
        "calories": 70
    },
    {
        "name": "Pesto (2 tbsp)",
        "calories": 160
    },
    {
        "name": "Marinara (1/2 cup)",
        "calories": 70
    },
    {
        "name": "Alfredo Sauce (1/2 cup)",
        "calories": 220
    },
    {
        "name": "Soy Sauce (1 tbsp)",
        "calories": 10
    },
    {
        "name": "Barbecue Sauce (2 tbsp)",
        "calories": 70
    },
    {
        "name": "Ketchup (1 tbsp)",
        "calories": 20
    },
    {
        "name": "Apple Juice (1 cup)",
        "calories": 114
    },
    {
        "name": "Orange Juice (1 cup)",
        "calories": 112
    },
    {
        "name": "Grape Juice (1 cup)",
        "calories": 154
    },
    {
        "name": "Cranberry Juice (1 cup)",
        "calories": 116
    },
    {
        "name": "Smoothie (1 cup)",
        "calories": 130
    },
    {
        "name": "Protein Shake (1 bottle)",
        "calories": 200
    },
    {
        "name": "Soda (1 can)",
        "calories": 140
    },
    {
        "name": "Energy Drink (1 can)",
        "calories": 110
    },
    {
        "name": "Sweet Tea (1 cup)",
        "calories": 90
    },
    {
        "name": "Lemonade (1 cup)",
        "calories": 99
    },
    {
        "name": "Coffee (black)",
        "calories": 2
    },
    {
        "name": "Coffee w/ Cream & Sugar",
        "calories": 70
    },
    {
        "name": "Latte (medium)",
        "calories": 190
    },
    {
        "name": "Cappuccino (medium)",
        "calories": 120
    },
    {
        "name": "Mocha (medium)",
        "calories": 290
    },
    {
        "name": "Hot Chocolate (1 cup)",
        "calories": 190
    },
    {
        "name": "Tea (unsweetened)",
        "calories": 2
    },
    {
        "name": "Milkshake (medium)",
        "calories": 380
    },
    {
        "name": "Iced Coffee (sweetened)",
        "calories": 130
    },
    {
        "name": "Iced Tea (sweetened)",
        "calories": 90
    },
    {
        "name": "Almonds (1 oz)",
        "calories": 164
    },
    {
        "name": "Walnuts (1 oz)",
        "calories": 185
    },
    {
        "name": "Pistachios (1 oz)",
        "calories": 160
    },
    {
        "name": "Cashews (1 oz)",
        "calories": 155
    },
    {
        "name": "Peanuts (1 oz)",
        "calories": 161
    },
    {
        "name": "Sunflower Seeds (1 oz)",
        "calories": 165
    },
    {
        "name": "Pumpkin Seeds (1 oz)",
        "calories": 151
    },
    {
        "name": "Trail Mix (1/4 cup)",
        "calories": 173
    },
    {
        "name": "Granola Clusters (1/4 cup)",
        "calories": 150
    },
    {
        "name": "Peanut Butter Crackers (1 pack)",
        "calories": 190
    },
    {
        "name": "Fried Rice (1 cup)",
        "calories": 238
    },
    {
        "name": "Lo Mein (1 cup)",
        "calories": 310
    },
    {
        "name": "Kung Pao Chicken (1 cup)",
        "calories": 290
    },
    {
        "name": "Sweet and Sour Chicken (1 cup)",
        "calories": 316
    },
    {
        "name": "General Tso's Chicken (1 cup)",
        "calories": 330
    },
    {
        "name": "Orange Chicken (1 cup)",
        "calories": 420
    },
    {
        "name": "Teriyaki Chicken (1 cup)",
        "calories": 270
    },
    {
        "name": "Egg Roll (1)",
        "calories": 120
    },
    {
        "name": "Spring Roll (1)",
        "calories": 80
    },
    {
        "name": "Dumplings (4)",
        "calories": 160
    },
    {
        "name": "Curry Chicken (1 cup)",
        "calories": 293
    },
    {
        "name": "Chicken Tikka Masala (1 cup)",
        "calories": 380
    },
    {
        "name": "Butter Chicken (1 cup)",
        "calories": 488
    },
    {
        "name": "Biryani (1 cup)",
        "calories": 290
    },
    {
        "name": "Naan (1 piece)",
        "calories": 260
    },
    {
        "name": "Samosa (1)",
        "calories": 132
    },
    {
        "name": "Paneer (100g)",
        "calories": 265
    },
    {
        "name": "Dal (1 cup)",
        "calories": 198
    },
    {
        "name": "Chana Masala (1 cup)",
        "calories": 280
    },
    {
        "name": "Roti (1 piece)",
        "calories": 106
    },
    {
        "name": "Tortellini (1 cup)",
        "calories": 330
    },
    {
        "name": "Fettuccine Alfredo (1 cup)",
        "calories": 415
    },
    {
        "name": "Spaghetti & Meatballs (1 cup)",
        "calories": 320
    },
    {
        "name": "Pesto Pasta (1 cup)",
        "calories": 380
    },
    {
        "name": "Lasagna (1 slice)",
        "calories": 336
    },
    {
        "name": "Risotto (1 cup)",
        "calories": 296
    },
    {
        "name": "Gnocchi (1 cup)",
        "calories": 250
    },
    {
        "name": "Stuffed Shells (2)",
        "calories": 300
    },
    {
        "name": "Chicken Parmesan (1 piece)",
        "calories": 530
    },
    {
        "name": "Meatball Sub (6-inch)",
        "calories": 480
    },
    {
        "name": "Burrito Bowl",
        "calories": 600
    },
    {
        "name": "Nachos (1 plate)",
        "calories": 700
    },
    {
        "name": "Quesadilla (1)",
        "calories": 520
    },
    {
        "name": "Enchilada (1)",
        "calories": 190
    },
    {
        "name": "Tamale (1)",
        "calories": 285
    },
    {
        "name": "Chimichanga (1)",
        "calories": 430
    },
    {
        "name": "Guacamole (1/4 cup)",
        "calories": 90
    },
    {
        "name": "Refried Beans (1 cup)",
        "calories": 237
    },
    {
        "name": "Mexican Rice (1 cup)",
        "calories": 199
    },
    {
        "name": "Tostada (1)",
        "calories": 320
    },
    {
        "name": "Falafel Wrap (1)",
        "calories": 550
    },
    {
        "name": "Shawarma (1)",
        "calories": 420
    },
    {
        "name": "Gyro (1)",
        "calories": 600
    },
    {
        "name": "Tabbouleh (1 cup)",
        "calories": 198
    },
    {
        "name": "Baba Ganoush (2 tbsp)",
        "calories": 70
    },
    {
        "name": "Fattoush Salad (1 bowl)",
        "calories": 180
    },
    {
        "name": "Kebab (1 skewer)",
        "calories": 185
    },
    {
        "name": "Hummus Plate",
        "calories": 350
    },
    {
        "name": "Lentil Soup (1 cup)",
        "calories": 165
    },
    {
        "name": "Pita with Hummus",
        "calories": 250
    },
    {
        "name": "Fried Chicken (1 piece)",
        "calories": 320
    },
    {
        "name": "Chicken Tenders (3)",
        "calories": 290
    },
    {
        "name": "Biscuits & Gravy (1 serving)",
        "calories": 420
    },
    {
        "name": "Mac & Cheese (1 cup)",
        "calories": 310
    },
    {
        "name": "Cornbread (1 piece)",
        "calories": 180
    },
    {
        "name": "Collard Greens (1 cup)",
        "calories": 63
    },
    {
        "name": "Mashed Potatoes (1 cup)",
        "calories": 237
    },
    {
        "name": "Green Bean Casserole (1 cup)",
        "calories": 142
    },
    {
        "name": "BBQ Ribs (3 bones)",
        "calories": 360
    },
    {
        "name": "Pulled Pork (1 cup)",
        "calories": 423
    },
    {
        "name": "Chocolate Chip Cookie (1)",
        "calories": 148
    },
    {
        "name": "Sugar Cookie (1)",
        "calories": 140
    },
    {
        "name": "Snickerdoodle (1)",
        "calories": 120
    },
    {
        "name": "Oatmeal Cookie (1)",
        "calories": 105
    },
    {
        "name": "Chocolate Cake (1 slice)",
        "calories": 235
    },
    {
        "name": "Vanilla Cake (1 slice)",
        "calories": 220
    },
    {
        "name": "Carrot Cake (1 slice)",
        "calories": 326
    },
    {
        "name": "Cheesecake (1 slice)",
        "calories": 410
    },
    {
        "name": "Apple Pie (1 slice)",
        "calories": 296
    },
    {
        "name": "Brownie (1)",
        "calories": 160
    },
    {
        "name": "Fried Rice (1 cup)",
        "calories": 238
    },
    {
        "name": "Lo Mein (1 cup)",
        "calories": 310
    },
    {
        "name": "Kung Pao Chicken (1 cup)",
        "calories": 290
    },
    {
        "name": "Sweet and Sour Chicken (1 cup)",
        "calories": 316
    },
    {
        "name": "General Tso's Chicken (1 cup)",
        "calories": 330
    },
    {
        "name": "Orange Chicken (1 cup)",
        "calories": 420
    },
    {
        "name": "Teriyaki Chicken (1 cup)",
        "calories": 270
    },
    {
        "name": "Egg Roll (1)",
        "calories": 120
    },
    {
        "name": "Spring Roll (1)",
        "calories": 80
    },
    {
        "name": "Dumplings (4)",
        "calories": 160
    },
    {
        "name": "Curry Chicken (1 cup)",
        "calories": 293
    },
    {
        "name": "Chicken Tikka Masala (1 cup)",
        "calories": 380
    },
    {
        "name": "Butter Chicken (1 cup)",
        "calories": 488
    },
    {
        "name": "Biryani (1 cup)",
        "calories": 290
    },
    {
        "name": "Naan (1 piece)",
        "calories": 260
    },
    {
        "name": "Samosa (1)",
        "calories": 132
    },
    {
        "name": "Paneer (100g)",
        "calories": 265
    },
    {
        "name": "Dal (1 cup)",
        "calories": 198
    },
    {
        "name": "Chana Masala (1 cup)",
        "calories": 280
    },
    {
        "name": "Roti (1 piece)",
        "calories": 106
    },
    {
        "name": "Tortellini (1 cup)",
        "calories": 330
    },
    {
        "name": "Fettuccine Alfredo (1 cup)",
        "calories": 415
    },
    {
        "name": "Spaghetti & Meatballs (1 cup)",
        "calories": 320
    },
    {
        "name": "Pesto Pasta (1 cup)",
        "calories": 380
    },
    {
        "name": "Lasagna (1 slice)",
        "calories": 336
    },
    {
        "name": "Risotto (1 cup)",
        "calories": 296
    },
    {
        "name": "Gnocchi (1 cup)",
        "calories": 250
    },
    {
        "name": "Stuffed Shells (2)",
        "calories": 300
    },
    {
        "name": "Chicken Parmesan (1 piece)",
        "calories": 530
    },
    {
        "name": "Meatball Sub (6-inch)",
        "calories": 480
    },
    {
        "name": "Burrito Bowl",
        "calories": 600
    },
    {
        "name": "Nachos (1 plate)",
        "calories": 700
    },
    {
        "name": "Quesadilla (1)",
        "calories": 520
    },
    {
        "name": "Enchilada (1)",
        "calories": 190
    },
    {
        "name": "Tamale (1)",
        "calories": 285
    },
    {
        "name": "Chimichanga (1)",
        "calories": 430
    },
    {
        "name": "Guacamole (1/4 cup)",
        "calories": 90
    },
    {
        "name": "Refried Beans (1 cup)",
        "calories": 237
    },
    {
        "name": "Mexican Rice (1 cup)",
        "calories": 199
    },
    {
        "name": "Tostada (1)",
        "calories": 320
    },
    {
        "name": "Falafel Wrap (1)",
        "calories": 550
    },
    {
        "name": "Shawarma (1)",
        "calories": 420
    },
    {
        "name": "Gyro (1)",
        "calories": 600
    },
    {
        "name": "Tabbouleh (1 cup)",
        "calories": 198
    },
    {
        "name": "Baba Ganoush (2 tbsp)",
        "calories": 70
    },
    {
        "name": "Fattoush Salad (1 bowl)",
        "calories": 180
    },
    {
        "name": "Kebab (1 skewer)",
        "calories": 185
    },
    {
        "name": "Hummus Plate",
        "calories": 350
    },
    {
        "name": "Lentil Soup (1 cup)",
        "calories": 165
    },
    {
        "name": "Pita with Hummus",
        "calories": 250
    },
    {
        "name": "Fried Chicken (1 piece)",
        "calories": 320
    },
    {
        "name": "Chicken Tenders (3)",
        "calories": 290
    },
    {
        "name": "Biscuits & Gravy (1 serving)",
        "calories": 420
    },
    {
        "name": "Mac & Cheese (1 cup)",
        "calories": 310
    },
    {
        "name": "Cornbread (1 piece)",
        "calories": 180
    },
    {
        "name": "Collard Greens (1 cup)",
        "calories": 63
    },
    {
        "name": "Mashed Potatoes (1 cup)",
        "calories": 237
    },
    {
        "name": "Green Bean Casserole (1 cup)",
        "calories": 142
    },
    {
        "name": "BBQ Ribs (3 bones)",
        "calories": 360
    },
    {
        "name": "Pulled Pork (1 cup)",
        "calories": 423
    },
    {
        "name": "Chocolate Chip Cookie (1)",
        "calories": 148
    },
    {
        "name": "Sugar Cookie (1)",
        "calories": 140
    },
    {
        "name": "Snickerdoodle (1)",
        "calories": 120
    },
    {
        "name": "Oatmeal Cookie (1)",
        "calories": 105
    },
    {
        "name": "Chocolate Cake (1 slice)",
        "calories": 235
    },
    {
        "name": "Vanilla Cake (1 slice)",
        "calories": 220
    },
    {
        "name": "Carrot Cake (1 slice)",
        "calories": 326
    },
    {
        "name": "Cheesecake (1 slice)",
        "calories": 410
    },
    {
        "name": "Apple Pie (1 slice)",
        "calories": 296
    },
    {
        "name": "Brownie (1)",
        "calories": 160
    }
];
}),
"[project]/lib/searchFoods.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/searchFoods.js
__turbopack_context__.s([
    "searchFoods",
    ()=>searchFoods
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fuse$2e$js$2f$dist$2f$fuse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/fuse.js/dist/fuse.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$food$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/food.js [app-ssr] (ecmascript)");
;
;
const fuse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fuse$2e$js$2f$dist$2f$fuse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$food$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FOOD_DB"], {
    keys: [
        "name",
        "category"
    ],
    includeScore: true,
    threshold: 0.35
});
function searchFoods(query) {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8).map((r)=>r.item);
}
}),
"[project]/app/components/FoodAutocomplete.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FoodAutocomplete
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$searchFoods$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/searchFoods.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function FoodAutocomplete({ onSelect }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    function handleChange(e) {
        const q = e.target.value;
        setQuery(q);
        setResults((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$searchFoods$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["searchFoods"])(q));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: query,
                onChange: handleChange,
                placeholder: "Search foods...",
                className: "w-full px-4 py-2 border rounded-lg shadow-sm"
            }, void 0, false, {
                fileName: "[project]/app/components/FoodAutocomplete.jsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            results.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "absolute z-20 bg-white border mt-2 rounded-xl w-full shadow-xl",
                children: results.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        onClick: ()=>{
                            onSelect(item);
                            setQuery(item.name);
                            setResults([]);
                        },
                        className: "px-4 py-2 hover:bg-blue-50 cursor-pointer",
                        children: [
                            item.name,
                            " •",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500",
                                children: [
                                    item.calories,
                                    " cal"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/FoodAutocomplete.jsx",
                                lineNumber: 38,
                                columnNumber: 15
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/app/components/FoodAutocomplete.jsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/FoodAutocomplete.jsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/FoodAutocomplete.jsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/findFoodByBarcode.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/findFoodByBarcode.js
__turbopack_context__.s([
    "findFoodByBarcode",
    ()=>findFoodByBarcode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$food$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/food.js [app-ssr] (ecmascript)");
;
function findFoodByBarcode(code) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$food$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FOOD_DB"].find((item)=>item.barcode === code) || null;
}
}),
"[project]/app/food/log/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LogFoodPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$BarcodeScanner$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/BarcodeScanner.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FoodAutocomplete$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/FoodAutocomplete.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$findFoodByBarcode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/findFoodByBarcode.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function LogFoodPage() {
    const [showScanner, setShowScanner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [foodName, setFoodName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [calories, setCalories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    function handleAutocompleteSelect(item) {
        setFoodName(item.name);
        setCalories(item.calories);
        setCategory(item.category);
    }
    function handleBarcodeDetected(code) {
        const match = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$findFoodByBarcode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findFoodByBarcode"])(code);
        if (match) {
            setFoodName(match.name);
            setCalories(match.calories);
            setCategory(match.category);
        } else {
            alert(`Unknown barcode: ${code}`);
        }
        setShowScanner(false);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        await fetch("/api/food/log/route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: foodName,
                calories,
                category
            })
        });
        setFoodName("");
        setCalories("");
        setCategory("");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-slate-50 px-6 py-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-semibold mb-8",
                children: "Log Food"
            }, void 0, false, {
                fileName: "[project]/app/food/log/page.jsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            showScanner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$BarcodeScanner$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                onDetected: handleBarcodeDetected,
                onClose: ()=>setShowScanner(false)
            }, void 0, false, {
                fileName: "[project]/app/food/log/page.jsx",
                lineNumber: 51,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "bg-white border rounded-xl shadow-xl p-6 max-w-xl mx-auto flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FoodAutocomplete$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onSelect: handleAutocompleteSelect
                    }, void 0, false, {
                        fileName: "[project]/app/food/log/page.jsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: foodName,
                        onChange: (e)=>setFoodName(e.target.value),
                        placeholder: "Food name",
                        className: "border px-4 py-2 rounded-lg"
                    }, void 0, false, {
                        fileName: "[project]/app/food/log/page.jsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: calories,
                        type: "number",
                        onChange: (e)=>setCalories(e.target.value),
                        placeholder: "Calories",
                        className: "border px-4 py-2 rounded-lg"
                    }, void 0, false, {
                        fileName: "[project]/app/food/log/page.jsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: category,
                        onChange: (e)=>setCategory(e.target.value),
                        placeholder: "Category",
                        className: "border px-4 py-2 rounded-lg"
                    }, void 0, false, {
                        fileName: "[project]/app/food/log/page.jsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setShowScanner(true),
                        className: "py-2 px-4 rounded-lg border border-blue-700 text-blue-700 hover:bg-blue-50 transition",
                        children: "Scan Barcode"
                    }, void 0, false, {
                        fileName: "[project]/app/food/log/page.jsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition",
                        children: "Log Food"
                    }, void 0, false, {
                        fileName: "[project]/app/food/log/page.jsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/food/log/page.jsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/food/log/page.jsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__67266a4a._.js.map