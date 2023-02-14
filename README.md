# Desafio_Yape

Decido realizar las pruebas con webdriverIO para el desafio web y la libreria axios para las pruebas de api, junto al lenguaje typescript con el cual tuve la oportunidad de trabajar anteriormente. Esto debido a la posibilidad de iniciar rapidamente un proyecto base con webdriverIO y poder enfocarme en desarrollar lo mas posible sin
estar tan al pendiente de la configuracion inicial. Para generar los reportes utilice allure report.

Por el lado del desafio web, realice un test case de un flujo completo y dentro del desarrollo del mismo intente realizar los steps lo mas generalizado posible. Esto con la idea de que en un futuro los mismos steps, solamente cambiando los parametros, sirvan para distintas casuisticas.

En cuanto al desafio de pruebas api, realice test cases para todas las funcionalidades presentes en la api de Restful - booker. Debido a cuestiones de tiempo solo he desarrollado una prueba por funcionalidad. Por la misma razon, no tuve tiempo para configurar que durante las pruebas de api no se levante el navegador.



Para poder ejecutar los test cases:

Requisitos previos:
Tener instalado node js

Paso inicial:
Abrir una terminal dentro del proyecto y hacer un npm install

Para ejecutar suite de pruebas api:
npm run wdio apitest

Para ejecutar suite de pruebas web:
npm run wdio webtest

Para abrir reporte de ejecucion:
npm run open-report



Autor: Franco Barraza
