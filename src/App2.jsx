import React, { useState } from "react";

import "./AppV2.scss";

function App() {
  function handleMouseMove(e) {
    const $cards = document.querySelectorAll(".card");
    const $style = document.querySelector(".hover");

    // normalise touch/mouse
    let pos = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    e.preventDefault();
    if (e.nativeEvent.type === "touchmove") {
      pos = [
        e.nativeEvent.touches[0].clientX,
        e.nativeEvent.touches[0].clientY,
      ];
    }

    // math for mouse position
    const $card = e.target;
    const l = pos[0];
    const t = pos[1];
    const h = $card.clientHeight;
    const w = $card.clientWidth;
    const px = Math.abs(Math.floor((100 / w) * l) - 100);
    const py = Math.abs(Math.floor((100 / h) * t) - 100);
    const pa = 50 - px + (50 - py);

    // math for gradient / background positions
    const lp = 50 + (px - 50) / 1.5;
    const tp = 50 + (py - 50) / 1.5;
    const px_spark = 50 + (px - 50) / 7;
    const py_spark = 50 + (py - 50) / 7;
    const p_opc = 20 + Math.abs(pa) * 1.5;
    const ty = ((tp - 50) / 2) * -1;
    const tx = ((lp - 50) / 1.5) * 0.5;

    // css to apply for active card
    const grad_pos = `background-position: ${lp}% ${tp}%;`;
    const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
    const opc = `opacity: ${p_opc / 100};`;
    const tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;

    // need to use a <style> tag for psuedo elements
    const newStyle = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
    `;

    // set / apply css class and style
    $cards.forEach((card) => {
      card.classList.remove("active");
      card.classList.remove("animated");
      card.removeAttribute("style");
    });
    $style.innerHTML = newStyle;
    $card.classList.add("animated");
    $card.setAttribute("style", tf);

    if (e.nativeEvent.type === "touchmove") {
      return false;
    }
  }

  return (
    <main id="app">
      <section class="cards">
        <div
          class="card charizard animated"
          onMouseMove={handleMouseMove}
        ></div>
        <div
          class="card charizard animated"
          onMouseMove={handleMouseMove}
        ></div>
      </section>
      <style class="hover"></style>
    </main>
  );
}

export default App;
