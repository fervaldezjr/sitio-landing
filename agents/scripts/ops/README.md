# Scripts de operación

Sin configurar.

Este repo no tiene logs centralizados, colas ni base de datos. No hay un backend que consultar. Un script que inventara `kubectl`, Loki o SQL fallaría o, peor, parecería funcionar.

Si más adelante existe un backend de la beta, aquí se añade un script de solo lectura con el comando real y un modo que falle con un mensaje claro cuando falten las variables. Los nombres de las variables, nunca los valores.
