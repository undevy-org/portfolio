"use strict";exports.id=2517,exports.ids=[2517],exports.modules={92517:(a,b,c)=>{c.r(b),c.d(b,{W3mConnectSocialsView:()=>v,W3mConnectingFarcasterView:()=>L,W3mConnectingSocialView:()=>I});var d=c(50861),e=c(52827),f=c(24115),g=c(89990),h=c(12335),i=c(22490);c(77838),c(6932),c(62423);var j=c(60778),k=c(71136),l=c(80796),m=c(13567),n=c(86997),o=c(34526);c(39767);var p=c(45783);let q=(0,d.AH)`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var r=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let s=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=j.a.state.connectors,this.authConnector=this.connectors.find(a=>"AUTH"===a.type),this.remoteFeatures=h.H.state.remoteFeatures,this.isPwaLoading=!1,this.unsubscribe.push(j.a.subscribeKey("connectors",a=>{this.connectors=a,this.authConnector=this.connectors.find(a=>"AUTH"===a.type)}),h.H.subscribeKey("remoteFeatures",a=>this.remoteFeatures=a))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let a=this.remoteFeatures?.socials||[],b=!!this.authConnector,c=a?.length,e="ConnectSocials"===k.I.state.view;return b&&c||e?(e&&!c&&(a=l.oU.DEFAULT_SOCIALS),(0,d.qy)` <wui-flex flexDirection="column" gap="xs">
      ${a.map(a=>(0,d.qy)`<wui-list-social
            @click=${()=>{this.onSocialClick(a)}}
            data-testid=${`social-selector-${a}`}
            name=${a}
            logo=${a}
            ?disabled=${this.isPwaLoading}
          ></wui-list-social>`)}
    </wui-flex>`):null}async onSocialClick(a){a&&await (0,n.Up)(a)}async handlePwaFrameLoad(){if(o.w.isPWA()){this.isPwaLoading=!0;try{this.authConnector?.provider instanceof p.Y&&await this.authConnector.provider.init()}catch(a){m.h.open({displayMessage:"Error loading embedded wallet in PWA",debugMessage:a.message},"error")}finally{this.isPwaLoading=!1}}}};s.styles=q,r([(0,e.MZ)()],s.prototype,"tabIdx",void 0),r([(0,e.wk)()],s.prototype,"connectors",void 0),r([(0,e.wk)()],s.prototype,"authConnector",void 0),r([(0,e.wk)()],s.prototype,"remoteFeatures",void 0),r([(0,e.wk)()],s.prototype,"isPwaLoading",void 0),s=r([(0,i.EM)("w3m-social-login-list")],s);let t=(0,d.AH)`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var u=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let v=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.checked=g.o.state.isLegalCheckboxChecked,this.unsubscribe.push(g.o.subscribeKey("isLegalCheckboxChecked",a=>{this.checked=a}))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let{termsConditionsUrl:a,privacyPolicyUrl:b}=h.H.state,c=h.H.state.features?.legalCheckbox,e=!!(a||b)&&!!c,g=e&&!this.checked;return(0,d.qy)`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${e?["0","s","s","s"]:"s"}
        gap="xs"
        class=${(0,f.J)(g?"disabled":void 0)}
      >
        <w3m-social-login-list tabIdx=${(0,f.J)(g?-1:void 0)}></w3m-social-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};v.styles=t,u([(0,e.wk)()],v.prototype,"checked",void 0),v=u([(0,i.EM)("w3m-connect-socials-view")],v);var w=c(19898),x=c(40764),y=c(83908),z=c(98604),A=c(6544),B=c(97543),C=c(26728),D=c(83344);c(95007),c(66655),c(93950),c(41298);var E=c(97909),F=c(96002);let G=(0,d.AH)`
  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
  }
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
  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
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
  .capitalize {
    text-transform: capitalize;
  }
`;var H=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let I=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.socialProvider=w.U.state.socialProvider,this.socialWindow=w.U.state.socialWindow,this.error=!1,this.connecting=!1,this.message="Connect in the provider window",this.remoteFeatures=h.H.state.remoteFeatures,this.address=w.U.state.address,this.connectionsByNamespace=x.x.getConnections(y.W.state.activeChain),this.hasMultipleConnections=this.connectionsByNamespace.length>0,this.authConnector=j.a.getAuthConnector(),this.handleSocialConnection=async a=>{if(a.data?.resultUri)if(a.origin===F.o.SECURE_SITE_ORIGIN){window.removeEventListener("message",this.handleSocialConnection,!1);try{if(this.authConnector&&!this.connecting){this.socialWindow&&(this.socialWindow.close(),w.U.setSocialWindow(void 0,y.W.state.activeChain)),this.connecting=!0,this.updateMessage();let b=a.data.resultUri;this.socialProvider&&z.E.sendEvent({type:"track",event:"SOCIAL_LOGIN_REQUEST_USER_DATA",properties:{provider:this.socialProvider}}),await x.x.connectExternal({id:this.authConnector.id,type:this.authConnector.type,socialUri:b},this.authConnector.chain),this.socialProvider&&(A.i.setConnectedSocialProvider(this.socialProvider),z.E.sendEvent({type:"track",event:"SOCIAL_LOGIN_SUCCESS",properties:{provider:this.socialProvider}}))}}catch(a){this.error=!0,this.updateMessage(),this.socialProvider&&z.E.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider}})}}else k.I.goBack(),B.P.showError("Untrusted Origin"),this.socialProvider&&z.E.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider}})},E.R.EmbeddedWalletAbortController.signal.addEventListener("abort",()=>{this.socialWindow&&(this.socialWindow.close(),w.U.setSocialWindow(void 0,y.W.state.activeChain))}),this.unsubscribe.push(w.U.subscribe(a=>{a.socialProvider&&(this.socialProvider=a.socialProvider),a.socialWindow&&(this.socialWindow=a.socialWindow)}),h.H.subscribeKey("remoteFeatures",a=>{this.remoteFeatures=a}),w.U.subscribeKey("address",a=>{let b=this.remoteFeatures?.multiWallet;a&&a!==this.address&&(this.hasMultipleConnections&&b?(k.I.replace("ProfileWallets"),B.P.showSuccess("New Wallet Added")):(C.W.state.open||h.H.state.enableEmbedded)&&C.W.close())})),this.authConnector&&this.connectSocial()}disconnectedCallback(){this.unsubscribe.forEach(a=>a()),window.removeEventListener("message",this.handleSocialConnection,!1),this.socialWindow?.close(),w.U.setSocialWindow(void 0,y.W.state.activeChain)}render(){return(0,d.qy)`
      <wui-flex
        data-error=${(0,f.J)(this.error)}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo=${(0,f.J)(this.socialProvider)}></wui-logo>
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
          <wui-text align="center" variant="paragraph-500" color="fg-100"
            >Log in with
            <span class="capitalize">${this.socialProvider??"Social"}</span></wui-text
          >
          <wui-text align="center" variant="small-400" color=${this.error?"error-100":"fg-200"}
            >${this.message}</wui-text
          ></wui-flex
        >
      </wui-flex>
    `}loaderTemplate(){let a=D.W.state.themeVariables["--w3m-border-radius-master"],b=a?parseInt(a.replace("px",""),10):4;return(0,d.qy)`<wui-loading-thumbnail radius=${9*b}></wui-loading-thumbnail>`}connectSocial(){let a=setInterval(()=>{this.socialWindow?.closed&&(this.connecting||"ConnectingSocial"!==k.I.state.view||(this.socialProvider&&z.E.sendEvent({type:"track",event:"SOCIAL_LOGIN_CANCELED",properties:{provider:this.socialProvider}}),k.I.goBack()),clearInterval(a))},1e3);window.addEventListener("message",this.handleSocialConnection,!1)}updateMessage(){this.error?this.message="Something went wrong":this.connecting?this.message="Retrieving user data":this.message="Connect in the provider window"}};I.styles=G,H([(0,e.wk)()],I.prototype,"socialProvider",void 0),H([(0,e.wk)()],I.prototype,"socialWindow",void 0),H([(0,e.wk)()],I.prototype,"error",void 0),H([(0,e.wk)()],I.prototype,"connecting",void 0),H([(0,e.wk)()],I.prototype,"message",void 0),H([(0,e.wk)()],I.prototype,"remoteFeatures",void 0),I=H([(0,i.EM)("w3m-connecting-social-view")],I),c(4977),c(42536),c(73019),c(73137),c(59962);let J=(0,d.AH)`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }

  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }
  wui-loading-thumbnail {
    position: absolute;
  }
  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
  }
