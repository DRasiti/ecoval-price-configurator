const template = document.createElement("template");

// up arrow &#129169;
// down arrow &#x1F893;
template.innerHTML = `
  <style>
    .search-dropdown-container {
      position: relative;
    }
    .search-dropdown-field {
      display: flex;
      position: relative;
      border: 1px solid gray;
      width: fit-content;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
      background-color: white;
    }
    .search-dropdown-field::after {
      /*content: "\u2BC6";*/
      content: "";
      display: block;
      height: 4px;
      width: 4px;
      border-radius: 2px;
      border: 2px solid;
      border-color: transparent gray gray transparent;
      /*transform: rotate(-135deg);
      margin-top: 7px;*/
      transform: rotate(45deg);
      margin-top: 3px;
      margin-left: 15px;
    }
    .search-dropdown-content {
      background-color: white;
      border: 1px solid gray;
      width: fit-content;
      position: absolute;
      display: none;
      z-index: 1;
    }
    .search-dropdown-content.open {
      display: block;
    }
    .search-dropdown-input-container {
      position: relative;
      padding: 15px;
    }
    .search-dropdown-input-container > svg.search-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 10px;
    }
    .search-dropdown-input-container > svg.clear-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
      cursor: pointer;
      color: #c8c8c8;
    }
    .search-dropdown-input-container > svg.clear-button:hover {
      color: black;
    }
    .search-dropdown-input {
      all: unset;
      border: 1px solid gray;
      padding: 10px 30px 10px 40px;
      border-radius: 5px;
      width: 100%;
      box-sizing: border-box;
    }
    .search-dropdown-options {
      max-height: 250px;
      overflow: auto;
      -ms-overflow-style: none;  /* Internet Explorer 10+ */
      scrollbar-width: none;  /* Firefox, Safari 18.2+, Chromium 121+ */
      user-select: none;
    }
    .search-dropdown-options::-webkit-scrollbar { 
      display: none;  /* Older Safari and Chromium */
    }
    .search-dropdown-option {
      padding: 10px 15px;
      cursor: pointer;
    } 
    .search-dropdown-option.hide {
      display: none;
    }
    .search-dropdown-option:hover,
    .search-dropdown-option.selected {
      background-color: rgba(0, 0, 0, 0.05); /* rgba(227, 6, 19, 0.05); */
    }
    .search-dropdown-option div:nth-child(1) {
      font-weight: bold;
    }
    .search-dropdown-option div:nth-child(2) {
      font-style: italic;
      color: gray;
      font-size: 0.9rem;
    }
    .hide {
      display: none;
    }
    .reset-button {
      position: absolute;
      left: -12px;
      top: -12px;
      z-index: 1;
      cursor: pointer;
      color: hsl(356, 95%, 46%);
    }
  </style>
  <div class="search-dropdown-container">
    <div class="reset-button hide">
      <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentcolor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Close</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Close"> <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24"> </rect> <line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="currentcolor" stroke-width="2" stroke-linecap="round"> </line> <line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="currentcolor" stroke-width="2" stroke-linecap="round"> </line> </g> </g> </g></svg>
    </div>
    <div class="search-dropdown-field" tabindex="0">
      <div class="search-dropdown-selected-value">Default selected value</div>
    </div>
    <div class="search-dropdown-content" tabindex="0">
      <div class="search-dropdown-input-container">
        <svg class="search-icon" fill="#c0c0c0" width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>ionicons-v5-f</title><path d="M464,428,339.92,303.9a160.48,160.48,0,0,0,30.72-94.58C370.64,120.37,298.27,48,209.32,48S48,120.37,48,209.32s72.37,161.32,161.32,161.32a160.48,160.48,0,0,0,94.58-30.72L428,464ZM209.32,319.69A110.38,110.38,0,1,1,319.69,209.32,110.5,110.5,0,0,1,209.32,319.69Z"></path></g></svg>
        <input class="search-dropdown-input" type="text" />
        <svg class="clear-button hide" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentcolor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Close</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Close"> <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24"> </rect> <line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="currentcolor" stroke-width="2" stroke-linecap="round"> </line> <line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="currentcolor" stroke-width="2" stroke-linecap="round"> </line> </g> </g> </g></svg>
      </div>
      <div class="search-dropdown-options"></div>
    </div>
  </div>
`;

// Create a class for the element
export default class SearchDropdown extends HTMLElement {
  constructor() {
    super();
    this.value = 0;
    this.name = '';
    this.searchValue = "";
    this.selectedOption = null;
    this.defaultText = "Select an option";

    this.appendChild(template.content.cloneNode(true));
    
    // or
    
    // const shadowRoot = this.attachShadow({ mode: "closed" });
    // shadowRoot.append(template.content.cloneNode(true));
  }

