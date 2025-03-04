import { Interaction } from '@serenity-js/core';
import { Send, PostRequest } from '@serenity-js/rest';
import { Actor } from '@serenity-js/core';

export const EnviarDatosDeGuia = {
    con: (referencia: string, valorRecaudar: string) =>
        Interaction.where(`#actor envía datos para generar guía`, async (actor: Actor) => {
            const headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
            };

            const body = {
                "identificacion": "890904713",
                "divisionCliente": "00",
                "idProceso": 100001,
                "codigoPais": 170,
                "valoracion": "200000",
                "tipoCuenta": 3,
                "contenido": "reloj",
                "codigoProducto": "PRUEBA",
                "nivelServicio": 22,
                "detalle": [
                    {
                        "pesoReal": 1,
                        "largo": 5,
                        "ancho": 5,
                        "alto": 3,
                        "unidades": 1,
                        "ubl": 0,
                        "referencia": "ref detalle"
                    }
                ],
                "datosRemitente": {
                    "identificacion": "1020304044",
                    "detalleRemitente": "Casa",
                    "tipoViaRemitente": "7",
                    "viaRemitente": "15",
                    "numeroRemitente": "53 48",
                    "codigoCiudadRemitente": "76001000",
                    "descripcionTipoViaRemitente": "Calle",
                    "direccionRemitente": "Calle 53 # 53 48",
                    "nombreRemitente": "Remitente Prueba",
                    "indicativoRemitente": "57",
                    "celularRemitente": "3007876543",
                    "correoRemitente": "pruebaremitente@coo.com"
                },
                "datosDestinatario": {
                    "identificacion": "1254511109",
                    "detalleDestinatario": "Casa",
                    "tipoViaDestinatario": "5",
                    "viaDestinatario": "15",
                    "numeroDestinatario": "45 93",
                    "descripcionTipoViaDestinatario": "Calle",
                    "direccionDestinatario": "calle 45 93",
                    "codigoCiudadDestinatario": "76001000",
                    "nombreDestinatario": "Destinatario Prueba",
                    "indicativoDestinatario": "57",
                    "celularDestinatario": "3216549825",
                    "correoDestinatario": "pruebadestinatario@coor.com"
                },
                "valorRecaudar": parseInt(valorRecaudar),
                "referenciaRecaudo": referencia,
                "tipoGuia": 1,
                "referenciaGuia": "Ref guía",
                "usuario": "prueba@coordinaora.com",
                "fuente": "envios",
                "observaciones": "prueba RCE"
            };

            await actor.attemptsTo(
                Send.a(PostRequest.to('/guias/cm-guias-ms/guia')  // 👈 Solo el path, sin la URL base
                    .with(body)
                    .using({ headers })
                )
            );
        })
};

