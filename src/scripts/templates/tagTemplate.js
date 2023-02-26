function tagTemplate(content, type) {
  console.log(type, content);
  function getTag() {
    const tag = document.createElement("button");
    tag.classList.add("tag");
    tag.setAttribute("type", "button");
    tag.setAttribute("data-type", type);

    const tagContent = `<span class="tag__content">${content}</span><i class="fa-regular fa-times-circle" aria-hidden="true"></i>`;

    tag.innerHTML = tagContent;

    return tag;
  }

  return { getTag };
}

export default tagTemplate;
