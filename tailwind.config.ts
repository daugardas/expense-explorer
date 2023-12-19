import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                raisinBlackLight: "#4A4545",
                raisinBlack: "#252323",
                raisinBlackDarkest: "#151414",
                raisinBlackDarker: "#201E1E",
                slateGray: "#70798C",
                isabellineLight: "#F9F5F0",
                isabelline: "#F5F1ED",
                isabellineDark: "#F1EBE5",
                boneLight: "#E9E5D8",
                bone: "#DAD2BC",
                boneDark: "#CCC1A3",
                boneDarker: "#BFB28C",
                khaki: "#A99985",
                selected: "#BFB28C",
                notSelected: "#DAD2BC",
            },
        },
    },
    plugins: [],
};
export default config;
