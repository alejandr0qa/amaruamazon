"use strict";
(() => {
  const menu = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#navigation");
  const closeMenu = () => {
    navigation.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  };
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    navigation.classList.toggle("open", open);
    menu.setAttribute("aria-expanded", String(open));
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  const privacy = document.querySelector("#privacy-dialog");
  document.querySelector("#privacy-button").addEventListener("click", () => privacy.showModal());
  privacy.querySelector("[data-close-dialog]").addEventListener("click", () => privacy.close());
  document.querySelector("#year").textContent = new Date().getFullYear();
})();
