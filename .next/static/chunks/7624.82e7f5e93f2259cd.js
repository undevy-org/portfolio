"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7624],{60622:(e,t,i)=>{var o=i(28312),n=i(745);i(25322),i(48252),i(98750),i(43804);var a=i(97265),r=i(54166);i(89556);let s=(0,o.AH)`
  :host {
    display: block;
  }

  :host > button,
  :host > wui-flex {
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-1xs);
    height: 40px;
    border-radius: var(--wui-border-radius-l);
    background: var(--wui-color-gray-glass-002);
    border-width: 0px;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
  }

  :host > button wui-image {
    width: 24px;
    height: 24px;
    border-radius: var(--wui-border-radius-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`;var l=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let u=class extends o.WF{constructor(){super(...arguments),this.text="",this.loading=!1}render(){return this.loading?(0,o.qy)` <wui-flex alignItems="center" gap="xxs" padding="xs">
        <wui-shimmer width="24px" height="24px"></wui-shimmer>
        <wui-shimmer width="40px" height="20px" borderRadius="4xs"></wui-shimmer>
      </wui-flex>`:(0,o.qy)`
      <button>
        ${this.tokenTemplate()}
        <wui-text variant="paragraph-600" color="fg-100">${this.text}</wui-text>
      </button>
    `}tokenTemplate(){return this.imageSrc?(0,o.qy)`<wui-image src=${this.imageSrc}></wui-image>`:(0,o.qy)`
      <wui-icon-box
        size="sm"
        iconColor="fg-200"
        backgroundColor="fg-300"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};u.styles=[a.W5,a.fD,s],l([(0,n.MZ)()],u.prototype,"imageSrc",void 0),l([(0,n.MZ)()],u.prototype,"text",void 0),l([(0,n.MZ)({type:Boolean})],u.prototype,"loading",void 0),u=l([(0,r.E)("wui-token-button")],u)},97624:(e,t,i)=>{i.r(t),i.d(t,{W3mSwapPreviewView:()=>E,W3mSwapSelectTokenView:()=>z,W3mSwapView:()=>C});var o=i(28312),n=i(745),a=i(18227),r=i(19628),s=i(11076),l=i(90906),u=i(35331),c=i(35558),p=i(33806),d=i(32836),w=i(54846),h=i(52515);i(54279),i(98160),i(21330),i(22724);var g=i(45312),k=i(76610);i(37054),i(21457);let x=(0,o.AH)`
  :host {
    width: 100%;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    cursor: pointer;
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    padding-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-1xs);
    border-radius: calc(var(--wui-border-radius-5xs) + var(--wui-border-radius-4xs));
    background: var(--wui-color-gray-glass-002);
  }

  .details-row-title {
    white-space: nowrap;
  }

  .details-row.provider-free-row {
    padding-right: var(--wui-spacing-xs);
  }
`;var m=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let b=k.oU.CONVERT_SLIPPAGE_TOLERANCE,f=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.networkName=l.W.state.activeCaipNetwork?.name,this.detailsOpen=!1,this.sourceToken=u.GN.state.sourceToken,this.toToken=u.GN.state.toToken,this.toTokenAmount=u.GN.state.toTokenAmount,this.sourceTokenPriceInUSD=u.GN.state.sourceTokenPriceInUSD,this.toTokenPriceInUSD=u.GN.state.toTokenPriceInUSD,this.priceImpact=u.GN.state.priceImpact,this.maxSlippage=u.GN.state.maxSlippage,this.networkTokenSymbol=u.GN.state.networkTokenSymbol,this.inputError=u.GN.state.inputError,this.unsubscribe.push(u.GN.subscribe(e=>{this.sourceToken=e.sourceToken,this.toToken=e.toToken,this.toTokenAmount=e.toTokenAmount,this.priceImpact=e.priceImpact,this.maxSlippage=e.maxSlippage,this.sourceTokenPriceInUSD=e.sourceTokenPriceInUSD,this.toTokenPriceInUSD=e.toTokenPriceInUSD,this.inputError=e.inputError}))}render(){let e=this.toTokenAmount&&this.maxSlippage?a.S.bigNumber(this.toTokenAmount).minus(this.maxSlippage).toString():null;if(!this.sourceToken||!this.toToken||this.inputError)return null;let t=this.sourceTokenPriceInUSD&&this.toTokenPriceInUSD?1/this.toTokenPriceInUSD*this.sourceTokenPriceInUSD:0;return(0,o.qy)`
      <wui-flex flexDirection="column" alignItems="center" gap="1xs" class="details-container">
        <wui-flex flexDirection="column">
          <button @click=${this.toggleDetails.bind(this)}>
            <wui-flex justifyContent="space-between" .padding=${["0","xs","0","xs"]}>
              <wui-flex justifyContent="flex-start" flexGrow="1" gap="xs">
                <wui-text variant="small-400" color="fg-100">
                  1 ${this.sourceToken.symbol} =
                  ${a.S.formatNumberToLocalString(t,3)}
                  ${this.toToken.symbol}
                </wui-text>
                <wui-text variant="small-400" color="fg-200">
                  $${a.S.formatNumberToLocalString(this.sourceTokenPriceInUSD)}
                </wui-text>
              </wui-flex>
              <wui-icon name="chevronBottom"></wui-icon>
            </wui-flex>
          </button>
          ${this.detailsOpen?(0,o.qy)`
                <wui-flex flexDirection="column" gap="xs" class="details-content-container">
                  ${this.priceImpact?(0,o.qy)` <wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Price impact
                            </wui-text>
                            <w3m-tooltip-trigger
                              text="Price impact reflects the change in market price due to your trade"
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${a.S.formatNumberToLocalString(this.priceImpact,3)}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  ${this.maxSlippage&&this.sourceToken.symbol?(0,o.qy)`<wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Max. slippage
                            </wui-text>
                            <w3m-tooltip-trigger
                              text=${`Max slippage sets the minimum amount you must receive for the transaction to proceed. ${e?`Transaction will be reversed if you receive less than ${a.S.formatNumberToLocalString(e,6)} ${this.toToken.symbol} due to price changes.`:""}`}
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${a.S.formatNumberToLocalString(this.maxSlippage,6)}
                              ${this.toToken.symbol} ${b}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  <wui-flex flexDirection="column" gap="xs">
                    <wui-flex
                      justifyContent="space-between"
                      alignItems="center"
                      class="details-row provider-free-row"
                    >
                      <wui-flex alignItems="center" gap="xs">
                        <wui-text class="details-row-title" variant="small-400" color="fg-150">
                          Provider fee
                        </wui-text>
                      </wui-flex>
                      <wui-flex>
                        <wui-text variant="small-400" color="fg-200">0.85%</wui-text>
                      </wui-flex>
                    </wui-flex>
                  </wui-flex>
                </wui-flex>
              `:null}
        </wui-flex>
      </wui-flex>
    `}toggleDetails(){this.detailsOpen=!this.detailsOpen}};f.styles=[x],m([(0,n.wk)()],f.prototype,"networkName",void 0),m([(0,n.MZ)()],f.prototype,"detailsOpen",void 0),m([(0,n.wk)()],f.prototype,"sourceToken",void 0),m([(0,n.wk)()],f.prototype,"toToken",void 0),m([(0,n.wk)()],f.prototype,"toTokenAmount",void 0),m([(0,n.wk)()],f.prototype,"sourceTokenPriceInUSD",void 0),m([(0,n.wk)()],f.prototype,"toTokenPriceInUSD",void 0),m([(0,n.wk)()],f.prototype,"priceImpact",void 0),m([(0,n.wk)()],f.prototype,"maxSlippage",void 0),m([(0,n.wk)()],f.prototype,"networkTokenSymbol",void 0),m([(0,n.wk)()],f.prototype,"inputError",void 0),f=m([(0,h.EM)("w3m-swap-details")],f),i(13998);let v=(0,o.AH)`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    position: relative;
  }

  wui-shimmer.market-value {
    opacity: 0;
  }

  :host > wui-flex > svg.input_mask {
    position: absolute;
    inset: 0;
    z-index: 5;
  }

  :host wui-flex .input_mask__border,
  :host wui-flex .input_mask__background {
    transition: fill var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: fill;
  }

  :host wui-flex .input_mask__border {
    fill: var(--wui-color-gray-glass-020);
  }

  :host wui-flex .input_mask__background {
    fill: var(--wui-color-gray-glass-002);
  }
`;var y=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let T=class extends o.WF{constructor(){super(...arguments),this.target="sourceToken"}render(){return(0,o.qy)`
      <wui-flex class justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
          gap="xxs"
        >
          <wui-shimmer width="80px" height="40px" borderRadius="xxs" variant="light"></wui-shimmer>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}templateTokenSelectButton(){return(0,o.qy)`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-shimmer width="80px" height="40px" borderRadius="3xl" variant="light"></wui-shimmer>
      </wui-flex>
    `}};T.styles=[v],y([(0,n.MZ)()],T.prototype,"target",void 0),T=y([(0,h.EM)("w3m-swap-input-skeleton")],T);let S={numericInputKeyDown(e,t,i){let o=e.metaKey||e.ctrlKey,n=e.key,a=n.toLocaleLowerCase(),r=","===n,s="."===n,l=n>="0"&&n<="9";o||"a"!==a&&"c"!==a&&"v"!==a&&"x"!==a||e.preventDefault(),"0"!==t||r||s||"0"!==n||e.preventDefault(),"0"===t&&l&&(i(n),e.preventDefault()),(r||s)&&(t||(i("0."),e.preventDefault()),(t?.includes(".")||t?.includes(","))&&e.preventDefault()),l||["Backspace","Meta","Ctrl","a","A","c","C","x","X","v","V","ArrowLeft","ArrowRight","Tab"].includes(n)||s||r||e.preventDefault()}};i(60622);let $=(0,o.AH)`
  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    position: relative;
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host wui-flex.focus {
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-005);
  }

  :host > wui-flex .swap-input,
  :host > wui-flex .swap-token-button {
    z-index: 10;
  }

  :host > wui-flex .swap-input {
    -webkit-mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  :host > wui-flex .swap-input input {
    background: none;
    border: none;
    height: 42px;
    width: 100%;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -1.28px;
    outline: none;
    caret-color: var(--wui-color-accent-100);
    color: var(--wui-color-fg-100);
    padding: 0px;
  }

  :host > wui-flex .swap-input input:focus-visible {
    outline: none;
  }

  :host > wui-flex .swap-input input::-webkit-outer-spin-button,
  :host > wui-flex .swap-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .max-value-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--wui-color-gray-glass-020);
    padding-left: 0px;
  }

  .market-value {
    min-height: 18px;
  }
