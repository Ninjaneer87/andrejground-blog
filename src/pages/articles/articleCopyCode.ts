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

    block.appendChild(copyButton);
    block.parentNode?.insertBefore(wrapper, block);
    wrapper.appendChild(block);

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
