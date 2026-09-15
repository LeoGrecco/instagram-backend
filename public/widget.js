(function () {
  const script = document.currentScript;
  const accountId = script && script.dataset.account;
  const target = document.getElementById((script && script.dataset.target) || 'socialdeck-feed');
  if (!accountId || !target) return;
  const base = new URL(script.src).origin;
  const safeUrl = (value) => {
    try {
      const url = new URL(value || '#', base);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : '#';
    } catch {
      return '#';
    }
  };
  fetch(`${base}/api/widget/${encodeURIComponent(accountId)}/posts`).then((response) => response.json()).then((data) => {
    if (!data.posts || !data.posts.length) {
      target.textContent = 'Seu feed do Instagram aparecerá aqui.';
      return;
    }
    target.replaceChildren();
    data.posts.forEach((post) => {
      const link = document.createElement('a');
      link.href = safeUrl(post.permalink);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.cssText = 'display:inline-block;width:180px;margin:6px;font-family:system-ui;color:#17201c;text-decoration:none';
      const image = document.createElement('img');
      image.src = safeUrl(post.media_url || post.thumbnail_url);
      image.alt = String(post.caption || 'Post do Instagram');
      image.referrerPolicy = 'no-referrer';
      image.style.cssText = 'width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px';
      const caption = document.createElement('span');
      caption.textContent = String(post.caption || '');
      caption.style.cssText = 'display:block;padding:7px 2px;font-size:13px';
      link.append(image, caption);
      target.append(link);
    });
  }).catch(() => {
    target.textContent = 'Não foi possível carregar o feed agora.';
  });
}());
