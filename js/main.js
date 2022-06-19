const draggables = document.querySelectorAll("article");
const dragContainers = document.querySelectorAll(".bounties > div ");

draggables.forEach((draggableElement) => {
  draggableElement.addEventListener("dragstart", () => {
    draggableElement.classList.add("dragging");
    setTimeout(() => {
      draggableElement.classList.add("hide");
    }, 0);
  });
  draggableElement.addEventListener("dragend", () => {
    draggableElement.classList.remove("dragging");
    draggableElement.classList.remove("hide");
  });
});

dragContainers.forEach((draggableContainer) => {
  draggableContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(draggableContainer, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      draggableContainer.lastElementChild.appendChild(draggable);
    } else {
      setTimeout(() => {
        afterElement.classList.add("beforeCardSpace");
      }, 0);
      draggableContainer.lastElementChild.insertBefore(draggable, afterElement);
    }
  });
  draggableContainer.addEventListener("dragleave", (e) =>
    leave(e, draggableContainer)
  );
  draggableContainer.addEventListener("dragenter", (e) =>
    leave(e, draggableContainer)
  );
  draggableContainer.addEventListener("drop", (e) =>
    leave(e, draggableContainer)
  );
});

function getDragAfterElement(container, y) {
  const draggableElems = [
    ...container.lastElementChild.querySelectorAll("article:not(.dragging)"),
  ];

  return draggableElems.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function leave(e, draggableContainer) {
  e.preventDefault();
  const draggableElems = [
    ...draggableContainer.lastElementChild.querySelectorAll(
      "article:not(.dragging)"
    ),
  ];
  draggableElems.map((child) => child.classList.remove("beforeCardSpace"));
}
