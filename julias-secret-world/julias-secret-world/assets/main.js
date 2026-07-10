(function () {
  const isInsidePost = window.location.pathname.includes('/posts/');
  const pathPrefix = isInsidePost ? '../' : '';

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const randomButton = document.getElementById('random-post');
  if (randomButton && typeof POSTS !== 'undefined' && POSTS.length) {
    randomButton.addEventListener('click', function () {
      const post = POSTS[Math.floor(Math.random() * POSTS.length)];
      window.location.href = post.url;
    });
  }

  const recentPosts = document.getElementById('recent-posts');
  if (recentPosts && typeof POSTS !== 'undefined') {
    recentPosts.innerHTML = POSTS.slice(0, 3).map(postCard).join('');
  }

  const archivePosts = document.getElementById('archive-posts');
  const categoryFilters = document.getElementById('category-filters');
  const searchInput = document.getElementById('search-input');
  const archiveCount = document.getElementById('archive-count');
  const emptyState = document.getElementById('empty-state');

  if (archivePosts && typeof POSTS !== 'undefined') {
    const categories = ['All'].concat([...new Set(POSTS.map(post => post.category))]);
    const params = new URLSearchParams(window.location.search);
    let activeCategory = params.get('category') || 'All';
    if (!categories.includes(activeCategory)) activeCategory = 'All';

    categoryFilters.innerHTML = categories.map(category => {
      const active = category === activeCategory ? ' active' : '';
      return `<button class="filter-chip${active}" type="button" data-category="${escapeHTML(category)}">${escapeHTML(category)}</button>`;
    }).join('');

    function renderArchive() {
      const term = (searchInput.value || '').trim().toLowerCase();
      const filtered = POSTS.filter(post => {
        const categoryMatch = activeCategory === 'All' || post.category === activeCategory;
        const haystack = `${post.title} ${post.excerpt} ${post.category} ${post.place} ${post.mood}`.toLowerCase();
        return categoryMatch && haystack.includes(term);
      });

      archivePosts.innerHTML = filtered.map(archiveItem).join('');
      archiveCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'} found`;
      emptyState.hidden = filtered.length !== 0;
    }

    categoryFilters.addEventListener('click', function (event) {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      activeCategory = button.dataset.category;
      categoryFilters.querySelectorAll('.filter-chip').forEach(chip => chip.classList.toggle('active', chip === button));
      renderArchive();
    });

    searchInput.addEventListener('input', renderArchive);
    renderArchive();
  }

  function postCard(post) {
    return `
      <article class="post-card">
        <div class="post-card-topline">
          <span class="category-pill">${escapeHTML(post.category)}</span>
          <span>${escapeHTML(post.displayDate)}</span>
        </div>
        <h3><a href="${pathPrefix}${escapeHTML(post.url)}">${escapeHTML(post.title)}</a></h3>
        <p>${escapeHTML(post.excerpt)}</p>
        <div class="post-card-footer">
          <span>${escapeHTML(post.place)}</span>
          <a href="${pathPrefix}${escapeHTML(post.url)}" aria-label="Read ${escapeHTML(post.title)}">Read →</a>
        </div>
      </article>`;
  }

  function archiveItem(post) {
    return `
      <article class="archive-item">
        <div class="archive-date">
          <span>${escapeHTML(post.displayDate)}</span>
          <span>${escapeHTML(post.readingTime)}</span>
        </div>
        <div class="archive-copy">
          <span class="category-pill">${escapeHTML(post.category)}</span>
          <h2><a href="${escapeHTML(post.url)}">${escapeHTML(post.title)}</a></h2>
          <p>${escapeHTML(post.excerpt)}</p>
          <div class="archive-meta"><span>⌖ ${escapeHTML(post.place)}</span><span>♡ ${escapeHTML(post.mood)}</span></div>
        </div>
        <a class="archive-arrow" href="${escapeHTML(post.url)}" aria-label="Read ${escapeHTML(post.title)}">↗</a>
      </article>`;
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();
