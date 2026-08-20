import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppState, LineType, InterpretationResponse } from './types';
import CoinToss from './components/CoinToss';
import HexagramVisual from './components/HexagramVisual';
import { interpretHexagram } from './services/interpretService';
import { YinYangSymbol } from './components/YinYangSymbol';
import ProductRecommend from './components/ProductRecommend';
import ProductBottomSheet from './components/ProductBottomSheet';
import { trackEvent } from './services/analytics';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('INTRO');
  const [lines, setLines] = useState<LineType[]>([]);
  const [result, setResult] = useState<InterpretationResponse | null>(null);

  // Audio State
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const resultEnteredAtRef = useRef<number | null>(null);

  const reportResultDuration = useCallback((trigger: 'restart' | 'exit') => {
    if (resultEnteredAtRef.current === null) return;
    const duration_ms = Date.now() - resultEnteredAtRef.current;
    resultEnteredAtRef.current = null;
    trackEvent('result_time_spent', { duration_ms, trigger });
  }, []);

  // Toggle Music Function
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        // Handle browser autoplay policy
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Audio play failed:", error);
          });
        }
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  // Set volume on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Low ambient volume
    }
  }, []);

  const handleStart = () => {
    reportResultDuration('restart');
    setLines([]);
    setResult(null);
    setState('TOSSING');

    // Optional: Auto-start music on interaction if not already playing (uncomment if desired)
    /* 
    if (!isMusicPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsMusicPlaying(true);
    } 
    */
  };

  const handleLineGenerated = useCallback((line: LineType) => {
    setLines(prev => [...prev, line]);
  }, []);

  const processResult = async (completedLines: LineType[]) => {
    try {
      const interpretation = await interpretHexagram(completedLines);
      setResult(interpretation);
      setState('RESULT');
      trackEvent('view_result', { hexagram_name: interpretation.hexagramName });
      resultEnteredAtRef.current = Date.now();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (lines.length !== 6) return;
    const timer = setTimeout(() => {
      setState('CALCULATING');
      processResult(lines);
    }, 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines]);

  useEffect(() => {
    if (state === 'RESULT' && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        reportResultDuration('exit');
      }
    };
    const handlePageHide = () => reportResultDuration('exit');

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [reportResultDuration]);

  return (
    <div className="min-h-screen w-full font-app bg-[#020617] text-white relative overflow-x-hidden selection:bg-purple-500 selection:text-white">

      {/* Background Audio Element */}
      {/* Using a royalty-free ambient track 'Nebula' or similar spiritual drone */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Toggle Button - Fixed Top Right */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-purple-300 hover:text-white hover:bg-white/10 transition-all duration-300 group shadow-[0_0_15px_rgba(168,85,247,0.3)] cursor-pointer"
        title={isMusicPlaying ? "Tắt nhạc" : "Bật nhạc nền"}
      >
        {isMusicPlaying ? (
          // Speaker Wave Icon (On)
          <div className="relative">
            <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
            </svg>
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
          </div>
        ) : (
          // Speaker X Icon (Off)
          <svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
          </svg>
        )}
      </button>

      {/* Modern Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0720] via-[#1e1b4b] to-[#020617]"></div>

        {/* Glowing orbs */}
        <div className="absolute top-[-10%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-purple-600/10 blur-[60px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[20vw] h-[20vw] rounded-full bg-blue-600/10 blur-[60px]"></div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      <div className="max-w-5xl lg:max-w-7xl mx-auto px-4 py-10 relative z-10 flex flex-col min-h-screen">

        {/* Header */}
        <header className="flex flex-col items-center justify-center mb-16 mt-12 relative z-20">
          {/* Logo container with increased bottom margin to prevent overlap */}
          <div className="w-20 h-20 mb-8 relative group">
            <div className="absolute inset-0 bg-purple-600 rounded-full blur-[25px] opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative w-full h-full transition-transform duration-700 group-hover:rotate-180">
              <YinYangSymbol spinning={state === 'CALCULATING'} />
            </div>
          </div>

          {/* Added py-4 and leading-tight to prevent accent clipping */}
          <h1 className="text-5xl md:text-7xl font-extralight tracking-[0.2em] text-center mb-2 py-4 leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] select-none">
            HUYỀN VI
          </h1>

          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-5 opacity-70"></div>

          <p className="text-purple-200/70 font-medium text-xs md:text-sm tracking-[0.4em] uppercase">
            Kinh Dịch • AI
          </p>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center w-full">

          {/* INTRO */}
          {state === 'INTRO' && (
            <div className="w-full max-w-2xl animate-[fadeIn_0.8s_ease-out]">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-center relative overflow-hidden group">
                {/* Decoration light */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 blur-[60px] group-hover:bg-purple-500/50 transition-all duration-700"></div>

                <h2 className="text-2xl font-semibold mb-6 text-white">Khởi Tạo Quẻ</h2>
                <p className="mb-8 leading-relaxed text-slate-300 font-normal text-lg">
                  Tập trung vào câu hỏi của bạn và nhấn nút bên dưới.
                  Hệ thống sẽ tự động thực hiện 6 lần gieo hào để kiến tạo quẻ dịch tương ứng với năng lượng của bạn.
                </p>

                <button
                  onClick={() => {
                    trackEvent('click_xin_que');
                    handleStart();
                  }}
                  className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-medium text-white transition duration-300 ease-out border border-purple-500/30 rounded-full shadow-md group hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] cursor-pointer z-30"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-600 group-hover:translate-x-0 ease">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-purple-200 transition-all duration-300 transform group-hover:translate-x-full ease tracking-widest uppercase text-sm font-semibold">Xin Quẻ</span>
                  <span className="relative invisible">Xin Quẻ</span>
                </button>
              </div>
            </div>
          )}

          {/* TOSSING */}
          {state === 'TOSSING' && (
            <div className="w-full flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
              <div className="mb-10 scale-110">
                <HexagramVisual lines={lines} />
              </div>
              <CoinToss
                onTossComplete={handleLineGenerated}
                tossCount={lines.length}
              />

              <ProductBottomSheet
                trigger={{ type: 'timer', delayMs: 8000 }}
                listName="Bottom Sheet Trong Lúc Gieo"
                context="tossing"
              />
            </div>
          )}

          {/* CALCULATING */}
          {state === 'CALCULATING' && (
            <div className="flex flex-col items-center justify-center animate-pulse">
              <div className="mb-10 scale-110 relative">
                <HexagramVisual lines={lines} />
                <div className="absolute inset-0 bg-purple-500/10 blur-md rounded-full"></div>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2 tracking-widest">PHÂN TÍCH DỮ LIỆU</h2>
              <div className="flex gap-1 mt-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}

          {/* RESULT */}
          {state === 'RESULT' && result && (
            <div ref={scrollRef} className="w-full max-w-4xl lg:max-w-none animate-[fadeInUp_0.8s_ease-out] pb-12">

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column: Hexagram & Meta */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-purple-900 via-purple-500 to-purple-900"></div>
                    <div className="mb-6 scale-90">
                      <HexagramVisual lines={lines} />
                    </div>
                    <h2 className="text-3xl font-semibold text-white mb-2 uppercase tracking-wide drop-shadow-md">
                      {result.hexagramName}
                    </h2>
                    <div className="w-10 h-1 bg-purple-500 rounded-full mb-4"></div>
                    <p className="text-purple-200 font-normal italic text-sm">
                      "{result.originalText}"
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 relative z-20">
                    <button
                      onClick={() => {
                        trackEvent('click_gieo_que_lai');
                        handleStart();
                      }}
                      className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-semibold tracking-widest text-purple-300 hover:text-white transition-all duration-300 uppercase group cursor-pointer"
                    >
                      <span className="inline-block transition-transform group-hover:rotate-180 mr-2">↻</span>
                      Gieo Quẻ Mới
                    </button>
                  </div>
                </div>

                {/* Middle Column: Interpretation */}
                <div className="lg:col-span-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg relative">

                  {/* General */}
                  <div className="mb-10">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      Tổng Quan
                    </h3>
                    <p className="text-slate-100 leading-relaxed text-lg font-normal text-justify">
                      {result.generalMeaning}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Career */}
                    <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        Công Danh
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed font-normal">
                        {result.career}
                      </p>
                    </div>

                    {/* Wealth */}
                    <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33"></path></svg>
                        Tài Lộc
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed font-normal">
                        {result.wealth}
                      </p>
                    </div>

                    {/* Love */}
                    <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        Tình Duyên
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed font-normal">
                        {result.love}
                      </p>
                    </div>

                    {/* Family */}
                    <div id="section-gia-dao" className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"></path></svg>
                        Gia Đạo
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed font-normal">
                        {result.family}
                      </p>
                    </div>
                  </div>

                  {/* Advice */}
                  <div className="relative">
                    <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-transparent"></div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-3 pl-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"></path></svg>
                      Lời Khuyên
                    </h3>
                    <p className="text-purple-100 italic font-normal text-lg leading-relaxed pl-2">
                      {result.advice}
                    </p>
                  </div>

                </div>

                {/* Right Column: Product Recommendations (desktop sidebar) */}
                <ProductRecommend />
              </div>

              {/* Mobile-only: product bottom sheet, appears once "Gia Đạo" scrolls into view */}
              <ProductBottomSheet
                trigger={{ type: 'scroll', targetId: 'section-gia-dao' }}
                listName="Bottom Sheet Vật Phẩm Gợi Ý"
                context="result"
              />
            </div>
          )}
        </main>

        <footer className="text-center mt-8 text-slate-500 text-xs font-light tracking-widest">
          <p className="mb-2 text-amber-400/70 normal-case tracking-normal italic">
            ⚠️ Thông tin mang tính tham khảo. AI có thể sai sót. Vui lòng kiểm tra kỹ thông tin.
          </p>
          <p className="uppercase">© 2024 Huyền Vi • Developed by <a href="https://aitientri-ruby.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-300 transition-colors">AI TIEN TRI</a></p>
        </footer>
      </div>
    </div>
  );
};

export default App;