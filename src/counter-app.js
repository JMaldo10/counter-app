import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {
  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.count = 0;
    this.min = 10;
    this.max = 25;
  }

  static get properties() {
    return {
      title: { type: String },
      count: { type: Number },
      min: { type: Number },
      max: { type: Number },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
          font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
          text-align: center;
        }
        .number {
          font-size: 3em;
          margin-bottom: var(--ddd-spacing-4);
        }
        .buttons {
          display: flex;
          justify-content: center;
          gap: var(--ddd-spacing-4);
        }
        button {
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
          font-size: 1.5em;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        button:focus {
          outline: none;
          border: 2px solid var(--ddd-theme-primary);
        }
      `,
    ];
  }

  increment() {
    if (this.count < this.max) {
      this.count++;
    }
  }

  decrement() {
    if (this.count > this.min) {
      this.count--;
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then((module) => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  updated(changedProperties) {
    if (changedProperties.has("count")) {
      if (this.count === this.max || this.count === this.min) {
        this.requestUpdate();
      }
      if (this.count === 21) {
        this.makeItRain();
      }
    }
  }

  render() {
    const numberStyle = this.count >= 21
      ? 'color: red;'
      : this.count <= this.min || this.count >= this.max
      ? 'color: orange;'
      : '';

    return html`
      <div class="wrapper">
        <confetti-container id="confetti"></confetti-container>
        <div class="number" style="${numberStyle}">${this.count}</div>
        <div class="buttons">
          <button @click=${this.decrement} ?disabled="${this.count <= this.min}">-</button>
          <button @click=${this.increment} ?disabled="${this.count >= this.max}">+</button>
        </div>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);