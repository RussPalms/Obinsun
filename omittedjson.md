\_

"type-check": "tsc --noEmit",
"lint": "eslint . --ext .ts,.tsx",
"cache-listings": "ts-node scripts/cacheListings.ts",

    "dev:watch": "next-remote-watch ./_listings",
    "prepare": "husky install"
