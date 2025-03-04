import { BeforeAll } from '@cucumber/cucumber'
import { configure } from '@serenity-js/core'
import * as path from 'path'

BeforeAll(() => {

    // Configurar Serenity/JS
    configure({
        crew: [
            [ '@serenity-js/serenity-bdd', {
                // opcional, raíz de la jerarquía de requisitos
                specDirectory: path.resolve(__dirname, '.src/features')
            } ],
            ['@serenity-js/console-reporter', { theme: 'auto' }],
            ['@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' }],
            [ '@serenity-js/core:ArtifactArchiver', {
                outputDirectory: path.resolve(__dirname, '/target/site/serenity')
            }
            ],
            // ... cualquier otro servicio de reporte
        ],
    })
})
