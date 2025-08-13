"use strict";exports.id=860,exports.ids=[860],exports.modules={70860:(a,b,c)=>{c.r(b),c.d(b,{W3mBuyInProgressView:()=>L,W3mFundWalletView:()=>P,W3mOnRampProvidersView:()=>C,W3mOnrampFiatSelectView:()=>o,W3mOnrampTokensView:()=>F,W3mOnrampWidget:()=>X,W3mWhatIsABuyView:()=>M});var d=c(50861),e=c(52827),f=c(24115),g=c(2104),h=c(43829),i=c(89990),j=c(12335),k=c(26728),l=c(22490);c(77838),c(1803),c(41298),c(6932),c(62423);let m=(0,d.AH)`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var n=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let o=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=g.aG.state.paymentCurrency,this.currencies=g.aG.state.paymentCurrencies,this.currencyImages=h.j.state.currencyImages,this.checked=i.o.state.isLegalCheckboxChecked,this.unsubscribe.push(g.aG.subscribe(a=>{this.selectedCurrency=a.paymentCurrency,this.currencies=a.paymentCurrencies}),h.j.subscribeKey("currencyImages",a=>this.currencyImages=a),i.o.subscribeKey("isLegalCheckboxChecked",a=>{this.checked=a}))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let{termsConditionsUrl:a,privacyPolicyUrl:b}=j.H.state,c=j.H.state.features?.legalCheckbox,e=!!(a||b)&&!!c&&!this.checked;return(0,d.qy)`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","s","s","s"]}
        gap="xs"
        class=${(0,f.J)(e?"disabled":void 0)}
      >
        ${this.currenciesTemplate(e)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}currenciesTemplate(a=!1){return this.currencies.map(b=>(0,d.qy)`
        <wui-list-item
          imageSrc=${(0,f.J)(this.currencyImages?.[b.id])}
          @click=${()=>this.selectCurrency(b)}
          variant="image"
          tabIdx=${(0,f.J)(a?-1:void 0)}
        >
          <wui-text variant="paragraph-500" color="fg-100">${b.id}</wui-text>
        </wui-list-item>
      `)}selectCurrency(a){a&&(g.aG.setPaymentCurrency(a),k.W.close())}};o.styles=m,n([(0,e.wk)()],o.prototype,"selectedCurrency",void 0),n([(0,e.wk)()],o.prototype,"currencies",void 0),n([(0,e.wk)()],o.prototype,"currencyImages",void 0),n([(0,e.wk)()],o.prototype,"checked",void 0),o=n([(0,l.EM)("w3m-onramp-fiat-select-view")],o);var p=c(83908),q=c(71136),r=c(34526),s=c(98604),t=c(79508),u=c(71452),v=c(30221);c(42536),c(72880),c(25577),c(72057);let w=(0,d.AH)`
  button {
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xs);
    border: none;
    outline: none;
    background-color: var(--wui-color-gray-glass-002);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--wui-spacing-s);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .provider-image {
    width: var(--wui-spacing-3xl);
    min-width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: calc(var(--wui-border-radius-xs) - calc(var(--wui-spacing-s) / 2));
    position: relative;
    overflow: hidden;
  }

  .provider-image::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-xs) - calc(var(--wui-spacing-s) / 2));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  .network-icon {
    width: var(--wui-spacing-m);
    height: var(--wui-spacing-m);
    border-radius: calc(var(--wui-spacing-m) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: box-shadow;
  }

  button:hover .network-icon {
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-005),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`;var x=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let y=class extends d.WF{constructor(){super(...arguments),this.disabled=!1,this.color="inherit",this.label="",this.feeRange="",this.loading=!1,this.onClick=null}render(){return(0,d.qy)`
      <button ?disabled=${this.disabled} @click=${this.onClick} ontouchstart>
        <wui-visual name=${(0,f.J)(this.name)} class="provider-image"></wui-visual>
        <wui-flex flexDirection="column" gap="4xs">
          <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
          <wui-flex alignItems="center" justifyContent="flex-start" gap="l">
            <wui-text variant="tiny-500" color="fg-100">
              <wui-text variant="tiny-400" color="fg-200">Fees</wui-text>
              ${this.feeRange}
            </wui-text>
            <wui-flex gap="xxs">
              <wui-icon name="bank" size="xs" color="fg-150"></wui-icon>
              <wui-icon name="card" size="xs" color="fg-150"></wui-icon>
            </wui-flex>
            ${this.networksTemplate()}
          </wui-flex>
        </wui-flex>
        ${this.loading?(0,d.qy)`<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>`:(0,d.qy)`<wui-icon name="chevronRight" color="fg-200" size="sm"></wui-icon>`}
      </button>
    `}networksTemplate(){let a=p.W.getAllRequestedCaipNetworks(),b=a?.filter(a=>a?.assets?.imageId)?.slice(0,5);return(0,d.qy)`
      <wui-flex class="networks">
        ${b?.map(a=>(0,d.qy)`
            <wui-flex class="network-icon">
              <wui-image src=${(0,f.J)(v.$.getNetworkImage(a))}></wui-image>
            </wui-flex>
          `)}
      </wui-flex>
    `}};y.styles=[w],x([(0,e.MZ)({type:Boolean})],y.prototype,"disabled",void 0),x([(0,e.MZ)()],y.prototype,"color",void 0),x([(0,e.MZ)()],y.prototype,"name",void 0),x([(0,e.MZ)()],y.prototype,"label",void 0),x([(0,e.MZ)()],y.prototype,"feeRange",void 0),x([(0,e.MZ)({type:Boolean})],y.prototype,"loading",void 0),x([(0,e.MZ)()],y.prototype,"onClick",void 0),y=x([(0,l.EM)("w3m-onramp-provider-item")],y),c(73019);let z=(0,d.AH)`
  wui-flex {
    border-top: 1px solid var(--wui-color-gray-glass-005);
  }

  a {
    text-decoration: none;
    color: var(--wui-color-fg-175);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);
  }
`,A=class extends d.WF{render(){let{termsConditionsUrl:a,privacyPolicyUrl:b}=j.H.state;return a||b?(0,d.qy)`
      <wui-flex
        .padding=${["m","s","s","s"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="s"
      >
        <wui-text color="fg-250" variant="small-400" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `:null}howDoesItWorkTemplate(){return(0,d.qy)` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`}onWhatIsBuy(){s.E.sendEvent({type:"track",event:"SELECT_WHAT_IS_A_BUY",properties:{isSmartAccount:(0,t.lj)(p.W.state.activeChain)===u.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}}),q.I.push("WhatIsABuy")}};A.styles=[z],A=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,l.EM)("w3m-onramp-providers-footer")],A);var B=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let C=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.providers=g.aG.state.providers,this.unsubscribe.push(g.aG.subscribeKey("providers",a=>{this.providers=a}))}render(){return(0,d.qy)`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
      <w3m-onramp-providers-footer></w3m-onramp-providers-footer>
    `}onRampProvidersTemplate(){return this.providers.filter(a=>a.supportedChains.includes(p.W.state.activeChain??"eip155")).map(a=>(0,d.qy)`
          <w3m-onramp-provider-item
            label=${a.label}
            name=${a.name}
            feeRange=${a.feeRange}
            @click=${()=>{this.onClickProvider(a)}}
            ?disabled=${!a.url}
            data-testid=${`onramp-provider-${a.name}`}
          ></w3m-onramp-provider-item>
        `)}onClickProvider(a){g.aG.setSelectedProvider(a),q.I.push("BuyInProgress"),r.w.openHref(g.aG.state.selectedProvider?.url||a.url,"popupWindow","width=600,height=800,scrollbars=yes"),s.E.sendEvent({type:"track",event:"SELECT_BUY_PROVIDER",properties:{provider:a.name,isSmartAccount:(0,t.lj)(p.W.state.activeChain)===u.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}})}};B([(0,e.wk)()],C.prototype,"providers",void 0),C=B([(0,l.EM)("w3m-onramp-providers-view")],C);let D=(0,d.AH)`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var E=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let F=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=g.aG.state.purchaseCurrencies,this.tokens=g.aG.state.purchaseCurrencies,this.tokenImages=h.j.state.tokenImages,this.checked=i.o.state.isLegalCheckboxChecked,this.unsubscribe.push(g.aG.subscribe(a=>{this.selectedCurrency=a.purchaseCurrencies,this.tokens=a.purchaseCurrencies}),h.j.subscribeKey("tokenImages",a=>this.tokenImages=a),i.o.subscribeKey("isLegalCheckboxChecked",a=>{this.checked=a}))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let{termsConditionsUrl:a,privacyPolicyUrl:b}=j.H.state,c=j.H.state.features?.legalCheckbox,e=!!(a||b)&&!!c&&!this.checked;return(0,d.qy)`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","s","s","s"]}
        gap="xs"
        class=${(0,f.J)(e?"disabled":void 0)}
      >
        ${this.currenciesTemplate(e)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}currenciesTemplate(a=!1){return this.tokens.map(b=>(0,d.qy)`
        <wui-list-item
          imageSrc=${(0,f.J)(this.tokenImages?.[b.symbol])}
          @click=${()=>this.selectToken(b)}
          variant="image"
          tabIdx=${(0,f.J)(a?-1:void 0)}
        >
          <wui-flex gap="3xs" alignItems="center">
            <wui-text variant="paragraph-500" color="fg-100">${b.name}</wui-text>
            <wui-text variant="small-400" color="fg-200">${b.symbol}</wui-text>
          </wui-flex>
        </wui-list-item>
      `)}selectToken(a){a&&(g.aG.setPurchaseCurrency(a),k.W.close())}};F.styles=D,E([(0,e.wk)()],F.prototype,"selectedCurrency",void 0),E([(0,e.wk)()],F.prototype,"tokens",void 0),E([(0,e.wk)()],F.prototype,"tokenImages",void 0),E([(0,e.wk)()],F.prototype,"checked",void 0),F=E([(0,l.EM)("w3m-onramp-token-select-view")],F);var G=c(40764),H=c(83344),I=c(97543);c(4977),c(95007),c(66655);let J=(0,d.AH)`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    width: var(--wui-wallet-image-size-lg);
    height: var(--wui-wallet-image-size-lg);
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--wui-ease-out-power-2) var(--wui-duration-lg),
      transform var(--wui-ease-out-power-2) var(--wui-duration-lg);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
  }
`;var K=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let L=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.selectedOnRampProvider=g.aG.state.selectedProvider,this.uri=G.x.state.wcUri,this.ready=!1,this.showRetry=!1,this.buffering=!1,this.error=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(g.aG.subscribeKey("selectedProvider",a=>{this.selectedOnRampProvider=a}))}disconnectedCallback(){this.intervalId&&clearInterval(this.intervalId)}render(){let a="Continue in external window";this.error?a="Buy failed":this.selectedOnRampProvider&&(a=`Buy in ${this.selectedOnRampProvider?.label}`);let b=this.error?"Buy can be declined from your side or due to and error on the provider app":`We’ll notify you once your Buy is processed`;return(0,d.qy)`
      <wui-flex
        data-error=${(0,f.J)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-visual
            name=${(0,f.J)(this.selectedOnRampProvider?.name)}
            size="lg"
            class="provider-image"
          >
          </wui-visual>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${a}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${b}</wui-text>
        </wui-flex>

        ${this.error?this.tryAgainTemplate():null}
      </wui-flex>

      <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
        <wui-link @click=${this.onCopyUri} color="fg-200">
          <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
          Copy link
        </wui-link>
      </wui-flex>
    `}onTryAgain(){this.selectedOnRampProvider&&(this.error=!1,r.w.openHref(this.selectedOnRampProvider.url,"popupWindow","width=600,height=800,scrollbars=yes"))}tryAgainTemplate(){return this.selectedOnRampProvider?.url?(0,d.qy)`<wui-button size="md" variant="accent" @click=${this.onTryAgain.bind(this)}>
      <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
      Try again
    </wui-button>`:null}loaderTemplate(){let a=H.W.state.themeVariables["--w3m-border-radius-master"],b=a?parseInt(a.replace("px",""),10):4;return(0,d.qy)`<wui-loading-thumbnail radius=${9*b}></wui-loading-thumbnail>`}onCopyUri(){if(!this.selectedOnRampProvider?.url){I.P.showError("No link found"),q.I.goBack();return}try{r.w.copyToClopboard(this.selectedOnRampProvider.url),I.P.showSuccess("Link copied")}catch{I.P.showError("Failed to copy")}}};L.styles=J,K([(0,e.wk)()],L.prototype,"intervalId",void 0),K([(0,e.wk)()],L.prototype,"selectedOnRampProvider",void 0),K([(0,e.wk)()],L.prototype,"uri",void 0),K([(0,e.wk)()],L.prototype,"ready",void 0),K([(0,e.wk)()],L.prototype,"showRetry",void 0),K([(0,e.wk)()],L.prototype,"buffering",void 0),K([(0,e.wk)()],L.prototype,"error",void 0),K([(0,e.MZ)({type:Boolean})],L.prototype,"isMobile",void 0),K([(0,e.MZ)()],L.prototype,"onRetry",void 0),L=K([(0,l.EM)("w3m-buy-in-progress-view")],L);let M=class extends d.WF{render(){return(0,d.qy)`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","3xl","xl","3xl"]}
        alignItems="center"
        gap="xl"
      >
        <wui-visual name="onrampCard"></wui-visual>
        <wui-flex flexDirection="column" gap="xs" alignItems="center">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Quickly and easily buy digital assets!
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Simply select your preferred onramp provider and add digital assets to your account
            using your credit card or bank transfer
          </wui-text>
        </wui-flex>
        <wui-button @click=${q.I.goBack}>
          <wui-icon size="sm" color="inherit" name="add" slot="iconLeft"></wui-icon>
          Buy
        </wui-button>
      </wui-flex>
    `}};M=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,l.EM)("w3m-what-is-a-buy-view")],M);var N=c(80796),O=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let P=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.namespace=p.W.state.activeChain,this.features=j.H.state.features,this.remoteFeatures=j.H.state.remoteFeatures,this.unsubscribe.push(j.H.subscribeKey("features",a=>this.features=a),j.H.subscribeKey("remoteFeatures",a=>this.remoteFeatures=a),p.W.subscribeKey("activeChain",a=>this.namespace=a),p.W.subscribeKey("activeCaipNetwork",a=>{a?.chainNamespace&&(this.namespace=a?.chainNamespace)}))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){return(0,d.qy)`
      <wui-flex flexDirection="column" .padding=${["0","s","xl","s"]} gap="xs">
        ${this.onrampTemplate()} ${this.receiveTemplate()}
      </wui-flex>
    `}onrampTemplate(){if(!this.namespace)return null;let a=this.remoteFeatures?.onramp,b=N.oU.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);return a&&b?(0,d.qy)`
      <wui-list-description
        @click=${this.onBuyCrypto.bind(this)}
        text="Buy crypto"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        data-testid="wallet-features-onramp-button"
      ></wui-list-description>
    `:null}receiveTemplate(){return this.features?.receive?(0,d.qy)`
      <wui-list-description
        @click=${this.onReceive.bind(this)}
        text="Receive funds"
        icon="qrCode"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="wallet-features-receive-button"
      ></wui-list-description>
    `:null}onBuyCrypto(){q.I.push("OnRampProviders")}onReceive(){q.I.push("WalletReceive")}};O([(0,e.wk)()],P.prototype,"namespace",void 0),O([(0,e.wk)()],P.prototype,"features",void 0),O([(0,e.wk)()],P.prototype,"remoteFeatures",void 0),P=O([(0,l.EM)("w3m-fund-wallet-view")],P),c(58969);let Q=(0,d.AH)`
  :host {
    width: 100%;
  }

  wui-loading-spinner {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .currency-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--wui-spacing-1xs);
    height: 40px;
    padding: var(--wui-spacing-xs) var(--wui-spacing-1xs) var(--wui-spacing-xs)
      var(--wui-spacing-xs);
    min-width: 95px;
    border-radius: var(--FULL, 1000px);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    cursor: pointer;
  }

  .currency-container > wui-image {
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
`;var R=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let S=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.type="Token",this.value=0,this.currencies=[],this.selectedCurrency=this.currencies?.[0],this.currencyImages=h.j.state.currencyImages,this.tokenImages=h.j.state.tokenImages,this.unsubscribe.push(g.aG.subscribeKey("purchaseCurrency",a=>{a&&"Fiat"!==this.type&&(this.selectedCurrency=this.formatPurchaseCurrency(a))}),g.aG.subscribeKey("paymentCurrency",a=>{a&&"Token"!==this.type&&(this.selectedCurrency=this.formatPaymentCurrency(a))}),g.aG.subscribe(a=>{"Fiat"===this.type?this.currencies=a.purchaseCurrencies.map(this.formatPurchaseCurrency):this.currencies=a.paymentCurrencies.map(this.formatPaymentCurrency)}),h.j.subscribe(a=>{this.currencyImages={...a.currencyImages},this.tokenImages={...a.tokenImages}}))}firstUpdated(){g.aG.getAvailableCurrencies()}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let a=this.selectedCurrency?.symbol||"",b=this.currencyImages[a]||this.tokenImages[a];return(0,d.qy)`<wui-input-text type="number" size="lg" value=${this.value}>
      ${this.selectedCurrency?(0,d.qy)` <wui-flex
            class="currency-container"
            justifyContent="space-between"
            alignItems="center"
            gap="xxs"
            @click=${()=>k.W.open({view:`OnRamp${this.type}Select`})}
          >
            <wui-image src=${(0,f.J)(b)}></wui-image>
            <wui-text color="fg-100">${this.selectedCurrency.symbol}</wui-text>
          </wui-flex>`:(0,d.qy)`<wui-loading-spinner></wui-loading-spinner>`}
    </wui-input-text>`}formatPaymentCurrency(a){return{name:a.id,symbol:a.id}}formatPurchaseCurrency(a){return{name:a.name,symbol:a.symbol}}};S.styles=Q,R([(0,e.MZ)({type:String})],S.prototype,"type",void 0),R([(0,e.MZ)({type:Number})],S.prototype,"value",void 0),R([(0,e.wk)()],S.prototype,"currencies",void 0),R([(0,e.wk)()],S.prototype,"selectedCurrency",void 0),R([(0,e.wk)()],S.prototype,"currencyImages",void 0),R([(0,e.wk)()],S.prototype,"tokenImages",void 0),S=R([(0,l.EM)("w3m-onramp-input")],S);let T=(0,d.AH)`
  :host > wui-flex {
    width: 100%;
    max-width: 360px;
  }

  :host > wui-flex > wui-flex {
    border-radius: var(--wui-border-radius-l);
    width: 100%;
  }

  .amounts-container {
    width: 100%;
  }
`;var U=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let V={USD:"$",EUR:"€",GBP:"\xa3"},W=[100,250,500,1e3],X=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.caipAddress=p.W.state.activeCaipAddress,this.loading=k.W.state.loading,this.paymentCurrency=g.aG.state.paymentCurrency,this.paymentAmount=g.aG.state.paymentAmount,this.purchaseAmount=g.aG.state.purchaseAmount,this.quoteLoading=g.aG.state.quotesLoading,this.unsubscribe.push(p.W.subscribeKey("activeCaipAddress",a=>this.caipAddress=a),k.W.subscribeKey("loading",a=>{this.loading=a}),g.aG.subscribe(a=>{this.paymentCurrency=a.paymentCurrency,this.paymentAmount=a.paymentAmount,this.purchaseAmount=a.purchaseAmount,this.quoteLoading=a.quotesLoading}))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){return(0,d.qy)`
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center">
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <w3m-onramp-input
            type="Fiat"
            @inputChange=${this.onPaymentAmountChange.bind(this)}
            .value=${this.paymentAmount||0}
          ></w3m-onramp-input>
          <w3m-onramp-input
            type="Token"
            .value=${this.purchaseAmount||0}
            .loading=${this.quoteLoading}
          ></w3m-onramp-input>
          <wui-flex justifyContent="space-evenly" class="amounts-container" gap="xs">
            ${W.map(a=>(0,d.qy)`<wui-button
                  variant=${this.paymentAmount===a?"accent":"neutral"}
                  size="md"
                  textVariant="paragraph-600"
                  fullWidth
                  @click=${()=>this.selectPresetAmount(a)}
                  >${`${V[this.paymentCurrency?.id||"USD"]} ${a}`}</wui-button
                >`)}
          </wui-flex>
          ${this.templateButton()}
        </wui-flex>
      </wui-flex>
    `}templateButton(){return this.caipAddress?(0,d.qy)`<wui-button
          @click=${this.getQuotes.bind(this)}
          variant="main"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Get quotes
        </wui-button>`:(0,d.qy)`<wui-button
          @click=${this.openModal.bind(this)}
          variant="accent"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Connect wallet
        </wui-button>`}getQuotes(){this.loading||k.W.open({view:"OnRampProviders"})}openModal(){k.W.open({view:"Connect"})}async onPaymentAmountChange(a){g.aG.setPaymentAmount(Number(a.detail)),await g.aG.getQuote()}async selectPresetAmount(a){g.aG.setPaymentAmount(a),await g.aG.getQuote()}};X.styles=T,U([(0,e.MZ)({type:Boolean})],X.prototype,"disabled",void 0),U([(0,e.wk)()],X.prototype,"caipAddress",void 0),U([(0,e.wk)()],X.prototype,"loading",void 0),U([(0,e.wk)()],X.prototype,"paymentCurrency",void 0),U([(0,e.wk)()],X.prototype,"paymentAmount",void 0),U([(0,e.wk)()],X.prototype,"purchaseAmount",void 0),U([(0,e.wk)()],X.prototype,"quoteLoading",void 0),X=U([(0,l.EM)("w3m-onramp-widget")],X)},72880:(a,b,c)=>{c(77876)}};