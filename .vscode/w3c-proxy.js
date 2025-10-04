// api/w3c-proxy.js (Código CORREGIDO)

module.exports = async (req, res) => {
  // Configuración de encabezados (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Content-Type', 'application/json');

  try {
    const targetUrl = 'https://www.w3.org/WAI/standards-guidelines/es';
    
    // ⭐ USO DE FETCH NATIVO (NO REQUIERE LIBRERÍA AXIOS) ⭐
    const remoteResponse = await fetch(targetUrl);
    
    // Verificamos si la respuesta del W3C fue exitosa (código 200)
    if (!remoteResponse.ok) {
        // Captura y relanza el error si la URL de destino falla (ej: 404)
        throw new Error(`Fallo en el servidor W3C: Código de estado ${remoteResponse.status}.`);
    }

    // Obtenemos el cuerpo de la respuesta como texto (el HTML)
    const htmlContent = await remoteResponse.text();

    // Devolvemos el HTML al Front-End
    res.status(200).json({ htmlContent }); 

  } catch (error) {
    // Esto captura tanto errores de red como el error que lanzamos si W3C falla.
    console.error("Error en el proxy:", error.message);
    res.status(500).json({ 
        error: 'Fallo crítico del servidor proxy.', 
        message: error.message // Devolvemos el mensaje de error para ayudar a depurar
    });
  }
};
