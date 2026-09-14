(function () {
  const script = document.currentScript;
  const accountId = script && script.dataset.account;
  const target = document.getElementById((script && script.dataset.target) || 'socialdeck-feed');
  if (!accountId || !target) return;
  const base = new URL(script.src).origin;
  fetch(`${base}/api/widget/${accountId}/posts`).then((response) => response.json()).then((data) => {
    if (!data.posts || !data.posts.length) {
      target.textContent = 'Seu feed do Instagram aparecerá aqui.';
      return;
    }
    target.innerHTML = data.posts.map((post) => `<a href="${post.permalink || '#'}" target="_blank" rel="noreferrer" style="display:inline-block;width:180px;margin:6px;font-family:system-ui;color:#17201c;text-decoration:none"><img src="${post.media_url || post.thumbnail_url || ''}" alt="${post.caption || 'Post do Instagram'}" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px"><span style="display:block;padding:7px 2px;font-size:13px">${post.caption || ''}</span></a>`).join('');
  }).catch(() => {
    target.textContent = 'Não foi possível carregar o feed agora.';
  });
}());
