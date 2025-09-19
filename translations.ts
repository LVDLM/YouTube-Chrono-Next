export const translations = {
  en: {
    title: 'YouTube2Next',
    subtitle: 'From your history to the next video.',
    footer: 'Built for efficient binging.',
    
    step1Title: 'Provide your API Key',
    step1Description: 'To communicate with YouTube, this app needs a YouTube Data API v3 key. This is a requirement from Google to prevent abuse and track usage.',
    
    step2Title: 'Enter Video URL',
    step2Description: 'Paste the full URL of the last YouTube video you watched from the channel.',
    
    step3Title: 'Find the Next Video',
    step3Description: 'Click the button below to start the search.',
    
    apiKeyManagerTitle: 'API Key Manager',
    apiKeyManagerDescription: "Your YouTube Data API v3 key is required. It will be saved in your browser's local storage.",
    apiKeyManagerLink: 'Get an API key here.',
    apiKeyManagerTutorialLink: 'Tutorial',
    apiKeyManagerPlaceholder: 'Enter your API key',
    apiKeyManagerSaveButton: 'Save Key',
    apiKeyManagerSavedMessage: '✓ API Key is saved and ready.',
    apiKeyManagerChangeButton: 'Change',
    apiKeyManagerClearButton: 'Clear',
    
    urlInputPlaceholder: 'https://www.youtube.com/watch?v=...',
    
    searchButton: 'Find Next Video',
    searchButtonLoading: 'Searching...',

    errorLabel: 'Error:',
    errorApiKeyRequired: 'A YouTube API key is required. Please enter and save your key in Step 1.',
    errorInvalidUrl: 'Invalid YouTube URL. Please provide a valid video link in Step 2.',
    errorFetchVideoDetails: 'Could not fetch video details.',
    errorFindUploadsPlaylist: "Could not find the channel's uploads playlist.",
    errorVideoNotFoundInUploads: "Video not found in the channel's public uploads. It might be unlisted or private.",
    errorLatestVideo: 'This is the latest video from the channel. There is no next video.',
    errorUnknown: 'An unknown error occurred.',

    currentVideoTitle: 'Current Video',
    nextVideoTitle: 'Next Video',
    watchOnYouTube: 'Watch on YouTube',
    byLabel: 'By',
  },
  es: {
    title: 'YouTube2Next',
    subtitle: 'De tu historial al siguiente vídeo.',
    footer: 'Creado para maratones eficientes.',
    
    step1Title: 'Proporciona tu Clave de API',
    step1Description: 'Para comunicarse con YouTube, esta aplicación necesita una clave de API de YouTube Data v3. Es un requisito de Google para prevenir abusos y monitorear el uso.',

    step2Title: 'Introduce la URL del Vídeo',
    step2Description: 'Pega la URL completa del último vídeo de YouTube que viste del canal.',

    step3Title: 'Encuentra el Siguiente Vídeo',
    step3Description: 'Haz clic en el botón de abajo para iniciar la búsqueda.',
    
    apiKeyManagerTitle: 'Gestor de Clave de API',
    apiKeyManagerDescription: "Se requiere tu clave de API de YouTube Data v3. Se guardará en el almacenamiento local de tu navegador.",
    apiKeyManagerLink: 'Obtén una clave de API aquí.',
    apiKeyManagerTutorialLink: 'Tutorial',
    apiKeyManagerPlaceholder: 'Introduce tu clave de API',
    apiKeyManagerSaveButton: 'Guardar Clave',
    apiKeyManagerSavedMessage: '✓ Clave de API guardada y lista.',
    apiKeyManagerChangeButton: 'Cambiar',
    apiKeyManagerClearButton: 'Borrar',

    urlInputPlaceholder: 'https://www.youtube.com/watch?v=...',

    searchButton: 'Buscar Siguiente Vídeo',
    searchButtonLoading: 'Buscando...',
    
    errorLabel: 'Error:',
    errorApiKeyRequired: 'Se requiere una clave de API de YouTube. Por favor, introdúcela y guárdala en el Paso 1.',
    errorInvalidUrl: 'URL de YouTube no válida. Por favor, proporciona un enlace de vídeo válido en el Paso 2.',
    errorFetchVideoDetails: 'No se pudieron obtener los detalles del vídeo.',
    errorFindUploadsPlaylist: 'No se pudo encontrar la lista de vídeos subidos del canal.',
    errorVideoNotFoundInUploads: 'Vídeo no encontrado en las subidas públicas del canal. Podría ser no listado o privado.',
    errorLatestVideo: 'Este es el último vídeo del canal. No hay un vídeo siguiente.',
    errorUnknown: 'Ocurrió un error desconocido.',

    currentVideoTitle: 'Vídeo Actual',
    nextVideoTitle: 'Siguiente Vídeo',
    watchOnYouTube: 'Ver en YouTube',
    byLabel: 'De',
  },
  ca: {
    title: 'YouTube2Next',
    subtitle: 'Del teu historial al següent vídeo.',
    footer: 'Creat per a maratons eficients.',
    
    step1Title: "Proporciona la teva Clau d'API",
    step1Description: "Per comunicar-se amb YouTube, aquesta aplicació necessita una clau d'API de YouTube Data v3. És un requisit de Google per prevenir abusos i monitorar l'ús.",

    step2Title: 'Introdueix la URL del Vídeo',
    step2Description: "Enganxa la URL completa de l'últim vídeo de YouTube que vas veure del canal.",

    step3Title: 'Troba el Següent Vídeo',
    step3Description: 'Fes clic al botó de sota per iniciar la cerca.',
    
    apiKeyManagerTitle: "Gestor de Clau d'API",
    apiKeyManagerDescription: "Es requereix la teva clau d'API de YouTube Data v3. Es desarà a l'emmagatzematge local del teu navegador.",
    apiKeyManagerLink: "Aconsegueix una clau d'API aquí.",
    apiKeyManagerTutorialLink: 'Tutorial',
    apiKeyManagerPlaceholder: 'Introdueix la teva clau d\'API',
    apiKeyManagerSaveButton: 'Desa la Clau',
    apiKeyManagerSavedMessage: "✓ Clau d'API desada i a punt.",
    apiKeyManagerChangeButton: 'Canvia',
    apiKeyManagerClearButton: 'Esborra',

    urlInputPlaceholder: 'https://www.youtube.com/watch?v=...',

    searchButton: 'Cerca el Següent Vídeo',
    searchButtonLoading: 'Cercant...',
    
    errorLabel: 'Error:',
    errorApiKeyRequired: "Es requereix una clau d'API de YouTube. Si us plau, introdueix-la i desa-la al Pas 1.",
    errorInvalidUrl: 'URL de YouTube no vàlida. Si us plau, proporciona un enllaç de vídeo vàlid al Pas 2.',
    errorFetchVideoDetails: "No s'han pogut obtenir els detalls del vídeo.",
    errorFindUploadsPlaylist: "No s'ha pogut trobar la llista de vídeos pujats del canal.",
    errorVideoNotFoundInUploads: "Vídeo no trobat a les pujades públiques del canal. Podria ser no llistat o privat.",
    errorLatestVideo: "Aquest és l'últim vídeo del canal. No hi ha un vídeo següent.",
    errorUnknown: 'Ha ocorregut un error desconegut.',

    currentVideoTitle: 'Vídeo Actual',
    nextVideoTitle: 'Següent Vídeo',
    watchOnYouTube: 'Mira a YouTube',
    byLabel: 'De',
  }
};