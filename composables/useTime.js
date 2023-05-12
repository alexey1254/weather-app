export const useTime = () => {
  // Obtener la fecha actual
  var fechaActual = new Date();

  // Agregar 7 días a la fecha actual
  var fechaEn7Dias = new Date(fechaActual.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Formatear la fecha actual
  var fechaActualFormateada = obtenerFechaFormateada(fechaActual);

  // Formatear la fecha en 7 días
  var fechaEn7DiasFormateada = obtenerFechaFormateada(fechaEn7Dias);

  // Función para formatear una fecha en el formato YYYY-MM-DD hh:mm:ss
  function obtenerFechaFormateada(fecha) {
    var año = fecha.getFullYear();
    var mes = padZero(fecha.getMonth() + 1);
    var dia = padZero(fecha.getDate());
    var horas = padZero(fecha.getHours());
    var minutos = padZero(fecha.getMinutes());
    var segundos = padZero(fecha.getSeconds());

    return (
      año + "-" + mes + "-" + dia + " " + horas + ":" + minutos + ":" + segundos
    );
  }

  // Función para agregar un cero al principio si el valor es menor que 10
  function padZero(valor) {
    return valor < 10 ? "0" + valor : valor;
  }

  return {
    actualDate: fechaActualFormateada,
    nextDate: fechaEn7DiasFormateada,
  };
};
