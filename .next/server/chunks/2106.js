"use strict";exports.id=2106,exports.ids=[2106],exports.modules={24005:(a,b,c)=>{var d=c(50861),e=c(52827);c(77876),c(29714),c(32490),c(56124);var f=c(67017),g=c(76382);c(8968);let h=(0,d.AH)`
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
    `}};j.styles=[f.W5,f.fD,h],i([(0,e.MZ)()],j.prototype,"imageSrc",void 0),i([(0,e.MZ)()],j.prototype,"text",void 0),i([(0,e.MZ)({type:Boolean})],j.prototype,"loading",void 0),j=i([(0,g.E)("wui-token-button")],j)},32106:(a,b,c)=>{c.r(b),c.d(b,{W3mSendSelectTokenView:()=>F,W3mWalletSendPreviewView:()=>X,W3mWalletSendView:()=>C});var d=c(50861),e=c(52827),f=c(58351),g=c(21347),h=c(71136),i=c(34526),j=c(83908),k=c(22490);c(4977),c(77838),c(95007);var l=c(15519),m=c(40764);c(42536),c(41298);let n=(0,d.AH)`
  :host {
    width: 100%;
    height: 100px;
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
    position: relative;
  }

  :host(:hover) {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    display: ruby;
    color: var(--wui-color-fg-100);
    margin: 0 var(--wui-spacing-xs);
  }

  .instruction {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .paste {
    display: inline-flex;
  }

  textarea {
    background: transparent;
    width: 100%;
    font-family: var(--w3m-font-family);
    font-size: var(--wui-font-size-medium);
    font-style: normal;
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    letter-spacing: var(--wui-letter-spacing-medium);
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    border: none;
    outline: none;
    appearance: none;
    resize: none;
    overflow: hidden;
  }
`;var o=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let p=class extends d.WF{constructor(){super(...arguments),this.inputElementRef=(0,l._)(),this.instructionElementRef=(0,l._)(),this.instructionHidden=!!this.value,this.pasting=!1,this.onDebouncedSearch=i.w.debounce(async a=>{if(!a.length)return void this.setReceiverAddress("");let b=j.W.state.activeChain;if(i.w.isAddress(a,b))return void this.setReceiverAddress(a);try{let b=await m.x.getEnsAddress(a);if(b){f.R.setReceiverProfileName(a),f.R.setReceiverAddress(b);let c=await m.x.getEnsAvatar(a);f.R.setReceiverProfileImageUrl(c||void 0)}}catch(b){this.setReceiverAddress(a)}finally{f.R.setLoading(!1)}})}firstUpdated(){this.value&&(this.instructionHidden=!0),this.checkHidden()}render(){return(0,d.qy)` <wui-flex
      @click=${this.onBoxClick.bind(this)}
      flexDirection="column"
      justifyContent="center"
      gap="4xs"
      .padding=${["2xl","l","xl","l"]}
    >
      <wui-text
        ${(0,l.K)(this.instructionElementRef)}
        class="instruction"
        color="fg-300"
        variant="medium-400"
      >
        Type or
        <wui-button
          class="paste"
          size="md"
          variant="neutral"
          iconLeft="copy"
          @click=${this.onPasteClick.bind(this)}
        >
          <wui-icon size="sm" color="inherit" slot="iconLeft" name="copy"></wui-icon>
          Paste
        </wui-button>
        address
      </wui-text>
      <textarea
        spellcheck="false"
        ?disabled=${!this.instructionHidden}
        ${(0,l.K)(this.inputElementRef)}
        @input=${this.onInputChange.bind(this)}
        @blur=${this.onBlur.bind(this)}
        .value=${this.value??""}
        autocomplete="off"
      >
${this.value??""}</textarea
      >
    </wui-flex>`}async focusInput(){this.instructionElementRef.value&&(this.instructionHidden=!0,await this.toggleInstructionFocus(!1),this.instructionElementRef.value.style.pointerEvents="none",this.inputElementRef.value?.focus(),this.inputElementRef.value&&(this.inputElementRef.value.selectionStart=this.inputElementRef.value.selectionEnd=this.inputElementRef.value.value.length))}async focusInstruction(){this.instructionElementRef.value&&(this.instructionHidden=!1,await this.toggleInstructionFocus(!0),this.instructionElementRef.value.style.pointerEvents="auto",this.inputElementRef.value?.blur())}async toggleInstructionFocus(a){this.instructionElementRef.value&&await this.instructionElementRef.value.animate([{opacity:+!a},{opacity:+!!a}],{duration:100,easing:"ease",fill:"forwards"}).finished}onBoxClick(){this.value||this.instructionHidden||this.focusInput()}onBlur(){this.value||!this.instructionHidden||this.pasting||this.focusInstruction()}checkHidden(){this.instructionHidden&&this.focusInput()}async onPasteClick(){this.pasting=!0;let a=await navigator.clipboard.readText();f.R.setReceiverAddress(a),this.focusInput()}onInputChange(a){let b=a.target;this.pasting=!1,this.value=a.target?.value,b.value&&!this.instructionHidden&&this.focusInput(),f.R.setLoading(!0),this.onDebouncedSearch(b.value)}setReceiverAddress(a){f.R.setReceiverAddress(a),f.R.setReceiverProfileName(void 0),f.R.setReceiverProfileImageUrl(void 0),f.R.setLoading(!1)}};p.styles=n,o([(0,e.MZ)()],p.prototype,"value",void 0),o([(0,e.wk)()],p.prototype,"instructionHidden",void 0),o([(0,e.wk)()],p.prototype,"pasting",void 0),p=o([(0,k.EM)("w3m-input-address")],p);var q=c(22329),r=c(89153),s=c(67017),t=c(76382);let u=(0,d.AH)`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    background: transparent;
    width: 100%;
    height: auto;
    font-family: var(--wui-font-family);
    color: var(--wui-color-fg-100);

    font-feature-settings: 'case' on;
    font-size: 32px;
    font-weight: var(--wui-font-weight-light);
    caret-color: var(--wui-color-accent-100);
    line-height: 130%;
    letter-spacing: -1.28px;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }
`;var v=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let w=class extends d.WF{constructor(){super(...arguments),this.inputElementRef=(0,l._)(),this.disabled=!1,this.value="",this.placeholder="0"}render(){return this.inputElementRef?.value&&this.value&&(this.inputElementRef.value.value=this.value),(0,d.qy)`<input
      ${(0,l.K)(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value??""}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    /> `}dispatchInputChangeEvent(a){let b=a.data;if(b&&this.inputElementRef?.value)if(","===b){let a=this.inputElementRef.value.value.replace(",",".");this.inputElementRef.value.value=a,this.value=`${this.value}${a}`}else r.Ky.test(b)||(this.inputElementRef.value.value=this.value.replace(RegExp(b.replace(r.PG,"\\$&"),"gu"),""));this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};w.styles=[s.W5,s.fD,u],v([(0,e.MZ)({type:Boolean})],w.prototype,"disabled",void 0),v([(0,e.MZ)({type:String})],w.prototype,"value",void 0),v([(0,e.MZ)({type:String})],w.prototype,"placeholder",void 0),w=v([(0,t.E)("wui-input-amount")],w),c(73019),c(24005);let x=(0,d.AH)`
  :host {
    width: 100%;
    height: 100px;
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host(:hover) {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  wui-input-amount {
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

  .totalValue {
    width: 100%;
  }
`;var y=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let z=class extends d.WF{render(){return(0,d.qy)` <wui-flex
      flexDirection="column"
      gap="4xs"
      .padding=${["xl","s","l","l"]}
    >
      <wui-flex alignItems="center">
        <wui-input-amount
          @inputChange=${this.onInputChange.bind(this)}
          ?disabled=${!this.token}
          .value=${this.sendTokenAmount?String(this.sendTokenAmount):""}
        ></wui-input-amount>
        ${this.buttonTemplate()}
      </wui-flex>
      <wui-flex alignItems="center" justifyContent="space-between">
        ${this.sendValueTemplate()}
        <wui-flex alignItems="center" gap="4xs" justifyContent="flex-end">
          ${this.maxAmountTemplate()} ${this.actionTemplate()}
        </wui-flex>
      </wui-flex>
    </wui-flex>`}buttonTemplate(){return this.token?(0,d.qy)`<wui-token-button
        text=${this.token.symbol}
        imageSrc=${this.token.iconUrl}
        @click=${this.handleSelectButtonClick.bind(this)}
      >
      </wui-token-button>`:(0,d.qy)`<wui-button
      size="md"
      variant="accent"
      @click=${this.handleSelectButtonClick.bind(this)}
      >Select token</wui-button
    >`}handleSelectButtonClick(){h.I.push("WalletSendSelectToken")}sendValueTemplate(){if(this.token&&this.sendTokenAmount){let a=this.token.price*this.sendTokenAmount;return(0,d.qy)`<wui-text class="totalValue" variant="small-400" color="fg-200"
        >${a?`$${q.S.formatNumberToLocalString(a,2)}`:"Incorrect value"}</wui-text
      >`}return null}maxAmountTemplate(){return this.token?this.sendTokenAmount&&this.sendTokenAmount>Number(this.token.quantity.numeric)?(0,d.qy)` <wui-text variant="small-400" color="error-100">
          ${k.Zv.roundNumber(Number(this.token.quantity.numeric),6,5)}
        </wui-text>`:(0,d.qy)` <wui-text variant="small-400" color="fg-200">
        ${k.Zv.roundNumber(Number(this.token.quantity.numeric),6,5)}
      </wui-text>`:null}actionTemplate(){return this.token?this.sendTokenAmount&&this.sendTokenAmount>Number(this.token.quantity.numeric)?(0,d.qy)`<wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>`:(0,d.qy)`<wui-link @click=${this.onMaxClick.bind(this)}>Max</wui-link>`:null}onInputChange(a){f.R.setTokenAmount(a.detail)}onMaxClick(){if(this.token){let a=q.S.bigNumber(this.token.quantity.numeric);f.R.setTokenAmount(Number(a.toFixed(20)))}}onBuyClick(){h.I.push("OnRampProviders")}};z.styles=x,y([(0,e.MZ)({type:Object})],z.prototype,"token",void 0),y([(0,e.MZ)({type:Number})],z.prototype,"sendTokenAmount",void 0),z=y([(0,k.EM)("w3m-input-token")],z);let A=(0,d.AH)`
  :host {
    display: block;
  }

  wui-flex {
    position: relative;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xs) !important;
    border: 5px solid var(--wui-color-bg-125);
    background: var(--wui-color-bg-175);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  wui-button {
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }

  .inputContainer {
    height: fit-content;
  }
`;var B=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let C=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.token=f.R.state.token,this.sendTokenAmount=f.R.state.sendTokenAmount,this.receiverAddress=f.R.state.receiverAddress,this.receiverProfileName=f.R.state.receiverProfileName,this.loading=f.R.state.loading,this.message="Preview Send",this.token&&(this.fetchBalances(),this.fetchNetworkPrice()),this.unsubscribe.push(f.R.subscribe(a=>{this.token=a.token,this.sendTokenAmount=a.sendTokenAmount,this.receiverAddress=a.receiverAddress,this.receiverProfileName=a.receiverProfileName,this.loading=a.loading}))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){return this.getMessage(),(0,d.qy)` <wui-flex flexDirection="column" .padding=${["0","l","l","l"]}>
      <wui-flex class="inputContainer" gap="xs" flexDirection="column">
        <w3m-input-token
          .token=${this.token}
          .sendTokenAmount=${this.sendTokenAmount}
        ></w3m-input-token>
        <wui-icon-box
          size="inherit"
          backgroundColor="fg-300"
          iconSize="lg"
          iconColor="fg-250"
          background="opaque"
          icon="arrowBottom"
        ></wui-icon-box>
        <w3m-input-address
          .value=${this.receiverProfileName?this.receiverProfileName:this.receiverAddress}
        ></w3m-input-address>
      </wui-flex>
      <wui-flex .margin=${["l","0","0","0"]}>
        <wui-button
          @click=${this.onButtonClick.bind(this)}
          ?disabled=${!this.message.startsWith("Preview Send")}
          size="lg"
          variant="main"
          ?loading=${this.loading}
          fullWidth
        >
          ${this.message}
        </wui-button>
      </wui-flex>
    </wui-flex>`}async fetchBalances(){await f.R.fetchTokenBalance(),f.R.fetchNetworkBalance()}async fetchNetworkPrice(){await g.GN.getNetworkTokenPrice()}onButtonClick(){h.I.push("WalletSendPreview")}getMessage(){this.message="Preview Send",this.receiverAddress&&!i.w.isAddress(this.receiverAddress,j.W.state.activeChain)&&(this.message="Invalid Address"),this.receiverAddress||(this.message="Add Address"),this.sendTokenAmount&&this.token&&this.sendTokenAmount>Number(this.token.quantity.numeric)&&(this.message="Insufficient Funds"),this.sendTokenAmount||(this.message="Add Amount"),this.sendTokenAmount&&this.token?.price&&(this.sendTokenAmount*this.token.price||(this.message="Incorrect Value")),this.token||(this.message="Select Token")}};C.styles=A,B([(0,e.wk)()],C.prototype,"token",void 0),B([(0,e.wk)()],C.prototype,"sendTokenAmount",void 0),B([(0,e.wk)()],C.prototype,"receiverAddress",void 0),B([(0,e.wk)()],C.prototype,"receiverProfileName",void 0),B([(0,e.wk)()],C.prototype,"loading",void 0),B([(0,e.wk)()],C.prototype,"message",void 0),C=B([(0,k.EM)("w3m-wallet-send-view")],C),c(58969),c(23933),c(63999);let D=(0,d.AH)`
  .contentContainer {
    height: 440px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }
`;var E=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let F=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.tokenBalances=f.R.state.tokenBalances,this.search="",this.onDebouncedSearch=i.w.debounce(a=>{this.search=a}),this.fetchBalancesAndNetworkPrice(),this.unsubscribe.push(f.R.subscribe(a=>{this.tokenBalances=a.tokenBalances}))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){return(0,d.qy)`
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `}async fetchBalancesAndNetworkPrice(){this.tokenBalances&&this.tokenBalances?.length!==0||(await this.fetchBalances(),await this.fetchNetworkPrice())}async fetchBalances(){await f.R.fetchTokenBalance(),f.R.fetchNetworkBalance()}async fetchNetworkPrice(){await g.GN.getNetworkTokenPrice()}templateSearchInput(){return(0,d.qy)`
      <wui-flex gap="xs" padding="s">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}templateTokens(){return this.tokens=this.tokenBalances?.filter(a=>a.chainId===j.W.state.activeCaipNetwork?.caipNetworkId),this.search?this.filteredTokens=this.tokenBalances?.filter(a=>a.name.toLowerCase().includes(this.search.toLowerCase())):this.filteredTokens=this.tokens,(0,d.qy)`
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${["0","s","0","s"]}
      >
        <wui-flex justifyContent="flex-start" .padding=${["m","s","s","s"]}>
          <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="xs">
          ${this.filteredTokens&&this.filteredTokens.length>0?this.filteredTokens.map(a=>(0,d.qy)`<wui-list-token
                    @click=${this.handleTokenClick.bind(this,a)}
                    ?clickable=${!0}
                    tokenName=${a.name}
                    tokenImageUrl=${a.iconUrl}
                    tokenAmount=${a.quantity.numeric}
                    tokenValue=${a.value}
                    tokenCurrency=${a.symbol}
                  ></wui-list-token>`):(0,d.qy)`<wui-flex
                .padding=${["4xl","0","0","0"]}
                alignItems="center"
                flexDirection="column"
                gap="l"
              >
                <wui-icon-box
                  icon="coinPlaceholder"
                  size="inherit"
                  iconColor="fg-200"
                  backgroundColor="fg-200"
                  iconSize="lg"
                ></wui-icon-box>
                <wui-flex
                  class="textContent"
                  gap="xs"
                  flexDirection="column"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <wui-text variant="paragraph-500" align="center" color="fg-100"
                    >No tokens found</wui-text
                  >
                  <wui-text variant="small-400" align="center" color="fg-200"
                    >Your tokens will appear here</wui-text
                  >
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `}onBuyClick(){h.I.push("OnRampProviders")}onInputChange(a){this.onDebouncedSearch(a.detail)}handleTokenClick(a){f.R.setToken(a),f.R.setTokenAmount(void 0),h.I.goBack()}};F.styles=D,E([(0,e.wk)()],F.prototype,"tokenBalances",void 0),E([(0,e.wk)()],F.prototype,"tokens",void 0),E([(0,e.wk)()],F.prototype,"filteredTokens",void 0),E([(0,e.wk)()],F.prototype,"search",void 0),F=E([(0,k.EM)("w3m-wallet-send-select-token-view")],F);var G=c(97543),H=c(98604),I=c(79508);c(78488),c(77876),c(32490),c(56124),c(33608);let J=(0,d.AH)`
  :host {
    display: flex;
    gap: var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-xs) var(--wui-spacing-2xs)
      var(--wui-spacing-s);
    align-items: center;
  }

  wui-avatar,
  wui-icon,
  wui-image {
    width: 32px;
    height: 32px;
    border: 1px solid var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-002);
  }
`;var K=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let L=class extends d.WF{constructor(){super(...arguments),this.text="",this.address="",this.isAddress=!1}render(){return(0,d.qy)`<wui-text variant="large-500" color="fg-100">${this.text}</wui-text>
      ${this.imageTemplate()}`}imageTemplate(){return this.isAddress?(0,d.qy)`<wui-avatar address=${this.address} .imageSrc=${this.imageSrc}></wui-avatar>`:this.imageSrc?(0,d.qy)`<wui-image src=${this.imageSrc}></wui-image>`:(0,d.qy)`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};L.styles=[s.W5,s.fD,J],K([(0,e.MZ)()],L.prototype,"text",void 0),K([(0,e.MZ)()],L.prototype,"address",void 0),K([(0,e.MZ)()],L.prototype,"imageSrc",void 0),K([(0,e.MZ)({type:Boolean})],L.prototype,"isAddress",void 0),L=K([(0,t.E)("wui-preview-item")],L);var M=c(71452),N=c(24115),O=c(30221);let P=(0,d.AH)`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: 17px 18px 17px var(--wui-spacing-m);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
  }

  wui-image {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-icon {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
  }
`;var Q=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let R=class extends d.WF{constructor(){super(...arguments),this.imageSrc=void 0,this.textTitle="",this.textValue=void 0}render(){return(0,d.qy)`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color=${this.textValue?"fg-200":"fg-100"}>
          ${this.textTitle}
        </wui-text>
        ${this.templateContent()}
      </wui-flex>
    `}templateContent(){return this.imageSrc?(0,d.qy)`<wui-image src=${this.imageSrc} alt=${this.textTitle}></wui-image>`:this.textValue?(0,d.qy)` <wui-text variant="paragraph-400" color="fg-100"> ${this.textValue} </wui-text>`:(0,d.qy)`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};R.styles=[s.W5,s.fD,P],Q([(0,e.MZ)()],R.prototype,"imageSrc",void 0),Q([(0,e.MZ)()],R.prototype,"textTitle",void 0),Q([(0,e.MZ)()],R.prototype,"textValue",void 0),R=Q([(0,t.E)("wui-list-content")],R);let S=(0,d.AH)`
  :host {
    display: flex;
    width: auto;
    flex-direction: column;
    gap: var(--wui-border-radius-1xs);
    border-radius: var(--wui-border-radius-s);
    background: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-s) var(--wui-spacing-1xs) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }

  wui-text {
    padding: 0 var(--wui-spacing-1xs);
  }

  wui-flex {
    margin-top: var(--wui-spacing-1xs);
  }

  .network {
    cursor: pointer;
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  .network:focus-visible {
    border: 1px solid var(--wui-color-accent-100);
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  .network:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .network:active {
    background-color: var(--wui-color-gray-glass-010);
  }
`;var T=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let U=class extends d.WF{render(){return(0,d.qy)` <wui-text variant="small-400" color="fg-200">Details</wui-text>
      <wui-flex flexDirection="column" gap="xxs">
        <wui-list-content
          textTitle="Address"
          textValue=${k.Zv.getTruncateString({string:this.receiverAddress??"",charsStart:4,charsEnd:4,truncate:"middle"})}
        >
        </wui-list-content>
        ${this.networkTemplate()}
      </wui-flex>`}networkTemplate(){return this.caipNetwork?.name?(0,d.qy)` <wui-list-content
        @click=${()=>this.onNetworkClick(this.caipNetwork)}
        class="network"
        textTitle="Network"
        imageSrc=${(0,N.J)(O.$.getNetworkImage(this.caipNetwork))}
      ></wui-list-content>`:null}onNetworkClick(a){a&&h.I.push("Networks",{network:a})}};U.styles=S,T([(0,e.MZ)()],U.prototype,"receiverAddress",void 0),T([(0,e.MZ)({type:Object})],U.prototype,"caipNetwork",void 0),U=T([(0,k.EM)("w3m-wallet-send-details")],U);let V=(0,d.AH)`
  wui-avatar,
  wui-image {
    display: ruby;
    width: 32px;
    height: 32px;
    border-radius: var(--wui-border-radius-3xl);
  }

  .sendButton {
    width: 70%;
    --local-width: 100% !important;
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }

  .cancelButton {
    width: 30%;
    --local-width: 100% !important;
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }
`;var W=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let X=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.token=f.R.state.token,this.sendTokenAmount=f.R.state.sendTokenAmount,this.receiverAddress=f.R.state.receiverAddress,this.receiverProfileName=f.R.state.receiverProfileName,this.receiverProfileImageUrl=f.R.state.receiverProfileImageUrl,this.caipNetwork=j.W.state.activeCaipNetwork,this.loading=f.R.state.loading,this.unsubscribe.push(f.R.subscribe(a=>{this.token=a.token,this.sendTokenAmount=a.sendTokenAmount,this.receiverAddress=a.receiverAddress,this.receiverProfileName=a.receiverProfileName,this.receiverProfileImageUrl=a.receiverProfileImageUrl,this.loading=a.loading}),j.W.subscribeKey("activeCaipNetwork",a=>this.caipNetwork=a))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){return(0,d.qy)` <wui-flex flexDirection="column" .padding=${["0","l","l","l"]}>
      <wui-flex gap="xs" flexDirection="column" .padding=${["0","xs","0","xs"]}>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-flex flexDirection="column" gap="4xs">
            <wui-text variant="small-400" color="fg-150">Send</wui-text>
            ${this.sendValueTemplate()}
          </wui-flex>
          <wui-preview-item
            text="${this.sendTokenAmount?k.Zv.roundNumber(this.sendTokenAmount,6,5):"unknown"} ${this.token?.symbol}"
            .imageSrc=${this.token?.iconUrl}
          ></wui-preview-item>
        </wui-flex>
        <wui-flex>
          <wui-icon color="fg-200" size="md" name="arrowBottom"></wui-icon>
        </wui-flex>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="small-400" color="fg-150">To</wui-text>
          <wui-preview-item
            text="${this.receiverProfileName?k.Zv.getTruncateString({string:this.receiverProfileName,charsStart:20,charsEnd:0,truncate:"end"}):k.Zv.getTruncateString({string:this.receiverAddress?this.receiverAddress:"",charsStart:4,charsEnd:4,truncate:"middle"})}"
            address=${this.receiverAddress??""}
            .imageSrc=${this.receiverProfileImageUrl??void 0}
            .isAddress=${!0}
          ></wui-preview-item>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" .padding=${["xxl","0","0","0"]}>
        <w3m-wallet-send-details
          .caipNetwork=${this.caipNetwork}
          .receiverAddress=${this.receiverAddress}
        ></w3m-wallet-send-details>
        <wui-flex justifyContent="center" gap="xxs" .padding=${["s","0","0","0"]}>
          <wui-icon size="sm" color="fg-200" name="warningCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>
        <wui-flex justifyContent="center" gap="s" .padding=${["l","0","0","0"]}>
          <wui-button
            class="cancelButton"
            @click=${this.onCancelClick.bind(this)}
            size="lg"
            variant="neutral"
          >
            Cancel
          </wui-button>
          <wui-button
            class="sendButton"
            @click=${this.onSendClick.bind(this)}
            size="lg"
            variant="main"
            .loading=${this.loading}
          >
            Send
          </wui-button>
        </wui-flex>
      </wui-flex></wui-flex
    >`}sendValueTemplate(){if(this.token&&this.sendTokenAmount){let a=this.token.price*this.sendTokenAmount;return(0,d.qy)`<wui-text variant="paragraph-400" color="fg-100"
        >$${a.toFixed(2)}</wui-text
      >`}return null}async onSendClick(){if(!this.sendTokenAmount||!this.receiverAddress)return void G.P.showError("Please enter a valid amount and receiver address");try{await f.R.sendToken(),G.P.showSuccess("Transaction started"),h.I.replace("Account")}catch(b){G.P.showError("Failed to send transaction. Please try again."),console.error("SendController:sendToken - failed to send transaction",b);let a=b instanceof Error?b.message:"Unknown error";H.E.sendEvent({type:"track",event:"SEND_ERROR",properties:{message:a,isSmartAccount:(0,I.lj)(j.W.state.activeChain)===M.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,token:this.token?.symbol||"",amount:this.sendTokenAmount,network:j.W.state.activeCaipNetwork?.caipNetworkId||""}})}}onCancelClick(){h.I.goBack()}};X.styles=V,W([(0,e.wk)()],X.prototype,"token",void 0),W([(0,e.wk)()],X.prototype,"sendTokenAmount",void 0),W([(0,e.wk)()],X.prototype,"receiverAddress",void 0),W([(0,e.wk)()],X.prototype,"receiverProfileName",void 0),W([(0,e.wk)()],X.prototype,"receiverProfileImageUrl",void 0),W([(0,e.wk)()],X.prototype,"caipNetwork",void 0),W([(0,e.wk)()],X.prototype,"loading",void 0),X=W([(0,k.EM)("w3m-wallet-send-preview-view")],X)}};