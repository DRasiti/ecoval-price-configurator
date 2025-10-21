const template = document.createElement("template");

// up arrow &#129169;
// down arrow &#x1F893;
// #e30613
template.innerHTML = `
  <style>
    .container {
      display: inline-block;
    }
    .toggle {
      display:flex;
      position:relative;
      width:7.5rem;
      height:2.5rem; 
      background:white;
      align-self:center;
      user-select:none;
      border: 1px solid black;
      border-radius: 5px;
    }
    .toggle:after, .toggle:before {
      flex:1;
      text-align:center;
      line-height:2.5rem;
    }
    .toggle:after {
      content: attr(data-on-text);
    }
    .toggle:before {
      content: attr(data-off-text);
    }

    input { display:none; }

    label {
      position:absolute;
      top:0; left:0; right:0; bottom:0;
      perspective:1000; 
      cursor:pointer;
    }

    .card {
      position:relative;
      background:limegreen;
      transition:.4s;
      width:50%;
      height:2.5rem;
      pointer-events:none;
    }

    input:checked + label .card { background:tomato; }

    .slide { overflow:hidden; }
    .slide .card {
      transform:translate(0);
      background:transparent;
      box-shadow:
        -3.75rem 0 #06e35bff,
        3.75rem 0 #e30613;
    }
    .slide input:checked + label .card {
      transform:translateX(3.75rem);
      background:transparent;
    }
  </style>

  <div class="container">
    <div class="toggle slide" data-on-text="OUI" data-off-text="NON" tabindex="0">
      <input id="d" type="checkbox" />
      <label for="d">
        <div class="card"></div>    
      </label>
    </div>
  </div>
`;

// Create a class for the element
export default class SwitchButton extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));
    // console.log("TOGGLE BUTTON: constructor", this.checked);
    let id = this._uuidv4();
    this.querySelector("input").setAttribute("id", `id-${id}`);
    this.querySelector("label").setAttribute("for", `id-${id}`);
    // or
    
    // const shadowRoot = this.attachShadow({ mode: "closed" });
    // shadowRoot.append(template.content.cloneNode(true));
  }

  connectedCallback() {
    // console.log("Element added to the DOM");
    this.toggleContainer = this.querySelector('.toggle');
    this.toggleButton = this.querySelector("input");
    // console.log("TOGGLE BUTTON: connectedCallback", this.checked);
    this.toggleButton.checked = this.checked;
    
    this._addEvents();
  }

  disconnectedCallback() {
    // console.log("Element removed from the DOM");
    this._removeEvents();
  }

  adoptedCallback() {
    // console.log("Element moved to new page");
  }

  static get observedAttributes() {
    return ["checked", "value"];
  }
  get checked() {
    // console.log("TOGGLE BUTTON: get checked:", this.getAttribute("checked"));
    return this.getAttribute("checked") == "" || this.getAttribute("checked") == "true" ? true : false;
    // return this.getAttribute("checked");
  }
  set checked(value) {
    // console.log("TOGGLE BUTTON: set checked:", value);
    this.setAttribute("checked", value);
  }
  get value() {
    return +this.getAttribute("value");
  }
  set value(value) {
    this.setAttribute("value", value);
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    // console.log("Element attributes changed");
    // console.log("TOGGLE BUTTON: attributeChangedCallback", oldValue, newValue);
    // this.toggleButton.checked = attributeName == "checked" ? true : false;
  }

  _uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, 
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  _addEvents() {
    // console.log("TOGGLE BUTTON: _addEvents");
    this.refToggleButtonHandler = this._toggleButtonHandler.bind(this);
    this.toggleButton.addEventListener("change", this.refToggleButtonHandler);

    this.refToggleButtonKeyboardHandler = this._toggleButtonKeyboardHandler.bind(this);
    this.toggleContainer.addEventListener("keyup", this.refToggleButtonKeyboardHandler);
  }

  _removeEvents() {
    // console.log("TOGGLE BUTTON: _removeEvents");
    this.toggleButton.removeEventListener("change", this.refToggleButtonHandler);
  }

  _toggleButtonHandler(e) {
    // console.log("TOGGLE BUTTON: _toggleButtonHandler", this.toggleButton.checked);
    // console.log('CLICK', this.toggleButton.checked);
    this.checked = this.toggleButton.checked;
    // console.log(this.checked, "==", this.toggleButton.checked);
    // Add change event to the component
    this.emit("switch", {
      checked: this.checked,
      value: this.value
    });
  }

  _toggleButtonKeyboardHandler(e) {
    e.preventDefault();

    if(e.code == "Space") {
      this.toggleButton.click();
    }
  }

  emit(type, detail = {}) {
    // console.log("TOGGLE BUTTON: emmit");
    const event = new CustomEvent(`${type}`, {
      bubbles: true,
      detail: detail
    });

    return this.dispatchEvent(event);
  }

  reset() {
    this.toggleButton.checked = false;
    this.checked = false;
  }
}

customElements.define('switch-button', SwitchButton);