  connectedCallback() {
    // console.log("Element added to the DOM");
    this.optionsContainer = this.querySelector(".search-dropdown-options");
	  this.selectedValueContainer = this.querySelector(".search-dropdown-selected-value");
	  this.container = this.querySelector(".search-dropdown-container");

    this.dropdownField = this.querySelector(".search-dropdown-field");
    this.dropdownContent = this.querySelector(".search-dropdown-content");
    this.dropdownOptionsContainer = this.querySelector(".search-dropdown-options");
    this.searchInput = this.querySelector(".search-dropdown-input");
    this.clearButton = this.querySelector(".clear-button");
    this.resetButton = this.querySelector(".reset-button");
    this.dropdownOptions = null;
    this.selectedValueContainer.textContent = this.defaultText;
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
    return ["data", "placeholder"];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    // console.log("Element attributes changed");
    if(attributeName === "data") this._fillDropdown(newValue);
    if(attributeName === "placeholder") this.defaultText = newValue;
  }

  emit(type, detail = {}) {
    // console.log("TOGGLE BUTTON: emmit");
    const event = new CustomEvent(`${type}`, {
      bubbles: true,
      detail: detail
    });

    return this.dispatchEvent(event);
  }

  _fillDropdown(data) {
    const options = JSON.parse(data);
    this.dropdownOptionsContainer.innerHTML = "";

    options.forEach((option, index) => {
      const optionContainer = document.createElement("div");
      // optionContainer.id = `option-id-${index}`;
      optionContainer.classList.add("search-dropdown-option");
      optionContainer.dataset.value = option.price;
      
      const nameDiv = document.createElement("div");
      nameDiv.textContent = option.name;
      
      const priceDiv = document.createElement("div");
      priceDiv.textContent = `${option.price}.-`;
      priceDiv.dataset.price = option.price;

      optionContainer.appendChild(nameDiv);
      optionContainer.appendChild(priceDiv);

      this.dropdownOptionsContainer.appendChild(optionContainer);
    })

    this.dropdownOptions = this.querySelectorAll(".search-dropdown-option");
    
    this._addOptionClickEvents();
  }
  /*btnClickListener(e) {
    // console.log("Card clicked!");
    const cardClick = new CustomEvent('card-click', {
      bubbles: true,
      detail: {
        info: `Titre: "${this.querySelector(".card-c-title").textContent}"`
      }
    });

    this.dispatchEvent(cardClick);
  }*/

  _addEvents() {
    this.refWindowClick = this._handleWindowClick.bind(this);
    window.addEventListener("click", this.refWindowClick);

    // this._addOptionClickEvents();

    this.refSearchInput = this._handleSearchInput.bind(this);
    this.searchInput.addEventListener("input", this.refSearchInput);

    this.refClearClick = this._handleClearClick.bind(this);
    this.clearButton.addEventListener("click", this.refClearClick);

    this.refResetClick = this._handleResetClick.bind(this);
    this.resetButton.addEventListener("click", this.refResetClick);

    this.refKeyboardEvents = this._handleKeyboardEvents.bind(this);
    this.dropdownContent.addEventListener('keyup', this.refKeyboardEvents);

    this.refDropdownField = this._handleKeyboardDropdown.bind(this);
    this.dropdownField.addEventListener('keyup', this.refDropdownField);
  }

  _removeEvents() {
    window.removeEventListener("click", this.refWindowClick);

    Array.prototype.forEach.call(this.dropdownOptions, (option) => {
      option.removeEventListener("click", this._handleDropdownOptionClick.bind(this))
    });

    this.searchInput.removeEventListener("input", this.refSearchInput);

    this.clearButton.removeEventListener("click", this.refClearClick);
  }

  _handleWindowClick(e) {
    if(this.dropdownContent.classList.contains("open")) {
      if(!this.dropdownContent.contains(e.target)) {
        this._closeDropdown();
      }
    } else if(this.dropdownField.contains(e.target)) {
      this._openDropdown();
    }
  }

  _addOptionClickEvents() {
    Array.prototype.forEach.call(this.dropdownOptions, (option) => {
      option.addEventListener("click", this._handleDropdownOptionClick.bind(this))
    });
  }

  _handleKeyboardEvents(e) {
    e.preventDefault();

    if(e.code == 'ArrowUp' || e.code == 'ArrowDown' || e.code == 'Enter') {
      let direction = '';
      
      if(e.code == 'ArrowUp') direction = 'up';
      if(e.code == 'ArrowDown') direction = 'down';
      let options = [...this.dropdownOptions];
      options = options.filter((option) => option.classList.contains("hide") == false);

      let selectedOption = options.indexOf(this.dropdownOptionsContainer.querySelector('.selected'));
      
      // if(selectedOption == -1) selectedOption = 0;

      if(direction == 'up') {
        if(selectedOption == 0 || selectedOption == -1) {
          selectedOption = 0;
        } else {
          selectedOption -= 1;
        }
      }

      if(direction == 'down') {
        if(selectedOption == -1) {
          selectedOption = 0;
        } else if(selectedOption == (options.length - 1)) {
          selectedOption = options.length - 1;
        } else {
          selectedOption += 1;
        }
      }

      if(selectedOption != -1) this._selectOption(options[selectedOption]);

      if(direction == 'up') this.dropdownOptions[selectedOption].scrollIntoView({ behavior: "smooth", block: "start" });
      if(direction == 'down') this.dropdownOptions[selectedOption].scrollIntoView({ behavior: "smooth", block: "end" });

      if(e.code == 'Enter' && selectedOption != -1) {
        options[selectedOption].click();
      }
    }

    if(e.code == 'Escape') {
      this._closeDropdown();
    }
  }

