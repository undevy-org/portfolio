"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4003],{14003:(e,t,i)=>{i.r(t),i.d(t,{W3mApproveTransactionView:()=>p,W3mRegisterAccountNameSuccess:()=>q,W3mRegisterAccountNameView:()=>D,W3mUpgradeWalletView:()=>g});var n=i(28312),r=i(745),s=i(22492),o=i(33806),a=i(96641),l=i(54252),u=i(7478),c=i(52515);let d=(0,n.AH)`
  div {
    width: 100%;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`;var m=function(e,t,i,n){var r,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,i,o):r(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o};let p=class extends n.WF{constructor(){super(),this.bodyObserver=void 0,this.unsubscribe=[],this.iframe=document.getElementById("w3m-iframe"),this.ready=!1,this.unsubscribe.push(o.W.subscribeKey("open",e=>{e||this.onHideIframe()}),o.W.subscribeKey("shake",e=>{e?this.iframe.style.animation="w3m-shake 500ms var(--wui-ease-out-power-2)":this.iframe.style.animation="none"}))}disconnectedCallback(){this.onHideIframe(),this.unsubscribe.forEach(e=>e()),this.bodyObserver?.unobserve(window.document.body)}async firstUpdated(){await this.syncTheme(),this.iframe.style.display="block";let e=this?.renderRoot?.querySelector("div");this.bodyObserver=new ResizeObserver(t=>{let i=t?.[0]?.contentBoxSize,n=i?.[0]?.inlineSize;this.iframe.style.height="600px",e.style.height="600px",a.H.state.enableEmbedded?this.updateFrameSizeForEmbeddedMode():(n&&n<=430?(this.iframe.style.width="100%",this.iframe.style.left="0px",this.iframe.style.bottom="0px",this.iframe.style.top="unset"):(this.iframe.style.width="360px",this.iframe.style.left="calc(50% - 180px)",this.iframe.style.top="calc(50% - 300px + 32px)",this.iframe.style.bottom="unset"),this.onShowIframe())}),this.bodyObserver.observe(window.document.body)}render(){return(0,n.qy)`<div data-ready=${this.ready} id="w3m-frame-container"></div>`}onShowIframe(){let e=window.innerWidth<=430;this.ready=!0,this.iframe.style.animation=e?"w3m-iframe-zoom-in-mobile 200ms var(--wui-ease-out-power-2)":"w3m-iframe-zoom-in 200ms var(--wui-ease-out-power-2)"}onHideIframe(){this.iframe.style.display="none",this.iframe.style.animation="w3m-iframe-fade-out 200ms var(--wui-ease-out-power-2)"}async syncTheme(){let e=l.a.getAuthConnector();if(e){let t=u.W.getSnapshot().themeMode,i=u.W.getSnapshot().themeVariables;await e.provider.syncTheme({themeVariables:i,w3mThemeVariables:(0,s.o)(i,t)})}}async updateFrameSizeForEmbeddedMode(){let e=this?.renderRoot?.querySelector("div");await new Promise(e=>{setTimeout(e,300)});let t=this.getBoundingClientRect();e.style.width="100%",this.iframe.style.left=`${t.left}px`,this.iframe.style.top=`${t.top}px`,this.iframe.style.width=`${t.width}px`,this.iframe.style.height=`${t.height}px`,this.onShowIframe()}};p.styles=d,m([(0,r.wk)()],p.prototype,"ready",void 0),p=m([(0,c.EM)("w3m-approve-transaction-view")],p);var h=i(76610);i(50196),i(98160),i(22724);let g=class extends n.WF{render(){return(0,n.qy)`
      <wui-flex flexDirection="column" alignItems="center" gap="xl" padding="xl">
        <wui-text variant="paragraph-400" color="fg-100">Follow the instructions on</wui-text>
        <wui-chip
          icon="externalLink"
          variant="fill"
          href=${h.oU.SECURE_SITE_DASHBOARD}
          imageSrc=${h.oU.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-chip>
        <wui-text variant="small-400" color="fg-200">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `}};g=function(e,t,i,n){var r,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,i,o):r(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o}([(0,c.EM)("w3m-upgrade-wallet-view")],g);var f=i(74236),w=i(60500),y=i(76631),b=i(11076),v=i(35558),x=i(32836),E=i(54846),S=i(90906),R=i(5517),T=i(51882);i(4537),i(98750);var k=i(97265),N=i(54166);i(39151);let $=(0,n.AH)`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  .error {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }

  .base-name {
    position: absolute;
    right: 45px;
    top: 15px;
    text-align: right;
  }
`;var A=function(e,t,i,n){var r,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,i,o):r(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o};let C=class extends n.WF{constructor(){super(...arguments),this.disabled=!1,this.loading=!1}render(){return(0,n.qy)`
      <wui-input-text
        value=${(0,T.J)(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value||""}
        data-testid="wui-ens-input"
        inputRightPadding="5xl"
        .onKeyDown=${this.onKeyDown}
      >
        ${this.baseNameTemplate()} ${this.errorTemplate()}${this.loadingTemplate()}
      </wui-input-text>
    `}baseNameTemplate(){return(0,n.qy)`<wui-text variant="paragraph-400" color="fg-200" class="base-name">
      ${w.o.WC_NAME_SUFFIX}
    </wui-text>`}loadingTemplate(){return this.loading?(0,n.qy)`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}errorTemplate(){return this.errorMessage?(0,n.qy)`<wui-text variant="tiny-500" color="error-100" class="error"
        >${this.errorMessage}</wui-text
      >`:null}};C.styles=[k.W5,$],A([(0,r.MZ)()],C.prototype,"errorMessage",void 0),A([(0,r.MZ)({type:Boolean})],C.prototype,"disabled",void 0),A([(0,r.MZ)()],C.prototype,"value",void 0),A([(0,r.MZ)({type:Boolean})],C.prototype,"loading",void 0),A([(0,r.MZ)({attribute:!1})],C.prototype,"onKeyDown",void 0),C=A([(0,N.E)("wui-ens-input")],C),i(21330),i(76197),i(72873),i(77509);var I=i(45312),O=i(87752);let _=(0,n.AH)`
  wui-flex {
    width: 100%;
  }

  .suggestion {
    border: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    padding: var(--wui-spacing-m);
  }

  .suggestion:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .suggestion:focus-visible:not(:disabled) {
    outline: 1px solid var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-005);
  }

  .suggestion:hover:not(:disabled) {
    background-color: var(--wui-color-gray-glass-005);
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
    position: relative;
  }

  .input-submit-button,
  .input-loading-spinner {
    position: absolute;
    top: 26px;
    transform: translateY(-50%);
    right: 10px;
  }
`;var M=function(e,t,i,n){var r,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,i,o):r(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o};let D=class extends n.WF{constructor(){super(),this.formRef=(0,f._)(),this.usubscribe=[],this.name="",this.error="",this.loading=y.f.state.loading,this.suggestions=y.f.state.suggestions,this.profileName=b.U.state.profileName,this.onDebouncedNameInputChange=v.w.debounce(e=>{e.length<4?this.error="Name must be at least 4 characters long":O.y.isValidReownName(e)?(this.error="",y.f.getSuggestions(e)):this.error="The value is not a valid username"}),this.usubscribe.push(y.f.subscribe(e=>{this.suggestions=e.suggestions,this.loading=e.loading}),b.U.subscribeKey("profileName",e=>{this.profileName=e,e&&(this.error="You already own a name")}))}firstUpdated(){this.formRef.value?.addEventListener("keydown",this.onEnterKey.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this.usubscribe.forEach(e=>e()),this.formRef.value?.removeEventListener("keydown",this.onEnterKey.bind(this))}render(){return(0,n.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="m"
        .padding=${["0","s","m","s"]}
      >
        <form ${(0,f.K)(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
            .onKeyDown=${this.onKeyDown.bind(this)}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `}submitButtonTemplate(){let e=this.suggestions.find(e=>e.name?.split(".")?.[0]===this.name&&e.registered);if(this.loading)return(0,n.qy)`<wui-loading-spinner
        class="input-loading-spinner"
        color="fg-200"
      ></wui-loading-spinner>`;let t=`${this.name}${w.o.WC_NAME_SUFFIX}`;return(0,n.qy)`
      <wui-icon-link
        .disabled=${e}
        class="input-submit-button"
        size="sm"
        icon="chevronRight"
        iconColor=${e?"fg-200":"accent-100"}
        @click=${()=>this.onSubmitName(t)}
      >
      </wui-icon-link>
    `}onNameInputChange(e){let t=O.y.validateReownName(e.detail||"");this.name=t,this.onDebouncedNameInputChange(t)}onKeyDown(e){1!==e.key.length||O.y.isValidReownName(e.key)||e.preventDefault()}nameSuggestionTagTemplate(e){return this.loading?(0,n.qy)`<wui-loading-spinner color="fg-200"></wui-loading-spinner>`:e.registered?(0,n.qy)`<wui-tag variant="shade" size="lg">Registered</wui-tag>`:(0,n.qy)`<wui-tag variant="success" size="lg">Available</wui-tag>`}templateSuggestions(){return!this.name||this.name.length<4||this.error?null:(0,n.qy)`<wui-flex flexDirection="column" gap="xxs" alignItems="center">
      ${this.suggestions.map(e=>(0,n.qy)`<button
            .disabled=${e.registered||this.loading}
            data-testid="account-name-suggestion"
            class="suggestion"
            @click=${()=>this.onSubmitName(e.name)}
          >
            <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
              ${e.name}</wui-text
            >${this.nameSuggestionTagTemplate(e)}
          </button>`)}
    </wui-flex>`}isAllowedToSubmit(e){let t=e.split(".")?.[0],i=this.suggestions.find(e=>e.name?.split(".")?.[0]===t&&e.registered);return!this.loading&&!this.error&&!this.profileName&&t&&y.f.validateName(t)&&!i}async onSubmitName(e){try{if(!this.isAllowedToSubmit(e))return;x.E.sendEvent({type:"track",event:"REGISTER_NAME_INITIATED",properties:{isSmartAccount:(0,E.lj)(S.W.state.activeChain)===I.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:e}}),await y.f.registerName(e),x.E.sendEvent({type:"track",event:"REGISTER_NAME_SUCCESS",properties:{isSmartAccount:(0,E.lj)(S.W.state.activeChain)===I.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:e}})}catch(t){R.P.showError(t.message),x.E.sendEvent({type:"track",event:"REGISTER_NAME_ERROR",properties:{isSmartAccount:(0,E.lj)(S.W.state.activeChain)===I.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:e,error:t?.message||"Unknown error"}})}}onEnterKey(e){if("Enter"===e.key&&this.name&&this.isAllowedToSubmit(this.name)){let e=`${this.name}${w.o.WC_NAME_SUFFIX}`;this.onSubmitName(e)}}};D.styles=_,M([(0,r.MZ)()],D.prototype,"errorMessage",void 0),M([(0,r.wk)()],D.prototype,"name",void 0),M([(0,r.wk)()],D.prototype,"error",void 0),M([(0,r.wk)()],D.prototype,"loading",void 0),M([(0,r.wk)()],D.prototype,"suggestions",void 0),M([(0,r.wk)()],D.prototype,"profileName",void 0),D=M([(0,c.EM)("w3m-register-account-name-view")],D);var W=i(7273),U=i(19628);i(54279),i(36698),i(82786);let j=(0,n.AH)`
  .continue-button-container {
    width: 100%;
  }
`,q=class extends n.WF{render(){return(0,n.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{v.w.openHref(W.T.URLS.FAQ,"_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return(0,n.qy)` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${["0","xxl","0","xxl"]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          size="xl"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          You can now fund your account and trade crypto
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return(0,n.qy)`<wui-flex
      .padding=${["0","2l","0","2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`}redirectToAccount(){U.I.replace("Account")}};q.styles=j,q=function(e,t,i,n){var r,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,i,o):r(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o}([(0,c.EM)("w3m-register-account-name-success-view")],q)}}]);