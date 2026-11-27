export const THEME_KEY = "theme";

/**
 * Runs in <head> before the page paints, so a saved choice never flashes the other theme.
 * With nothing saved it sets data-theme from the device, so the header toggle shows the right icon.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;
