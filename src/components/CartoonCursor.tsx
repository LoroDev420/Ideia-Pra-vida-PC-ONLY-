import { useEffect, useState } from "react";
import { playErrorBuzz } from "../utils/audio";

interface CartoonCursorProps {
  isLocked: boolean;
  isGenerating: boolean;
  onBlockedAction?: () => void;
}

export default function CartoonCursor({ isLocked, isGenerating, onBlockedAction }: CartoonCursorProps) {

  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredDisabled, setIsHoveredDisabled] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile (where custom cursor is not desired)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sync mouse position directly to eliminate lag
  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      if (isLocked) {
        const target = e.target as HTMLElement;
        if (target) {
          const isInteractive = target.closest("button") ||
            target.closest("a") ||
            target.closest("input") ||
            target.closest("textarea") ||
            target.closest(".interactive-target") ||
            target.closest("[contenteditable]");
          if (isInteractive) {
            playErrorBuzz();
            if (onBlockedAction) {
              onBlockedAction();
            }
          }
        }
      }
    };
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInput = !!target.closest("input") || !!target.closest("textarea") || !!target.closest("[contenteditable]");
      setIsInputHovered(isInput);
      
      const btn = target.closest("button");
      const isElementDisabled = !!(btn && btn.disabled) || target.classList.contains("cursor-not-allowed") || !!target.closest(".cursor-not-allowed");
      setIsHoveredDisabled(isElementDisabled);

      if (
        btn ||
        target.closest("a") ||
        isInput ||
        target.closest(".interactive-target") ||
        target.style.cursor === "pointer"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    // Apply strict cursor hiding including inputs and buttons
    const style = document.createElement("style");
    style.id = "cartoon-cursor-style";
    style.innerHTML = `
      body, input, textarea, button, select, a, [contenteditable] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      const injectedStyle = document.getElementById("cartoon-cursor-style");
      if (injectedStyle) {
        injectedStyle.remove();
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  // Decide colors based on locked, hovered or generating state
  let fillBg = "#ffffff"; // pure white as requested
  let strokeColor = "#1a0a00";
  let pupilColor = "#1a0a00";

  if (isHoveredDisabled) {
    fillBg = "#ffccd5"; // light pink for locked state
  } else if (isLocked) {
    fillBg = "#ffccd5"; // light pink for locked state
  } else if (isHovered) {
    fillBg = "#e2ff54"; // neon lime on interactive elements
  } else if (isGenerating) {
    fillBg = "#d8b4fe"; // sweet lilac/purple during portal generation
  }

  // Animation scaling/rotation depending on click and state (inputs center-aligned)
  const transformStyle = isInputHovered && !isHoveredDisabled
    ? `translate(${coords.x - 18}px, ${coords.y - 21}px) ${
        isClicking ? "scale(0.85)" : "scale(1.0)"
      }`
    : `translate(${coords.x}px, ${coords.y}px) ${
        isClicking ? "scale(0.85) rotate(-10deg)" : "scale(1.0) rotate(0deg)"
      }`;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        transform: transformStyle,
        transformOrigin: isInputHovered && !isHoveredDisabled ? "18px 21px" : "2px 2px", // Center rotation/scaling for text beam
        transition: "none", // ABSOLUTE Snappy zero lag
        willChange: "transform",
      }}
    >
      {isHoveredDisabled ? (
        <svg width="42" height="42" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Block shadow */}
          <circle cx="18" cy="18" r="14" fill="rgba(0,0,0,0.25)" transform="translate(2, 2)" />
          {/* Block outline */}
          <circle cx="18" cy="18" r="14" fill="#FF5757" stroke={strokeColor} strokeWidth="4" />
          <line x1="8" y1="8" x2="28" y2="28" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
        </svg>
      ) : isInputHovered ? (
        <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shadow of the cartoon I-beam */}
          <path
            d="M 10 8 L 26 8 M 18 8 L 18 34 M 10 34 L 26 34"
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="7"
            strokeLinecap="round"
            transform="translate(2, 2)"
          />
          {/* Outer thick black stroke */}
          <path
            d="M 10 8 L 26 8 M 18 8 L 18 34 M 10 34 L 26 34"
            stroke={strokeColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner retro white/responsive stroke */}
          <path
            d="M 10 8 L 26 8 M 18 8 L 18 34 M 10 34 L 26 34"
            stroke={fillBg}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="42" height="48" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Soft shadow offset below arrow */}
          <path
            d="M 2 2 L 2 28 L 8 22 L 14 34 L 19 31 L 13 20 L 22 20 Z"
            fill="rgba(0,0,0,0.25)"
            transform="translate(2, 2)"
          />

          {/* Thick outline Retro Cartoon Arrow Pointer */}
          <path
            d="M 2 2 L 2 28 L 8 22 L 14 34 L 19 31 L 13 20 L 22 20 Z"
            fill={fillBg}
            stroke={strokeColor}
            strokeWidth="3.2"
            strokeLinejoin="round"
            style={{ stroke: strokeColor }}
          />
        </svg>
      )}
    </div>
  );
}