`;var N=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let I=class extends o.WF{constructor(){super(...arguments),this.focused=!1,this.price=0,this.target="sourceToken",this.onSetAmount=null,this.onSetMaxValue=null}render(){let e=this.marketValue||"0",t=a.S.bigNumber(e).gt("0");return(0,o.qy)`
      <wui-flex class="${this.focused?"focus":""}" justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
        >
          <input
            data-testid="swap-input-${this.target}"
            @focusin=${()=>this.onFocusChange(!0)}
            @focusout=${()=>this.onFocusChange(!1)}
            ?disabled=${this.disabled}
            .value=${this.value}
            @input=${this.dispatchInputChangeEvent}
            @keydown=${this.handleKeydown}
            placeholder="0"
            type="text"
            inputmode="decimal"
          />
          <wui-text class="market-value" variant="small-400" color="fg-200">
            ${t?`$${a.S.formatNumberToLocalString(this.marketValue,2)}`:null}
          </wui-text>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}handleKeydown(e){return S.numericInputKeyDown(e,this.value,e=>this.onSetAmount?.(this.target,e))}dispatchInputChangeEvent(e){if(!this.onSetAmount)return;let t=e.target.value.replace(/[^0-9.]/gu,"");","===t||"."===t?this.onSetAmount(this.target,"0."):t.endsWith(",")?this.onSetAmount(this.target,t.replace(",",".")):this.onSetAmount(this.target,t)}setMaxValueToInput(){this.onSetMaxValue?.(this.target,this.balance)}templateTokenSelectButton(){return this.token?(0,o.qy)`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-token-button
          data-testid="swap-input-token-${this.target}"
          text=${this.token.symbol}
          imageSrc=${this.token.logoUri}
          @click=${this.onSelectToken.bind(this)}
        >
        </wui-token-button>
        <wui-flex alignItems="center" gap="xxs"> ${this.tokenBalanceTemplate()} </wui-flex>
      </wui-flex>
    `:(0,o.qy)` <wui-button
        data-testid="swap-select-token-button-${this.target}"
        class="swap-token-button"
        size="md"
        variant="accent"
        @click=${this.onSelectToken.bind(this)}
      >
        Select token
      </wui-button>`}tokenBalanceTemplate(){let e=a.S.multiply(this.balance,this.price),t=!!e&&e?.gt(5e-5);return(0,o.qy)`
      ${t?(0,o.qy)`<wui-text variant="small-400" color="fg-200">
            ${a.S.formatNumberToLocalString(this.balance,2)}
          </wui-text>`:null}
      ${"sourceToken"===this.target?this.tokenActionButtonTemplate(t):null}
    `}tokenActionButtonTemplate(e){return e?(0,o.qy)` <button class="max-value-button" @click=${this.setMaxValueToInput.bind(this)}>
        <wui-text color="accent-100" variant="small-600">Max</wui-text>
      </button>`:(0,o.qy)` <button class="max-value-button" @click=${this.onBuyToken.bind(this)}>
      <wui-text color="accent-100" variant="small-600">Buy</wui-text>
    </button>`}onFocusChange(e){this.focused=e}onSelectToken(){d.E.sendEvent({type:"track",event:"CLICK_SELECT_TOKEN_TO_SWAP"}),r.I.push("SwapSelectToken",{target:this.target})}onBuyToken(){r.I.push("OnRampProviders")}};I.styles=[$],N([(0,n.MZ)()],I.prototype,"focused",void 0),N([(0,n.MZ)()],I.prototype,"balance",void 0),N([(0,n.MZ)()],I.prototype,"value",void 0),N([(0,n.MZ)()],I.prototype,"price",void 0),N([(0,n.MZ)()],I.prototype,"marketValue",void 0),N([(0,n.MZ)()],I.prototype,"disabled",void 0),N([(0,n.MZ)()],I.prototype,"target",void 0),N([(0,n.MZ)()],I.prototype,"token",void 0),N([(0,n.MZ)()],I.prototype,"onSetAmount",void 0),N([(0,n.MZ)()],I.prototype,"onSetMaxValue",void 0),I=N([(0,h.EM)("w3m-swap-input")],I);let A=(0,o.AH)`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .action-button {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
  }

  .action-button:disabled {
    border-color: 1px solid var(--wui-color-gray-glass-005);
  }

  .swap-inputs-container {
    position: relative;
  }

  .replace-tokens-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: var(--wui-spacing-1xs);
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-modal-bg-base);
    padding: var(--wui-spacing-xxs);
  }

  .replace-tokens-button-container > button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    padding: var(--wui-spacing-xs);
    border: none;
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: background-color;
    z-index: 20;
  }

  .replace-tokens-button-container > button:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`;var P=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let C=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.initialParams=r.I.state.data?.swap,this.detailsOpen=!1,this.caipAddress=s.U.state.caipAddress,this.caipNetworkId=l.W.state.activeCaipNetwork?.caipNetworkId,this.initialized=u.GN.state.initialized,this.loadingQuote=u.GN.state.loadingQuote,this.loadingPrices=u.GN.state.loadingPrices,this.loadingTransaction=u.GN.state.loadingTransaction,this.sourceToken=u.GN.state.sourceToken,this.sourceTokenAmount=u.GN.state.sourceTokenAmount,this.sourceTokenPriceInUSD=u.GN.state.sourceTokenPriceInUSD,this.toToken=u.GN.state.toToken,this.toTokenAmount=u.GN.state.toTokenAmount,this.toTokenPriceInUSD=u.GN.state.toTokenPriceInUSD,this.inputError=u.GN.state.inputError,this.fetchError=u.GN.state.fetchError,this.lastTokenPriceUpdate=0,this.minTokenPriceUpdateInterval=1e4,this.visibilityChangeHandler=()=>{document?.hidden?(clearInterval(this.interval),this.interval=void 0):this.startTokenPriceInterval()},this.startTokenPriceInterval=()=>{this.interval&&Date.now()-this.lastTokenPriceUpdate<this.minTokenPriceUpdateInterval||(this.lastTokenPriceUpdate&&Date.now()-this.lastTokenPriceUpdate>this.minTokenPriceUpdateInterval&&this.fetchTokensAndValues(),clearInterval(this.interval),this.interval=setInterval(()=>{this.fetchTokensAndValues()},this.minTokenPriceUpdateInterval))},this.watchTokensAndValues=()=>{this.sourceToken&&this.toToken&&(this.subscribeToVisibilityChange(),this.startTokenPriceInterval())},this.onDebouncedGetSwapCalldata=c.w.debounce(async()=>{await u.GN.swapTokens()},200),l.W.subscribeKey("activeCaipNetwork",e=>this.onCaipNetworkChange({newCaipNetwork:e,resetSwapState:!0,initializeSwapState:!1})),s.U.subscribeKey("caipAddress",e=>this.onCaipAddressChange({newCaipAddress:e,resetSwapState:!0,initializeSwapState:!1})),this.unsubscribe.push(l.W.subscribeKey("activeCaipNetwork",e=>this.onCaipNetworkChange({newCaipNetwork:e,resetSwapState:!1,initializeSwapState:!0})),s.U.subscribeKey("caipAddress",e=>this.onCaipAddressChange({newCaipAddress:e,resetSwapState:!1,initializeSwapState:!0})),p.W.subscribeKey("open",e=>{e||u.GN.resetState()}),r.I.subscribeKey("view",e=>{e.includes("Swap")||u.GN.resetValues()}),u.GN.subscribe(e=>{this.initialized=e.initialized,this.loadingQuote=e.loadingQuote,this.loadingPrices=e.loadingPrices,this.loadingTransaction=e.loadingTransaction,this.sourceToken=e.sourceToken,this.sourceTokenAmount=e.sourceTokenAmount,this.sourceTokenPriceInUSD=e.sourceTokenPriceInUSD,this.toToken=e.toToken,this.toTokenAmount=e.toTokenAmount,this.toTokenPriceInUSD=e.toTokenPriceInUSD,this.inputError=e.inputError,this.fetchError=e.fetchError,e.sourceToken&&e.toToken&&this.watchTokensAndValues()}))}async firstUpdated(){u.GN.initializeState(),this.watchTokensAndValues(),await this.handleSwapParameters()}disconnectedCallback(){this.unsubscribe.forEach(e=>e?.()),clearInterval(this.interval),document?.removeEventListener("visibilitychange",this.visibilityChangeHandler)}render(){return(0,o.qy)`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
        ${this.initialized?this.templateSwap():this.templateLoading()}
      </wui-flex>
    `}subscribeToVisibilityChange(){document?.removeEventListener("visibilitychange",this.visibilityChangeHandler),document?.addEventListener("visibilitychange",this.visibilityChangeHandler)}fetchTokensAndValues(){u.GN.getNetworkTokenPrice(),u.GN.getMyTokensWithBalance(),u.GN.swapTokens(),this.lastTokenPriceUpdate=Date.now()}templateSwap(){return(0,o.qy)`
      <wui-flex flexDirection="column" gap="s">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          ${this.templateTokenInput("sourceToken",this.sourceToken)}
          ${this.templateTokenInput("toToken",this.toToken)} ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateDetails()} ${this.templateActionButton()}
      </wui-flex>
    `}actionButtonLabel(){return this.fetchError?"Swap":this.sourceToken&&this.toToken?this.sourceTokenAmount?this.inputError?this.inputError:"Review swap":"Enter amount":"Select token"}templateReplaceTokensButton(){return(0,o.qy)`
      <wui-flex class="replace-tokens-button-container">
        <button @click=${this.onSwitchTokens.bind(this)}>
          <wui-icon name="recycleHorizontal" color="fg-250" size="lg"></wui-icon>
        </button>
      </wui-flex>
    `}templateLoading(){return(0,o.qy)`
      <wui-flex flexDirection="column" gap="l">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          <w3m-swap-input-skeleton target="sourceToken"></w3m-swap-input-skeleton>
          <w3m-swap-input-skeleton target="toToken"></w3m-swap-input-skeleton>
          ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateActionButton()}
      </wui-flex>
    `}templateTokenInput(e,t){let i=u.GN.state.myTokensWithBalance?.find(e=>e?.address===t?.address),n="toToken"===e?this.toTokenAmount:this.sourceTokenAmount,r="toToken"===e?this.toTokenPriceInUSD:this.sourceTokenPriceInUSD,s=a.S.parseLocalStringToNumber(n)*r;return(0,o.qy)`<w3m-swap-input
      .value=${"toToken"===e?this.toTokenAmount:this.sourceTokenAmount}
      .disabled=${"toToken"===e}
      .onSetAmount=${this.handleChangeAmount.bind(this)}
      target=${e}
      .token=${t}
      .balance=${i?.quantity?.numeric}
      .price=${i?.price}
      .marketValue=${s}
      .onSetMaxValue=${this.onSetMaxValue.bind(this)}
    ></w3m-swap-input>`}onSetMaxValue(e,t){let i=a.S.bigNumber(t||"0");this.handleChangeAmount(e,i.gt(0)?i.toFixed(20):"0")}templateDetails(){return this.sourceToken&&this.toToken&&!this.inputError?(0,o.qy)`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`:null}handleChangeAmount(e,t){u.GN.clearError(),"sourceToken"===e?u.GN.setSourceTokenAmount(t):u.GN.setToTokenAmount(t),this.onDebouncedGetSwapCalldata()}templateActionButton(){let e=!this.toToken||!this.sourceToken,t=!this.sourceTokenAmount,i=this.loadingQuote||this.loadingPrices||this.loadingTransaction,n=i||e||t||this.inputError;return(0,o.qy)` <wui-flex gap="xs">
      <wui-button
        data-testid="swap-action-button"
        class="action-button"
        fullWidth
        size="lg"
        borderRadius="xs"
        variant=${e?"neutral":"main"}
        .loading=${i}
        .disabled=${n}
        @click=${this.onSwapPreview.bind(this)}
      >
        ${this.actionButtonLabel()}
      </wui-button>
    </wui-flex>`}onSwitchTokens(){u.GN.switchTokens()}async onSwapPreview(){this.fetchError&&await u.GN.swapTokens(),d.E.sendEvent({type:"track",event:"INITIATE_SWAP",properties:{network:this.caipNetworkId||"",swapFromToken:this.sourceToken?.symbol||"",swapToToken:this.toToken?.symbol||"",swapFromAmount:this.sourceTokenAmount||"",swapToAmount:this.toTokenAmount||"",isSmartAccount:(0,w.lj)(l.W.state.activeChain)===g.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}}),r.I.push("SwapPreview")}async handleSwapParameters(){if(this.initialParams){if(!u.GN.state.initialized){let e=new Promise(e=>{let t=u.GN.subscribeKey("initialized",i=>{i&&(t?.(),e())})});await e}await this.setSwapParameters(this.initialParams)}}async setSwapParameters({amount:e,fromToken:t,toToken:i}){if(!u.GN.state.tokens||!u.GN.state.myTokensWithBalance){let e=new Promise(e=>{let t=u.GN.subscribeKey("myTokensWithBalance",i=>{i&&i.length>0&&(t?.(),e())});setTimeout(()=>{t?.(),e()},5e3)});await e}let o=[...u.GN.state.tokens||[],...u.GN.state.myTokensWithBalance||[]];if(t){let e=o.find(e=>e.symbol.toLowerCase()===t.toLowerCase());e&&u.GN.setSourceToken(e)}if(i){let e=o.find(e=>e.symbol.toLowerCase()===i.toLowerCase());e&&u.GN.setToToken(e)}e&&!isNaN(Number(e))&&u.GN.setSourceTokenAmount(e)}onCaipAddressChange({newCaipAddress:e,resetSwapState:t,initializeSwapState:i}){this.caipAddress!==e&&(this.caipAddress=e,t&&u.GN.resetState(),i&&u.GN.initializeState())}onCaipNetworkChange({newCaipNetwork:e,resetSwapState:t,initializeSwapState:i}){this.caipNetworkId!==e?.caipNetworkId&&(this.caipNetworkId=e?.caipNetworkId,t&&u.GN.resetState(),i&&u.GN.initializeState())}};C.styles=A,P([(0,n.MZ)({type:Object})],C.prototype,"initialParams",void 0),P([(0,n.wk)()],C.prototype,"interval",void 0),P([(0,n.wk)()],C.prototype,"detailsOpen",void 0),P([(0,n.wk)()],C.prototype,"caipAddress",void 0),P([(0,n.wk)()],C.prototype,"caipNetworkId",void 0),P([(0,n.wk)()],C.prototype,"initialized",void 0),P([(0,n.wk)()],C.prototype,"loadingQuote",void 0),P([(0,n.wk)()],C.prototype,"loadingPrices",void 0),P([(0,n.wk)()],C.prototype,"loadingTransaction",void 0),P([(0,n.wk)()],C.prototype,"sourceToken",void 0),P([(0,n.wk)()],C.prototype,"sourceTokenAmount",void 0),P([(0,n.wk)()],C.prototype,"sourceTokenPriceInUSD",void 0),P([(0,n.wk)()],C.prototype,"toToken",void 0),P([(0,n.wk)()],C.prototype,"toTokenAmount",void 0),P([(0,n.wk)()],C.prototype,"toTokenPriceInUSD",void 0),P([(0,n.wk)()],C.prototype,"inputError",void 0),P([(0,n.wk)()],C.prototype,"fetchError",void 0),P([(0,n.wk)()],C.prototype,"lastTokenPriceUpdate",void 0),C=P([(0,h.EM)("w3m-swap-view")],C);let D=(0,o.AH)`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  .preview-container,
  .details-container {
    width: 100%;
  }

  .token-image {
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: 12px;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .token-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    height: 40px;
    border: none;
    border-radius: 80px;
    background: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    cursor: pointer;
    transition: background 0.2s linear;
  }

  .token-item:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .preview-token-details-container {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }

  .action-buttons-container {
    width: 100%;
    gap: var(--wui-spacing-xs);
  }

  .action-buttons-container > button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    height: 48px;
    border-radius: var(--wui-border-radius-xs);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  .action-buttons-container > button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .action-button > wui-loading-spinner {
    display: inline-block;
  }

  .cancel-button:hover,
  .action-button:hover {
    cursor: pointer;
  }

  .action-buttons-container > wui-button.cancel-button {
    flex: 2;
  }

  .action-buttons-container > wui-button.action-button {
    flex: 4;
  }

  .action-buttons-container > button.action-button > wui-text {
    color: white;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`;var G=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let E=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.detailsOpen=!0,this.approvalTransaction=u.GN.state.approvalTransaction,this.swapTransaction=u.GN.state.swapTransaction,this.sourceToken=u.GN.state.sourceToken,this.sourceTokenAmount=u.GN.state.sourceTokenAmount??"",this.sourceTokenPriceInUSD=u.GN.state.sourceTokenPriceInUSD,this.toToken=u.GN.state.toToken,this.toTokenAmount=u.GN.state.toTokenAmount??"",this.toTokenPriceInUSD=u.GN.state.toTokenPriceInUSD,this.caipNetwork=l.W.state.activeCaipNetwork,this.balanceSymbol=s.U.state.balanceSymbol,this.inputError=u.GN.state.inputError,this.loadingQuote=u.GN.state.loadingQuote,this.loadingApprovalTransaction=u.GN.state.loadingApprovalTransaction,this.loadingBuildTransaction=u.GN.state.loadingBuildTransaction,this.loadingTransaction=u.GN.state.loadingTransaction,this.unsubscribe.push(s.U.subscribeKey("balanceSymbol",e=>{this.balanceSymbol!==e&&r.I.goBack()}),l.W.subscribeKey("activeCaipNetwork",e=>{this.caipNetwork!==e&&(this.caipNetwork=e)}),u.GN.subscribe(e=>{this.approvalTransaction=e.approvalTransaction,this.swapTransaction=e.swapTransaction,this.sourceToken=e.sourceToken,this.toToken=e.toToken,this.toTokenPriceInUSD=e.toTokenPriceInUSD,this.sourceTokenAmount=e.sourceTokenAmount??"",this.toTokenAmount=e.toTokenAmount??"",this.inputError=e.inputError,e.inputError&&r.I.goBack(),this.loadingQuote=e.loadingQuote,this.loadingApprovalTransaction=e.loadingApprovalTransaction,this.loadingBuildTransaction=e.loadingBuildTransaction,this.loadingTransaction=e.loadingTransaction}))}firstUpdated(){u.GN.getTransaction(),this.refreshTransaction()}disconnectedCallback(){this.unsubscribe.forEach(e=>e?.()),clearInterval(this.interval)}render(){return(0,o.qy)`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
        ${this.templateSwap()}
      </wui-flex>
    `}refreshTransaction(){this.interval=setInterval(()=>{u.GN.getApprovalLoadingState()||u.GN.getTransaction()},1e4)}templateSwap(){let e=`${a.S.formatNumberToLocalString(parseFloat(this.sourceTokenAmount))} ${this.sourceToken?.symbol}`,t=`${a.S.formatNumberToLocalString(parseFloat(this.toTokenAmount))} ${this.toToken?.symbol}`,i=parseFloat(this.sourceTokenAmount)*this.sourceTokenPriceInUSD,n=parseFloat(this.toTokenAmount)*this.toTokenPriceInUSD,r=a.S.formatNumberToLocalString(i),s=a.S.formatNumberToLocalString(n),l=this.loadingQuote||this.loadingBuildTransaction||this.loadingTransaction||this.loadingApprovalTransaction;return(0,o.qy)`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        <wui-flex class="preview-container" flexDirection="column" alignItems="flex-start" gap="l">
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Send</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${r}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${e}
              imageSrc=${this.sourceToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
          <wui-icon name="recycleHorizontal" color="fg-200" size="md"></wui-icon>
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Receive</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${s}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${t}
              imageSrc=${this.toToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
        </wui-flex>

        ${this.templateDetails()}

        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="xs">
          <wui-icon size="sm" color="fg-200" name="infoCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>

        <wui-flex
          class="action-buttons-container"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="xs"
        >
          <wui-button
            class="cancel-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="neutral"
            @click=${this.onCancelTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="fg-200">Cancel</wui-text>
          </wui-button>
          <wui-button
            class="action-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="main"
            ?loading=${l}
            ?disabled=${l}
            @click=${this.onSendTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="inverse-100">
              ${this.actionButtonLabel()}
            </wui-text>
          </wui-button>
        </wui-flex>
      </wui-flex>
    `}templateDetails(){return this.sourceToken&&this.toToken&&!this.inputError?(0,o.qy)`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`:null}actionButtonLabel(){return this.loadingApprovalTransaction?"Approving...":this.approvalTransaction?"Approve":"Swap"}onCancelTransaction(){r.I.goBack()}onSendTransaction(){this.approvalTransaction?u.GN.sendTransactionForApproval(this.approvalTransaction):u.GN.sendTransactionForSwap(this.swapTransaction)}};E.styles=D,G([(0,n.wk)()],E.prototype,"interval",void 0),G([(0,n.wk)()],E.prototype,"detailsOpen",void 0),G([(0,n.wk)()],E.prototype,"approvalTransaction",void 0),G([(0,n.wk)()],E.prototype,"swapTransaction",void 0),G([(0,n.wk)()],E.prototype,"sourceToken",void 0),G([(0,n.wk)()],E.prototype,"sourceTokenAmount",void 0),G([(0,n.wk)()],E.prototype,"sourceTokenPriceInUSD",void 0),G([(0,n.wk)()],E.prototype,"toToken",void 0),G([(0,n.wk)()],E.prototype,"toTokenAmount",void 0),G([(0,n.wk)()],E.prototype,"toTokenPriceInUSD",void 0),G([(0,n.wk)()],E.prototype,"caipNetwork",void 0),G([(0,n.wk)()],E.prototype,"balanceSymbol",void 0),G([(0,n.wk)()],E.prototype,"inputError",void 0),G([(0,n.wk)()],E.prototype,"loadingQuote",void 0),G([(0,n.wk)()],E.prototype,"loadingApprovalTransaction",void 0),G([(0,n.wk)()],E.prototype,"loadingBuildTransaction",void 0),G([(0,n.wk)()],E.prototype,"loadingTransaction",void 0),E=G([(0,h.EM)("w3m-swap-preview-view")],E),i(65759),i(23499),i(25322),i(98750),i(43804);var U=i(97265),L=i(54166);let j=(0,o.AH)`
  :host {
    height: 60px;
    min-height: 60px;
  }

  :host > wui-flex {
    cursor: pointer;
    height: 100%;
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-l);
    width: 100%;
    background-color: transparent;
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-lg),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color, opacity;
  }

  @media (hover: hover) and (pointer: fine) {
    :host > wui-flex:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    :host > wui-flex:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  :host([disabled]) > wui-flex {
    opacity: 0.6;
  }

  :host([disabled]) > wui-flex:hover {
    background-color: transparent;
  }

  :host > wui-flex > wui-flex {
    flex: 1;
  }

  :host > wui-flex > wui-image,
  :host > wui-flex > .token-item-image-placeholder {
    width: 40px;
    max-width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    position: relative;
  }

  :host > wui-flex > .token-item-image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > wui-flex > wui-image::after,
  :host > wui-flex > .token-item-image-placeholder::after {
    position: absolute;
    content: '';
    inset: 0;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-l);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }
`;var R=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let q=class extends o.WF{constructor(){super(),this.observer=new IntersectionObserver(()=>void 0),this.imageSrc=void 0,this.name=void 0,this.symbol=void 0,this.price=void 0,this.amount=void 0,this.visible=!1,this.imageError=!1,this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?this.visible=!0:this.visible=!1})},{threshold:.1})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){if(!this.visible)return null;let e=this.amount&&this.price?a.S.multiply(this.price,this.amount)?.toFixed(3):null;return(0,o.qy)`
      <wui-flex alignItems="center">
        ${this.visualTemplate()}
        <wui-flex flexDirection="column" gap="3xs">
          <wui-flex justifyContent="space-between">
            <wui-text variant="paragraph-500" color="fg-100" lineClamp="1">${this.name}</wui-text>
            ${e?(0,o.qy)`
                  <wui-text variant="paragraph-500" color="fg-100">
                    $${a.S.formatNumberToLocalString(e,3)}
                  </wui-text>
                `:null}
          </wui-flex>
          <wui-flex justifyContent="space-between">
            <wui-text variant="small-400" color="fg-200" lineClamp="1">${this.symbol}</wui-text>
            ${this.amount?(0,o.qy)`<wui-text variant="small-400" color="fg-200">
                  ${a.S.formatNumberToLocalString(this.amount,5)}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}visualTemplate(){return this.imageError?(0,o.qy)`<wui-flex class="token-item-image-placeholder">
        <wui-icon name="image" color="inherit"></wui-icon>
      </wui-flex>`:this.imageSrc?(0,o.qy)`<wui-image
        width="40"
        height="40"
        src=${this.imageSrc}
        @onLoadError=${this.imageLoadError}
      ></wui-image>`:null}imageLoadError(){this.imageError=!0}};q.styles=[U.W5,U.fD,j],R([(0,n.MZ)()],q.prototype,"imageSrc",void 0),R([(0,n.MZ)()],q.prototype,"name",void 0),R([(0,n.MZ)()],q.prototype,"symbol",void 0),R([(0,n.MZ)()],q.prototype,"price",void 0),R([(0,n.MZ)()],q.prototype,"amount",void 0),R([(0,n.wk)()],q.prototype,"visible",void 0),R([(0,n.wk)()],q.prototype,"imageError",void 0),q=R([(0,L.E)("wui-token-list-item")],q),i(48252);let O=(0,o.AH)`
  :host > wui-flex:first-child {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`,B=class extends o.WF{render(){return(0,o.qy)`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="2xs">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2xs" alignItems="flex-end">
          <wui-shimmer width="24px" height="12px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="32px" height="12px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `}};B.styles=[U.W5,O],B=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}([(0,L.E)("wui-token-list-item-loader")],B);let W=(0,o.AH)`
  :host {
    --tokens-scroll--top-opacity: 0;
    --tokens-scroll--bottom-opacity: 1;
    --suggested-tokens-scroll--left-opacity: 0;
    --suggested-tokens-scroll--right-opacity: 1;
  }

  :host > wui-flex:first-child {
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-height: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .suggested-tokens-container {
    overflow-x: auto;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--suggested-tokens-scroll--right-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--right-opacity))) 100%
    );
  }

  .suggested-tokens-container::-webkit-scrollbar {
    display: none;
  }

  .tokens-container {
    border-top: 1px solid var(--wui-color-gray-glass-005);
    height: 100%;
    max-height: 390px;
  }

  .tokens {
    width: 100%;
    overflow-y: auto;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--tokens-scroll--top-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--tokens-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--bottom-opacity))) 100%
    );
  }

  .network-search-input,
  .select-network-button {
    height: 40px;
  }

  .select-network-button {
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: transparent;
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-xs);
    align-items: center;
    transition: background-color 0.2s linear;
  }

  .select-network-button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  .select-network-button > wui-image {
    width: 26px;
    height: 26px;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`;var M=function(e,t,i,o){var n,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(t,i,r):n(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r};let z=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.targetToken=r.I.state.data?.target,this.sourceToken=u.GN.state.sourceToken,this.sourceTokenAmount=u.GN.state.sourceTokenAmount,this.toToken=u.GN.state.toToken,this.myTokensWithBalance=u.GN.state.myTokensWithBalance,this.popularTokens=u.GN.state.popularTokens,this.suggestedTokens=u.GN.state.suggestedTokens,this.tokensLoading=u.GN.state.tokensLoading,this.searchValue="",this.unsubscribe.push(u.GN.subscribe(e=>{this.sourceToken=e.sourceToken,this.toToken=e.toToken,this.myTokensWithBalance=e.myTokensWithBalance,this.popularTokens=e.popularTokens,this.suggestedTokens=e.suggestedTokens,this.tokensLoading=e.tokensLoading}))}async firstUpdated(){await u.GN.getTokenList()}updated(){let e=this.renderRoot?.querySelector(".suggested-tokens-container");e?.addEventListener("scroll",this.handleSuggestedTokensScroll.bind(this));let t=this.renderRoot?.querySelector(".tokens");t?.addEventListener("scroll",this.handleTokenListScroll.bind(this))}disconnectedCallback(){super.disconnectedCallback();let e=this.renderRoot?.querySelector(".suggested-tokens-container"),t=this.renderRoot?.querySelector(".tokens");e?.removeEventListener("scroll",this.handleSuggestedTokensScroll.bind(this)),t?.removeEventListener("scroll",this.handleTokenListScroll.bind(this)),clearInterval(this.interval)}render(){return(0,o.qy)`
      <wui-flex flexDirection="column" gap="s">
        ${this.templateSearchInput()} ${this.templateSuggestedTokens()} ${this.templateTokens()}
      </wui-flex>
    `}onSelectToken(e){"sourceToken"===this.targetToken?u.GN.setSourceToken(e):(u.GN.setToToken(e),this.sourceToken&&this.sourceTokenAmount&&u.GN.swapTokens()),r.I.goBack()}templateSearchInput(){return(0,o.qy)`
      <wui-flex .padding=${["3xs","s","0","s"]} gap="xs">
        <wui-input-text
          data-testid="swap-select-token-search-input"
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
          .value=${this.searchValue}
          @inputChange=${this.onSearchInputChange.bind(this)}
        ></wui-input-text>
      </wui-flex>
    `}templateMyTokens(){let e=this.myTokensWithBalance?Object.values(this.myTokensWithBalance):[],t=this.filterTokensWithText(e,this.searchValue);return t?.length>0?(0,o.qy)`<wui-flex justifyContent="flex-start" padding="s">
          <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
        </wui-flex>
        ${t.map(e=>{let t=e.symbol===this.sourceToken?.symbol||e.symbol===this.toToken?.symbol;return(0,o.qy)`
            <wui-token-list-item
              data-testid="swap-select-token-item-${e.symbol}"
              name=${e.name}
              ?disabled=${t}
              symbol=${e.symbol}
              price=${e?.price}
              amount=${e?.quantity?.numeric}
              imageSrc=${e.logoUri}
              @click=${()=>{t||this.onSelectToken(e)}}
            >
            </wui-token-list-item>
          `})}`:null}templateAllTokens(){let e=this.popularTokens?this.popularTokens:[],t=this.filterTokensWithText(e,this.searchValue);return this.tokensLoading?(0,o.qy)`
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
      `:t?.length>0?(0,o.qy)`
        ${t.map(e=>(0,o.qy)`
            <wui-token-list-item
              data-testid="swap-select-token-item-${e.symbol}"
              name=${e.name}
              symbol=${e.symbol}
              imageSrc=${e.logoUri}
              @click=${()=>this.onSelectToken(e)}
            >
            </wui-token-list-item>
          `)}
      `:null}templateTokens(){return(0,o.qy)`
      <wui-flex class="tokens-container">
        <wui-flex class="tokens" .padding=${["0","s","s","s"]} flexDirection="column">
          ${this.templateMyTokens()}
          <wui-flex justifyContent="flex-start" padding="s">
            <wui-text variant="paragraph-500" color="fg-200">Tokens</wui-text>
          </wui-flex>
          ${this.templateAllTokens()}
        </wui-flex>
      </wui-flex>
    `}templateSuggestedTokens(){let e=this.suggestedTokens?this.suggestedTokens.slice(0,8):null;return this.tokensLoading?(0,o.qy)`
        <wui-flex class="suggested-tokens-container" .padding=${["0","s","0","s"]} gap="xs">
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
        </wui-flex>
      `:e?(0,o.qy)`
      <wui-flex class="suggested-tokens-container" .padding=${["0","s","0","s"]} gap="xs">
        ${e.map(e=>(0,o.qy)`
            <wui-token-button
              text=${e.symbol}
              imageSrc=${e.logoUri}
              @click=${()=>this.onSelectToken(e)}
            >
            </wui-token-button>
          `)}
      </wui-flex>
    `:null}onSearchInputChange(e){this.searchValue=e.detail}handleSuggestedTokensScroll(){let e=this.renderRoot?.querySelector(".suggested-tokens-container");e&&(e.style.setProperty("--suggested-tokens-scroll--left-opacity",h.z8.interpolate([0,100],[0,1],e.scrollLeft).toString()),e.style.setProperty("--suggested-tokens-scroll--right-opacity",h.z8.interpolate([0,100],[0,1],e.scrollWidth-e.scrollLeft-e.offsetWidth).toString()))}handleTokenListScroll(){let e=this.renderRoot?.querySelector(".tokens");e&&(e.style.setProperty("--tokens-scroll--top-opacity",h.z8.interpolate([0,100],[0,1],e.scrollTop).toString()),e.style.setProperty("--tokens-scroll--bottom-opacity",h.z8.interpolate([0,100],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString()))}filterTokensWithText(e,t){return e.filter(e=>`${e.symbol} ${e.name} ${e.address}`.toLowerCase().includes(t.toLowerCase())).sort((e,i)=>{let o=`${e.symbol} ${e.name} ${e.address}`.toLowerCase(),n=`${i.symbol} ${i.name} ${i.address}`.toLowerCase();return o.indexOf(t.toLowerCase())-n.indexOf(t.toLowerCase())})}};z.styles=W,M([(0,n.wk)()],z.prototype,"interval",void 0),M([(0,n.wk)()],z.prototype,"targetToken",void 0),M([(0,n.wk)()],z.prototype,"sourceToken",void 0),M([(0,n.wk)()],z.prototype,"sourceTokenAmount",void 0),M([(0,n.wk)()],z.prototype,"toToken",void 0),M([(0,n.wk)()],z.prototype,"myTokensWithBalance",void 0),M([(0,n.wk)()],z.prototype,"popularTokens",void 0),M([(0,n.wk)()],z.prototype,"suggestedTokens",void 0),M([(0,n.wk)()],z.prototype,"tokensLoading",void 0),M([(0,n.wk)()],z.prototype,"searchValue",void 0),z=M([(0,h.EM)("w3m-swap-select-token-view")],z)}}]);