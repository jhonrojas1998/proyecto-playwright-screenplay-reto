import { actorCalled } from '@serenity-js/core';
import { CallAnApi } from '@serenity-js/rest';
import { API_CONFIG } from '../utils/config';

export const GeneradorDeGuia = (nombre: string) =>
    actorCalled(nombre).whoCan(CallAnApi.at(API_CONFIG.BASE_URL));
