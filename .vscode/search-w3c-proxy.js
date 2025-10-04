// netlify/functions/search-w3c-proxy.js

const fetch = require('node-fetch'); // Usamos node-fetch, que está disponible en Netlify Functions

exports.handler = async (event, context) => {
    // 1. Obtener la consulta de búsqueda del cliente
    // La consulta vendrá en el cuerpo de la petición (body)
    const { query } = event.queryStringParameters;
    
    if (!query) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Falta el parámetro de búsqueda (query).' }),
        };
    }
    
    const targetUrl = `https://www.w3.org/search?q=${encodeURIComponent(query)}`;

    try {
        // 2. Ejecutar la petición HTTP desde el servidor de Netlify (el proxy)
        // La cabecera "Accept" intenta que nos devuelva contenido simple (HTML)
        const response = await fetch(targetUrl, {
            headers: {
                'Accept': 'text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8',
                'User-Agent': 'Mozilla/5.0' // A veces, es necesario simular un navegador
            },
        });

        // 3. Devolver la respuesta al cliente (Front-End)
        // Nota: Solo se devuelve la respuesta en texto. El Front-End deberá procesar este HTML.
        const htmlContent = await response.text();

        return {
            statusCode: 200,
            // Importante: Habilitar CORS para que tu Front-End pueda acceder
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Access-Control-Allow-Origin': '*', // Permite a cualquier origen acceder (incluyendo tu Netlify)
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
            },
            body: htmlContent,
        };

    } catch (error) {
        console.error('Error al hacer proxy a W3C:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error interno del servidor al buscar en W3C.' }),
        };
    }
};
