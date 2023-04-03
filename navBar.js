/**
 * @author B.W.S.N. Malwana
 * UoW No. - 19564173
 * Student No. - 20221488
 */

const menuBtn = document.querySelector(".menu-btn");
const navlinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
  navlinks.classList.toggle("mobile-menu");
});
