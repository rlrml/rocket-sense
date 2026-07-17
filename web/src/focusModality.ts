/* Records whether focus is currently being driven by the pointer or the
   keyboard, as data-modality on <html>. styles.css uses it to draw the focus
   ring only for keyboard users — see the focus policy note there for why the
   ring can't simply be left to :focus-visible. */

type Modality = "pointer" | "keyboard";

function setModality(modality: Modality) {
  document.documentElement.dataset.modality = modality;
}

export function installFocusModality() {
  // Capture, so a handler that stops propagation can't hide the interaction.
  window.addEventListener("pointerdown", () => setModality("pointer"), true);

  window.addEventListener(
    "keydown",
    (event) => {
      // Tab is the only way to reach a new control by keyboard, which makes it
      // the whole signal. Keys that act on the already-focused element are not:
      // arrowing through an open <select> that was opened by mouse shouldn't
      // suddenly ring it, and Escape closing a dialog shouldn't ring whatever
      // the dialog hands focus back to.
      if (event.key !== "Tab") return;
      setModality("keyboard");
    },
    true,
  );
}
