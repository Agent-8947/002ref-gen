import { create } from 'zustand';

// Simplified store for production site (read-only)
interface ProductionState {
  contentBlocks: any[];
  globalSettings: any;
  currentLanguage: string;
  uiTheme: any;
}

// Helper to get content blocks from state
const getContentBlocks = () => {
  const state = window.__DNA_STATE__;
  if (!state) return [];
  
  // Try pages.home first (new format)
  if (state.pages?.home) return state.pages.home;
  
  // Try pages[currentPage] (if currentPage is set)
  if (state.pages && state.currentPage) {
    return state.pages[state.currentPage] || [];
  }
  
  // Fallback to contentBlocks (old format)
  return state.contentBlocks || [];
};

export const useStore = create<ProductionState>(() => ({
  contentBlocks: getContentBlocks(),
  globalSettings: window.__DNA_STATE__?.globalSettings || {},
  currentLanguage: window.__DNA_STATE__?.currentLanguage || window.__DNA_STATE__?.globalSettings?.GL12?.params?.[0]?.value || 'en',
  uiTheme: window.__DNA_STATE__?.uiTheme || {}
}));

// Type declaration for window
declare global {
  interface Window {
    __DNA_STATE__: any;
  }
}
