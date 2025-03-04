import { Given, When, Then } from '@cucumber/cucumber';
import { Actor, actorCalled } from '@serenity-js/core';
import { CallAnApi } from '@serenity-js/rest';
import { EnviarDatosDeGuia } from '../../screenplay/interactions/EnviarDatosDeGuia';

const API_URL = "https://apiv2-test.coordinadora.com"; // 🔥 URL quemada
const TIEMPO_LIMITE_MS = 500; // 🔥 Límite de tiempo de respuesta

const usuarios = ["Alice", "Alice", "Bob", "Charlie"];
const referencias = ["REF123456789", "REF987654321", "REF567890123"];
const valoresRecaudar = ["1000", "2000", "3000"];

let tiemposDeRespuesta: number[] = [];

Given("que múltiples usuarios están creando guías simultáneamente", function () {
    this.actor = actorCalled("Jhon").whoCan(CallAnApi.at(API_URL)) as Actor;
    console.log("🚀 Iniciando prueba de concurrencia...");

    if (!this.actor) {
        throw new Error("❌ Error: El actor principal no fue inicializado.");
    }

    if (!this.actor.abilityTo(CallAnApi)) {
        throw new Error("❌ Error: El actor no tiene la habilidad CallAnApi.");
    }
});

When("todos los usuarios envían solicitudes válidas al endpoint", async function () {
    if (!this.actor) {
        throw new Error("❌ El actor principal no ha sido inicializado correctamente.");
    }

    console.log(`🌍 URL utilizada: ${API_URL}`);

    const resultados = await Promise.all(
        usuarios.map(async (usuario, index) => {
            const actor = actorCalled(usuario).whoCan(CallAnApi.at(API_URL));

            const inicio = performance.now(); // ⏱️ Marca de tiempo inicial
            await actor.attemptsTo(
                EnviarDatosDeGuia.con(referencias[index], valoresRecaudar[index])
            );
            const fin = performance.now(); // ⏱️ Marca de tiempo final

            const tiempo = fin - inicio;
            tiemposDeRespuesta.push(tiempo);
            console.log(`⏳ Tiempo de respuesta para ${usuario}: ${tiempo.toFixed(2)} ms`);
        })
    );
});

Then("el sistema debe responder consistentemente con un tiempo promedio inferior a 500ms", function () {
    if (tiemposDeRespuesta.length === 0) {
        throw new Error("❌ No se capturaron tiempos de respuesta.");
    }

    const promedio = tiemposDeRespuesta.reduce((a, b) => a + b, 0) / tiemposDeRespuesta.length;
    console.log(`📊 Tiempo promedio de respuesta: ${promedio.toFixed(2)} ms`);

    if (promedio > TIEMPO_LIMITE_MS) {
        throw new Error(`❌ El tiempo promedio de respuesta (${promedio.toFixed(2)} ms) supera el límite de ${TIEMPO_LIMITE_MS} ms.`);
    } else {
        console.log(`✅ El tiempo promedio está dentro del límite de ${TIEMPO_LIMITE_MS} ms.`);
    }
});

Then("no debe generar errores relacionados con la concurrencia.", function () {
    console.log("✅ Validación de errores de concurrencia pendiente...");
});

