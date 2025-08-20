"use strict";exports.id=8462,exports.ids=[8462],exports.modules={24005:(a,b,c)=>{var d=c(50861),e=c(52827);c(77876),c(29714),c(32490),c(56124);var f=c(67017),g=c(76382);c(8968);let h=(0,d.AH)`
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
`;var i=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let j=class extends d.WF{constructor(){super(...arguments),this.text="",this.loading=!1}render(){return this.loading?(0,d.qy)` <wui-flex alignItems="center" gap="xxs" padding="xs">
        <wui-shimmer width="24px" height="24px"></wui-shimmer>
        <wui-shimmer width="40px" height="20px" borderRadius="4xs"></wui-shimmer>
      </wui-flex>`:(0,d.qy)`
      <button>
        ${this.tokenTemplate()}
        <wui-text variant="paragraph-600" color="fg-100">${this.text}</wui-text>
      </button>
    `}tokenTemplate(){return this.imageSrc?(0,d.qy)`<wui-image src=${this.imageSrc}></wui-image>`:(0,d.qy)`
      <wui-icon-box
        size="sm"
        iconColor="fg-200"
        backgroundColor="fg-300"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};j.styles=[f.W5,f.fD,h],i([(0,e.MZ)()],j.prototype,"imageSrc",void 0),i([(0,e.MZ)()],j.prototype,"text",void 0),i([(0,e.MZ)({type:Boolean})],j.prototype,"loading",void 0),j=i([(0,g.E)("wui-token-button")],j)},48462:(a,b,c)=>{c.r(b),c.d(b,{W3mSwapPreviewView:()=>H,W3mSwapSelectTokenView:()=>R,W3mSwapView:()=>E});var d=c(50861),e=c(52827),f=c(22329),g=c(71136),h=c(19898),i=c(83908),j=c(21347),k=c(34526),l=c(26728),m=c(98604),n=c(79508),o=c(22490);c(4977),c(77838),c(42536),c(41298);var p=c(71452),q=c(80796);c(70678),c(33297);let r=(0,d.AH)`
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
`;var s=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let t=q.oU.CONVERT_SLIPPAGE_TOLERANCE,u=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.networkName=i.W.state.activeCaipNetwork?.name,this.detailsOpen=!1,this.sourceToken=j.GN.state.sourceToken,this.toToken=j.GN.state.toToken,this.toTokenAmount=j.GN.state.toTokenAmount,this.sourceTokenPriceInUSD=j.GN.state.sourceTokenPriceInUSD,this.toTokenPriceInUSD=j.GN.state.toTokenPriceInUSD,this.priceImpact=j.GN.state.priceImpact,this.maxSlippage=j.GN.state.maxSlippage,this.networkTokenSymbol=j.GN.state.networkTokenSymbol,this.inputError=j.GN.state.inputError,this.unsubscribe.push(j.GN.subscribe(a=>{this.sourceToken=a.sourceToken,this.toToken=a.toToken,this.toTokenAmount=a.toTokenAmount,this.priceImpact=a.priceImpact,this.maxSlippage=a.maxSlippage,this.sourceTokenPriceInUSD=a.sourceTokenPriceInUSD,this.toTokenPriceInUSD=a.toTokenPriceInUSD,this.inputError=a.inputError}))}render(){let a=this.toTokenAmount&&this.maxSlippage?f.S.bigNumber(this.toTokenAmount).minus(this.maxSlippage).toString():null;if(!this.sourceToken||!this.toToken||this.inputError)return null;let b=this.sourceTokenPriceInUSD&&this.toTokenPriceInUSD?1/this.toTokenPriceInUSD*this.sourceTokenPriceInUSD:0;return(0,d.qy)`
      <wui-flex flexDirection="column" alignItems="center" gap="1xs" class="details-container">
        <wui-flex flexDirection="column">
          <button @click=${this.toggleDetails.bind(this)}>
            <wui-flex justifyContent="space-between" .padding=${["0","xs","0","xs"]}>
              <wui-flex justifyContent="flex-start" flexGrow="1" gap="xs">
                <wui-text variant="small-400" color="fg-100">
                  1 ${this.sourceToken.symbol} =
                  ${f.S.formatNumberToLocalString(b,3)}
                  ${this.toToken.symbol}
                </wui-text>
                <wui-text variant="small-400" color="fg-200">
                  $${f.S.formatNumberToLocalString(this.sourceTokenPriceInUSD)}
                </wui-text>
              </wui-flex>
              <wui-icon name="chevronBottom"></wui-icon>
            </wui-flex>
          </button>
          ${this.detailsOpen?(0,d.qy)`
                <wui-flex flexDirection="column" gap="xs" class="details-content-container">
                  ${this.priceImpact?(0,d.qy)` <wui-flex flexDirection="column" gap="xs">
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
                              ${f.S.formatNumberToLocalString(this.priceImpact,3)}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  ${this.maxSlippage&&this.sourceToken.symbol?(0,d.qy)`<wui-flex flexDirection="column" gap="xs">
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
                              text=${`Max slippage sets the minimum amount you must receive for the transaction to proceed. ${a?`Transaction will be reversed if you receive less than ${f.S.formatNumberToLocalString(a,6)} ${this.toToken.symbol} due to price changes.`:""}`}
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${f.S.formatNumberToLocalString(this.maxSlippage,6)}
                              ${this.toToken.symbol} ${t}%
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
    `}toggleDetails(){this.detailsOpen=!this.detailsOpen}};u.styles=[r],s([(0,e.wk)()],u.prototype,"networkName",void 0),s([(0,e.MZ)()],u.prototype,"detailsOpen",void 0),s([(0,e.wk)()],u.prototype,"sourceToken",void 0),s([(0,e.wk)()],u.prototype,"toToken",void 0),s([(0,e.wk)()],u.prototype,"toTokenAmount",void 0),s([(0,e.wk)()],u.prototype,"sourceTokenPriceInUSD",void 0),s([(0,e.wk)()],u.prototype,"toTokenPriceInUSD",void 0),s([(0,e.wk)()],u.prototype,"priceImpact",void 0),s([(0,e.wk)()],u.prototype,"maxSlippage",void 0),s([(0,e.wk)()],u.prototype,"networkTokenSymbol",void 0),s([(0,e.wk)()],u.prototype,"inputError",void 0),u=s([(0,o.EM)("w3m-swap-details")],u),c(59962);let v=(0,d.AH)`
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
`;var w=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let x=class extends d.WF{constructor(){super(...arguments),this.target="sourceToken"}render(){return(0,d.qy)`
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
    `}templateTokenSelectButton(){return(0,d.qy)`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-shimmer width="80px" height="40px" borderRadius="3xl" variant="light"></wui-shimmer>
      </wui-flex>
    `}};x.styles=[v],w([(0,e.MZ)()],x.prototype,"target",void 0),x=w([(0,o.EM)("w3m-swap-input-skeleton")],x);let y={numericInputKeyDown(a,b,c){let d=a.metaKey||a.ctrlKey,e=a.key,f=e.toLocaleLowerCase(),g=","===e,h="."===e,i=e>="0"&&e<="9";d||"a"!==f&&"c"!==f&&"v"!==f&&"x"!==f||a.preventDefault(),"0"!==b||g||h||"0"!==e||a.preventDefault(),"0"===b&&i&&(c(e),a.preventDefault()),(g||h)&&(b||(c("0."),a.preventDefault()),(b?.includes(".")||b?.includes(","))&&a.preventDefault()),i||["Backspace","Meta","Ctrl","a","A","c","C","x","X","v","V","ArrowLeft","ArrowRight","Tab"].includes(e)||h||g||a.preventDefault()}};c(24005);let z=(0,d.AH)`
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
`;var A=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let B=class extends d.WF{constructor(){super(...arguments),this.focused=!1,this.price=0,this.target="sourceToken",this.onSetAmount=null,this.onSetMaxValue=null}render(){let a=this.marketValue||"0",b=f.S.bigNumber(a).gt("0");return(0,d.qy)`
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
            ${b?`$${f.S.formatNumberToLocalString(this.marketValue,2)}`:null}
          </wui-text>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}handleKeydown(a){return y.numericInputKeyDown(a,this.value,a=>this.onSetAmount?.(this.target,a))}dispatchInputChangeEvent(a){if(!this.onSetAmount)return;let b=a.target.value.replace(/[^0-9.]/gu,"");","===b||"."===b?this.onSetAmount(this.target,"0."):b.endsWith(",")?this.onSetAmount(this.target,b.replace(",",".")):this.onSetAmount(this.target,b)}setMaxValueToInput(){this.onSetMaxValue?.(this.target,this.balance)}templateTokenSelectButton(){return this.token?(0,d.qy)`
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
    `:(0,d.qy)` <wui-button
        data-testid="swap-select-token-button-${this.target}"
        class="swap-token-button"
        size="md"
        variant="accent"
        @click=${this.onSelectToken.bind(this)}
      >
        Select token
      </wui-button>`}tokenBalanceTemplate(){let a=f.S.multiply(this.balance,this.price),b=!!a&&a?.gt(5e-5);return(0,d.qy)`
      ${b?(0,d.qy)`<wui-text variant="small-400" color="fg-200">
            ${f.S.formatNumberToLocalString(this.balance,2)}
          </wui-text>`:null}
      ${"sourceToken"===this.target?this.tokenActionButtonTemplate(b):null}
    `}tokenActionButtonTemplate(a){return a?(0,d.qy)` <button class="max-value-button" @click=${this.setMaxValueToInput.bind(this)}>
        <wui-text color="accent-100" variant="small-600">Max</wui-text>
      </button>`:(0,d.qy)` <button class="max-value-button" @click=${this.onBuyToken.bind(this)}>
      <wui-text color="accent-100" variant="small-600">Buy</wui-text>
    </button>`}onFocusChange(a){this.focused=a}onSelectToken(){m.E.sendEvent({type:"track",event:"CLICK_SELECT_TOKEN_TO_SWAP"}),g.I.push("SwapSelectToken",{target:this.target})}onBuyToken(){g.I.push("OnRampProviders")}};B.styles=[z],A([(0,e.MZ)()],B.prototype,"focused",void 0),A([(0,e.MZ)()],B.prototype,"balance",void 0),A([(0,e.MZ)()],B.prototype,"value",void 0),A([(0,e.MZ)()],B.prototype,"price",void 0),A([(0,e.MZ)()],B.prototype,"marketValue",void 0),A([(0,e.MZ)()],B.prototype,"disabled",void 0),A([(0,e.MZ)()],B.prototype,"target",void 0),A([(0,e.MZ)()],B.prototype,"token",void 0),A([(0,e.MZ)()],B.prototype,"onSetAmount",void 0),A([(0,e.MZ)()],B.prototype,"onSetMaxValue",void 0),B=A([(0,o.EM)("w3m-swap-input")],B);let C=(0,d.AH)`
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
`;var D=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let E=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.initialParams=g.I.state.data?.swap,this.detailsOpen=!1,this.caipAddress=h.U.state.caipAddress,this.caipNetworkId=i.W.state.activeCaipNetwork?.caipNetworkId,this.initialized=j.GN.state.initialized,this.loadingQuote=j.GN.state.loadingQuote,this.loadingPrices=j.GN.state.loadingPrices,this.loadingTransaction=j.GN.state.loadingTransaction,this.sourceToken=j.GN.state.sourceToken,this.sourceTokenAmount=j.GN.state.sourceTokenAmount,this.sourceTokenPriceInUSD=j.GN.state.sourceTokenPriceInUSD,this.toToken=j.GN.state.toToken,this.toTokenAmount=j.GN.state.toTokenAmount,this.toTokenPriceInUSD=j.GN.state.toTokenPriceInUSD,this.inputError=j.GN.state.inputError,this.fetchError=j.GN.state.fetchError,this.lastTokenPriceUpdate=0,this.minTokenPriceUpdateInterval=1e4,this.visibilityChangeHandler=()=>{document?.hidden?(clearInterval(this.interval),this.interval=void 0):this.startTokenPriceInterval()},this.startTokenPriceInterval=()=>{this.interval&&Date.now()-this.lastTokenPriceUpdate<this.minTokenPriceUpdateInterval||(this.lastTokenPriceUpdate&&Date.now()-this.lastTokenPriceUpdate>this.minTokenPriceUpdateInterval&&this.fetchTokensAndValues(),clearInterval(this.interval),this.interval=setInterval(()=>{this.fetchTokensAndValues()},this.minTokenPriceUpdateInterval))},this.watchTokensAndValues=()=>{this.sourceToken&&this.toToken&&(this.subscribeToVisibilityChange(),this.startTokenPriceInterval())},this.onDebouncedGetSwapCalldata=k.w.debounce(async()=>{await j.GN.swapTokens()},200),i.W.subscribeKey("activeCaipNetwork",a=>this.onCaipNetworkChange({newCaipNetwork:a,resetSwapState:!0,initializeSwapState:!1})),h.U.subscribeKey("caipAddress",a=>this.onCaipAddressChange({newCaipAddress:a,resetSwapState:!0,initializeSwapState:!1})),this.unsubscribe.push(i.W.subscribeKey("activeCaipNetwork",a=>this.onCaipNetworkChange({newCaipNetwork:a,resetSwapState:!1,initializeSwapState:!0})),h.U.subscribeKey("caipAddress",a=>this.onCaipAddressChange({newCaipAddress:a,resetSwapState:!1,initializeSwapState:!0})),l.W.subscribeKey("open",a=>{a||j.GN.resetState()}),g.I.subscribeKey("view",a=>{a.includes("Swap")||j.GN.resetValues()}),j.GN.subscribe(a=>{this.initialized=a.initialized,this.loadingQuote=a.loadingQuote,this.loadingPrices=a.loadingPrices,this.loadingTransaction=a.loadingTransaction,this.sourceToken=a.sourceToken,this.sourceTokenAmount=a.sourceTokenAmount,this.sourceTokenPriceInUSD=a.sourceTokenPriceInUSD,this.toToken=a.toToken,this.toTokenAmount=a.toTokenAmount,this.toTokenPriceInUSD=a.toTokenPriceInUSD,this.inputError=a.inputError,this.fetchError=a.fetchError,a.sourceToken&&a.toToken&&this.watchTokensAndValues()}))}async firstUpdated(){j.GN.initializeState(),this.watchTokensAndValues(),await this.handleSwapParameters()}disconnectedCallback(){this.unsubscribe.forEach(a=>a?.()),clearInterval(this.interval),document?.removeEventListener("visibilitychange",this.visibilityChangeHandler)}render(){return(0,d.qy)`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
        ${this.initialized?this.templateSwap():this.templateLoading()}
      </wui-flex>
    `}subscribeToVisibilityChange(){document?.removeEventListener("visibilitychange",this.visibilityChangeHandler),document?.addEventListener("visibilitychange",this.visibilityChangeHandler)}fetchTokensAndValues(){j.GN.getNetworkTokenPrice(),j.GN.getMyTokensWithBalance(),j.GN.swapTokens(),this.lastTokenPriceUpdate=Date.now()}templateSwap(){return(0,d.qy)`
      <wui-flex flexDirection="column" gap="s">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          ${this.templateTokenInput("sourceToken",this.sourceToken)}
          ${this.templateTokenInput("toToken",this.toToken)} ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateDetails()} ${this.templateActionButton()}
      </wui-flex>
    `}actionButtonLabel(){return this.fetchError?"Swap":this.sourceToken&&this.toToken?this.sourceTokenAmount?this.inputError?this.inputError:"Review swap":"Enter amount":"Select token"}templateReplaceTokensButton(){return(0,d.qy)`
      <wui-flex class="replace-tokens-button-container">
        <button @click=${this.onSwitchTokens.bind(this)}>
          <wui-icon name="recycleHorizontal" color="fg-250" size="lg"></wui-icon>
        </button>
      </wui-flex>
    `}templateLoading(){return(0,d.qy)`
      <wui-flex flexDirection="column" gap="l">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          <w3m-swap-input-skeleton target="sourceToken"></w3m-swap-input-skeleton>
          <w3m-swap-input-skeleton target="toToken"></w3m-swap-input-skeleton>
          ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateActionButton()}
      </wui-flex>
    `}templateTokenInput(a,b){let c=j.GN.state.myTokensWithBalance?.find(a=>a?.address===b?.address),e="toToken"===a?this.toTokenAmount:this.sourceTokenAmount,g="toToken"===a?this.toTokenPriceInUSD:this.sourceTokenPriceInUSD,h=f.S.parseLocalStringToNumber(e)*g;return(0,d.qy)`<w3m-swap-input
      .value=${"toToken"===a?this.toTokenAmount:this.sourceTokenAmount}
      .disabled=${"toToken"===a}
      .onSetAmount=${this.handleChangeAmount.bind(this)}
      target=${a}
      .token=${b}
      .balance=${c?.quantity?.numeric}
      .price=${c?.price}
      .marketValue=${h}
      .onSetMaxValue=${this.onSetMaxValue.bind(this)}
    ></w3m-swap-input>`}onSetMaxValue(a,b){let c=f.S.bigNumber(b||"0");this.handleChangeAmount(a,c.gt(0)?c.toFixed(20):"0")}templateDetails(){return this.sourceToken&&this.toToken&&!this.inputError?(0,d.qy)`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`:null}handleChangeAmount(a,b){j.GN.clearError(),"sourceToken"===a?j.GN.setSourceTokenAmount(b):j.GN.setToTokenAmount(b),this.onDebouncedGetSwapCalldata()}templateActionButton(){let a=!this.toToken||!this.sourceToken,b=!this.sourceTokenAmount,c=this.loadingQuote||this.loadingPrices||this.loadingTransaction,e=c||a||b||this.inputError;return(0,d.qy)` <wui-flex gap="xs">
      <wui-button
        data-testid="swap-action-button"
        class="action-button"
        fullWidth
        size="lg"
        borderRadius="xs"
        variant=${a?"neutral":"main"}
        .loading=${c}
        .disabled=${e}
        @click=${this.onSwapPreview.bind(this)}
      >
        ${this.actionButtonLabel()}
      </wui-button>
    </wui-flex>`}onSwitchTokens(){j.GN.switchTokens()}async onSwapPreview(){this.fetchError&&await j.GN.swapTokens(),m.E.sendEvent({type:"track",event:"INITIATE_SWAP",properties:{network:this.caipNetworkId||"",swapFromToken:this.sourceToken?.symbol||"",swapToToken:this.toToken?.symbol||"",swapFromAmount:this.sourceTokenAmount||"",swapToAmount:this.toTokenAmount||"",isSmartAccount:(0,n.lj)(i.W.state.activeChain)===p.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}}),g.I.push("SwapPreview")}async handleSwapParameters(){if(this.initialParams){if(!j.GN.state.initialized){let a=new Promise(a=>{let b=j.GN.subscribeKey("initialized",c=>{c&&(b?.(),a())})});await a}await this.setSwapParameters(this.initialParams)}}async setSwapParameters({amount:a,fromToken:b,toToken:c}){if(!j.GN.state.tokens||!j.GN.state.myTokensWithBalance){let a=new Promise(a=>{let b=j.GN.subscribeKey("myTokensWithBalance",c=>{c&&c.length>0&&(b?.(),a())});setTimeout(()=>{b?.(),a()},5e3)});await a}let d=[...j.GN.state.tokens||[],...j.GN.state.myTokensWithBalance||[]];if(b){let a=d.find(a=>a.symbol.toLowerCase()===b.toLowerCase());a&&j.GN.setSourceToken(a)}if(c){let a=d.find(a=>a.symbol.toLowerCase()===c.toLowerCase());a&&j.GN.setToToken(a)}a&&!isNaN(Number(a))&&j.GN.setSourceTokenAmount(a)}onCaipAddressChange({newCaipAddress:a,resetSwapState:b,initializeSwapState:c}){this.caipAddress!==a&&(this.caipAddress=a,b&&j.GN.resetState(),c&&j.GN.initializeState())}onCaipNetworkChange({newCaipNetwork:a,resetSwapState:b,initializeSwapState:c}){this.caipNetworkId!==a?.caipNetworkId&&(this.caipNetworkId=a?.caipNetworkId,b&&j.GN.resetState(),c&&j.GN.initializeState())}};E.styles=C,D([(0,e.MZ)({type:Object})],E.prototype,"initialParams",void 0),D([(0,e.wk)()],E.prototype,"interval",void 0),D([(0,e.wk)()],E.prototype,"detailsOpen",void 0),D([(0,e.wk)()],E.prototype,"caipAddress",void 0),D([(0,e.wk)()],E.prototype,"caipNetworkId",void 0),D([(0,e.wk)()],E.prototype,"initialized",void 0),D([(0,e.wk)()],E.prototype,"loadingQuote",void 0),D([(0,e.wk)()],E.prototype,"loadingPrices",void 0),D([(0,e.wk)()],E.prototype,"loadingTransaction",void 0),D([(0,e.wk)()],E.prototype,"sourceToken",void 0),D([(0,e.wk)()],E.prototype,"sourceTokenAmount",void 0),D([(0,e.wk)()],E.prototype,"sourceTokenPriceInUSD",void 0),D([(0,e.wk)()],E.prototype,"toToken",void 0),D([(0,e.wk)()],E.prototype,"toTokenAmount",void 0),D([(0,e.wk)()],E.prototype,"toTokenPriceInUSD",void 0),D([(0,e.wk)()],E.prototype,"inputError",void 0),D([(0,e.wk)()],E.prototype,"fetchError",void 0),D([(0,e.wk)()],E.prototype,"lastTokenPriceUpdate",void 0),E=D([(0,o.EM)("w3m-swap-view")],E);let F=(0,d.AH)`
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
`;var G=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let H=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.detailsOpen=!0,this.approvalTransaction=j.GN.state.approvalTransaction,this.swapTransaction=j.GN.state.swapTransaction,this.sourceToken=j.GN.state.sourceToken,this.sourceTokenAmount=j.GN.state.sourceTokenAmount??"",this.sourceTokenPriceInUSD=j.GN.state.sourceTokenPriceInUSD,this.toToken=j.GN.state.toToken,this.toTokenAmount=j.GN.state.toTokenAmount??"",this.toTokenPriceInUSD=j.GN.state.toTokenPriceInUSD,this.caipNetwork=i.W.state.activeCaipNetwork,this.balanceSymbol=h.U.state.balanceSymbol,this.inputError=j.GN.state.inputError,this.loadingQuote=j.GN.state.loadingQuote,this.loadingApprovalTransaction=j.GN.state.loadingApprovalTransaction,this.loadingBuildTransaction=j.GN.state.loadingBuildTransaction,this.loadingTransaction=j.GN.state.loadingTransaction,this.unsubscribe.push(h.U.subscribeKey("balanceSymbol",a=>{this.balanceSymbol!==a&&g.I.goBack()}),i.W.subscribeKey("activeCaipNetwork",a=>{this.caipNetwork!==a&&(this.caipNetwork=a)}),j.GN.subscribe(a=>{this.approvalTransaction=a.approvalTransaction,this.swapTransaction=a.swapTransaction,this.sourceToken=a.sourceToken,this.toToken=a.toToken,this.toTokenPriceInUSD=a.toTokenPriceInUSD,this.sourceTokenAmount=a.sourceTokenAmount??"",this.toTokenAmount=a.toTokenAmount??"",this.inputError=a.inputError,a.inputError&&g.I.goBack(),this.loadingQuote=a.loadingQuote,this.loadingApprovalTransaction=a.loadingApprovalTransaction,this.loadingBuildTransaction=a.loadingBuildTransaction,this.loadingTransaction=a.loadingTransaction}))}firstUpdated(){j.GN.getTransaction(),this.refreshTransaction()}disconnectedCallback(){this.unsubscribe.forEach(a=>a?.()),clearInterval(this.interval)}render(){return(0,d.qy)`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
        ${this.templateSwap()}
      </wui-flex>
    `}refreshTransaction(){this.interval=setInterval(()=>{j.GN.getApprovalLoadingState()||j.GN.getTransaction()},1e4)}templateSwap(){let a=`${f.S.formatNumberToLocalString(parseFloat(this.sourceTokenAmount))} ${this.sourceToken?.symbol}`,b=`${f.S.formatNumberToLocalString(parseFloat(this.toTokenAmount))} ${this.toToken?.symbol}`,c=parseFloat(this.sourceTokenAmount)*this.sourceTokenPriceInUSD,e=parseFloat(this.toTokenAmount)*this.toTokenPriceInUSD,g=f.S.formatNumberToLocalString(c),h=f.S.formatNumberToLocalString(e),i=this.loadingQuote||this.loadingBuildTransaction||this.loadingTransaction||this.loadingApprovalTransaction;return(0,d.qy)`
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
              <wui-text variant="paragraph-400" color="fg-100">$${g}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${a}
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
              <wui-text variant="paragraph-400" color="fg-100">$${h}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${b}
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
            ?loading=${i}
            ?disabled=${i}
            @click=${this.onSendTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="inverse-100">
              ${this.actionButtonLabel()}
            </wui-text>
          </wui-button>
        </wui-flex>
      </wui-flex>
    `}templateDetails(){return this.sourceToken&&this.toToken&&!this.inputError?(0,d.qy)`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`:null}actionButtonLabel(){return this.loadingApprovalTransaction?"Approving...":this.approvalTransaction?"Approve":"Swap"}onCancelTransaction(){g.I.goBack()}onSendTransaction(){this.approvalTransaction?j.GN.sendTransactionForApproval(this.approvalTransaction):j.GN.sendTransactionForSwap(this.swapTransaction)}};H.styles=F,G([(0,e.wk)()],H.prototype,"interval",void 0),G([(0,e.wk)()],H.prototype,"detailsOpen",void 0),G([(0,e.wk)()],H.prototype,"approvalTransaction",void 0),G([(0,e.wk)()],H.prototype,"swapTransaction",void 0),G([(0,e.wk)()],H.prototype,"sourceToken",void 0),G([(0,e.wk)()],H.prototype,"sourceTokenAmount",void 0),G([(0,e.wk)()],H.prototype,"sourceTokenPriceInUSD",void 0),G([(0,e.wk)()],H.prototype,"toToken",void 0),G([(0,e.wk)()],H.prototype,"toTokenAmount",void 0),G([(0,e.wk)()],H.prototype,"toTokenPriceInUSD",void 0),G([(0,e.wk)()],H.prototype,"caipNetwork",void 0),G([(0,e.wk)()],H.prototype,"balanceSymbol",void 0),G([(0,e.wk)()],H.prototype,"inputError",void 0),G([(0,e.wk)()],H.prototype,"loadingQuote",void 0),G([(0,e.wk)()],H.prototype,"loadingApprovalTransaction",void 0),G([(0,e.wk)()],H.prototype,"loadingBuildTransaction",void 0),G([(0,e.wk)()],H.prototype,"loadingTransaction",void 0),H=G([(0,o.EM)("w3m-swap-preview-view")],H),c(58969),c(78488),c(77876),c(32490),c(56124);var I=c(67017),J=c(76382);let K=(0,d.AH)`
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
`;var L=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let M=class extends d.WF{constructor(){super(),this.observer=new IntersectionObserver(()=>void 0),this.imageSrc=void 0,this.name=void 0,this.symbol=void 0,this.price=void 0,this.amount=void 0,this.visible=!1,this.imageError=!1,this.observer=new IntersectionObserver(a=>{a.forEach(a=>{a.isIntersecting?this.visible=!0:this.visible=!1})},{threshold:.1})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){if(!this.visible)return null;let a=this.amount&&this.price?f.S.multiply(this.price,this.amount)?.toFixed(3):null;return(0,d.qy)`
      <wui-flex alignItems="center">
        ${this.visualTemplate()}
        <wui-flex flexDirection="column" gap="3xs">
          <wui-flex justifyContent="space-between">
            <wui-text variant="paragraph-500" color="fg-100" lineClamp="1">${this.name}</wui-text>
            ${a?(0,d.qy)`
                  <wui-text variant="paragraph-500" color="fg-100">
                    $${f.S.formatNumberToLocalString(a,3)}
                  </wui-text>
                `:null}
          </wui-flex>
          <wui-flex justifyContent="space-between">
            <wui-text variant="small-400" color="fg-200" lineClamp="1">${this.symbol}</wui-text>
            ${this.amount?(0,d.qy)`<wui-text variant="small-400" color="fg-200">
                  ${f.S.formatNumberToLocalString(this.amount,5)}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}visualTemplate(){return this.imageError?(0,d.qy)`<wui-flex class="token-item-image-placeholder">
        <wui-icon name="image" color="inherit"></wui-icon>
      </wui-flex>`:this.imageSrc?(0,d.qy)`<wui-image
        width="40"
        height="40"
        src=${this.imageSrc}
        @onLoadError=${this.imageLoadError}
      ></wui-image>`:null}imageLoadError(){this.imageError=!0}};M.styles=[I.W5,I.fD,K],L([(0,e.MZ)()],M.prototype,"imageSrc",void 0),L([(0,e.MZ)()],M.prototype,"name",void 0),L([(0,e.MZ)()],M.prototype,"symbol",void 0),L([(0,e.MZ)()],M.prototype,"price",void 0),L([(0,e.MZ)()],M.prototype,"amount",void 0),L([(0,e.wk)()],M.prototype,"visible",void 0),L([(0,e.wk)()],M.prototype,"imageError",void 0),M=L([(0,J.E)("wui-token-list-item")],M),c(29714);let N=(0,d.AH)`
  :host > wui-flex:first-child {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`,O=class extends d.WF{render(){return(0,d.qy)`
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
    `}};O.styles=[I.W5,N],O=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,J.E)("wui-token-list-item-loader")],O);let P=(0,d.AH)`
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
`;var Q=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let R=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.targetToken=g.I.state.data?.target,this.sourceToken=j.GN.state.sourceToken,this.sourceTokenAmount=j.GN.state.sourceTokenAmount,this.toToken=j.GN.state.toToken,this.myTokensWithBalance=j.GN.state.myTokensWithBalance,this.popularTokens=j.GN.state.popularTokens,this.suggestedTokens=j.GN.state.suggestedTokens,this.tokensLoading=j.GN.state.tokensLoading,this.searchValue="",this.unsubscribe.push(j.GN.subscribe(a=>{this.sourceToken=a.sourceToken,this.toToken=a.toToken,this.myTokensWithBalance=a.myTokensWithBalance,this.popularTokens=a.popularTokens,this.suggestedTokens=a.suggestedTokens,this.tokensLoading=a.tokensLoading}))}async firstUpdated(){await j.GN.getTokenList()}updated(){let a=this.renderRoot?.querySelector(".suggested-tokens-container");a?.addEventListener("scroll",this.handleSuggestedTokensScroll.bind(this));let b=this.renderRoot?.querySelector(".tokens");b?.addEventListener("scroll",this.handleTokenListScroll.bind(this))}disconnectedCallback(){super.disconnectedCallback();let a=this.renderRoot?.querySelector(".suggested-tokens-container"),b=this.renderRoot?.querySelector(".tokens");a?.removeEventListener("scroll",this.handleSuggestedTokensScroll.bind(this)),b?.removeEventListener("scroll",this.handleTokenListScroll.bind(this)),clearInterval(this.interval)}render(){return(0,d.qy)`
      <wui-flex flexDirection="column" gap="s">
        ${this.templateSearchInput()} ${this.templateSuggestedTokens()} ${this.templateTokens()}
      </wui-flex>
    `}onSelectToken(a){"sourceToken"===this.targetToken?j.GN.setSourceToken(a):(j.GN.setToToken(a),this.sourceToken&&this.sourceTokenAmount&&j.GN.swapTokens()),g.I.goBack()}templateSearchInput(){return(0,d.qy)`
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
    `}templateMyTokens(){let a=this.myTokensWithBalance?Object.values(this.myTokensWithBalance):[],b=this.filterTokensWithText(a,this.searchValue);return b?.length>0?(0,d.qy)`<wui-flex justifyContent="flex-start" padding="s">
          <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
        </wui-flex>
        ${b.map(a=>{let b=a.symbol===this.sourceToken?.symbol||a.symbol===this.toToken?.symbol;return(0,d.qy)`
            <wui-token-list-item
              data-testid="swap-select-token-item-${a.symbol}"
              name=${a.name}
              ?disabled=${b}
              symbol=${a.symbol}
              price=${a?.price}
              amount=${a?.quantity?.numeric}
              imageSrc=${a.logoUri}
              @click=${()=>{b||this.onSelectToken(a)}}
            >
            </wui-token-list-item>
          `})}`:null}templateAllTokens(){let a=this.popularTokens?this.popularTokens:[],b=this.filterTokensWithText(a,this.searchValue);return this.tokensLoading?(0,d.qy)`
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
      `:b?.length>0?(0,d.qy)`
        ${b.map(a=>(0,d.qy)`
            <wui-token-list-item
              data-testid="swap-select-token-item-${a.symbol}"
              name=${a.name}
              symbol=${a.symbol}
              imageSrc=${a.logoUri}
              @click=${()=>this.onSelectToken(a)}
            >
            </wui-token-list-item>
          `)}
      `:null}templateTokens(){return(0,d.qy)`
      <wui-flex class="tokens-container">
        <wui-flex class="tokens" .padding=${["0","s","s","s"]} flexDirection="column">
          ${this.templateMyTokens()}
          <wui-flex justifyContent="flex-start" padding="s">
            <wui-text variant="paragraph-500" color="fg-200">Tokens</wui-text>
          </wui-flex>
          ${this.templateAllTokens()}
        </wui-flex>
      </wui-flex>
    `}templateSuggestedTokens(){let a=this.suggestedTokens?this.suggestedTokens.slice(0,8):null;return this.tokensLoading?(0,d.qy)`
        <wui-flex class="suggested-tokens-container" .padding=${["0","s","0","s"]} gap="xs">
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
        </wui-flex>
      `:a?(0,d.qy)`
      <wui-flex class="suggested-tokens-container" .padding=${["0","s","0","s"]} gap="xs">
        ${a.map(a=>(0,d.qy)`
            <wui-token-button
              text=${a.symbol}
              imageSrc=${a.logoUri}
              @click=${()=>this.onSelectToken(a)}
            >
            </wui-token-button>
          `)}
      </wui-flex>
    `:null}onSearchInputChange(a){this.searchValue=a.detail}handleSuggestedTokensScroll(){let a=this.renderRoot?.querySelector(".suggested-tokens-container");a&&(a.style.setProperty("--suggested-tokens-scroll--left-opacity",o.z8.interpolate([0,100],[0,1],a.scrollLeft).toString()),a.style.setProperty("--suggested-tokens-scroll--right-opacity",o.z8.interpolate([0,100],[0,1],a.scrollWidth-a.scrollLeft-a.offsetWidth).toString()))}handleTokenListScroll(){let a=this.renderRoot?.querySelector(".tokens");a&&(a.style.setProperty("--tokens-scroll--top-opacity",o.z8.interpolate([0,100],[0,1],a.scrollTop).toString()),a.style.setProperty("--tokens-scroll--bottom-opacity",o.z8.interpolate([0,100],[0,1],a.scrollHeight-a.scrollTop-a.offsetHeight).toString()))}filterTokensWithText(a,b){return a.filter(a=>`${a.symbol} ${a.name} ${a.address}`.toLowerCase().includes(b.toLowerCase())).sort((a,c)=>{let d=`${a.symbol} ${a.name} ${a.address}`.toLowerCase(),e=`${c.symbol} ${c.name} ${c.address}`.toLowerCase();return d.indexOf(b.toLowerCase())-e.indexOf(b.toLowerCase())})}};R.styles=P,Q([(0,e.wk)()],R.prototype,"interval",void 0),Q([(0,e.wk)()],R.prototype,"targetToken",void 0),Q([(0,e.wk)()],R.prototype,"sourceToken",void 0),Q([(0,e.wk)()],R.prototype,"sourceTokenAmount",void 0),Q([(0,e.wk)()],R.prototype,"toToken",void 0),Q([(0,e.wk)()],R.prototype,"myTokensWithBalance",void 0),Q([(0,e.wk)()],R.prototype,"popularTokens",void 0),Q([(0,e.wk)()],R.prototype,"suggestedTokens",void 0),Q([(0,e.wk)()],R.prototype,"tokensLoading",void 0),Q([(0,e.wk)()],R.prototype,"searchValue",void 0),R=Q([(0,o.EM)("w3m-swap-select-token-view")],R)}};