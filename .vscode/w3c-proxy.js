// La corrección es añadir .default para manejar problemas de Webpack/Bundler de Netlify
const fetch = require('node-fetch').default; 

exports.handler = async (event, context) => {
    // Solo permitimos peticiones POST (si es necesario)
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { url } = JSON.parse(event.body);

        if (!url) {
            return { statusCode: 400, body: 'Missing URL in request body.' };
        }

        // Realizamos la petición GET a la URL de prueba del W3C
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                // Habilitamos CORS para que el Front-End pueda leer la respuesta
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: "✅ Carga Exitosa vía Back-End Proxy",
                data: data 
            })
        };
    } catch (error) {
        console.error('Proxy Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                status: "❌ Fallo del Servidor Proxy", 
                message: error.message 
            })
        };
    }
};
