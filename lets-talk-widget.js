/* ============================================================
   Let's Talk floating widget
   Dr Yuval Fouks — drfouks.com
   ------------------------------------------------------------
   USAGE:
   Add this single line before </body> on every page where the
   widget should appear (i.e. every page EXCEPT index.html):

       <script src="lets-talk-widget.js" defer></script>

   Customisation knobs are at the top of the IIFE below.
   ============================================================ */

(function () {
    'use strict';

    // ---- configuration ----------------------------------------------------
    const CFG = {
        avatarSrc: 'Yuval%20Fouks-48%20(2).jpg',
        avatarAlt: 'Dr Yuval Fouks',
        label:     "Let's talk",
        href:      'index.html#contact',
        delayMs:   800
    };
    // ----------------------------------------------------------------------

    // Don't double-inject (in case the script is included twice)
    if (document.getElementById('letsTalkWidget')) return;

    // Inject scoped styles
    const style = document.createElement('style');
    style.id = 'letsTalkWidgetStyles';
    style.textContent = `
        #letsTalkWidget {
            position: fixed;
            bottom: 24px;
            left: 24px;
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 6px 20px 6px 6px;
            background: rgba(255, 255, 255, 0.94);
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
            border-radius: 999px;
            box-shadow: 0 4px 20px rgba(44, 44, 44, 0.12);
            text-decoration: none;
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            animation: ltw-slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${CFG.delayMs}ms forwards;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            font-family: 'Cormorant Garamond', Georgia, serif;
        }
        #letsTalkWidget:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 28px rgba(44, 44, 44, 0.20);
        }
        #letsTalkWidget:focus-visible {
            outline: 2px solid #8b7355;
            outline-offset: 3px;
        }
        @keyframes ltw-slideIn {
            to { opacity: 1; transform: translateY(0); }
        }
        #letsTalkWidget .ltw-avatar {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #e8dfd0;
            flex-shrink: 0;
            background: #e8dfd0;
        }
        #letsTalkWidget .ltw-label {
            font-size: 1.15rem;
            font-weight: 500;
            color: #2c2c2c;
            letter-spacing: 0.5px;
            white-space: nowrap;
            line-height: 1;
        }
        #letsTalkWidget .ltw-arrow {
            color: #8b7355;
            font-size: 1.1rem;
            font-weight: 600;
            margin-left: 2px;
            transition: transform 0.3s ease;
            line-height: 1;
        }
        #letsTalkWidget:hover .ltw-arrow {
            transform: translateX(4px);
        }
        @media (max-width: 768px) {
            #letsTalkWidget {
                bottom: 16px;
                left: 16px;
                padding: 4px 16px 4px 4px;
                gap: 9px;
            }
            #letsTalkWidget .ltw-avatar { width: 42px; height: 42px; }
            #letsTalkWidget .ltw-label  { font-size: 1rem; }
        }
        @media (max-width: 380px) {
            #letsTalkWidget .ltw-label  { font-size: 0.92rem; }
            #letsTalkWidget .ltw-arrow  { display: none; }
        }
        @media print {
            #letsTalkWidget { display: none !important; }
        }
    `;
    document.head.appendChild(style);

    // Build and inject the widget
    const inject = () => {
        const a = document.createElement('a');
        a.id = 'letsTalkWidget';
        a.href = CFG.href;
        a.setAttribute('aria-label', "Contact Dr Yuval Fouks — Let's talk");
        a.innerHTML = `
            <img class="ltw-avatar" src="${CFG.avatarSrc}" alt="${CFG.avatarAlt}"
                 onerror="this.style.display='none'">
            <span class="ltw-label">${CFG.label}</span>
            <span class="ltw-arrow" aria-hidden="true">→</span>
        `;
        document.body.appendChild(a);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }
})();
