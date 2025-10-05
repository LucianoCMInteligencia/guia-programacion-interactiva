// Usamos el módulo nativo HTTPS de Node.js, ¡sin librerías externas!
const https = require('https'); 

// La URL específica del W3C que queremos consultar
const W3C_TARGET_URL = 'https://www.w3.org/International/questions/qa-lang-2or3.es.html';

// El módulo URL es nativo de Node y nos ayuda a parsear la URL
const { URL } = require('url'); 

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        
        const parsedUrl = new URL(W3C_TARGET_URL);
        
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname,
            method: 'GET',
            headers: {
                // Simular un navegador para evitar bloqueos
                'User-Agent': 'Netlify-Function-Proxy',
                'Accept': 'text/html,application/xhtml+xml,application/xml'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            // 1. Acumular los datos a medida que llegan
            res.on('data', (chunk) => {
                data += chunk;
            });

            // 2. Cuando la respuesta termina
            res.on('end', () => {
                // Extraer el título para una confirmación limpia
                const titleMatch = data.match(/<h1>(.*?)<\/h1>/i);
                const extractedTitle = titleMatch ? titleMatch[1] : "Contenido W3C sobre etiquetas de idioma";
                
                // 3. Devolver la respuesta exitosa al Front-End
                resolve({
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*', 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        source: W3C_TARGET_URL,
                        title: extractedTitle,
                        message: "¡Conexión W3C exitosa usando solo módulos nativos de Node!",
                    }),
                });
            });
        });

        // Manejo de errores de conexión
        req.on('error', (error) => {
            console.error('HTTPS Proxy Error:', error.message);
            resolve({
                statusCode: 500,
                body: JSON.stringify({ 
                    status: "❌ Fallo del Servidor Proxy", 
                    message: `Error de red al conectar: ${error.message}` 
                }),
            });
        });

        req.end();
    });
};