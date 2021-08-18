export function fakeIn(els: HTMLElement | HTMLElement[], duration = 50) {
  const els_ = ([] as HTMLElement[]).concat(els);

  els_.forEach((el) => (el.style.display = 'block'));
  setTimeout(() => els_.forEach((el) => (el.style.opacity = '1')), duration);
}

export function fakeOut(els: HTMLElement | HTMLElement[], duration = 50) {
  const els_ = ([] as HTMLElement[]).concat(els);

  els_.forEach((el) => (el.style.opacity = '' + 0));
  setTimeout(() => els_.forEach((el) => (el.style.display = 'none')), duration);
}
