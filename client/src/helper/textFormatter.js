function boldText(inputRef) {
  const highlight = window.getSelection().toString();
  const span = `<span class="font-bold">${highlight}</span>`;
  const input = inputRef.current.innerHTML;
  const parent = getSelectionParentElement();

  if (parent.classList.contains("font-bold")) {
    inputRef.current.innerHTML = input.replace(span, highlight);
  } else {
    inputRef.current.innerHTML = input.replace(highlight, span);
  }
}

function getSelectionParentElement() {
  let parentEl = null,
    sel;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      parentEl = sel.getRangeAt(0).commonAncestorContainer;
      if (parentEl.nodeType !== 1) {
        parentEl = parentEl.parentNode;
      }
    }
  } else if ((sel = document.selection) && sel.type !== "Control") {
    parentEl = sel.createRange().parentElement();
  }
  return parentEl;
}
