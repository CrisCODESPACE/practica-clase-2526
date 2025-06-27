export function renderTask(list = [], container, elemento) {
  container.innerHTML = "";

  list.forEach((e) => {
    const tag = document.createElement(`${elemento}`);
    tag.textContent = e;

    container.appendChild(tag);
  });
}
