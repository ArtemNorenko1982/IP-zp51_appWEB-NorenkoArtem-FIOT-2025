// Условные данные
      const DATA = {
        stats: { exchanges: 842, books: 1284, users: 532 },
        books: [
          {
            id: 1,
            title: '1984',
            author: 'Дж. Оруэлл',
            rating: 4.7,
            cover: 'https://via.placeholder.com/300x420?text=1984',
            category: 'fiction',
          },
          {
            id: 2,
            title: 'Мастер и Маргарита',
            author: 'М. Булгаков',
            rating: 4.9,
            cover:
              'https://via.placeholder.com/300x420?text=Мастер+и+Маргарита',
            category: 'fiction',
          },
          {
            id: 3,
            title: 'Clean Code',
            author: 'R. Martin',
            rating: 4.6,
            cover: 'https://via.placeholder.com/300x420?text=Clean+Code',
            category: 'edu',
          },
          {
            id: 4,
            title: 'Война и мир',
            author: 'Л. Толстой',
            rating: 4.5,
            cover: 'https://via.placeholder.com/300x420?text=Война+и+мир',
            category: 'fiction',
          },
          {
            id: 5,
            title: 'The Pragmatic Programmer',
            author: 'A. Hunt',
            rating: 4.4,
            cover:
              'https://via.placeholder.com/300x420?text=Pragmatic+Programmer',
            category: 'edu',
          },
          {
            id: 6,
            title: 'Алхимик',
            author: 'Пауло Коэльо',
            rating: 4.2,
            cover: 'https://via.placeholder.com/300x420?text=Алхимик',
            category: 'fiction',
          },
        ],
        user: {
          name: 'Artem N.',
          initials: 'AN',
          exchanges: 7,
          given: 5,
          taken: 2,
          loans: [],
        },
      };

      // Отобразить статистику
      document.getElementById('stat-exchanges').innerText =
        DATA.stats.exchanges.toLocaleString('ru-RU');
      document.getElementById('stat-books').innerText =
        DATA.stats.books.toLocaleString('ru-RU');
      document.getElementById('stat-users').innerText =
        DATA.stats.users.toLocaleString('ru-RU');

      // Кабинет
      const user = DATA.user;
      document.getElementById('user-name').innerText = user.name;
      document.getElementById('user-initials').innerText = user.initials;
      document.getElementById('user-initials').style.background =
        'linear-gradient(135deg,#eef3ff,#dbeafe)';

      // Рендер библиотеки и рейтинга
      const booksGrid = document.getElementById('books-grid');
      const ratingList = document.getElementById('rating-list');

      function renderBooks(list) {
        booksGrid.innerHTML = '';
        list.forEach((b) => {
          const el = document.createElement('div');
          el.className = 'book';
          el.innerHTML = `
          <img src="${b.cover}" alt="${b.title}" />
          <h4>${b.title}</h4>
          <p>${b.author}</p>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:8px">
            <button style="padding:8px;border-radius:8px;border:1px solid var(--border);background:white;cursor:pointer" onclick="borrow(${b.id})">Обрати</button>
            <button style="padding:8px;border-radius:8px;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer" onclick="more(${b.id})">Детальніше</button>
          </div>`;
          booksGrid.appendChild(el);
        });
      }

      function renderRating(list) {
        ratingList.innerHTML = '';
        list
          .slice()
          .sort((a, b) => b.rating - a.rating)
          .forEach((b, idx) => {
            const el = document.createElement('div');
            el.className = 'rating-item';
            el.innerHTML = `
          <div style="width:48px;height:68px;border-radius:6px;overflow:hidden"><img src="${
            b.cover
          }" style="width:100%;height:100%;object-fit:cover"></div>
          <div style="flex:1"><strong>${
            b.title
          }</strong><div style="font-size:13px;color:var(--muted)">${
              b.author
            }</div></div>
          <div style="text-align:right"><div style="color:#f59e0b;font-weight:700">${'★'.repeat(
            Math.round(b.rating)
          )}</div><div style="font-size:13px;color:var(--muted)">${b.rating.toFixed(
              1
            )}</div></div>`;
            ratingList.appendChild(el);
          });
      }

      renderBooks(DATA.books);
      renderRating(DATA.books);

      // Фильтр по категории
      document.getElementById('category').addEventListener('change', (e) => {
        const v = e.target.value;
        const q = document.getElementById('search').value.trim().toLowerCase();
        let list = DATA.books;
        if (v !== 'all') list = list.filter((b) => b.category === v);
        if (q)
          list = list.filter(
            (b) =>
              b.title.toLowerCase().includes(q) ||
              b.author.toLowerCase().includes(q)
          );
        renderBooks(list);
      });

      // Поиск
      document.getElementById('search').addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        const cat = document.getElementById('category').value;
        let list = DATA.books;
        if (cat !== 'all') list = list.filter((b) => b.category === cat);
        if (!q) renderBooks(list);
        else
          renderBooks(
            list.filter(
              (b) =>
                b.title.toLowerCase().includes(q) ||
                b.author.toLowerCase().includes(q)
            )
          );
      });
      document.getElementById('clear-search').addEventListener('click', () => {
        document.getElementById('search').value = '';
        document.getElementById('category').value = 'all';
        renderBooks(DATA.books);
      });

      // Действия
      function borrow(id) {
        const book = DATA.books.find((b) => b.id === id);
        alert(`Запрос на взятие книги «${book.title}» отправлен (условно).`);
      }
      function more(id) {
        const b = DATA.books.find((x) => x.id === id);
        alert(
          `${b.title}\nАвтор: ${b.author}\nРейтинг: ${b.rating.toFixed(1)}`
        );
      }

      // Burger menu toggle + анимация
      const sidebar = document.getElementById('sidebar');
      const hamburger = document.getElementById('hamburger');
      hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        // анимация маленького эффекта
        hamburger.animate(
          [
            { transform: 'scale(1)' },
            { transform: 'scale(.96)' },
            { transform: 'scale(1)' },
          ],
          { duration: 220, easing: 'ease-out' }
        );
      });

      // Подсветка активного раздела при скролле
      const navLinks = Array.from(document.querySelectorAll('#nav a'));
      function setActive(target) {
        navLinks.forEach((a) =>
          a.classList.toggle('active', a.dataset.target === target)
        );
      }
      navLinks.forEach((a) => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const id = a.dataset.target;
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActive(id);
            if (window.innerWidth <= 900) sidebar.classList.add('hidden');
          }
        });
      });

      window.addEventListener('scroll', () => {
        const sections = ['stats', 'library', 'cabinet', 'rating'];
        let current = 'stats';
        for (const s of sections) {
          const el = document.getElementById(s);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = s;
        }
        setActive(current);
      });

      // Инициализация: скрываем сайдбар для малых экранов
      if (window.innerWidth <= 900) sidebar.classList.add('hidden');

      // expose for debug
      window.DATA = DATA;