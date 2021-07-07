class MoleObject extends HTMLElement {
  // ToDo: css code into this custom component with shadow root
  connectedCallback() {
    this.innerHTML = `
      <div class="cell">
          <div class="hole"></div>
          <div class="mole hidden"></div>
          <div class="hole_front"></div>
      </div>
    `;
  }
}

customElements.define('mole-object', MoleObject);
