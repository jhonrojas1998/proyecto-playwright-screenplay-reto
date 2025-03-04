import { Question } from '@serenity-js/core';
import { LastResponse } from '@serenity-js/rest';

export const RespuestaDeGuia = {
    codigoRemision: () => Question.about('el código de remisión', async actor => {
        const response = await actor.answer(LastResponse.body());
        return response?.data?.codigo_remision;
    }),
    statusCode: () => Question.about('el código de estado', async actor => actor.answer(LastResponse.status())),
};
