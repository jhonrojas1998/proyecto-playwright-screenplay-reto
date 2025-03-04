import { Given, When, Then } from '@cucumber/cucumber';
import { Ensure, equals, isPresent } from '@serenity-js/assertions';
import { GeneradorDeGuia } from '../../screenplay/actors/GeneradorDeGuia';
import { GenerarGuia } from '../../screenplay/tasks/GenerarGuia';
import { RespuestaDeGuia } from '../../screenplay/questions/RespuestaDeGuia';
import { Actor } from '@serenity-js/core';


Given("que el usuario envía una solicitud de creación de guía con el servicio {string}", async function (servicio) {
    this.actor = GeneradorDeGuia("Jhon") as Actor;
});


When("envía la referencia {string} y el valor a recaudar {string}", async function (referencia, valorRecaudar) {
    await this.actor.attemptsTo(
        GenerarGuia(referencia, valorRecaudar)
    );
});

Then("el sistema debe responder con un código de remisión y un status 200", async function () {
    const codigoRemision = await this.actor.answer(RespuestaDeGuia.codigoRemision());
    const statusCode = await this.actor.answer(RespuestaDeGuia.statusCode());

    await this.actor.attemptsTo(
        Ensure.that(statusCode, equals(200)),
        Ensure.that(codigoRemision, isPresent())
    );
});
