import React, { useState, useCallback, useEffect } from 'react';
import { UrlInputForm } from './components/UrlInputForm';
import { VideoCard } from './components/VideoCard';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { YouTubeIcon } from './components/YouTubeIcon';
import { youtubeService } from './services/youtubeService';
import type { PlaylistItem } from './types';
import { ApiKeyManager } from './components/ApiKeyManager';
import { LanguageSelector } from './components/LanguageSelector';
import { translations } from './translations';

type Language = 'en' | 'es';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<PlaylistItem | null>(null);
  const [nextVideo, setNextVideo] = useState<PlaylistItem | null>(null);
  const [language, setLanguage] = useState<Language>('es');
  const [url, setUrl] = useState('');

  const t = useCallback((key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  }, [language]);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('youtube_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    const savedLang = localStorage.getItem('chrono_lang') as Language;
    if (savedLang && ['en', 'es'].includes(savedLang)) {
        setLanguage(savedLang);
    }
  }, []);
  
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('chrono_lang', lang);
  }

  const resetState = () => {
    setError(null);
    setCurrentVideo(null);
    setNextVideo(null);
  };
  
  const handleSaveApiKey = (key: string) => {
    localStorage.setItem('youtube_api_key', key);
    setApiKey(key);
    setError(null); // Clear any "missing key" errors
  };
  
  const handleClearApiKey = () => {
      localStorage.removeItem('youtube_api_key');
      setApiKey(null);
  };
  
  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    resetState();

    if (!apiKey) {
      setError(t('errorApiKeyRequired'));
      setIsLoading(false);
      return;
    }
    
    if (!url.trim()) {
        setError(t('errorInvalidUrl'));
        setIsLoading(false);
        return;
    }
    
    const videoId = youtubeService.extractVideoId(url);
    if (!videoId) {
      setError(t('errorInvalidUrl'));
      setIsLoading(false);
      return;
    }

    try {
      const videoDetails = await youtubeService.getVideoDetails(videoId, apiKey);
      if (!videoDetails) {
        throw new Error(t('errorFetchVideoDetails'));
      }
      const channelId = videoDetails.snippet.channelId;

      const uploadsPlaylistId = await youtubeService.getChannelUploadsPlaylistId(channelId, apiKey);
      if (!uploadsPlaylistId) {
        throw new Error(t('errorFindUploadsPlaylist'));
      }

      const allVideos = await youtubeService.getAllPlaylistItems(uploadsPlaylistId, apiKey);
      const currentIndex = allVideos.findIndex(item => item.snippet.resourceId.videoId === videoId);

      if (currentIndex === -1) {
        throw new Error(t('errorVideoNotFoundInUploads'));
      }
      
      const currentVideoData = allVideos[currentIndex];
      setCurrentVideo(currentVideoData);
      
      if (currentIndex > 0) {
        const nextVideoData = allVideos[currentIndex - 1]; // The previous item in the list is the next chronological video
        setNextVideo(nextVideoData);
      } else {
        setError(t('errorLatestVideo'));
        setNextVideo(null);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('errorUnknown');
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, url, t]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center p-4 font-sans">
        
      <main className="w-full max-w-4xl mx-auto space-y-8 relative">
        <div className="absolute top-0 right-0">
          <LanguageSelector currentLang={language} onLangChange={handleSetLanguage} />
        </div>
        <header className="text-center space-y-4 pt-12">
          <div className="flex items-center justify-center gap-4">
            <YouTubeIcon className="h-16 w-16 text-red-600" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {t('title')}
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </header>

        <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-500 bg-gray-800 text-xl font-bold text-red-500 flex-shrink-0">1</div>
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-2 text-white">{t('step1Title')}</h2>
                    <p className="text-gray-400 mb-4">{t('step1Description')}</p>
                    <ApiKeyManager 
                        savedKey={apiKey} 
                        onSave={handleSaveApiKey} 
                        onClear={handleClearApiKey}
                        translations={{
                            title: t('apiKeyManagerTitle'),
                            description: t('apiKeyManagerDescription'),
                            linkText: t('apiKeyManagerLink'),
                            placeholder: t('apiKeyManagerPlaceholder'),
                            saveButton: t('apiKeyManagerSaveButton'),
                            savedMessage: t('apiKeyManagerSavedMessage'),
                            changeButton: t('apiKeyManagerChangeButton'),
                            clearButton: t('apiKeyManagerClearButton'),
                        }}
                     />
                </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-500 bg-gray-800 text-xl font-bold text-red-500 flex-shrink-0">2</div>
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-2 text-white">{t('step2Title')}</h2>
                    <p className="text-gray-400 mb-4">{t('step2Description')}</p>
                    <UrlInputForm 
                      url={url}
                      onUrlChange={handleUrlChange}
                      isLoading={isLoading}
                      placeholder={t('urlInputPlaceholder')}
                      formId="video-form"
                      onSubmit={handleSubmit}
                    />
                </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-500 bg-gray-800 text-xl font-bold text-red-500 flex-shrink-0">3</div>
                <div className="flex-grow">
                     <h2 className="text-2xl font-semibold mb-2 text-white">{t('step3Title')}</h2>
                     <p className="text-gray-400 mb-4">{t('step3Description')}</p>
                     <button
                        type="submit"
                        form="video-form"
                        className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500 disabled:bg-red-800 disabled:cursor-not-allowed transition-all duration-300"
                        disabled={isLoading}
                      >
                        {isLoading ? t('searchButtonLoading') : t('searchButton')}
                      </button>
                </div>
            </div>
        </div>


        {isLoading && <Loader />}
        
        {error && !isLoading && <div className="pt-2"><ErrorMessage message={error} errorLabel={t('errorLabel')} /></div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {currentVideo && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-300">{t('currentVideoTitle')}</h2>
              <VideoCard video={currentVideo} watchLabel={t('watchOnYouTube')} byLabel={t('byLabel')} />
            </div>
          )}
          {nextVideo && (
            <div className="animate-fade-in animation-delay-300">
              <h2 className="text-2xl font-semibold mb-4 text-center text-teal-400">{t('nextVideoTitle')}</h2>
              <VideoCard video={nextVideo} isNext={true} watchLabel={t('watchOnYouTube')} byLabel={t('byLabel')} />
            </div>
          )}
        </div>
      </main>

      <footer className="w-full max-w-4xl mx-auto text-center py-8 mt-8 space-y-6 text-gray-500">
        {/* Google AdSense Ad Slot */}
        <div className="w-full h-auto min-h-[100px] bg-gray-800 flex items-center justify-center border border-dashed border-gray-600 rounded-lg p-4">
          <span className="text-gray-500">Espacio para anuncios de Google AdSense</span>
          {/* Inserta aquí tu código de anuncio de AdSense. Por ejemplo:
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
               crossorigin="anonymous"></script>
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
               data-ad-slot="yyyyyyyyyy"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>
               (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
          */}
        </div>
        {/* End Google AdSense Ad Slot */}
        <p>&copy; {new Date().getFullYear()} YouTube2Next. {t('footer')}</p>
      </footer>
    </div>
  );
};

export default App;