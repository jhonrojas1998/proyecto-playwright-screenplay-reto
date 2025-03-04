# Nombre:
Jhon Hader Rojas Cabrera

# proyecto-playwright-screenplay-reto
Repositorio de pruebas automatizadas con Playwright, Serenity/Screenplay y Cucumber BDD. Contiene validaciones para la creación y consulta de guías con Recaudo Contra Entrega, pruebas de concurrencia y manejo de valores límite. Se incluyen escenarios exitosos y fallidos, validación de errores y análisis de tiempos de respuesta.

# Proyecto de Pruebas Automatizadas con Serenity/Playwright

## Instalación

Antes de ejecutar las pruebas, asegúrate de instalar las dependencias necesarias:

### 1. Instalar Playwright
```sh
npm init playwright@latest
```

### 2. Instalar dependencias del proyecto
```sh
npm install
```

### 3. Instalar paquetes específicos
```sh
npm install @cucumber/cucumber@^11.2.0 \
            @serenity-js/console-reporter@^3.31.9 \
            @serenity-js/core@^3.31.9 \
            @serenity-js/cucumber@^3.31.9 \
            @serenity-js/playwright@^3.31.9 \
            @serenity-js/rest@^3.31.9 \
            @serenity-js/serenity-bdd@^3.31.9
```

---

## Ejecución de Pruebas

### 1. Ejecutar todas las pruebas
```sh
npx cucumber-js
```

### 2. Ejecutar un feature específico
```sh
npx cucumber-js features/nombre-del-feature.feature
```

### 3. Ejecutar escenarios por etiquetas
- Escenarios exitosos:
```sh
npx cucumber-js --tags @exitosos
```
- Escenarios fallidos:
```sh
npx cucumber-js --tags @fallidos
```

---

## Estructura del Proyecto

```
├── src
│   ├── features
│   │   ├── stepDefinitions
│   │   ├── support
│   │   ├── concurrencia_guia.feature
│   │   ├── generar_guia.feature
│   ├── screenplay
│   │   ├── actors
│   │   ├── interactions
│   │   ├── questions
│   │   ├── tasks
│   │   ├── utils
│   │   │   ├── config.ts
├── target
│   ├── cucumber.js
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── tsconfig.json
```

---

## Configuración

### 1. Configuración de Cucumber (`cucumber.js`)
```js
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
```

### 2. Configuración de TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "es2019",
    "lib": ["es2019", "dom"],
    "module": "commonjs",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "sourceMap": true,
    "declaration": true,
    "types": ["node"]
  },
  "include": ["./src/features/**/*.ts", "./src/test/**/*.ts"],
  "exclude": ["node_modules"]
}
```