  _handleKeyboardDropdown(e) {
    e.preventDefault();

    if(e.code == 'Space') {
      if(!this.dropdownContent.classList.contains("open")) {
        this._openDropdown();
      } else {
        this._closeDropdown();
      }
    }
    if(e.code == 'Escape') {
      this._closeDropdown();
    }
  }

  _handleSearchInput(e) {
    this.searchValue = e.currentTarget.value;
    if(this.searchValue.length > 0) {
      this.clearButton.classList.remove('hide');
    }
    this._filterSearch(this.searchValue);
  }

  _handleClearClick(e) {
    this._showAllOptions();
    this.searchInput.value = "";
    this.clearButton.classList.add("hide");
    this.searchInput.focus();
  }

  _handleResetClick(e) {
    this._showAllOptions();
    this.searchInput.value = "";
    this.value = 0;
    this.clearButton.classList.add("hide");
    this.resetButton.classList.add("hide");

    this.selectedValueContainer.textContent = this.defaultText;
    if(this.selectedOption) {
      this.selectedOption.classList.remove("selected");
    }

    this.emit("select", {
      name: this.selectedOption.children[0].textContent,
      value: this.value
    });
  }

  _openDropdown() {
    this.dropdownContent.classList.add("open");
    this.searchInput.value = "";
    this.searchInput.focus();

    this._showAllOptions();

    this.clearButton.classList.add("hide");
  }

  _closeDropdown() {
    this.dropdownContent.classList.remove("open");
  }

  _handleDropdownOptionClick(e) {
    const option = e.currentTarget;
    this.selectedValueContainer.textContent = option.querySelector("div:first-child").textContent;
    this.value = +option.dataset.value;
    this.name = option.children[0].textContent;
    this._selectOption(option);
    this._closeDropdown();
    
    this.emit("select", {
      name: this.selectedOption.children[0].textContent,
      value: this.value
    });

    this.resetButton.classList.remove("hide");
  }

  _selectOption(option) {
    Array.prototype.forEach.call(this.dropdownOptions, (dropdownOption) => {
      dropdownOption.classList.remove("selected")
    });
    option.classList.add("selected");
    this.selectedOption = option;
  }

  _filterSearch(filterValue) {    
    // Escape filter value
    filterValue = filterValue.replace(/\\/g, '\\\\'); // Escape \ (backslashes)
    filterValue = filterValue.replace(/([\*\(\)\.\$\^\?\[\]])/g, "\\$1"); // Escape *, (, ), ., $, ^, ?, [, ]
    filterValue = filterValue.toLowerCase();
    
    let words = filterValue.trim().split(' '),
      word,
      regExWords = '',
      regEx,
      AND = '',
      OR = '|';
    
    for(let i = 0, length = words.length; i < length; i++) {		
      regExWords += '(?=.*' + words[i] + ')' + AND; // Allow the search of multiple words in any order in a string
    }
    
    //regExWords = regExWords.substr(0, regExWords.length - 1); // uncomment for OR
    
    regExWords += '.*'; // Allow the search of multiple words in any order in a string
    
    regEx = new RegExp(regExWords, 'i');
    
    this._filterOptions(regEx);
  }

  _filterOptions(regEx) {
    let foundOptions = [];
    
    let optionTexts = [];
    [].forEach.call(this.dropdownOptions, (option, rIndex, rArray) => {
      let text = option.querySelector("div:first-child").textContent.toLowerCase();
      
      optionTexts.push({
        option: option,
        text: text.trim()
      });
    });
    
    for (let i = 0, length = optionTexts.length; i < length; i++) {
      let index = optionTexts[i].text.search(regEx);
      
      if (index != -1) {
        foundOptions.push(optionTexts[i].option);
      }
    }
    
    this._displayResult(foundOptions);
  }

  _displayResult(foundOptions) {
    this._hideOptions();
    foundOptions.forEach((option) => {
      option.classList.remove("hide");
    });
  }

  _showAllOptions() {
    Array.prototype.forEach.call(this.dropdownOptions, (option) => {
      option.classList.remove('hide');
    });
  }

  _hideOptions() {
    Array.prototype.forEach.call(this.dropdownOptions, (option) => {
      option.classList.add('hide');
    });
  }

  reset() {
    this.value = 0;
    this.searchValue = "";

    this.selectedValueContainer.textContent = this.defaultText;
    if(this.selectedOption) {
      this.selectedOption.classList.remove("selected");
    }

    this.resetButton.classList.add("hide");
  }
}

customElements.define('search-dropdown', SearchDropdown);