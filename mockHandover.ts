@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: 'IBM Plex Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  background: #F4F5F7;
  color: #111827;
}

@keyframes risk-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
.risk-pulse { animation: risk-pulse 1.4s ease-in-out infinite; }

@keyframes bar-fill { from { width: 0; } }
.bar-animate { animation: bar-fill 0.5s ease-out forwards; }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 2px; }
