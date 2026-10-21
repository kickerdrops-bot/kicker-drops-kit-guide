(() => {
  "use strict";

  const guide = window.KIT_GUIDE;
  const main = document.getElementById("main");
  const total = guide.chapters.length;
  const number = (value) => String(value).padStart(2, "0");

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function arrow(direction = "right") {
    const node = element("span", `arrow arrow-${direction}`, direction === "left" ? "←" : "↗");
    node.setAttribute("aria-hidden", "true");
    return node;
  }

  function chapterLink(chapter) {
    return `#${chapter.id}`;
  }

  function safeExternalUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
    } catch {
      return null;
    }
  }

  function youtubeId(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value.trim());
      if (url.protocol !== "https:" || url.username || url.password) return null;
      const host = url.hostname.toLowerCase();
      const path = url.pathname.split("/").filter(Boolean);
      let id = null;
      if (host === "youtu.be" || host === "www.youtu.be") {
        if (path.length === 1) id = path[0];
      } else if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(host)) {
        if (url.pathname === "/watch") id = url.searchParams.get("v");
        else if (["embed", "shorts", "live"].includes(path[0]) && path.length === 2) id = path[1];
      }
      return /^[a-zA-Z0-9_-]{11}$/.test(id || "") ? id : null;
    } catch {
      return null;
    }
  }

  function externalLink(label, url, className) {
    const link = element("a", className);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(element("span", "", label), arrow());
    link.append(element("span", "sr-only", "（新しいタブで開きます）"));
    return link;
  }

  function home() {
    document.title = "体験キットガイド | KICKER DROPS";
    const hero = element("section", "hero");
    const heroInner = element("div", "hero-inner");
    const intro = element("div", "hero-copy");
    intro.append(element("p", "eyebrow", "YOUR KIT. YOUR CREATIVITY."));
    const title = element("h1", "home-title");
    title.id = "page-title";
    title.tabIndex = -1;
    title.append(element("span", "", "スニーカーペイント"), element("span", "", "体験キットガイド"));
    intro.append(title, element("p", "hero-description", guide.introduction));
    const aside = element("div", "hero-aside");
    aside.setAttribute("aria-hidden", "true");
    const largeNumber = element("span", "hero-number", number(total));
    aside.append(largeNumber, element("span", "hero-caption", "CHAPTERS TO CREATE"));
    heroInner.append(intro, aside);
    hero.append(heroInner);

    const contents = element("section", "contents content-width");
    contents.setAttribute("aria-labelledby", "contents-title");
    const contentsHeading = element("div", "section-heading");
    const heading = element("h2", "", "ガイドの目次");
    heading.id = "contents-title";
    contentsHeading.append(heading, element("span", "index-label", "CONTENTS / 01—07"));
    contents.append(contentsHeading);

    const list = element("ol", "chapter-list");
    guide.chapters.forEach((chapter, index) => {
      const item = element("li", "chapter-item");
      const link = element("a", "chapter-row");
      link.href = chapterLink(chapter);
      const serial = element("span", "chapter-number", number(index + 1));
      serial.setAttribute("aria-hidden", "true");
      const copy = element("span", "chapter-copy");
      copy.append(element("span", "chapter-category", chapter.category), element("span", "chapter-title", chapter.title));
      link.append(serial, copy, element("span", "chapter-summary", chapter.summary), arrow());
      item.append(link);
      list.append(item);
    });
    contents.append(list, element("p", "contents-note", "何度でも見返せる、あなたのペイントガイド。"));
    main.replaceChildren(hero, contents);
  }

  function lesson(chapter, index) {
    document.title = `${chapter.title} | 体験キットガイド | KICKER DROPS`;
    const article = element("article", "lesson content-width");
    const breadcrumb = element("a", "back-link", "ガイドの目次へ");
    breadcrumb.href = "#home";
    breadcrumb.prepend(arrow("left"));
    article.append(breadcrumb);
    const header = element("header", "lesson-header");
    const meta = element("div", "lesson-meta");
    meta.append(element("span", "lesson-step", `CHAPTER ${number(index + 1)} / ${number(total)}`), element("span", "lesson-category", chapter.category));
    const title = element("h1", "lesson-title", chapter.title);
    title.id = "page-title";
    title.tabIndex = -1;
    header.append(meta, title);
    article.append(header);

    const media = element("section", "lesson-media");
    media.setAttribute("aria-label", "解説動画");
    const videoFrame = element("div", "video-frame");
    const id = youtubeId(chapter.videoUrl);
    if (id) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0`;
      iframe.title = `${chapter.title}の解説動画`;
      iframe.allow = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      videoFrame.append(iframe);
      media.append(videoFrame, externalLink("YouTubeで見る", `https://www.youtube.com/watch?v=${id}`, "youtube-link"));
    } else {
      const empty = element("div", "video-placeholder");
      const play = element("span", "play-icon");
      play.setAttribute("aria-hidden", "true");
      empty.append(play, element("p", "", "動画は準備中です"), element("span", "placeholder-label", "VIDEO GUIDE"));
      videoFrame.append(empty);
      media.append(videoFrame);
      if (chapter.videoUrl) console.warn(`Invalid YouTube URL for chapter: ${chapter.id}`);
    }
    article.append(media);

    const explanation = element("section", "explanation");
    const explanationTitle = element("h2", "", "テキストで確認");
    explanationTitle.id = "explanation-title";
    explanation.setAttribute("aria-labelledby", "explanation-title");
    explanation.append(element("p", "eyebrow dark-eyebrow", "READ & CREATE"), explanationTitle);
    const body = typeof chapter.body === "string" ? chapter.body.trim() : "";
    if (body) {
      const paragraphs = element("div", "lesson-body");
      body.split(/\n\s*\n/).forEach((text) => {
        const block = text.trim();
        if (/^## [^\n]+$/.test(block)) {
          paragraphs.append(element("h3", "", block.slice(3)));
        } else if (block.split("\n").every((line) => line.startsWith("- "))) {
          const list = element("ul", "");
          block.split("\n").forEach((line) => list.append(element("li", "", line.slice(2))));
          paragraphs.append(list);
        } else {
          paragraphs.append(element("p", "", block));
        }
      });
      explanation.append(paragraphs);
    } else {
      explanation.append(element("p", "text-placeholder", "解説は準備中です"));
    }
    if (chapter.externalLink) {
      const url = safeExternalUrl(chapter.externalLink.url);
      if (url) explanation.append(externalLink(chapter.externalLink.label, url, "shop-link"));
    }
    article.append(explanation);

    const navigation = element("nav", "lesson-navigation");
    navigation.setAttribute("aria-label", "前後の章");
    const previous = index > 0 ? guide.chapters[index - 1] : null;
    const next = index < total - 1 ? guide.chapters[index + 1] : null;
    const previousLink = element("a", "lesson-nav-link previous");
    previousLink.href = previous ? chapterLink(previous) : "#home";
    previousLink.append(element("span", "nav-label", previous ? "← 前の章" : "← 目次へ"), element("span", "nav-title", previous ? previous.title : "ガイドの目次"));
    const nextLink = element("a", "lesson-nav-link next");
    nextLink.href = next ? chapterLink(next) : "#home";
    nextLink.append(element("span", "nav-label", next ? "次の章 →" : "目次へ →"), element("span", "nav-title", next ? next.title : "ガイドの目次"));
    navigation.append(previousLink, nextLink);
    article.append(navigation);
    main.replaceChildren(article);
  }

  function render(moveFocus) {
    const route = window.location.hash.slice(1);
    const index = guide.chapters.findIndex((chapter) => chapter.id === route);
    if (index === -1) home();
    else lesson(guide.chapters[index], index);
    document.querySelector(".header-home").setAttribute("aria-current", index === -1 ? "page" : "false");
    if (moveFocus) {
      document.getElementById("page-title").focus({ preventScroll: true });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }

  // Keep the lesson URL when keyboard users jump past the header.
  document.querySelector(".skip-link").addEventListener("click", (event) => {
    event.preventDefault();
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: "start", behavior: "instant" });
  });
  window.addEventListener("hashchange", () => render(true));
  render(false);
})();
