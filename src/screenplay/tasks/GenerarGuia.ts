import { Task } from '@serenity-js/core';
import { EnviarDatosDeGuia } from '../interactions/EnviarDatosDeGuia';

export const GenerarGuia = (referencia: string, valorRecaudar: string) =>
    Task.where(`#actor genera una guía con referencia ${referencia}`,
        EnviarDatosDeGuia.con(referencia, valorRecaudar)
    );
