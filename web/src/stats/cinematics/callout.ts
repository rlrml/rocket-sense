// The mistake-callout textbox + SVG leader line, plus the rewind wash — 2D
// DOM overlays positioned over the clip canvas (port of viewer.js's
// `_mistakeCalloutBox` / `_mistakeCalloutSvg` / `_rewindOverlay` and the
// layout half of `_updateMistakeCallout`). Styling lives in styles.css under
// `.aw-callout-*` / `.aw-rewind-overlay` so type tokens and theming stay
// centralized; the box offsets below are scaled down from RLVision's
// full-screen viewer to this compact clip canvas.

const SVG_NS = "http://www.w3.org/2000/svg";

// RLVision used 240/100 with ±130/−110 offsets on a full-screen canvas; the
// event clip canvas is ~360×208, so everything is roughly halved.
const BOX_MAX_W = 200;
const BOX_EST_H = 72;
const OFFSET_X = 56;
const OFFSET_Y = -52;

export interface CalloutUpdate {
  text: string;
  /** Border/leader-line color (per-kind mistake color or team color). */
  color: string;
  /** Anchor in canvas CSS pixels, or null for the fixed corner fallback. */
  anchor: { x: number; y: number } | null;
  /** Hide the leader-line tip dot (bird's-eye: the ring is the anchor). */
  dotHidden: boolean;
  width: number;
  height: number;
}

export class CalloutOverlay {
  private readonly box: HTMLDivElement;
  private readonly message: HTMLDivElement;
  private readonly svg: SVGSVGElement;
  private readonly line: SVGLineElement;
  private readonly dot: SVGCircleElement;
  private readonly rewind: HTMLDivElement;

  constructor(private readonly container: HTMLElement) {
    this.box = document.createElement("div");
    this.box.className = "aw-callout-box";
    this.box.style.display = "none";
    this.message = document.createElement("div");
    this.box.appendChild(this.message);

    this.svg = document.createElementNS(SVG_NS, "svg");
    this.svg.setAttribute("class", "aw-callout-svg");
    this.svg.style.display = "none";
    this.line = document.createElementNS(SVG_NS, "line");
    this.line.setAttribute("stroke-width", "2");
    this.line.setAttribute("stroke-dasharray", "5,4");
    this.svg.appendChild(this.line);
    this.dot = document.createElementNS(SVG_NS, "circle");
    this.dot.setAttribute("r", "4");
    this.svg.appendChild(this.dot);

    this.rewind = document.createElement("div");
    this.rewind.className = "aw-rewind-overlay";
    this.rewind.style.display = "none";
    this.rewind.innerHTML =
      `<svg viewBox="0 0 64 48" width="52" height="39">` +
      `<polygon points="30,4 30,44 4,24" fill="#ffffff"></polygon>` +
      `<polygon points="60,4 60,44 34,24" fill="#ffffff"></polygon>` +
      `</svg>`;

    container.appendChild(this.svg);
    container.appendChild(this.box);
    container.appendChild(this.rewind);
  }

  update(input: CalloutUpdate): void {
    const { width: w, height: h } = input;
    this.message.textContent = input.text;
    this.box.style.borderColor = input.color;
    this.box.style.boxShadow = `0 0 12px ${input.color}73`;
    this.line.setAttribute("stroke", input.color);
    this.dot.setAttribute("fill", input.color);

    let boxX: number;
    let boxY: number;
    if (input.anchor) {
      const { x: sx, y: sy } = input.anchor;
      boxX = sx + OFFSET_X;
      if (boxX + BOX_MAX_W + 8 > w) boxX = sx - OFFSET_X - BOX_MAX_W;
      if (boxX < 6) boxX = 6;
      boxY = sy + OFFSET_Y;
      if (boxY < 6) boxY = sy + Math.abs(OFFSET_Y);
      if (boxY + BOX_EST_H > h) boxY = h - BOX_EST_H;
    } else {
      boxX = Math.max(6, w - BOX_MAX_W - 12);
      boxY = 10;
    }
    this.box.style.left = `${boxX}px`;
    this.box.style.top = `${boxY}px`;
    this.box.style.display = "block";

    if (!input.anchor) {
      this.svg.style.display = "none";
      return;
    }
    const boxRect = this.box.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    const boxLeft = boxRect.left - containerRect.left;
    const boxTop = boxRect.top - containerRect.top;
    const cx = boxLeft + boxRect.width / 2;
    const lineEndX = input.anchor.x < cx ? boxLeft : boxLeft + boxRect.width;
    const lineEndY = boxTop + boxRect.height / 2;
    this.line.setAttribute("x1", String(input.anchor.x));
    this.line.setAttribute("y1", String(input.anchor.y));
    this.line.setAttribute("x2", String(lineEndX));
    this.line.setAttribute("y2", String(lineEndY));
    this.dot.setAttribute("cx", String(input.anchor.x));
    this.dot.setAttribute("cy", String(input.anchor.y));
    this.dot.style.display = input.dotHidden ? "none" : "";
    this.svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    this.svg.style.display = "block";
  }

  hide(): void {
    this.box.style.display = "none";
    this.svg.style.display = "none";
  }

  setRewindVisible(visible: boolean): void {
    this.rewind.style.display = visible ? "flex" : "none";
  }

  dispose(): void {
    this.box.remove();
    this.svg.remove();
    this.rewind.remove();
  }
}
