/* Shared header + footer for Art's Auto Interiors */

(function () {
  const PHONE = '(630) 812-8671';
  const PHONE_HREF = 'tel:+16308128671';
  const STORAGE_KEY = 'aai-palette';

  /* ---------- Palette persistence (cross-page) ---------- */
  // Restrained = bone/ash with lime reserved for stitching.
  // Original   = lime everywhere (eyebrows, headlines em, links, buttons, brand mark).
  function applyPalette(p) {
    if (p === 'original') {
      delete document.body.dataset.palette;
    } else {
      document.body.dataset.palette = 'restrained';
    }
  }
  // Read saved choice; default to restrained if nothing stored, but also respect an
  // existing data-palette attribute (set in HTML) on first load.
  let saved;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (!saved) saved = (document.body.dataset.palette === 'restrained') ? 'restrained' : 'restrained';
  applyPalette(saved);

  const currentPage = (document.body.dataset.page || '').toLowerCase();

  const navLinks = [
    { href: 'index.html',    label: 'Home',     id: 'home' },
    { href: 'about.html',    label: 'About',    id: 'about' },
    { href: 'services.html', label: 'Services', id: 'services' },
    { href: 'gallery.html',  label: 'Gallery',  id: 'gallery' },
    { href: 'contact.html',  label: 'Contact',  id: 'contact' },
  ];

  /* ---------- Header ---------- */
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="brand-mark" aria-label="Art's Auto Interiors home">
        Art's Auto Interiors
        <span class="small">3rd Generation Tailor</span>
      </a>
      <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
      <nav class="nav" aria-label="Primary">
        ${navLinks.map(l => `<a href="${l.href}" class="${l.id === currentPage ? 'active' : ''}">${l.label}</a>`).join('')}
      </nav>
      <div class="header-actions">
        <div class="palette-toggle" role="group" aria-label="Site style">
          <button type="button" data-pal="restrained" class="${saved === 'restrained' ? 'on' : ''}" aria-pressed="${saved === 'restrained'}">White</button>
          <button type="button" data-pal="original" class="${saved === 'original' ? 'on' : ''}" aria-pressed="${saved === 'original'}">Original</button>
        </div>
        <a href="${PHONE_HREF}" class="btn-call">Call ${PHONE}</a>
      </div>
    </div>
  `;
  document.body.insertBefore(header, document.body.firstChild);

  // Mobile toggle
  const toggle = header.querySelector('.menu-toggle');
  const nav = header.querySelector('.nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Palette toggle wiring
  const palBtns = header.querySelectorAll('.palette-toggle button');
  palBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const p = btn.dataset.pal;
      applyPalette(p);
      try { localStorage.setItem(STORAGE_KEY, p); } catch(e) {}
      palBtns.forEach(b => {
        const on = b.dataset.pal === p;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', String(on));
      });
    });
  });

  /* ---------- Footer ---------- */
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div>
        <h4>Art's Auto Interiors</h4>
        <p style="color:#9c9889;font-family:'Playfair Display',serif;font-style:italic;">
          Third generation tailor.<br/>Hand-stitched. By appointment.
        </p>
      </div>
      <div>
        <h4>Visit</h4>
        <a href="https://maps.google.com/?q=343+Boulevard+St+Sandwich+IL+60548" target="_blank" rel="noopener">
          343 Boulevard St.<br/>Sandwich, IL 60548
        </a>
        <p style="margin-top:10px;color:#9c9889;font-size:13px;">By appointment. Please call ahead.</p>
      </div>
      <div>
        <h4>Contact</h4>
        <a href="${PHONE_HREF}">${PHONE}</a>
        <a href="mailto:artsautointeriors@gmail.com">artsautointeriors@gmail.com</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} Art's Auto Interiors</span>
      <span>Sandwich, Illinois</span>
    </div>
  `;
  document.body.appendChild(footer);
})();
