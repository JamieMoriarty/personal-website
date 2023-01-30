const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
    plugins: [
        //require("postcss-nesting"),
        postcssPresetEnv({
            features: {
                "nesting-rules": true,
            },
        }),
    ],
};
