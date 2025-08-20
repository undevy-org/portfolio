"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2790],{2790:(e,t,o)=>{o.r(t),o.d(t,{AppKitModal:()=>er,W3mModal:()=>ea,W3mModalBase:()=>ei});var i=o(28312),a=o(745),r=o(51882),s=o(45714),n=o(60500),l=o(96641),c=o(33806),d=o(90906),p=o(54252),u=o(65819),w=o(14796),h=o(19628),m=o(45954);let g={isUnsupportedChainView:()=>"UnsupportedChain"===h.I.state.view||"SwitchNetwork"===h.I.state.view&&h.I.state.history.includes("UnsupportedChain"),async safeClose(){if(this.isUnsupportedChainView()||await m.U.isSIWXCloseDisabled())return void c.W.shake();("DataCapture"===h.I.state.view||"DataCaptureOtpConfirm"===h.I.state.view)&&w.x.disconnect(),c.W.close()}};var f=o(7478),b=o(5517),y=o(35558),v=o(35331),k=o(52515),x=o(97265),C=o(54166);let W=(0,i.AH)`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }

  :host([data-embedded='true']) {
    box-shadow:
      0 0 0 1px var(--wui-color-gray-glass-005),
      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);
  }
`,S=class extends i.WF{render(){return(0,i.qy)`<slot></slot>`}};S.styles=[x.W5,W],S=function(e,t,o,i){var a,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,o,s):a(t,o))||s);return r>3&&s&&Object.defineProperty(t,o,s),s}([(0,C.E)("wui-card")],S),o(98160);var I=o(79277);o(23499),o(98750),o(43804);let N=(0,i.AH)`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-dark-glass-100);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-325);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: var(--wui-border-radius-3xs);
    background-color: var(--local-icon-bg-value);
  }
