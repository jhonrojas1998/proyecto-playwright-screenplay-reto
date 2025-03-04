import { Then } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { RespuestaDeError } from '../../screenplay/questions/RespuestaDeError';


Then("el sistema debe responder con un mensaje de error adecuado {string}", async function (expectedErrorMessage) {
    const mensajeError = await this.actor.answer(RespuestaDeError.mensaje());

    // Si el mensaje esperado es el de la fila 2, aseguramos que "valorRecaudar" tenga comillas
    const mensajeEsperado = expectedErrorMessage === "valorRecaudar must be less than or equal to 5000000"
        ? `"valorRecaudar" must be less than or equal to 5000000`  // Agregamos comillas solo a 'valorRecaudar'
        : expectedErrorMessage;                                     // Dejamos los demás mensajes sin cambios

    console.log("Mensaje esperado:", mensajeEsperado);
    console.log("Mensaje recibido desde API:", mensajeError);

    await this.actor.attemptsTo(
        Ensure.that(RespuestaDeError.statusCode(), equals(400)),
        Ensure.that(mensajeError, equals(mensajeEsperado))
    );
});



