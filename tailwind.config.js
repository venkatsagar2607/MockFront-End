// tailwind.config.js
module.exports = {
    darkMode: 'class', // This is the important part
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'), // This plugin gives nice default styles to form elements
    ],
}