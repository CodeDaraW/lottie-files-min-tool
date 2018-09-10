module.exports = {
    env: {
        "node": true
    },
    extends: "airbnb-base",
    rules: {
        "indent": ["error", 4],
        "no-console": ["error", { allow: ["log", "error"] }]
    }
};
