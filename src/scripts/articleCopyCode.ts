document.addEventListener('astro:page-load', () => {
  let copyLabel = 'Copy';
  const codeBlocks = Array.from(document.querySelectorAll('.astro-code'));

  codeBlocks.forEach(block => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';

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
      async () => await copyCode(block as HTMLElement, copyButton),
    );
  });

  async function copyCode(block: HTMLElement, button: HTMLButtonElement) {
    let code = block.querySelector('code');
    let text = code?.innerText;

    if (!text) return;

    await navigator.clipboard.writeText(text);

    button.innerText = 'Copied!';
    block.classList.add('active');

    setTimeout(() => {
      button.innerText = copyLabel;
      block.classList.remove('active');
    }, 1000);
  }
});
