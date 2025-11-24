(function(){
  const IN_DURATION  = 2000;
  const VISIBLE_MS   = 3000;
  const OUT_DURATION = 1800;
  const START_DELAY  = 300;

  const anims = {
    up: {
      in:  [{ transform: "translateY(60%)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 }],
      out: [{ transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(-60%)", opacity: 0 }]
    },
    down: {
      in:  [{ transform: "translateY(-60%)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 }],
      out: [{ transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(60%)", opacity: 0 }]
    },
    left: {
      in:  [{ transform: "translateX(60%)", opacity: 0 },
            { transform: "translateX(0)", opacity: 1 }],
      out: [{ transform: "translateX(0)", opacity: 1 },
            { transform: "translateX(-60%)", opacity: 0 }]
    },
    right: {
      in:  [{ transform: "translateX(-60%)", opacity: 0 },
            { transform: "translateX(0)", opacity: 1 }],
      out: [{ transform: "translateX(0)", opacity: 1 },
            { transform: "translateX(60%)", opacity: 0 }]
    },
    fade: {
      in:  [{ opacity: 0, transform: "scale(1.04)" },
            { opacity: 1, transform: "scale(1)" }],
      out: [{ opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: "scale(1.04)" }]
    }
  };

  const buttons = ["next-desayuno", "next-almuerzo", "next-tapa", "next-plato"];
  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  async function runCellLoop(img, idx) {
    const dir = img.dataset.direction || "fade";
    const anim = anims[dir] || anims.fade;
    const buttonId = buttons[idx];

    while (true) {
      img.style.opacity = 0;
      await img.animate(anim.in, { duration: IN_DURATION, easing: "ease-out", fill: "forwards" }).finished;
      await wait(VISIBLE_MS);
      await img.animate(anim.out, { duration: OUT_DURATION, easing: "ease-in", fill: "forwards" }).finished;

      const btn = document.getElementById(buttonId);
      if (btn) btn.click();
      await wait(50);
    }
  }

  setTimeout(() => {
    document.querySelectorAll(".carousel-item-img")
      .forEach((img, idx) => runCellLoop(img, idx));
  }, START_DELAY);
})();