`;var E=function(e,t,o,i){var a,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,o,s):a(t,o))||s);return r>3&&s&&Object.defineProperty(t,o,s),s};let A=class extends i.WF{constructor(){super(...arguments),this.message="",this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="info"}render(){return this.style.cssText=`
      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});
   `,(0,i.qy)`
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){I.h.close()}};A.styles=[x.W5,N],E([(0,a.MZ)()],A.prototype,"message",void 0),E([(0,a.MZ)()],A.prototype,"backgroundColor",void 0),E([(0,a.MZ)()],A.prototype,"iconColor",void 0),E([(0,a.MZ)()],A.prototype,"icon",void 0),A=E([(0,C.E)("wui-alertbar")],A);let T=(0,i.AH)`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`;var P=function(e,t,o,i){var a,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,o,s):a(t,o))||s);return r>3&&s&&Object.defineProperty(t,o,s),s};let $={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"exclamationTriangle"}},O=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.open=I.h.state.open,this.onOpen(!0),this.unsubscribe.push(I.h.subscribeKey("open",e=>{this.open=e,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{message:e,variant:t}=I.h.state,o=$[t];return(0,i.qy)`
      <wui-alertbar
        message=${e}
        backgroundColor=${o?.backgroundColor}
        iconColor=${o?.iconColor}
        icon=${o?.icon}
      ></wui-alertbar>
    `}onOpen(e){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):e||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};O.styles=T,P([(0,a.wk)()],O.prototype,"open",void 0),O=P([(0,k.EM)("w3m-alertbar")],O);var R=o(11076),B=o(34735),D=o(74623),j=o(32836);o(76197),o(25322),o(89556);let q=(0,i.AH)`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    gap: var(--wui-spacing-xxs);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xxs);
  }

  wui-image {
    border-radius: 100%;
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  wui-icon-box {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var H=function(e,t,o,i){var a,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,o,s):a(t,o))||s);return r>3&&s&&Object.defineProperty(t,o,s),s};let L=class extends i.WF{constructor(){super(...arguments),this.imageSrc=""}render(){return(0,i.qy)`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`}imageTemplate(){return this.imageSrc?(0,i.qy)`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`:(0,i.qy)`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`}};L.styles=[x.W5,x.fD,x.ck,q],H([(0,a.MZ)()],L.prototype,"imageSrc",void 0),L=H([(0,C.E)("wui-select")],L),o(77509),o(22724);var M=o(26128);let U=(0,i.AH)`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards var(--wui-ease-out-power-2),
      slide-down-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards var(--wui-ease-out-power-2),
      slide-up-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;var K=function(e,t,o,i){var a,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,o,s):a(t,o))||s);return r>3&&s&&Object.defineProperty(t,o,s),s};let z=["SmartSessionList"];function F(){let e=h.I.state.data?.connector?.name,t=h.I.state.data?.wallet?.name,o=h.I.state.data?.network?.name,i=t??e,a=p.a.getConnectors(),r=1===a.length&&a[0]?.id==="w3m-email";return{Connect:`Connect ${r?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",ConnectingExternal:i??"Connect Wallet",ConnectingWalletConnect:i??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview convert",Downloads:i?`Get ${i}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",ProfileWallets:"Wallets",SwitchNetwork:o??"Switch Network",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select token",SwapPreview:"Preview swap",WalletSend:"Send",WalletSendPreview:"Review send",WalletSendSelectToken:"Select Token",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a wallet?",ConnectWallets:"Connect wallet",ConnectSocials:"All socials",ConnectingSocial:R.U.state.socialProvider?R.U.state.socialProvider:"Connect Social",ConnectingMultiChain:"Select chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Payment in progress",DataCapture:"Profile",DataCaptureOtpConfirm:"Confirm Email",FundWallet:"Fund wallet"}}let Y=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.heading=F()[h.I.state.view],this.network=d.W.state.activeCaipNetwork,this.networkImage=B.$.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=h.I.state.view,this.viewDirection="",this.headerText=F()[h.I.state.view],this.unsubscribe.push(D.j.subscribeNetworkImages(()=>{this.networkImage=B.$.getNetworkImage(this.network)}),h.I.subscribeKey("view",e=>{setTimeout(()=>{this.view=e,this.headerText=F()[e]},M.o.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),d.W.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=B.$.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){return(0,i.qy)`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){j.E.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),h.I.push("WhatIsAWallet")}async onClose(){await g.safeClose()}rightHeaderTemplate(){let e=l.H?.state?.features?.smartSessions;return"Account"===h.I.state.view&&e?(0,i.qy)`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${()=>h.I.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `:this.closeButtonTemplate()}closeButtonTemplate(){return(0,i.qy)`
      <wui-icon-link
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `}titleTemplate(){let e=z.includes(this.view);return(0,i.qy)`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${e?(0,i.qy)`<wui-tag variant="main">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){let{view:e}=h.I.state,t="Connect"===e,o=l.H.state.enableEmbedded,a=l.H.state.enableNetworkSwitch;return"Account"===e&&a?(0,i.qy)`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${(0,r.J)(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${(0,r.J)(this.networkImage)}
      ></wui-select>`:this.showBack&&!("ApproveTransaction"===e||"ConnectingSiwe"===e||t&&o)?(0,i.qy)`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`:(0,i.qy)`<wui-icon-link
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`}onNetworks(){this.isAllowedNetworkSwitch()&&(j.E.sendEvent({type:"track",event:"CLICK_NETWORKS"}),h.I.push("Networks"))}isAllowedNetworkSwitch(){let e=d.W.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,o=e?.find(({id:e})=>e===this.network?.id);return t||!o}getPadding(){return this.heading?["l","2l","l","2l"]:["0","2l","0","2l"]}onViewChange(){let{history:e}=h.I.state,t=M.o.VIEW_DIRECTION.Next;e.length<this.prevHistoryLength&&(t=M.o.VIEW_DIRECTION.Prev),this.prevHistoryLength=e.length,this.viewDirection=t}async onHistoryChange(){let{history:e}=h.I.state,t=this.shadowRoot?.querySelector("#dynamic");e.length>1&&!this.showBack&&t?(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):e.length<=1&&this.showBack&&t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){h.I.goBack()}};Y.styles=U,K([(0,a.wk)()],Y.prototype,"heading",void 0),K([(0,a.wk)()],Y.prototype,"network",void 0),K([(0,a.wk)()],Y.prototype,"networkImage",void 0),K([(0,a.wk)()],Y.prototype,"showBack",void 0),K([(0,a.wk)()],Y.prototype,"prevHistoryLength",void 0),K([(0,a.wk)()],Y.prototype,"view",void 0),K([(0,a.wk)()],Y.prototype,"viewDirection",void 0),K([(0,a.wk)()],Y.prototype,"headerText",void 0),Y=K([(0,k.EM)("w3m-header")],Y),o(4537);let Z=(0,i.AH)`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);

    max-width: 300px;
  }

  :host wui-loading-spinner {
    margin-left: var(--wui-spacing-3xs);
  }
`;var _=function(e,t,o,i){var a,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,o,s):a(t,o))||s);return r>3&&s&&Object.defineProperty(t,o,s),s};let V=class extends i.WF{constructor(){super(...arguments),this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="checkmark",this.message="",this.loading=!1,this.iconType="default"}render(){return(0,i.qy)`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return this.loading?(0,i.qy)`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:"default"===this.iconType?(0,i.qy)`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>`:(0,i.qy)`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`}};V.styles=[x.W5,Z],_([(0,a.MZ)()],V.prototype,"backgroundColor",void 0),_([(0,a.MZ)()],V.prototype,"iconColor",void 0),_([(0,a.MZ)()],V.prototype,"icon",void 0),_([(0,a.MZ)()],V.prototype,"message",void 0),_([(0,a.MZ)()],V.prototype,"loading",void 0),_([(0,a.MZ)()],V.prototype,"iconType",void 0),V=_([(0,C.E)("wui-snackbar")],V);let X=(0,i.AH)`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var G=function(e,t,o,i){var a,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,o,s):a(t,o))||s);return r>3&&s&&Object.defineProperty(t,o,s),s};let J={loading:void 0,success:{backgroundColor:"success-100",iconColor:"success-100",icon:"checkmark"},error:{backgroundColor:"error-100",iconColor:"error-100",icon:"close"}},Q=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=b.P.state.open,this.unsubscribe.push(b.P.subscribeKey("open",e=>{this.open=e,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(e=>e())}render(){let{message:e,variant:t,svg:o}=b.P.state,a=J[t],{icon:r,iconColor:s}=o??a??{};return(0,i.qy)`
      <wui-snackbar
        message=${e}
        backgroundColor=${a?.backgroundColor}
        iconColor=${s}
        icon=${r}
        .loading=${"loading"===t}
      ></wui-snackbar>
    `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),b.P.state.autoClose&&(this.timeout=setTimeout(()=>b.P.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};Q.styles=X,G([(0,a.wk)()],Q.prototype,"open",void 0),Q=G([(0,k.EM)("w3m-snackbar")],Q),o(21457),o(51994);let ee=(0,i.AH)`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.appkit-modal) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;var et=function(e,t,o,i){var a,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(s=(r<3?a(s):r>3?a(t,o,s):a(t,o))||s);return r>3&&s&&Object.defineProperty(t,o,s),s};let eo="scroll-lock";class ei extends i.WF{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=l.H.state.enableEmbedded,this.open=c.W.state.open,this.caipAddress=d.W.state.activeCaipAddress,this.caipNetwork=d.W.state.activeCaipNetwork,this.shake=c.W.state.shake,this.filterByNamespace=p.a.state.filterByNamespace,this.initializeTheming(),u.N.prefetchAnalyticsConfig(),this.unsubscribe.push(c.W.subscribeKey("open",e=>e?this.onOpen():this.onClose()),c.W.subscribeKey("shake",e=>this.shake=e),d.W.subscribeKey("activeCaipNetwork",e=>this.onNewNetwork(e)),d.W.subscribeKey("activeCaipAddress",e=>this.onNewAddress(e)),l.H.subscribeKey("enableEmbedded",e=>this.enableEmbedded=e),p.a.subscribeKey("filterByNamespace",e=>{this.filterByNamespace===e||d.W.getAccountData(e)?.caipAddress||(u.N.fetchRecommendedWallets(),this.filterByNamespace=e)}))}firstUpdated(){if(this.caipAddress){if(this.enableEmbedded){c.W.close(),this.prefetch();return}this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return(this.style.cssText=`
      --local-border-bottom-mobile-radius: ${this.enableEmbedded?"clamp(0px, var(--wui-border-radius-l), 44px)":"0px"};
    `,this.enableEmbedded)?(0,i.qy)`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?(0,i.qy)`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return(0,i.qy)` <wui-card
      shake="${this.shake}"
      data-embedded="${(0,r.J)(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){await g.safeClose()}initializeTheming(){let{themeVariables:e,themeMode:t}=f.W.state,o=k.Zv.getColorTheme(t);(0,k.RF)(e,o)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),b.P.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){let e=document.createElement("style");e.dataset.w3m=eo,e.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){let e=document.head.querySelector(`style[data-w3m="${eo}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;let e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){let{tagName:o}=t.target;!o||o.includes("W3M-")||o.includes("WUI-")||e?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(e){let t=d.W.state.isSwitchingNamespace,o="ProfileWallets"===h.I.state.view;e?await this.onConnected({caipAddress:e,isSwitchingNamespace:t,isInProfileView:o}):t||this.enableEmbedded||o||c.W.close(),await m.U.initializeIfEnabled(e),this.caipAddress=e,d.W.setIsSwitchingNamespace(!1)}async onConnected(e){if(e.isInProfileView)return;let{chainNamespace:t,chainId:o,address:i}=s.C.parseCaipAddress(e.caipAddress),a=`${t}:${o}`,r=!y.w.getPlainAddress(this.caipAddress),n=await m.U.getSessions({address:i,caipNetworkId:a}),l=!m.U.getSIWX()||n.some(e=>e.data.accountAddress===i),d=e.isSwitchingNamespace&&l&&!this.enableEmbedded,p=this.enableEmbedded&&r;d?h.I.goBack():p&&c.W.close()}onNewNetwork(e){let t=this.caipNetwork,o=t?.caipNetworkId?.toString(),i=t?.chainNamespace,a=e?.caipNetworkId?.toString(),r=e?.chainNamespace,s=o!==a,l=t?.name===n.o.UNSUPPORTED_NETWORK_NAME,p="ConnectingExternal"===h.I.state.view,u="ProfileWallets"===h.I.state.view,w=!d.W.getAccountData(e?.chainNamespace)?.caipAddress,m="UnsupportedChain"===h.I.state.view,g=c.W.state.open,f=!1;this.enableEmbedded&&"SwitchNetwork"===h.I.state.view&&(f=!0),s&&v.GN.resetState(),g&&!p&&!u&&(w?s&&(f=!0):m?f=!0:s&&i===r&&!l&&(f=!0)),f&&"SIWXSignMessage"!==h.I.state.view&&h.I.goBack(),this.caipNetwork=e}prefetch(){this.hasPrefetched||(u.N.prefetch(),u.N.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}}ei.styles=ee,et([(0,a.MZ)({type:Boolean})],ei.prototype,"enableEmbedded",void 0),et([(0,a.wk)()],ei.prototype,"open",void 0),et([(0,a.wk)()],ei.prototype,"caipAddress",void 0),et([(0,a.wk)()],ei.prototype,"caipNetwork",void 0),et([(0,a.wk)()],ei.prototype,"shake",void 0),et([(0,a.wk)()],ei.prototype,"filterByNamespace",void 0);let ea=class extends ei{};ea=et([(0,k.EM)("w3m-modal")],ea);let er=class extends ei{};er=et([(0,k.EM)("appkit-modal")],er)}}]);