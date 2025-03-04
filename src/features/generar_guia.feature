Feature: Creación de guía con Recaudo Contra Entrega

  @exitosos
  Scenario Outline: Validar valores en el límite permitido para el recaudo
    Given que el usuario envía una solicitud de creación de guía con el servicio "Recaudo Contra Entrega"
    When envía la referencia "<referencia>" y el valor a recaudar "<valor_recaudar>"
    Then el sistema debe responder con un código de remisión y un status 200

    Examples:
      | referencia   | valor_recaudar |
      | REF123456789 | 1              |
      | REF987654321 | 4000000        |
      | REF567890123 | 5000000        |

  @fallidos
  Scenario Outline: Validar errores en la creación de guía con Recaudo Contra Entrega
    Given que el usuario envía una solicitud de creación de guía con el servicio "Recaudo Contra Entrega"
    When envía la referencia "<referencia>" y el valor a recaudar "<valor_recaudar>"
    Then el sistema debe responder con un mensaje de error adecuado "<expectedErrorMessage>"

    Examples:
      | referencia                            | valor_recaudar | expectedErrorMessage                                                       |
      | REF1234567890123456789012345678901234 | 50000          | El campo referenciaRecaudo excede la cantidad de caracteres permitidos, 30 |
      | REF001                                | 16000001       | valorRecaudar must be less than or equal to 5000000                        |
      |                                       |                | El campo valorRecaudar debe ser mayor a 1                                  |
      | REF002                                |                | El campo valorRecaudar debe ser mayor a 1                                  |
      |                                       | 50000          | El campo referenciaRecaudo es requerido                                    |
