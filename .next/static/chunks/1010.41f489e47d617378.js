"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1010],{21010:(e,t,i)=>{i.r(t),i.d(t,{W3mDataCaptureOtpConfirmView:()=>I,W3mDataCaptureView:()=>k,W3mEmailSuffixesWidget:()=>C,W3mRecentEmailsWidget:()=>q});var a=i(28312),r=i(745),s=i(55458),n=i(19628),o=i(90906),l=i(96641),c=i(5517),u=i(52515),d=i(60500),h=i(54846),g=i(11501),p=i(11076),m=i(65819),w=i(99836),f=i(26343);class y{constructor(e){this.expiration=e.expiration,this.getNonce=e.getNonce,this.getRequestId=e.getRequestId,this.domain=e.domain,this.uri=e.uri,this.statement=e.statement,this.resources=e.resources}async createMessage(e){let t={accountAddress:e.accountAddress,chainId:e.chainId,version:this.version,domain:this.domain,uri:this.uri,statement:this.statement,resources:this.resources,nonce:await this.getNonce(e),requestId:await this.getRequestId?.(),expirationTime:this.getExpirationTime(e),issuedAt:this.getIssuedAt(),notBefore:this.getNotBefore(e)};return Object.assign(t,{toString:()=>this.stringify(t)})}getExpirationTime({notBefore:e}){if(void 0===this.expiration)return;let t=e?new Date(e).getTime():Date.now();return this.stringifyDate(new Date(t+this.expiration))}getNotBefore({notBefore:e}){return e?this.stringifyDate(new Date(e)):void 0}getIssuedAt(){return this.stringifyDate(new Date)}stringifyDate(e){return e.toISOString()}}class x extends y{constructor({clearChainIdNamespace:e,...t}){super(t),this.version="1",this.clearChainIdNamespace=e||!1}getNetworkName(e){let t=o.W.getAllRequestedCaipNetworks();return f.L.getNetworkNameByCaipNetworkId(t,e)}stringify(e){let t=this.clearChainIdNamespace?e.chainId.split(":")[1]:e.chainId,i=this.getNetworkName(e.chainId);return[`${e.domain} wants you to sign in with your ${i} account:`,e.accountAddress,e.statement?`
${e.statement}
`:"",`URI: ${e.uri}`,`Version: ${e.version}`,`Chain ID: ${t}`,`Nonce: ${e.nonce}`,e.issuedAt&&`Issued At: ${e.issuedAt}`,e.expirationTime&&`Expiration Time: ${e.expirationTime}`,e.notBefore&&`Not Before: ${e.notBefore}`,e.requestId&&`Request ID: ${e.requestId}`,e.resources?.length&&e.resources.reduce((e,t)=>`${e}
- ${t}`,"Resources:")].filter(e=>"string"==typeof e).join("\n").trim()}}class v{constructor(e={}){this.otpUuid=null,this.listeners={sessionChanged:[]},this.localAuthStorageKey=e.localAuthStorageKey||s.Ws.SIWX_AUTH_TOKEN,this.localNonceStorageKey=e.localNonceStorageKey||s.Ws.SIWX_NONCE_TOKEN,this.required=e.required??!0,this.messenger=new x({domain:"undefined"==typeof document?"Unknown Domain":document.location.host,uri:"undefined"==typeof document?"Unknown URI":document.location.href,getNonce:this.getNonce.bind(this),clearChainIdNamespace:!1})}async createMessage(e){return this.messenger.createMessage(e)}async addSession(e){let t=await this.request({method:"POST",key:"authenticate",body:{data:e.data,message:e.message,signature:e.signature,clientId:this.getClientId(),walletInfo:this.getWalletInfo()},headers:["nonce","otp"]});this.setStorageToken(t.token,this.localAuthStorageKey),this.emit("sessionChanged",e),this.setAppKitAccountUser(function(e){let t=e.split(".");if(3!==t.length)throw Error("Invalid token");let i=t[1];if("string"!=typeof i)throw Error("Invalid token");let a=i.replace(/-/gu,"+").replace(/_/gu,"/");return JSON.parse(atob(a.padEnd(a.length+(4-a.length%4)%4,"=")))}(t.token)),this.otpUuid=null}async getSessions(e,t){try{if(!this.getStorageToken(this.localAuthStorageKey))return[];let i=await this.request({method:"GET",key:"me",query:{},headers:["auth"]});if(!i)return[];let a=i.address.toLowerCase()===t.toLowerCase(),r=i.caip2Network===e;if(!a||!r)return[];let s={data:{accountAddress:i.address,chainId:i.caip2Network},message:"",signature:""};return this.emit("sessionChanged",s),this.setAppKitAccountUser(i),[s]}catch{return[]}}async revokeSession(e,t){return Promise.resolve(this.clearStorageTokens())}async setSessions(e){if(0===e.length)this.clearStorageTokens();else{let t=e.find(e=>e.data.chainId===(0,h.kg)()?.caipNetworkId)||e[0];await this.addSession(t)}}getRequired(){return this.required}async getSessionAccount(){if(!this.getStorageToken(this.localAuthStorageKey))throw Error("Not authenticated");return this.request({method:"GET",key:"me",body:void 0,query:{includeAppKitAccount:!0},headers:["auth"]})}async setSessionAccountMetadata(e=null){if(!this.getStorageToken(this.localAuthStorageKey))throw Error("Not authenticated");return this.request({method:"PUT",key:"account-metadata",body:{metadata:e},headers:["auth"]})}on(e,t){return this.listeners[e].push(t),()=>{this.listeners[e]=this.listeners[e].filter(e=>e!==t)}}removeAllListeners(){Object.keys(this.listeners).forEach(e=>{this.listeners[e]=[]})}async requestEmailOtp({email:e,account:t}){let i=await this.request({method:"POST",key:"otp",body:{email:e,account:t}});return this.otpUuid=i.uuid,this.messenger.resources=[`email:${e}`],i}confirmEmailOtp({code:e}){return this.request({method:"PUT",key:"otp",body:{code:e},headers:["otp"]})}async request({method:e,key:t,query:i,body:a,headers:r}){let{projectId:s,st:n,sv:o}=this.getSDKProperties(),l=new URL(`${d.o.W3M_API_URL}/auth/v1/${String(t)}`);l.searchParams.set("projectId",s),l.searchParams.set("st",n),l.searchParams.set("sv",o),i&&Object.entries(i).forEach(([e,t])=>l.searchParams.set(e,String(t)));let c=await fetch(l,{method:e,body:a?JSON.stringify(a):void 0,headers:Array.isArray(r)?r.reduce((e,t)=>{switch(t){case"nonce":e["x-nonce-jwt"]=`Bearer ${this.getStorageToken(this.localNonceStorageKey)}`;break;case"auth":e.Authorization=`Bearer ${this.getStorageToken(this.localAuthStorageKey)}`;break;case"otp":this.otpUuid&&(e["x-otp"]=this.otpUuid)}return e},{}):void 0});if(!c.ok)throw Error(await c.text());return c.headers.get("content-type")?.includes("application/json")?c.json():null}getStorageToken(e){return s.Ud.getItem(e)}setStorageToken(e,t){s.Ud.setItem(t,e)}clearStorageTokens(){this.otpUuid=null,s.Ud.removeItem(this.localAuthStorageKey),s.Ud.removeItem(this.localNonceStorageKey),this.emit("sessionChanged",void 0)}async getNonce(){let{nonce:e,token:t}=await this.request({method:"GET",key:"nonce"});return this.setStorageToken(t,this.localNonceStorageKey),e}getClientId(){return g.T.state.clientId}getWalletInfo(){let{connectedWalletInfo:e}=p.U.state;if(!e)return;if("social"in e)return{type:"social",social:e.social,identifier:e.identifier};let{name:t,icon:i}=e,a="unknown";switch(e.type){case w.o.CONNECTOR_TYPE_EXTERNAL:case w.o.CONNECTOR_TYPE_INJECTED:case w.o.CONNECTOR_TYPE_ANNOUNCED:a="extension";break;case w.o.CONNECTOR_TYPE_WALLET_CONNECT:a="walletconnect";break;default:a="unknown"}return{type:a,name:t,icon:i}}getSDKProperties(){return m.N._getSdkProperties()}emit(e,t){this.listeners[e].forEach(e=>e(t))}setAppKitAccountUser(e){let{email:t}=e;t&&Object.values(d.o.CHAIN).forEach(e=>{o.W.setAccountProp("user",{email:t},e)})}}let b=(0,a.AH)`
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);

    transition-property: margin, height;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);
    margin-top: -100px;

    &[data-state='loading'] {
      margin-top: 0px;
    }

    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 252px;
      width: 360px;
      background: radial-gradient(
        96.11% 53.95% at 50% 51.28%,
        transparent 0%,
        color-mix(in srgb, var(--wui-color-bg-100) 5%, transparent) 49%,
        color-mix(in srgb, var(--wui-color-bg-100) 65%, transparent) 99.43%
      );
    }
  }

  .hero-main-icon {
    width: 176px;
    transition-property: background-color;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-1);

    &[data-state='loading'] {
      width: 56px;
    }
  }

  .hero-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);
    flex-wrap: nowrap;
    min-width: fit-content;

    &:nth-child(1) {
      transform: translateX(-30px);
    }

    &:nth-child(2) {
      transform: translateX(30px);
    }

    &:nth-child(4) {
      transform: translateX(40px);
    }

    transition-property: height;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);
    height: 68px;

    &[data-state='loading'] {
      height: 0px;
    }
  }

  .hero-row-icon {
    opacity: 0.1;
    transition-property: opacity;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);

    &[data-state='loading'] {
      opacity: 0;
    }
  }

  .email-sufixes {
    display: flex;
    flex-direction: row;
    gap: var(--wui-spacing-3xs);
    overflow-x: auto;
    max-width: 100%;
    margin-top: var(--wui-spacing-s);
    margin-bottom: calc(-1 * var(--wui-spacing-m));
    padding-bottom: var(--wui-spacing-m);
    margin-left: calc(-1 * var(--wui-spacing-m));
    margin-right: calc(-1 * var(--wui-spacing-m));
    padding-left: var(--wui-spacing-m);
    padding-right: var(--wui-spacing-m);

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .recent-emails {
    display: flex;
    flex-direction: column;
    padding: var(--wui-spacing-s) 0;
    border-top: 1px solid var(--wui-color-gray-glass-005);
    border-bottom: 1px solid var(--wui-color-gray-glass-005);
  }

  .recent-emails-heading {
    margin-bottom: var(--wui-spacing-s);
  }

  .recent-emails-list-item {
    --wui-color-gray-glass-002: transparent;
  }
`;var E=function(e,t,i,a){var r,s=arguments.length,n=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let k=class extends a.WF{constructor(){super(...arguments),this.email=n.I.state.data?.email??o.W.getAccountData()?.user?.email??"",this.address=o.W.getAccountData()?.address??"",this.loading=!1,this.appName=l.H.state.metadata?.name??"AppKit",this.siwx=l.H.state.siwx,this.isRequired=Array.isArray(l.H.state.remoteFeatures?.emailCapture)&&l.H.state.remoteFeatures?.emailCapture.includes("required"),this.recentEmails=this.getRecentEmails()}connectedCallback(){this.siwx&&this.siwx instanceof v||c.P.showError("ReownAuthentication is not initialized."),super.connectedCallback()}firstUpdated(){this.loading=!1,this.recentEmails=this.getRecentEmails(),this.email&&this.onSubmit()}render(){return(0,a.qy)`
      <wui-flex flexDirection="column" .padding=${["3xs","m","m","m"]} gap="l">
        ${this.hero()} ${this.paragraph()} ${this.emailInput()} ${this.recentEmailsWidget()}
        ${this.footerActions()}
      </wui-flex>
    `}hero(){return(0,a.qy)`
      <div class="hero" data-state=${this.loading?"loading":"default"}>
        ${this.heroRow(["id","mail","wallet","x","solana","qrCode"])}
        ${this.heroRow(["mail","farcaster","wallet","discord","mobile","qrCode"])}
        <div class="hero-row">
          ${this.heroIcon("github")} ${this.heroIcon("bank")}
          <wui-icon-box
            size="xl"
            iconSize="xxl"
            iconColor=${this.loading?"fg-100":"accent-100"}
            backgroundColor=${this.loading?"fg-100":"accent-100"}
            icon=${this.loading?"id":"user"}
            isOpaque
            class="hero-main-icon"
            data-state=${this.loading?"loading":"default"}
          >
          </wui-icon-box>
          ${this.heroIcon("id")} ${this.heroIcon("card")}
        </div>
        ${this.heroRow(["google","id","github","verify","apple","mobile"])}
      </div>
    `}heroRow(e){return(0,a.qy)`
      <div class="hero-row" data-state=${this.loading?"loading":"default"}>
        ${e.map(this.heroIcon.bind(this))}
      </div>
    `}heroIcon(e){return(0,a.qy)`
      <wui-icon-box
        size="xl"
        iconSize="xxl"
        iconColor="fg-100"
        backgroundColor="fg-100"
        icon=${e}
        data-state=${this.loading?"loading":"default"}
        isOpaque
        class="hero-row-icon"
      >
      </wui-icon-box>
    `}paragraph(){return this.loading?(0,a.qy)`
        <wui-text variant="paragraph-400" color="fg-200" align="center"
          >We are verifying your account with email
          <wui-text variant="paragraph-600" color="accent-100">${this.email}</wui-text> and address
          <wui-text variant="paragraph-600" color="fg-100">
            ${u.Zv.getTruncateString({string:this.address,charsEnd:4,charsStart:4,truncate:"middle"})} </wui-text
          >, please wait a moment.</wui-text
        >
      `:this.isRequired?(0,a.qy)`
        <wui-text variant="paragraph-600" color="fg-100" align="center">
          ${this.appName} requires your email for authentication.
        </wui-text>
      `:(0,a.qy)`
      <wui-flex flexDirection="column" gap="xs" alignItems="center">
        <wui-text variant="paragraph-600" color="fg-100" align="center" size>
          ${this.appName} would like to collect your email.
        </wui-text>

        <wui-text variant="small-400" color="fg-200" align="center">
          Don't worry, it's optional&mdash;you can skip this step.
        </wui-text>
      </wui-flex>
    `}emailInput(){if(this.loading)return null;let e=e=>{this.email=e.detail};return(0,a.qy)`
      <wui-flex flexDirection="column">
        <wui-email-input
          .value=${this.email}
          .disabled=${this.loading}
          @inputChange=${e}
          @keydown=${e=>{"Enter"===e.key&&this.onSubmit()}}
        ></wui-email-input>

        <w3m-email-suffixes-widget
          .email=${this.email}
          @change=${e}
        ></w3m-email-suffixes-widget>
      </wui-flex>
    `}recentEmailsWidget(){return 0===this.recentEmails.length||this.loading?null:(0,a.qy)`
      <w3m-recent-emails-widget
        .emails=${this.recentEmails}
        @select=${e=>{this.email=e.detail,this.onSubmit()}}
      ></w3m-recent-emails-widget>
    `}footerActions(){return(0,a.qy)`
      <wui-flex flexDirection="row" fullWidth gap="s">
        ${this.isRequired?null:(0,a.qy)`<wui-button
              size="lg"
              variant="neutral"
              fullWidth
              .disabled=${this.loading}
              @click=${this.onSkip.bind(this)}
              >Skip this step</wui-button
            >`}

        <wui-button
          size="lg"
          variant="main"
          type="submit"
          fullWidth
          .disabled=${!this.email||!this.isValidEmail(this.email)}
          .loading=${this.loading}
          @click=${this.onSubmit.bind(this)}
        >
          Continue
        </wui-button>
      </wui-flex>
    `}async onSubmit(){let e=o.W.getActiveCaipAddress();if(!e)throw Error("Account is not connected.");if(!this.isValidEmail(this.email))return void c.P.showError("Please provide a valid email.");try{this.loading=!0;let t=await this.siwx.requestEmailOtp({email:this.email,account:e});this.pushRecentEmail(this.email),null===t.uuid?n.I.replace("SIWXSignMessage"):n.I.replace("DataCaptureOtpConfirm",{email:this.email})}catch(e){c.P.showError("Failed to send email OTP"),this.loading=!1}}onSkip(){n.I.replace("SIWXSignMessage")}getRecentEmails(){let e=s.Ud.getItem(s.Ws.RECENT_EMAILS);return(e?e.split(","):[]).filter(this.isValidEmail.bind(this)).slice(0,3)}pushRecentEmail(e){let t=Array.from(new Set([e,...this.getRecentEmails()])).slice(0,3);s.Ud.setItem(s.Ws.RECENT_EMAILS,t.join(","))}isValidEmail(e){return/^\S+@\S+\.\S+$/u.test(e)}};k.styles=[b],E([(0,r.wk)()],k.prototype,"email",void 0),E([(0,r.wk)()],k.prototype,"address",void 0),E([(0,r.wk)()],k.prototype,"loading",void 0),E([(0,r.wk)()],k.prototype,"appName",void 0),E([(0,r.wk)()],k.prototype,"siwx",void 0),E([(0,r.wk)()],k.prototype,"isRequired",void 0),E([(0,r.wk)()],k.prototype,"recentEmails",void 0),k=E([(0,u.EM)("w3m-data-capture-view")],k);var S=i(64180),$=function(e,t,i,a){var r,s=arguments.length,n=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let I=class extends S.W3mEmailOtpWidget{constructor(){super(...arguments),this.siwx=l.H.state.siwx,this.onOtpSubmit=async e=>{await this.siwx.confirmEmailOtp({code:e}),n.I.replace("SIWXSignMessage")},this.onOtpResend=async e=>{let t=o.W.getAccountData();if(!t?.caipAddress)throw Error("No account data found");await this.siwx.requestEmailOtp({email:e,account:t.caipAddress})}}connectedCallback(){this.siwx&&this.siwx instanceof v||c.P.showError("ReownAuthentication is not initialized."),super.connectedCallback()}shouldSubmitOnOtpChange(){return this.otp.length===S.W3mEmailOtpWidget.OTP_LENGTH}};$([(0,r.wk)()],I.prototype,"siwx",void 0),I=$([(0,u.EM)("w3m-data-capture-otp-confirm-view")],I);var N=function(e,t,i,a){var r,s=arguments.length,n=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let A=["@gmail.com","@outlook.com","@yahoo.com","@hotmail.com","@aol.com","@icloud.com","@zoho.com"],C=class extends a.WF{constructor(){super(...arguments),this.email=""}render(){let e=A.filter(this.filter.bind(this)).map(this.item.bind(this));return 0===e.length?null:(0,a.qy)`<div class="email-sufixes">${e}</div>`}filter(e){if(!this.email)return!1;let t=this.email.split("@");if(t.length<2)return!0;let i=t.pop();return e.includes(i)&&e!==`@${i}`}item(e){return(0,a.qy)`<wui-button variant="neutral" size="sm" @click=${()=>{let t=this.email.split("@");t.length>1&&t.pop();let i=t[0]+e;this.dispatchEvent(new CustomEvent("change",{detail:i,bubbles:!0,composed:!0}))}}
      >${e}</wui-button
    >`}};C.styles=[b],N([(0,r.MZ)()],C.prototype,"email",void 0),C=N([(0,u.EM)("w3m-email-suffixes-widget")],C);var O=function(e,t,i,a){var r,s=arguments.length,n=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let q=class extends a.WF{constructor(){super(...arguments),this.emails=[]}render(){return 0===this.emails.length?null:(0,a.qy)`<div class="recent-emails">
      <wui-text variant="micro-600" color="fg-200" class="recent-emails-heading"
        >Recently used emails</wui-text
      >
      ${this.emails.map(this.item.bind(this))}
    </div>`}item(e){return(0,a.qy)`<wui-list-item
      @click=${()=>{this.dispatchEvent(new CustomEvent("select",{detail:e,bubbles:!0,composed:!0}))}}
      ?chevron=${!0}
      icon="mail"
      iconVariant="overlay"
      class="recent-emails-list-item"
    >
      <wui-text variant="paragraph-500" color="fg-100">${e}</wui-text>
    </wui-list-item>`}};q.styles=[b],O([(0,r.MZ)()],q.prototype,"emails",void 0),q=O([(0,u.EM)("w3m-recent-emails-widget")],q)}}]);