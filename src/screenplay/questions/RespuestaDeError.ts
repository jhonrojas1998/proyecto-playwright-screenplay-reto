import { Question } from '@serenity-js/core';
import { LastResponse } from '@serenity-js/rest';

export const RespuestaDeError = {
    statusCode: () => Question.about('el código de estado de error', async actor =>
        actor.answer(LastResponse.status())
    ),

    mensaje: () => Question.about('el mensaje de error', async actor => {
        const response = await actor.answer(LastResponse.body());

        // Manejo de diferentes estructuras de error
        return response?.cause
    }),
};
