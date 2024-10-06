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
    this.max = 10;
  }

  static get properties() {
    return {
      title: { type: String },
      count: { type: Number },
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
        }
        div {
          padding: 0;
          margin: 0;
        }
      `,
    ];
  }

  increment(e) {
    if (this.count < this.max) {
      this.count++;
    }
  }

  decrement(e) {
    if (this.count > 0) {
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
    if (changedProperties.has("count")) 
      {
      if (this.count > 0 && this.count <= this.max) 
        {
        this.makeItRain();
      }
    }
  }

  render() {
    return html`
      <div class="wrapper">
        <confetti-container id="confetti"></confetti-container>
        <div class="number">${this.count}</div>
        <div class="buttons">
          <button title="decrement" @click=${this.decrement}>-</button>
          <button title="increment" @click=${this.increment}>+</button>
        </div>
      </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);