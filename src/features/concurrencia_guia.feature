Feature: Pruebas de concurrencia en creación de guías

  Scenario: Manejo de concurrencia en creación de guías
    Given que múltiples usuarios están creando guías simultáneamente
    When todos los usuarios envían solicitudes válidas al endpoint
    Then el sistema debe responder consistentemente con un tiempo promedio inferior a 500ms
    And no debe generar errores relacionados con la concurrencia.