`;var K=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let L=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.socialProvider=w.U.state.socialProvider,this.uri=w.U.state.farcasterUrl,this.ready=!1,this.loading=!1,this.remoteFeatures=h.H.state.remoteFeatures,this.authConnector=j.a.getAuthConnector(),this.forceUpdate=()=>{this.requestUpdate()},this.unsubscribe.push(w.U.subscribeKey("farcasterUrl",a=>{a&&(this.uri=a,this.connectFarcaster())}),w.U.subscribeKey("socialProvider",a=>{a&&(this.socialProvider=a)}),h.H.subscribeKey("remoteFeatures",a=>{this.remoteFeatures=a})),window.addEventListener("resize",this.forceUpdate)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timeout),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),(0,d.qy)`${this.platformTemplate()}`}platformTemplate(){return o.w.isMobile()?(0,d.qy)`${this.mobileTemplate()}`:(0,d.qy)`${this.desktopTemplate()}`}desktopTemplate(){return this.loading?(0,d.qy)`${this.loadingTemplate()}`:(0,d.qy)`${this.qrTemplate()}`}qrTemplate(){return(0,d.qy)` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${["0","xl","xl","xl"]}
      gap="xl"
    >
      <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

      <wui-text variant="paragraph-500" color="fg-100">
        Scan this QR Code with your phone
      </wui-text>
      ${this.copyTemplate()}
    </wui-flex>`}loadingTemplate(){return(0,d.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo="farcaster"></wui-logo>
          ${this.loaderTemplate()}
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
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Loading user data
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Please wait a moment while we load your data.
          </wui-text>
        </wui-flex>
      </wui-flex>
    `}mobileTemplate(){return(0,d.qy)` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${["3xl","xl","xl","xl"]}
      gap="xl"
    >
      <wui-flex justifyContent="center" alignItems="center">
        <wui-logo logo="farcaster"></wui-logo>
        ${this.loaderTemplate()}
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
        <wui-text align="center" variant="paragraph-500" color="fg-100"
          >Continue in Farcaster</span></wui-text
        >
        <wui-text align="center" variant="small-400" color="fg-200"
          >Accept connection request in the app</wui-text
        ></wui-flex
      >
      ${this.mobileLinkTemplate()}
    </wui-flex>`}loaderTemplate(){let a=D.W.state.themeVariables["--w3m-border-radius-master"],b=a?parseInt(a.replace("px",""),10):4;return(0,d.qy)`<wui-loading-thumbnail radius=${9*b}></wui-loading-thumbnail>`}async connectFarcaster(){if(this.authConnector)try{await this.authConnector?.provider.connectFarcaster(),this.socialProvider&&(A.i.setConnectedSocialProvider(this.socialProvider),z.E.sendEvent({type:"track",event:"SOCIAL_LOGIN_REQUEST_USER_DATA",properties:{provider:this.socialProvider}})),this.loading=!0;let a=x.x.getConnections(this.authConnector.chain).length>0;await x.x.connectExternal(this.authConnector,this.authConnector.chain);let b=this.remoteFeatures?.multiWallet;this.socialProvider&&z.E.sendEvent({type:"track",event:"SOCIAL_LOGIN_SUCCESS",properties:{provider:this.socialProvider}}),this.loading=!1,a&&b?(k.I.replace("ProfileWallets"),B.P.showSuccess("New Wallet Added")):C.W.close()}catch(a){this.socialProvider&&z.E.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider}}),k.I.goBack(),B.P.showError(a)}}mobileLinkTemplate(){return(0,d.qy)`<wui-button
      size="md"
      ?loading=${this.loading}
      ?disabled=${!this.uri||this.loading}
      @click=${()=>{this.uri&&o.w.openHref(this.uri,"_blank")}}
    >
      Open farcaster</wui-button
    >`}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let a=this.getBoundingClientRect().width-40;return(0,d.qy)` <wui-qr-code
      size=${a}
      theme=${D.W.state.themeMode}
      uri=${this.uri}
      ?farcaster=${!0}
      data-testid="wui-qr-code"
      color=${(0,f.J)(D.W.state.themeVariables["--w3m-qr-color"])}
    ></wui-qr-code>`}copyTemplate(){let a=!this.uri||!this.ready;return(0,d.qy)`<wui-link
      .disabled=${a}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}onCopyUri(){try{this.uri&&(o.w.copyToClopboard(this.uri),B.P.showSuccess("Link copied"))}catch{B.P.showError("Failed to copy")}}};L.styles=J,K([(0,e.wk)()],L.prototype,"socialProvider",void 0),K([(0,e.wk)()],L.prototype,"uri",void 0),K([(0,e.wk)()],L.prototype,"ready",void 0),K([(0,e.wk)()],L.prototype,"loading",void 0),K([(0,e.wk)()],L.prototype,"remoteFeatures",void 0),L=K([(0,i.EM)("w3m-connecting-farcaster-view")],L)}};