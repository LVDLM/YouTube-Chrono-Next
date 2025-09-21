
import React, { useState, useCallback, useEffect } from 'react';
import { UrlInputForm } from './components/UrlInputForm';
import { VideoCard } from './components/VideoCard';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { YouTubeIcon } from './components/YouTubeIcon';
import { youtubeService } from './services/youtubeService';
import type { PlaylistItem } from './types';
import { LanguageSelector } from './components/LanguageSelector';
import { translations } from './translations';

type Language = 'en' | 'es' | 'ca' | 'pe';

const App: React.FC = () => {
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
    const savedLang = localStorage.getItem('chrono_lang') as Language;
    if (savedLang && ['en', 'es', 'ca', 'pe'].includes(savedLang)) {
        setLanguage(savedLang);
    }
  }, []);
  
  // Effect to apply Petiso font style
  useEffect(() => {
    if (language === 'pe') {
      document.body.classList.add('font-petiso');
    } else {
      document.body.classList.remove('font-petiso');
    }
    // Cleanup function to remove class when component unmounts
    return () => {
        document.body.classList.remove('font-petiso');
    };
  }, [language]);

  // Effect to push ads after component mounts
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
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
  
  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    resetState();
    
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
      const videoDetails = await youtubeService.getVideoDetails(videoId);
      if (!videoDetails) {
        throw new Error(t('errorFetchVideoDetails'));
      }
      const channelId = videoDetails.snippet.channelId;

      const uploadsPlaylistId = await youtubeService.getChannelUploadsPlaylistId(channelId);
      if (!uploadsPlaylistId) {
        throw new Error(t('errorFindUploadsPlaylist'));
      }

      const allVideos = await youtubeService.getAllPlaylistItems(uploadsPlaylistId);
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
  }, [url, t]);

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
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7358681009913510"
     crossOrigin="anonymous"></script>
        </header>

        <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-500 bg-gray-800 text-xl font-bold text-red-500 flex-shrink-0">1</div>
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-2 text-white">{t('step1Title')}</h2>
                    <p className="text-gray-400 mb-4">{t('step1Description')}</p>
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

            {/* Step 2 */}
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-500 bg-gray-800 text-xl font-bold text-red-500 flex-shrink-0">2</div>
                <div className="flex-grow">
                     <h2 className="text-2xl font-semibold mb-2 text-white">{t('step2Title')}</h2>
                     <p className="text-gray-400 mb-4">{t('step2Description')}</p>
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
{/* FIX: The following AdSense code was not valid JSX. Corrected 'crossorigin' to 'crossOrigin', 'class' to 'className', the style attribute to an object, converted HTML comments to JSX comments, and removed the redundant inline script. */}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7358681009913510"
     crossOrigin="anonymous"></script>
{/* Youtube2Next */}
<ins className="adsbygoogle"
     style={{display:"block"}}
     data-ad-client="ca-pub-7358681009913510"
     data-ad-slot="9216486093"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
{/* The inline script to push the ad has been removed as its logic is handled by a useEffect hook in this component. */}
        {/* End Google AdSense Ad Slot */}
        <p>&copy; {new Date().getFullYear()} YouTube2Next. {t('footer')}</p>
      </footer>
    </div>
  );
};

export default App;
