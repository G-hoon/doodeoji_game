class MoleObject extends HTMLElement {
    root: ShadowRoot;

    constructor() {
      super();
      this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.root.innerHTML = `
            <div class="cell">
                <div class="hole"></div>
                <div class="mole hidden"></div>
                <div class="hole"></div>
            </div>
        `;
    }
}

customElements.define('mole-object', MoleObject);
