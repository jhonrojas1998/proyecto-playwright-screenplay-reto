module.exports = {
    default: {
        paths: ["src/features/**/*.feature"],
        requireModule: ["ts-node/register"],
        require: [
            "src/features/**/*.ts",             // Carga todos los archivos TypeScript en features
            "src/features/support/hooks.ts"     // Carga específicamente hooks.ts
        ],
        format: ["json:target/site/serenity/cucumber-report.json"],
        formatOptions: {
            specDirectory: './src/features'
        },
        //parallel: 2
    }
};
