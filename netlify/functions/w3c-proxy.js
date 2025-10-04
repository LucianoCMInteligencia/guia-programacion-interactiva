const fetch = require('node-fetch');

// La URL específica del W3C que hemos estado consultando
const W3C_TARGET_URL = 'https://www.w3.org/International/questions/qa-lang-2or3.es.html';

/**
 * Función que actúa como proxy: el Front-End le pide datos, y ella los busca en W3C.
 * @param {object} event - El objeto de evento de la petición (contiene el body, query params, etc.)
 */
exports.handler = async (event) => {
    try {
        // El servidor Netlify realiza la petición, evitando CORS.
        const response = await fetch(W3C_TARGET_URL);
        
        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `Fallo al obtener datos del W3C: ${response.statusText}` }),
            };
        }
        
        const fullText = await response.text();

        // **Nota Importante:** Para este ejemplo, extraemos solo el título. 
        // En una implementación de 'asistente' real, usarías una librería (como Cheerio) aquí 
        // para parsear el HTML y extraer la respuesta específica a la pregunta del usuario.

        const titleMatch = fullText.match(/<h1>(.*?)<\/h1>/i);
        const extractedTitle = titleMatch ? titleMatch[1] : "Contenido W3C sobre etiquetas de idioma";

        return {
            statusCode: 200,
            headers: {
                // Esto permite que tu Front-End (en Netlify) reciba la respuesta
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                source: W3C_TARGET_URL,
                title: extractedTitle,
                contentSummary: "El Front-End debe procesar esto para responder preguntas.",
                // Aquí podrías devolver todo el HTML de la respuesta del W3C
            }),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Error de Proxy: ${error.message}` }),
        };
    }
};