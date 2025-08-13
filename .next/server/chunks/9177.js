"use strict";exports.id=9177,exports.ids=[9177],exports.modules={39177:(a,b,c)=>{c.r(b),c.d(b,{AppKitModal:()=>af,W3mModal:()=>ae,W3mModalBase:()=>ad});var d=c(50861),e=c(52827),f=c(24115),g=c(16062),h=c(9132),i=c(12335),j=c(26728),k=c(83908),l=c(60778),m=c(99589),n=c(40764),o=c(71136),p=c(60450);let q={isUnsupportedChainView:()=>"UnsupportedChain"===o.I.state.view||"SwitchNetwork"===o.I.state.view&&o.I.state.history.includes("UnsupportedChain"),async safeClose(){if(this.isUnsupportedChainView()||await p.U.isSIWXCloseDisabled())return void j.W.shake();("DataCapture"===o.I.state.view||"DataCaptureOtpConfirm"===o.I.state.view)&&n.x.disconnect(),j.W.close()}};var r=c(83344),s=c(97543),t=c(34526),u=c(21347),v=c(22490),w=c(67017),x=c(76382);let y=(0,d.AH)`
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
`,z=class extends d.WF{render(){return(0,d.qy)`<slot></slot>`}};z.styles=[w.W5,y],z=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,x.E)("wui-card")],z),c(77838);var A=c(13567);c(78488),c(32490),c(56124);let B=(0,d.AH)`
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
`;var C=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let D=class extends d.WF{constructor(){super(...arguments),this.message="",this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="info"}render(){return this.style.cssText=`
      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});
   `,(0,d.qy)`
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
    `}onClose(){A.h.close()}};D.styles=[w.W5,B],C([(0,e.MZ)()],D.prototype,"message",void 0),C([(0,e.MZ)()],D.prototype,"backgroundColor",void 0),C([(0,e.MZ)()],D.prototype,"iconColor",void 0),C([(0,e.MZ)()],D.prototype,"icon",void 0),D=C([(0,x.E)("wui-alertbar")],D);let E=(0,d.AH)`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`;var F=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let G={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"exclamationTriangle"}},H=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.open=A.h.state.open,this.onOpen(!0),this.unsubscribe.push(A.h.subscribeKey("open",a=>{this.open=a,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let{message:a,variant:b}=A.h.state,c=G[b];return(0,d.qy)`
      <wui-alertbar
        message=${a}
        backgroundColor=${c?.backgroundColor}
        iconColor=${c?.iconColor}
        icon=${c?.icon}
      ></wui-alertbar>
    `}onOpen(a){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):a||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};H.styles=E,F([(0,e.wk)()],H.prototype,"open",void 0),H=F([(0,v.EM)("w3m-alertbar")],H);var I=c(19898),J=c(30221),K=c(43829),L=c(98604);c(41685),c(77876),c(8968);let M=(0,d.AH)`
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
`;var N=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let O=class extends d.WF{constructor(){super(...arguments),this.imageSrc=""}render(){return(0,d.qy)`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`}imageTemplate(){return this.imageSrc?(0,d.qy)`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`:(0,d.qy)`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`}};O.styles=[w.W5,w.fD,w.ck,M],N([(0,e.MZ)()],O.prototype,"imageSrc",void 0),O=N([(0,x.E)("wui-select")],O),c(11905),c(41298);var P=c(96002);let Q=(0,d.AH)`
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
`;var R=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let S=["SmartSessionList"];function T(){let a=o.I.state.data?.connector?.name,b=o.I.state.data?.wallet?.name,c=o.I.state.data?.network?.name,d=b??a,e=l.a.getConnectors(),f=1===e.length&&e[0]?.id==="w3m-email";return{Connect:`Connect ${f?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",ConnectingExternal:d??"Connect Wallet",ConnectingWalletConnect:d??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview convert",Downloads:d?`Get ${d}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",ProfileWallets:"Wallets",SwitchNetwork:c??"Switch Network",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select token",SwapPreview:"Preview swap",WalletSend:"Send",WalletSendPreview:"Review send",WalletSendSelectToken:"Select Token",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a wallet?",ConnectWallets:"Connect wallet",ConnectSocials:"All socials",ConnectingSocial:I.U.state.socialProvider?I.U.state.socialProvider:"Connect Social",ConnectingMultiChain:"Select chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Payment in progress",DataCapture:"Profile",DataCaptureOtpConfirm:"Confirm Email",FundWallet:"Fund wallet"}}let U=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.heading=T()[o.I.state.view],this.network=k.W.state.activeCaipNetwork,this.networkImage=J.$.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=o.I.state.view,this.viewDirection="",this.headerText=T()[o.I.state.view],this.unsubscribe.push(K.j.subscribeNetworkImages(()=>{this.networkImage=J.$.getNetworkImage(this.network)}),o.I.subscribeKey("view",a=>{setTimeout(()=>{this.view=a,this.headerText=T()[a]},P.o.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),k.W.subscribeKey("activeCaipNetwork",a=>{this.network=a,this.networkImage=J.$.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(a=>a())}render(){return(0,d.qy)`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){L.E.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),o.I.push("WhatIsAWallet")}async onClose(){await q.safeClose()}rightHeaderTemplate(){let a=i.H?.state?.features?.smartSessions;return"Account"===o.I.state.view&&a?(0,d.qy)`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${()=>o.I.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `:this.closeButtonTemplate()}closeButtonTemplate(){return(0,d.qy)`
      <wui-icon-link
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `}titleTemplate(){let a=S.includes(this.view);return(0,d.qy)`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${a?(0,d.qy)`<wui-tag variant="main">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){let{view:a}=o.I.state,b="Connect"===a,c=i.H.state.enableEmbedded,e=i.H.state.enableNetworkSwitch;return"Account"===a&&e?(0,d.qy)`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${(0,f.J)(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${(0,f.J)(this.networkImage)}
      ></wui-select>`:this.showBack&&!("ApproveTransaction"===a||"ConnectingSiwe"===a||b&&c)?(0,d.qy)`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`:(0,d.qy)`<wui-icon-link
      data-hidden=${!b}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`}onNetworks(){this.isAllowedNetworkSwitch()&&(L.E.sendEvent({type:"track",event:"CLICK_NETWORKS"}),o.I.push("Networks"))}isAllowedNetworkSwitch(){let a=k.W.getAllRequestedCaipNetworks(),b=!!a&&a.length>1,c=a?.find(({id:a})=>a===this.network?.id);return b||!c}getPadding(){return this.heading?["l","2l","l","2l"]:["0","2l","0","2l"]}onViewChange(){let{history:a}=o.I.state,b=P.o.VIEW_DIRECTION.Next;a.length<this.prevHistoryLength&&(b=P.o.VIEW_DIRECTION.Prev),this.prevHistoryLength=a.length,this.viewDirection=b}async onHistoryChange(){let{history:a}=o.I.state,b=this.shadowRoot?.querySelector("#dynamic");a.length>1&&!this.showBack&&b?(await b.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,b.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):a.length<=1&&this.showBack&&b&&(await b.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,b.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){o.I.goBack()}};U.styles=Q,R([(0,e.wk)()],U.prototype,"heading",void 0),R([(0,e.wk)()],U.prototype,"network",void 0),R([(0,e.wk)()],U.prototype,"networkImage",void 0),R([(0,e.wk)()],U.prototype,"showBack",void 0),R([(0,e.wk)()],U.prototype,"prevHistoryLength",void 0),R([(0,e.wk)()],U.prototype,"view",void 0),R([(0,e.wk)()],U.prototype,"viewDirection",void 0),R([(0,e.wk)()],U.prototype,"headerText",void 0),U=R([(0,v.EM)("w3m-header")],U),c(10979);let V=(0,d.AH)`
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
`;var W=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let X=class extends d.WF{constructor(){super(...arguments),this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="checkmark",this.message="",this.loading=!1,this.iconType="default"}render(){return(0,d.qy)`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return this.loading?(0,d.qy)`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:"default"===this.iconType?(0,d.qy)`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>`:(0,d.qy)`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`}};X.styles=[w.W5,V],W([(0,e.MZ)()],X.prototype,"backgroundColor",void 0),W([(0,e.MZ)()],X.prototype,"iconColor",void 0),W([(0,e.MZ)()],X.prototype,"icon",void 0),W([(0,e.MZ)()],X.prototype,"message",void 0),W([(0,e.MZ)()],X.prototype,"loading",void 0),W([(0,e.MZ)()],X.prototype,"iconType",void 0),X=W([(0,x.E)("wui-snackbar")],X);let Y=(0,d.AH)`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var Z=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let $={loading:void 0,success:{backgroundColor:"success-100",iconColor:"success-100",icon:"checkmark"},error:{backgroundColor:"error-100",iconColor:"error-100",icon:"close"}},_=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=s.P.state.open,this.unsubscribe.push(s.P.subscribeKey("open",a=>{this.open=a,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(a=>a())}render(){let{message:a,variant:b,svg:c}=s.P.state,e=$[b],{icon:f,iconColor:g}=c??e??{};return(0,d.qy)`
      <wui-snackbar
        message=${a}
        backgroundColor=${e?.backgroundColor}
        iconColor=${g}
        icon=${f}
        .loading=${"loading"===b}
      ></wui-snackbar>
    `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),s.P.state.autoClose&&(this.timeout=setTimeout(()=>s.P.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};_.styles=Y,Z([(0,e.wk)()],_.prototype,"open",void 0),_=Z([(0,v.EM)("w3m-snackbar")],_),c(33297),c(93266);let aa=(0,d.AH)`
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
`;var ab=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let ac="scroll-lock";class ad extends d.WF{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=i.H.state.enableEmbedded,this.open=j.W.state.open,this.caipAddress=k.W.state.activeCaipAddress,this.caipNetwork=k.W.state.activeCaipNetwork,this.shake=j.W.state.shake,this.filterByNamespace=l.a.state.filterByNamespace,this.initializeTheming(),m.N.prefetchAnalyticsConfig(),this.unsubscribe.push(j.W.subscribeKey("open",a=>a?this.onOpen():this.onClose()),j.W.subscribeKey("shake",a=>this.shake=a),k.W.subscribeKey("activeCaipNetwork",a=>this.onNewNetwork(a)),k.W.subscribeKey("activeCaipAddress",a=>this.onNewAddress(a)),i.H.subscribeKey("enableEmbedded",a=>this.enableEmbedded=a),l.a.subscribeKey("filterByNamespace",a=>{this.filterByNamespace===a||k.W.getAccountData(a)?.caipAddress||(m.N.fetchRecommendedWallets(),this.filterByNamespace=a)}))}firstUpdated(){if(this.caipAddress){if(this.enableEmbedded){j.W.close(),this.prefetch();return}this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(a=>a()),this.onRemoveKeyboardListener()}render(){return(this.style.cssText=`
      --local-border-bottom-mobile-radius: ${this.enableEmbedded?"clamp(0px, var(--wui-border-radius-l), 44px)":"0px"};
    `,this.enableEmbedded)?(0,d.qy)`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?(0,d.qy)`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return(0,d.qy)` <wui-card
      shake="${this.shake}"
      data-embedded="${(0,f.J)(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(a){a.target===a.currentTarget&&await this.handleClose()}async handleClose(){await q.safeClose()}initializeTheming(){let{themeVariables:a,themeMode:b}=r.W.state,c=v.Zv.getColorTheme(b);(0,v.RF)(a,c)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),s.P.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){let a=document.createElement("style");a.dataset.w3m=ac,a.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(a)}onScrollUnlock(){let a=document.head.querySelector(`style[data-w3m="${ac}"]`);a&&a.remove()}onAddKeyboardListener(){this.abortController=new AbortController;let a=this.shadowRoot?.querySelector("wui-card");a?.focus(),window.addEventListener("keydown",b=>{if("Escape"===b.key)this.handleClose();else if("Tab"===b.key){let{tagName:c}=b.target;!c||c.includes("W3M-")||c.includes("WUI-")||a?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(a){let b=k.W.state.isSwitchingNamespace,c="ProfileWallets"===o.I.state.view;a?await this.onConnected({caipAddress:a,isSwitchingNamespace:b,isInProfileView:c}):b||this.enableEmbedded||c||j.W.close(),await p.U.initializeIfEnabled(a),this.caipAddress=a,k.W.setIsSwitchingNamespace(!1)}async onConnected(a){if(a.isInProfileView)return;let{chainNamespace:b,chainId:c,address:d}=g.C.parseCaipAddress(a.caipAddress),e=`${b}:${c}`,f=!t.w.getPlainAddress(this.caipAddress),h=await p.U.getSessions({address:d,caipNetworkId:e}),i=!p.U.getSIWX()||h.some(a=>a.data.accountAddress===d),k=a.isSwitchingNamespace&&i&&!this.enableEmbedded,l=this.enableEmbedded&&f;k?o.I.goBack():l&&j.W.close()}onNewNetwork(a){let b=this.caipNetwork,c=b?.caipNetworkId?.toString(),d=b?.chainNamespace,e=a?.caipNetworkId?.toString(),f=a?.chainNamespace,g=c!==e,i=b?.name===h.o.UNSUPPORTED_NETWORK_NAME,l="ConnectingExternal"===o.I.state.view,m="ProfileWallets"===o.I.state.view,n=!k.W.getAccountData(a?.chainNamespace)?.caipAddress,p="UnsupportedChain"===o.I.state.view,q=j.W.state.open,r=!1;this.enableEmbedded&&"SwitchNetwork"===o.I.state.view&&(r=!0),g&&u.GN.resetState(),q&&!l&&!m&&(n?g&&(r=!0):p?r=!0:g&&d===f&&!i&&(r=!0)),r&&"SIWXSignMessage"!==o.I.state.view&&o.I.goBack(),this.caipNetwork=a}prefetch(){this.hasPrefetched||(m.N.prefetch(),m.N.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}}ad.styles=aa,ab([(0,e.MZ)({type:Boolean})],ad.prototype,"enableEmbedded",void 0),ab([(0,e.wk)()],ad.prototype,"open",void 0),ab([(0,e.wk)()],ad.prototype,"caipAddress",void 0),ab([(0,e.wk)()],ad.prototype,"caipNetwork",void 0),ab([(0,e.wk)()],ad.prototype,"shake",void 0),ab([(0,e.wk)()],ad.prototype,"filterByNamespace",void 0);let ae=class extends ad{};ae=ab([(0,v.EM)("w3m-modal")],ae);let af=class extends ad{};af=ab([(0,v.EM)("appkit-modal")],af)}};