// Cartoon Synthesizer using Web Audio API
// High performance, zero asset overhead, fully client-side and completely robust!

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Cartoon Quick Click / Pop Sound
 */
export function playCartoonClick() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    // Quick upward envelope and slide
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
    
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {
    console.warn("Failed to play cartoon click sound:", e);
  }
}

/**
 * Fun cartoon 'Boing' pitch swoop
 */
export function playBoing() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "triangle";
    // Starts low, swoops up, vibrates down slightly
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
    osc.frequency.linearRampToValueAtTime(300, now + 0.35);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.15, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.45);
  } catch (e) {
    console.warn("Failed to play cartoon boing sound:", e);
  }
}

/**
 * Cartoon 'Whip' / Laser swoop for modal popups
 */
export function playWhip() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sawtooth";
    // High down to low real fast
    osc.frequency.setValueAtTime(1500, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.2);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.25);
  } catch (e) {
    console.warn("Failed to play cartoon whip sound:", e);
  }
}

/**
 * Upward happy sparkling sequence for portal completion success
 */
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, idx) => {
      const time = now + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, time);
      
      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(time);
      osc.stop(time + 0.35);
    });
  } catch (e) {
    console.warn("Failed to play cartoon success chime:", e);
  }
}

/**
 * Cartoon 'Buzz' / Wrong Answer sound for blocked/locked actions
 */
export function playErrorBuzz() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create dual oscillators for a thick, low comic buzz
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(115, now); // Low A2-ish
    osc1.frequency.linearRampToValueAtTime(98, now + 0.3); // slight comic sag down
    
    osc2.type = "square";
    osc2.frequency.setValueAtTime(117, now); // detuned for extra buzz/thickness
    osc2.frequency.linearRampToValueAtTime(100, now + 0.3);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.32);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    osc1.start(now);
    osc2.start(now);
    
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  } catch (e) {
    console.warn("Failed to play cartoon error buzz sound:", e);
  }
}

/**
 * Super positive and bouncy cartoon fanfare for unlocked achievements!
 */
export function playAchievementUnlock() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Play a delightful fast arpeggio: C5 -> E5 -> G5 -> C6 -> E6 -> G6 (high, energetic and bouncy!)
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    const delays = [0, 0.08, 0.16, 0.24, 0.32, 0.4];
    
    notes.forEach((freq, idx) => {
      const time = now + delays[idx];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = idx % 2 === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, time);
      
      // Bouncy pitch glide upwards
      osc.frequency.exponentialRampToValueAtTime(freq * 1.08, time + 0.12);
      
      gain.gain.setValueAtTime(0.14, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(time);
      osc.stop(time + 0.28);
    });
  } catch (e) {
    console.warn("Failed to play cartoon achievement unlock:", e);
  }
}

