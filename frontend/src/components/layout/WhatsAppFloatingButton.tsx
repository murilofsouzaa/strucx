export function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/5533999026628?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 w-12 h-12 sm:w-14 sm:h-14 aspect-square rounded-full flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
    >
      {/* Official WhatsApp SVG Vector Icon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 sm:w-7 sm:h-7 text-white shrink-0"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.83 7.37C8.65 7.37 8.35 7.44 8.1 7.71C7.86 7.98 7.17 8.62 7.17 9.94C7.17 11.26 8.13 12.53 8.27 12.71C8.4 12.89 10.14 15.58 12.82 16.73C13.46 17.01 13.95 17.17 14.34 17.3C14.98 17.5 15.57 17.47 16.03 17.4C16.55 17.32 17.62 16.75 17.84 16.12C18.06 15.5 18.06 14.96 18 14.85C17.94 14.74 17.76 14.67 17.49 14.54C17.22 14.4 15.9 13.75 15.65 13.66C15.41 13.57 15.23 13.53 15.06 13.8C14.88 14.07 14.37 14.67 14.21 14.85C14.06 15.03 13.9 15.05 13.64 14.92C13.37 14.78 12.51 14.5 11.49 13.59C10.7 12.88 10.17 12.01 10.01 11.75C9.86 11.48 10 11.34 10.13 11.21C10.25 11.09 10.4 10.89 10.53 10.74C10.66 10.58 10.71 10.47 10.8 10.29C10.89 10.11 10.84 9.96 10.78 9.83C10.71 9.7 10.21 8.47 10 7.97C9.8 7.48 9.59 7.55 9.44 7.54C9.3 7.54 9.12 7.37 8.83 7.37Z" />
      </svg>

      {/* Floating Tooltip Label */}
      <span className="hidden sm:block opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 absolute right-16 px-3 py-1.5 rounded-sm bg-[#0F172A] text-white text-xs font-condensed uppercase tracking-wider font-bold shadow-md whitespace-nowrap">
        WhatsApp: (33) 99902-6628
      </span>
    </a>
  );
}
