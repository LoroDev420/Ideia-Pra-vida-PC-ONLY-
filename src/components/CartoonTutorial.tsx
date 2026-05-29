import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { playCartoonClick, playBoing } from '../utils/audio';

interface CartoonTutorialProps {
  isActive: boolean;
  setIsActive: (val: boolean) => void;
  darkMode: boolean;
}

const STEPS = [
  {
    targetId: 'ideas-search-input',
    title: 'Tema do Site',
    text: 'Quer um site sobre gravidade, pixel art ou buracos negros? Digite sua ideia mágica de site aqui.',
    position: 'bottom'
  },
  {
    targetId: 'ideas-search-button',
    title: 'Botão de Criação',
    text: 'Com o tema escrito (ou em branco), clique aqui para gerar cards de ideias loucas para o seu site!',
    position: 'bottom'
  },
  {
    targetId: 'ideas-grid-section',
    title: 'Sua Coleção de Ideias',
    text: 'A mágica acontece aqui! Escolha uma das ideias e, no card final, clique em Construir.',
    position: 'top'
  }
];

export default function CartoonTutorial({ isActive, setIsActive, darkMode }: CartoonTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const calculateCoords = useCallback(() => {
    if (!isActive) return;
    const target = document.getElementById(STEPS[currentStep].targetId);
    if (!target) return;

    // Scroll smoothly matching bounds
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Wait for smooth scroll to finish, maybe slightly longer delay.
    // Also re-fetch bounds.
    const checkBounds = () => {
      const rect = target.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        // Still not rendered? Wait a bit more.
        setTimeout(checkBounds, 100);
        return;
      }
      setCoords({
        top: rect.top, // viewport relative for fixed
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };
    
    setTimeout(checkBounds, 250); 
  }, [isActive, currentStep]);

  useEffect(() => {
    if (isActive) {
      calculateCoords();
      // Adjust during scroll and resize
      window.addEventListener('resize', calculateCoords);
      window.addEventListener('scroll', calculateCoords);
      return () => {
        window.removeEventListener('resize', calculateCoords);
        window.removeEventListener('scroll', calculateCoords);
      };
    } else {
      setCurrentStep(0);
      setCoords(null);
    }
  }, [isActive, currentStep, calculateCoords]);

  if (!isActive) return null;

  let bubbleTop = 0;
  let bubbleLeft = 0;

  if (coords) {
    bubbleTop = STEPS[currentStep].position === 'bottom' 
      ? coords.top + coords.height + 24 
      : coords.top - 180;
      
    bubbleLeft = coords.left + (coords.width / 2) - 150;
    
    // Guard screen bound overflows
    bubbleLeft = Math.max(16, Math.min(window.innerWidth - 300 - 16, bubbleLeft));
    bubbleTop = Math.max(16, Math.min(window.innerHeight - 250 - 16, bubbleTop)); // Protect against top/bottom overflow
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Overlay invisível apenas para capturar cliques e fechar o tutorial */}
      <div 
        className="fixed inset-0 pointer-events-auto cursor-pointer" 
        onClick={() => setIsActive(false)}
        title="Clique fora para fechar"
      />

      {/* Caixa de Holofote (Spotlight) sem escurecer o fundo, só destaca o elemento */}
      {coords && (
        <div 
          className="fixed border-[4px] border-[#FFD700] rounded-xl transition-all duration-300 ease-out pointer-events-none shadow-[0_0_20px_rgba(255,215,0,0.8),inset_0_0_15px_rgba(255,215,0,0.4)]"
          style={{
            top: coords.top - 10,
            left: coords.left - 10,
            width: coords.width + 20,
            height: coords.height + 20,
          }}
        >
          {/* Indicador pulsante amigável */}
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#FFD700] rounded-full animate-ping" />
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#FFD700] border-2 border-black rounded-full" />
        </div>
      )}

      {/* Balão de diálogo estilo cartoon */}
      {coords && (
        <div 
          className="fixed flex flex-col items-center pointer-events-auto transition-all duration-300 ease-out z-[10001]"
          style={{
            top: bubbleTop,
            left: bubbleLeft,
            width: 300,
          }}
        >
          {/* Triângulo apontando para o Holofote */}
          <div 
            className={`w-0 h-0 border-x-[12px] border-x-transparent z-10 ${
              STEPS[currentStep].position === 'bottom' 
                ? 'border-b-[16px] border-b-black' 
                : 'order-last border-t-[16px] border-t-black mt-[-2px]'
            }`} 
          />

          {/* Cartão principal de instruções */}
          <div className="bg-white border-[4px] border-black rounded-2xl p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3 relative -mt-[2px] w-full">
            
            {/* Fechar botão cartoon */}
            <button 
              onClick={() => {
                playBoing?.();
                setIsActive(false);
              }}
              className="absolute -top-4 -right-4 w-9 h-9 bg-[#FF5757] text-white border-[3px] border-black rounded-full flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-110 active:scale-95 transition-transform"
            >
              X
            </button>

            <h3 className="font-mono font-black text-[#5271FF] uppercase text-sm border-b-2 border-dashed border-black pb-2">
              ✨ {STEPS[currentStep].title}
            </h3>
            
            <p className="font-mono text-xs font-bold text-black opacity-80 leading-relaxed min-h-[48px]">
              {STEPS[currentStep].text}
            </p>

            <div className="flex justify-between items-center mt-2 border-t-2 border-black pt-3">
              <span className="font-mono text-[10px] font-black text-black opacity-40">
                PASSO {currentStep + 1}/{STEPS.length}
              </span>
              <div className="flex gap-2">
                 <button 
                  disabled={currentStep === 0}
                  onClick={() => {
                    playCartoonClick?.();
                    setCurrentStep(prev => Math.max(0, prev - 1));
                  }}
                  className="w-8 h-8 bg-[#FFD700] border-[3px] border-black rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] transition-all"
                 >
                   <ChevronLeft className="w-5 h-5 text-black" strokeWidth={3} />
                 </button>
                 <button 
                  onClick={() => {
                    playCartoonClick?.();
                    if (currentStep === STEPS.length - 1) {
                      playBoing?.();
                      setIsActive(false);
                    } else {
                      setCurrentStep(prev => prev + 1);
                    }
                  }}
                  className="h-8 px-3 bg-[#7ED957] border-[3px] border-black rounded-lg flex items-center justify-center font-mono text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] transition-all text-black hover:bg-[#6bd63e]"
                 >
                   {currentStep === STEPS.length - 1 ? 'BORA!' : <ChevronRight className="w-5 h-5 text-black" strokeWidth={3} />}
                 </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
