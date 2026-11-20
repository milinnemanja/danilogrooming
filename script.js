/* ============================================================
   DANILO GROOMING — Interactive Functionality
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Service Catalog Data ----
  const SERVICES = {
    bath: {
      kicker: 'Usluga 01',
      title: 'Kupanje i četkanje',
      selectValue: 'Kupanje i četkanje',
      duration: '60 – 90 min',
      price: 'od 2.800 RSD',
      intro:
        'Idealan tretman za održavanje čiste, meke i mirisne dlake između dva šišanja, kao i za pse koji se linjaju.',
      includes: [
        'Dvostruko kupanje prirodnim, hipoalergenim šamponima prilagođenim koži psa',
        'Hranljiva maska za sjaj i lakše raščešljavanje dlake',
        'Nežno sušenje tihim fenom bez pregrevanja',
        'Temeljno četkanje i uklanjanje poddlake',
        'Čišćenje ušiju, skraćivanje noktiju i balzam za jastučiće šapa'
      ]
    },
    full: {
      kicker: 'Usluga 02',
      title: 'Kompletna nega',
      selectValue: 'Kompletna nega',
      duration: '90 – 120 min',
      price: 'od 4.200 RSD',
      intro:
        'Naš najtraženiji paket — kompletan spa tretman i ručno oblikovanje frizure u skladu sa rasom i vašim željama.',
      includes: [
        'Sve korake iz paketa „Kupanje i četkanje“',
        'Potpuno šišanje makazama i/ili mašinicom (standard rase ili medvedić stil)',
        'Higijensko sređivanje predela oko očiju, njuške i šapica',
        'Oblikovanje ušiju i repa po meri',
        'Završna prirodna vodica za dugotrajan, blag miris'
      ]
    },
    puppy: {
      kicker: 'Usluga 03',
      title: 'Prvo šišanje šteneta',
      selectValue: 'Prvo šišanje šteneta',
      duration: '45 – 60 min',
      price: 'od 2.200 RSD',
      intro:
        'Specijalno osmišljen nežan tretman za štence od 3 do 6 meseci kako bi od prvog dana zavoleli dolazak u salon.',
      includes: [
        'Lagano upoznavanje sa stolom, vodom i zvukom fena bez žurbe',
        'Blago kupanje ekstra-nežnim šamponom za osetljivu kožu štenaca',
        'Nežno feniranje, četkanje i sređivanje dlake oko očiju i šapica',
        'Skraćivanje vrhova noktiju i higijena ušiju',
        'Puno strpljenja, pohvala i zdravih poslastica tokom celog termina'
      ]
    }
  };

  // ---- Mobile Menu ----
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      mobileMenuBtn.classList.toggle('is-open', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        mobileMenuBtn.classList.remove('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Modal Helper ----
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openModal(htmlContent) {
    modalBody.innerHTML = htmlContent;
    modalBackdrop.hidden = false;
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Trigger CSS fade transition
    requestAnimationFrame(() => {
      modalBackdrop.classList.add('is-visible');
    });
  }

  function closeModal() {
    modalBackdrop.classList.remove('is-visible');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!modalBackdrop.classList.contains('is-visible')) {
        modalBackdrop.hidden = true;
      }
    }, 240);
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalBackdrop.hidden) closeModal();
  });

  // ---- Service Detail Buttons ----
  document.querySelectorAll('[data-service]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-service');
      const svc = SERVICES[key];
      if (!svc) return;

      const listItems = svc.includes.map((item) => `<li>${item}</li>`).join('');
      openModal(`
        <div class="modal-kicker">${svc.kicker}</div>
        <h3 class="modal-title" id="modalTitle">${svc.title}</h3>
        <div class="modal-meta-row">
          <span class="modal-badge">Trajanje: ${svc.duration}</span>
          <span class="modal-badge">Cena: ${svc.price}</span>
        </div>
        <p class="modal-text">${svc.intro}</p>
        <ul class="modal-list">${listItems}</ul>
        <button type="button" class="btn btn-primary btn-full" id="bookThisServiceBtn">
          Zakaži: ${svc.title}
        </button>
      `);

      const bookBtn = document.getElementById('bookThisServiceBtn');
      if (bookBtn) {
        bookBtn.addEventListener('click', () => {
          const select = document.getElementById('serviceSelect');
          if (select) select.value = svc.selectValue;
          closeModal();
          document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
        });
      }
    });
  });

  // ---- Our Story Modal ----
  const openStoryBtn = document.getElementById('openStoryBtn');
  if (openStoryBtn) {
    openStoryBtn.addEventListener('click', () => {
      openModal(`
        <div class="modal-kicker">O salonu Danilo Grooming</div>
        <h3 class="modal-title" id="modalTitle">Strpljenje na prvom mestu</h3>
        <p class="modal-text">
          Danilo Grooming je nastao iz iskrene ljubavi prema psima i želje da šišanje više nikada
          ne bude stresan događaj — ni za psa, ni za vlasnika.
        </p>
        <p class="modal-text">
          Umesto užurbane atmosfere i redova, naš prostor je osmišljen kao topao, miran kutak
          u kome je pažnja u potpunosti posvećena samo jednom ljubimcu u terminu. Koristimo
          isključivo sertifikovanu prirodnu kozmetiku, tihu opremu i blage pokrete koji grade poverenje.
        </p>
        <ul class="modal-list">
          <li>Individualni termini „jedan na jedan“ bez kaveza</li>
          <li>Prirodna kozmetika bez sulfata i jakih parfema</li>
          <li>Posebna pažnja za štence, seniore i osetljive pse</li>
        </ul>
        <button type="button" class="btn btn-primary btn-full" id="storyBookBtn">
          Zakažite upoznavanje i termin
        </button>
      `);

      const storyBookBtn = document.getElementById('storyBookBtn');
      if (storyBookBtn) {
        storyBookBtn.addEventListener('click', () => {
          closeModal();
          document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
        });
      }
    });
  }

  // ---- Gallery Lightbox ----
  document.querySelectorAll('.photo-frame').forEach((frame) => {
    frame.addEventListener('click', () => {
      const img = frame.querySelector('img');
      const dog = frame.getAttribute('data-dog') || '';
      const breed = frame.getAttribute('data-breed') || '';
      const treatment = frame.getAttribute('data-treatment') || '';

      openModal(`
        <img src="${img.src}" alt="${img.alt}" class="lightbox-img" />
        <div class="modal-kicker">Srećan klijent</div>
        <h3 class="modal-title" id="modalTitle">${dog} — ${breed}</h3>
        <p class="modal-text"><strong>Tretman:</strong> ${treatment}</p>
      `);
    });
  });

  // ---- Booking Form ----
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');
  const bookingSuccessText = document.getElementById('bookingSuccessText');
  const resetBookingBtn = document.getElementById('resetBookingBtn');
  const preferredDate = document.getElementById('preferredDate');

  // Set minimum date to today
  if (preferredDate) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    preferredDate.min = `${yyyy}-${mm}-${dd}`;
    preferredDate.value = `${yyyy}-${mm}-${dd}`;
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const ownerName = document.getElementById('ownerName');
      const ownerPhone = document.getElementById('ownerPhone');
      const dogInfo = document.getElementById('dogInfo');
      const serviceSelect = document.getElementById('serviceSelect');
      const preferredTime = document.getElementById('preferredTime');

      let valid = true;
      [ownerName, ownerPhone, dogInfo, preferredDate].forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add('input-error');
          valid = false;
        } else {
          field.classList.remove('input-error');
        }
      });

      if (!valid) return;

      const dateParts = preferredDate.value.split('-');
      const formattedDate =
        dateParts.length === 3 ? `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}.` : preferredDate.value;

      bookingSuccessText.innerHTML = `
        Hvala, <strong>${escapeHtml(ownerName.value.trim())}</strong>! Primili smo zahtev za uslugu
        <strong>${escapeHtml(serviceSelect.value)}</strong> za ljubimca
        <strong>${escapeHtml(dogInfo.value.trim())}</strong> (${formattedDate}, ${escapeHtml(preferredTime.value)}).
        Javićemo vam se uskoro na broj <strong>${escapeHtml(ownerPhone.value.trim())}</strong> radi potvrde.
      `;

      bookingForm.hidden = true;
      bookingSuccess.hidden = false;
    });

    // Clear error highlight as user types
    bookingForm.querySelectorAll('input, select').forEach((el) => {
      el.addEventListener('input', () => el.classList.remove('input-error'));
    });
  }

  if (resetBookingBtn) {
    resetBookingBtn.addEventListener('click', () => {
      bookingForm.reset();
      bookingSuccess.hidden = true;
      bookingForm.hidden = false;
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
});
