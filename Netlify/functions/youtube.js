exports.handler = async (event, context) => {
  // Solo permitir método GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Obtener parámetros de la query
  const { q, maxResults = 10, type = 'video' } = event.queryStringParameters || {};

  // Validar que hay una query
  if (!q) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Query parameter "q" is required' })
    };
  }

  try {
    // Construir URL de la API de YouTube
    const apiUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    apiUrl.searchParams.append('part', 'snippet');
    apiUrl.searchParams.append('q', q);
    apiUrl.searchParams.append('maxResults', maxResults);
    apiUrl.searchParams.append('type', type);
    apiUrl.searchParams.append('key', process.env.YOUTUBE_API_KEY);

    // Hacer la petición a YouTube
    const response = await fetch(apiUrl.toString());
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Error fetching YouTube data',
        message: error.message 
      })
    };
  }
};