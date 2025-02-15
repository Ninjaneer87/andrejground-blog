document.addEventListener('astro:page-load', () => {
  if (
    window.location.href.includes('/articles/') &&
    !window.location.href.includes('authors')
  ) {
    const wrapperExists = document.querySelector('.code-wrapper');
    if (wrapperExists) return;

    let copyLabel = 'Copy';
    const codeBlocks = Array.from(
      document.querySelectorAll('pre[data-theme="github-dark"]'),
    );

    codeBlocks.forEach(block => {
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.classList.add('code-wrapper');

      const copyButton = document.createElement('button');
      copyButton.textContent = copyLabel;
      copyButton.classList.add('copy-button');
      copyButton.innerText = copyLabel;

      const codeLanguage = block.getAttribute('data-language');
      const codeLanguageSpan = document.createElement('span');
      codeLanguageSpan.textContent = codeLanguage;
      codeLanguageSpan.classList.add('code-language');

      block.parentNode?.insertBefore(wrapper, block);
      wrapper.appendChild(block);
      wrapper.appendChild(copyButton);
      wrapper.appendChild(codeLanguageSpan);

      copyButton.addEventListener(
        'click',
        async () =>
          await copyCode(
            wrapper as HTMLElement,
            block as HTMLElement,
            copyButton,
          ),
      );
    });

    async function copyCode(
      wrapper: HTMLElement,
      block: HTMLElement,
      button: HTMLButtonElement,
    ) {
      let code = block.querySelector('code');
      let text = code?.innerText;

      if (!text) return;

      await navigator.clipboard.writeText(text);

      button.innerText = 'Copied!';
      wrapper.classList.add('active');
      block.classList.add('active');

      setTimeout(() => {
        button.innerText = copyLabel;
        wrapper.classList.remove('active');
        block.classList.remove('active');
      }, 1000);
    }
  }
});
