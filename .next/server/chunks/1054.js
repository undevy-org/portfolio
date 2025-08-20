"use strict";exports.id=1054,exports.ids=[1054],exports.modules={41054:(a,b,c)=>{c.r(b),c.d(b,{W3mApproveTransactionView:()=>n,W3mRegisterAccountNameSuccess:()=>N,W3mRegisterAccountNameView:()=>J,W3mUpgradeWalletView:()=>p});var d=c(50861),e=c(52827),f=c(63044),g=c(26728),h=c(12335),i=c(60778),j=c(83344),k=c(22490);let l=(0,d.AH)`
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
`;var m=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let n=class extends d.WF{constructor(){super(),this.bodyObserver=void 0,this.unsubscribe=[],this.iframe=document.getElementById("w3m-iframe"),this.ready=!1,this.unsubscribe.push(g.W.subscribeKey("open",a=>{a||this.onHideIframe()}),g.W.subscribeKey("shake",a=>{a?this.iframe.style.animation="w3m-shake 500ms var(--wui-ease-out-power-2)":this.iframe.style.animation="none"}))}disconnectedCallback(){this.onHideIframe(),this.unsubscribe.forEach(a=>a()),this.bodyObserver?.unobserve(window.document.body)}async firstUpdated(){await this.syncTheme(),this.iframe.style.display="block";let a=this?.renderRoot?.querySelector("div");this.bodyObserver=new ResizeObserver(b=>{let c=b?.[0]?.contentBoxSize,d=c?.[0]?.inlineSize;this.iframe.style.height="600px",a.style.height="600px",h.H.state.enableEmbedded?this.updateFrameSizeForEmbeddedMode():(d&&d<=430?(this.iframe.style.width="100%",this.iframe.style.left="0px",this.iframe.style.bottom="0px",this.iframe.style.top="unset"):(this.iframe.style.width="360px",this.iframe.style.left="calc(50% - 180px)",this.iframe.style.top="calc(50% - 300px + 32px)",this.iframe.style.bottom="unset"),this.onShowIframe())}),this.bodyObserver.observe(window.document.body)}render(){return(0,d.qy)`<div data-ready=${this.ready} id="w3m-frame-container"></div>`}onShowIframe(){let a=window.innerWidth<=430;this.ready=!0,this.iframe.style.animation=a?"w3m-iframe-zoom-in-mobile 200ms var(--wui-ease-out-power-2)":"w3m-iframe-zoom-in 200ms var(--wui-ease-out-power-2)"}onHideIframe(){this.iframe.style.display="none",this.iframe.style.animation="w3m-iframe-fade-out 200ms var(--wui-ease-out-power-2)"}async syncTheme(){let a=i.a.getAuthConnector();if(a){let b=j.W.getSnapshot().themeMode,c=j.W.getSnapshot().themeVariables;await a.provider.syncTheme({themeVariables:c,w3mThemeVariables:(0,f.o)(c,b)})}}async updateFrameSizeForEmbeddedMode(){let a=this?.renderRoot?.querySelector("div");await new Promise(a=>{setTimeout(a,300)});let b=this.getBoundingClientRect();a.style.width="100%",this.iframe.style.left=`${b.left}px`,this.iframe.style.top=`${b.top}px`,this.iframe.style.width=`${b.width}px`,this.iframe.style.height=`${b.height}px`,this.onShowIframe()}};n.styles=l,m([(0,e.wk)()],n.prototype,"ready",void 0),n=m([(0,k.EM)("w3m-approve-transaction-view")],n);var o=c(80796);c(74849),c(77838),c(41298);let p=class extends d.WF{render(){return(0,d.qy)`
      <wui-flex flexDirection="column" alignItems="center" gap="xl" padding="xl">
        <wui-text variant="paragraph-400" color="fg-100">Follow the instructions on</wui-text>
        <wui-chip
          icon="externalLink"
          variant="fill"
          href=${o.oU.SECURE_SITE_DASHBOARD}
          imageSrc=${o.oU.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-chip>
        <wui-text variant="small-400" color="fg-200">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `}};p=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,k.EM)("w3m-upgrade-wallet-view")],p);var q=c(15519),r=c(9132),s=c(70112),t=c(19898),u=c(34526),v=c(98604),w=c(79508),x=c(83908),y=c(97543),z=c(24115);c(10979),c(32490);var A=c(67017),B=c(76382);c(94715);let C=(0,d.AH)`
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
`;var D=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let E=class extends d.WF{constructor(){super(...arguments),this.disabled=!1,this.loading=!1}render(){return(0,d.qy)`
      <wui-input-text
        value=${(0,z.J)(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value||""}
        data-testid="wui-ens-input"
        inputRightPadding="5xl"
        .onKeyDown=${this.onKeyDown}
      >
        ${this.baseNameTemplate()} ${this.errorTemplate()}${this.loadingTemplate()}
      </wui-input-text>
    `}baseNameTemplate(){return(0,d.qy)`<wui-text variant="paragraph-400" color="fg-200" class="base-name">
      ${r.o.WC_NAME_SUFFIX}
    </wui-text>`}loadingTemplate(){return this.loading?(0,d.qy)`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}errorTemplate(){return this.errorMessage?(0,d.qy)`<wui-text variant="tiny-500" color="error-100" class="error"
        >${this.errorMessage}</wui-text
      >`:null}};E.styles=[A.W5,C],D([(0,e.MZ)()],E.prototype,"errorMessage",void 0),D([(0,e.MZ)({type:Boolean})],E.prototype,"disabled",void 0),D([(0,e.MZ)()],E.prototype,"value",void 0),D([(0,e.MZ)({type:Boolean})],E.prototype,"loading",void 0),D([(0,e.MZ)({attribute:!1})],E.prototype,"onKeyDown",void 0),E=D([(0,B.E)("wui-ens-input")],E),c(42536),c(41685),c(25577),c(11905);var F=c(71452),G=c(92910);let H=(0,d.AH)`
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
`;var I=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let J=class extends d.WF{constructor(){super(),this.formRef=(0,q._)(),this.usubscribe=[],this.name="",this.error="",this.loading=s.f.state.loading,this.suggestions=s.f.state.suggestions,this.profileName=t.U.state.profileName,this.onDebouncedNameInputChange=u.w.debounce(a=>{a.length<4?this.error="Name must be at least 4 characters long":G.y.isValidReownName(a)?(this.error="",s.f.getSuggestions(a)):this.error="The value is not a valid username"}),this.usubscribe.push(s.f.subscribe(a=>{this.suggestions=a.suggestions,this.loading=a.loading}),t.U.subscribeKey("profileName",a=>{this.profileName=a,a&&(this.error="You already own a name")}))}firstUpdated(){this.formRef.value?.addEventListener("keydown",this.onEnterKey.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this.usubscribe.forEach(a=>a()),this.formRef.value?.removeEventListener("keydown",this.onEnterKey.bind(this))}render(){return(0,d.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="m"
        .padding=${["0","s","m","s"]}
      >
        <form ${(0,q.K)(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
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
    `}submitButtonTemplate(){let a=this.suggestions.find(a=>a.name?.split(".")?.[0]===this.name&&a.registered);if(this.loading)return(0,d.qy)`<wui-loading-spinner
        class="input-loading-spinner"
        color="fg-200"
      ></wui-loading-spinner>`;let b=`${this.name}${r.o.WC_NAME_SUFFIX}`;return(0,d.qy)`
      <wui-icon-link
        .disabled=${a}
        class="input-submit-button"
        size="sm"
        icon="chevronRight"
        iconColor=${a?"fg-200":"accent-100"}
        @click=${()=>this.onSubmitName(b)}
      >
      </wui-icon-link>
    `}onNameInputChange(a){let b=G.y.validateReownName(a.detail||"");this.name=b,this.onDebouncedNameInputChange(b)}onKeyDown(a){1!==a.key.length||G.y.isValidReownName(a.key)||a.preventDefault()}nameSuggestionTagTemplate(a){return this.loading?(0,d.qy)`<wui-loading-spinner color="fg-200"></wui-loading-spinner>`:a.registered?(0,d.qy)`<wui-tag variant="shade" size="lg">Registered</wui-tag>`:(0,d.qy)`<wui-tag variant="success" size="lg">Available</wui-tag>`}templateSuggestions(){return!this.name||this.name.length<4||this.error?null:(0,d.qy)`<wui-flex flexDirection="column" gap="xxs" alignItems="center">
      ${this.suggestions.map(a=>(0,d.qy)`<button
            .disabled=${a.registered||this.loading}
            data-testid="account-name-suggestion"
            class="suggestion"
            @click=${()=>this.onSubmitName(a.name)}
          >
            <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
              ${a.name}</wui-text
            >${this.nameSuggestionTagTemplate(a)}
          </button>`)}
    </wui-flex>`}isAllowedToSubmit(a){let b=a.split(".")?.[0],c=this.suggestions.find(a=>a.name?.split(".")?.[0]===b&&a.registered);return!this.loading&&!this.error&&!this.profileName&&b&&s.f.validateName(b)&&!c}async onSubmitName(a){try{if(!this.isAllowedToSubmit(a))return;v.E.sendEvent({type:"track",event:"REGISTER_NAME_INITIATED",properties:{isSmartAccount:(0,w.lj)(x.W.state.activeChain)===F.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:a}}),await s.f.registerName(a),v.E.sendEvent({type:"track",event:"REGISTER_NAME_SUCCESS",properties:{isSmartAccount:(0,w.lj)(x.W.state.activeChain)===F.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:a}})}catch(b){y.P.showError(b.message),v.E.sendEvent({type:"track",event:"REGISTER_NAME_ERROR",properties:{isSmartAccount:(0,w.lj)(x.W.state.activeChain)===F.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:a,error:b?.message||"Unknown error"}})}}onEnterKey(a){if("Enter"===a.key&&this.name&&this.isAllowedToSubmit(this.name)){let a=`${this.name}${r.o.WC_NAME_SUFFIX}`;this.onSubmitName(a)}}};J.styles=H,I([(0,e.MZ)()],J.prototype,"errorMessage",void 0),I([(0,e.wk)()],J.prototype,"name",void 0),I([(0,e.wk)()],J.prototype,"error",void 0),I([(0,e.wk)()],J.prototype,"loading",void 0),I([(0,e.wk)()],J.prototype,"suggestions",void 0),I([(0,e.wk)()],J.prototype,"profileName",void 0),J=I([(0,k.EM)("w3m-register-account-name-view")],J);var K=c(49695),L=c(71136);c(4977),c(95007),c(73019);let M=(0,d.AH)`
  .continue-button-container {
    width: 100%;
  }
`,N=class extends d.WF{render(){return(0,d.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{u.w.openHref(K.T.URLS.FAQ,"_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return(0,d.qy)` <wui-flex
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
    </wui-flex>`}buttonsTemplate(){return(0,d.qy)`<wui-flex
      .padding=${["0","2l","0","2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`}redirectToAccount(){L.I.replace("Account")}};N.styles=M,N=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,k.EM)("w3m-register-account-name-success-view")],N)}};