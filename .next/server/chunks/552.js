"use strict";exports.id=552,exports.ids=[552],exports.modules={80552:(a,b,c)=>{c.r(b),c.d(b,{W3mDataCaptureOtpConfirmView:()=>A,W3mDataCaptureView:()=>x,W3mEmailSuffixesWidget:()=>D,W3mRecentEmailsWidget:()=>F});var d=c(50861),e=c(52827),f=c(14544),g=c(71136),h=c(83908),i=c(12335),j=c(97543),k=c(22490),l=c(9132),m=c(79508),n=c(23115),o=c(19898),p=c(99589),q=c(26134),r=c(3655);class s{constructor(a){this.expiration=a.expiration,this.getNonce=a.getNonce,this.getRequestId=a.getRequestId,this.domain=a.domain,this.uri=a.uri,this.statement=a.statement,this.resources=a.resources}async createMessage(a){let b={accountAddress:a.accountAddress,chainId:a.chainId,version:this.version,domain:this.domain,uri:this.uri,statement:this.statement,resources:this.resources,nonce:await this.getNonce(a),requestId:await this.getRequestId?.(),expirationTime:this.getExpirationTime(a),issuedAt:this.getIssuedAt(),notBefore:this.getNotBefore(a)};return Object.assign(b,{toString:()=>this.stringify(b)})}getExpirationTime({notBefore:a}){if(void 0===this.expiration)return;let b=a?new Date(a).getTime():Date.now();return this.stringifyDate(new Date(b+this.expiration))}getNotBefore({notBefore:a}){return a?this.stringifyDate(new Date(a)):void 0}getIssuedAt(){return this.stringifyDate(new Date)}stringifyDate(a){return a.toISOString()}}class t extends s{constructor({clearChainIdNamespace:a,...b}){super(b),this.version="1",this.clearChainIdNamespace=a||!1}getNetworkName(a){let b=h.W.getAllRequestedCaipNetworks();return r.L.getNetworkNameByCaipNetworkId(b,a)}stringify(a){let b=this.clearChainIdNamespace?a.chainId.split(":")[1]:a.chainId,c=this.getNetworkName(a.chainId);return[`${a.domain} wants you to sign in with your ${c} account:`,a.accountAddress,a.statement?`
${a.statement}
`:"",`URI: ${a.uri}`,`Version: ${a.version}`,`Chain ID: ${b}`,`Nonce: ${a.nonce}`,a.issuedAt&&`Issued At: ${a.issuedAt}`,a.expirationTime&&`Expiration Time: ${a.expirationTime}`,a.notBefore&&`Not Before: ${a.notBefore}`,a.requestId&&`Request ID: ${a.requestId}`,a.resources?.length&&a.resources.reduce((a,b)=>`${a}
- ${b}`,"Resources:")].filter(a=>"string"==typeof a).join("\n").trim()}}class u{constructor(a={}){this.otpUuid=null,this.listeners={sessionChanged:[]},this.localAuthStorageKey=a.localAuthStorageKey||f.Ws.SIWX_AUTH_TOKEN,this.localNonceStorageKey=a.localNonceStorageKey||f.Ws.SIWX_NONCE_TOKEN,this.required=a.required??!0,this.messenger=new t({domain:"undefined"==typeof document?"Unknown Domain":document.location.host,uri:"undefined"==typeof document?"Unknown URI":document.location.href,getNonce:this.getNonce.bind(this),clearChainIdNamespace:!1})}async createMessage(a){return this.messenger.createMessage(a)}async addSession(a){let b=await this.request({method:"POST",key:"authenticate",body:{data:a.data,message:a.message,signature:a.signature,clientId:this.getClientId(),walletInfo:this.getWalletInfo()},headers:["nonce","otp"]});this.setStorageToken(b.token,this.localAuthStorageKey),this.emit("sessionChanged",a),this.setAppKitAccountUser(function(a){let b=a.split(".");if(3!==b.length)throw Error("Invalid token");let c=b[1];if("string"!=typeof c)throw Error("Invalid token");let d=c.replace(/-/gu,"+").replace(/_/gu,"/");return JSON.parse(atob(d.padEnd(d.length+(4-d.length%4)%4,"=")))}(b.token)),this.otpUuid=null}async getSessions(a,b){try{if(!this.getStorageToken(this.localAuthStorageKey))return[];let c=await this.request({method:"GET",key:"me",query:{},headers:["auth"]});if(!c)return[];let d=c.address.toLowerCase()===b.toLowerCase(),e=c.caip2Network===a;if(!d||!e)return[];let f={data:{accountAddress:c.address,chainId:c.caip2Network},message:"",signature:""};return this.emit("sessionChanged",f),this.setAppKitAccountUser(c),[f]}catch{return[]}}async revokeSession(a,b){return Promise.resolve(this.clearStorageTokens())}async setSessions(a){if(0===a.length)this.clearStorageTokens();else{let b=a.find(a=>a.data.chainId===(0,m.kg)()?.caipNetworkId)||a[0];await this.addSession(b)}}getRequired(){return this.required}async getSessionAccount(){if(!this.getStorageToken(this.localAuthStorageKey))throw Error("Not authenticated");return this.request({method:"GET",key:"me",body:void 0,query:{includeAppKitAccount:!0},headers:["auth"]})}async setSessionAccountMetadata(a=null){if(!this.getStorageToken(this.localAuthStorageKey))throw Error("Not authenticated");return this.request({method:"PUT",key:"account-metadata",body:{metadata:a},headers:["auth"]})}on(a,b){return this.listeners[a].push(b),()=>{this.listeners[a]=this.listeners[a].filter(a=>a!==b)}}removeAllListeners(){Object.keys(this.listeners).forEach(a=>{this.listeners[a]=[]})}async requestEmailOtp({email:a,account:b}){let c=await this.request({method:"POST",key:"otp",body:{email:a,account:b}});return this.otpUuid=c.uuid,this.messenger.resources=[`email:${a}`],c}confirmEmailOtp({code:a}){return this.request({method:"PUT",key:"otp",body:{code:a},headers:["otp"]})}async request({method:a,key:b,query:c,body:d,headers:e}){let{projectId:f,st:g,sv:h}=this.getSDKProperties(),i=new URL(`${l.o.W3M_API_URL}/auth/v1/${String(b)}`);i.searchParams.set("projectId",f),i.searchParams.set("st",g),i.searchParams.set("sv",h),c&&Object.entries(c).forEach(([a,b])=>i.searchParams.set(a,String(b)));let j=await fetch(i,{method:a,body:d?JSON.stringify(d):void 0,headers:Array.isArray(e)?e.reduce((a,b)=>{switch(b){case"nonce":a["x-nonce-jwt"]=`Bearer ${this.getStorageToken(this.localNonceStorageKey)}`;break;case"auth":a.Authorization=`Bearer ${this.getStorageToken(this.localAuthStorageKey)}`;break;case"otp":this.otpUuid&&(a["x-otp"]=this.otpUuid)}return a},{}):void 0});if(!j.ok)throw Error(await j.text());return j.headers.get("content-type")?.includes("application/json")?j.json():null}getStorageToken(a){return f.Ud.getItem(a)}setStorageToken(a,b){f.Ud.setItem(b,a)}clearStorageTokens(){this.otpUuid=null,f.Ud.removeItem(this.localAuthStorageKey),f.Ud.removeItem(this.localNonceStorageKey),this.emit("sessionChanged",void 0)}async getNonce(){let{nonce:a,token:b}=await this.request({method:"GET",key:"nonce"});return this.setStorageToken(b,this.localNonceStorageKey),a}getClientId(){return n.T.state.clientId}getWalletInfo(){let{connectedWalletInfo:a}=o.U.state;if(!a)return;if("social"in a)return{type:"social",social:a.social,identifier:a.identifier};let{name:b,icon:c}=a,d="unknown";switch(a.type){case q.o.CONNECTOR_TYPE_EXTERNAL:case q.o.CONNECTOR_TYPE_INJECTED:case q.o.CONNECTOR_TYPE_ANNOUNCED:d="extension";break;case q.o.CONNECTOR_TYPE_WALLET_CONNECT:d="walletconnect";break;default:d="unknown"}return{type:d,name:b,icon:c}}getSDKProperties(){return p.N._getSdkProperties()}emit(a,b){this.listeners[a].forEach(a=>a(b))}setAppKitAccountUser(a){let{email:b}=a;b&&Object.values(l.o.CHAIN).forEach(a=>{h.W.setAccountProp("user",{email:b},a)})}}let v=(0,d.AH)`
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
`;var w=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let x=class extends d.WF{constructor(){super(...arguments),this.email=g.I.state.data?.email??h.W.getAccountData()?.user?.email??"",this.address=h.W.getAccountData()?.address??"",this.loading=!1,this.appName=i.H.state.metadata?.name??"AppKit",this.siwx=i.H.state.siwx,this.isRequired=Array.isArray(i.H.state.remoteFeatures?.emailCapture)&&i.H.state.remoteFeatures?.emailCapture.includes("required"),this.recentEmails=this.getRecentEmails()}connectedCallback(){this.siwx&&this.siwx instanceof u||j.P.showError("ReownAuthentication is not initialized."),super.connectedCallback()}firstUpdated(){this.loading=!1,this.recentEmails=this.getRecentEmails(),this.email&&this.onSubmit()}render(){return(0,d.qy)`
      <wui-flex flexDirection="column" .padding=${["3xs","m","m","m"]} gap="l">
        ${this.hero()} ${this.paragraph()} ${this.emailInput()} ${this.recentEmailsWidget()}
        ${this.footerActions()}
      </wui-flex>
    `}hero(){return(0,d.qy)`
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
    `}heroRow(a){return(0,d.qy)`
      <div class="hero-row" data-state=${this.loading?"loading":"default"}>
        ${a.map(this.heroIcon.bind(this))}
      </div>
    `}heroIcon(a){return(0,d.qy)`
      <wui-icon-box
        size="xl"
        iconSize="xxl"
        iconColor="fg-100"
        backgroundColor="fg-100"
        icon=${a}
        data-state=${this.loading?"loading":"default"}
        isOpaque
        class="hero-row-icon"
      >
      </wui-icon-box>
    `}paragraph(){return this.loading?(0,d.qy)`
        <wui-text variant="paragraph-400" color="fg-200" align="center"
          >We are verifying your account with email
          <wui-text variant="paragraph-600" color="accent-100">${this.email}</wui-text> and address
          <wui-text variant="paragraph-600" color="fg-100">
            ${k.Zv.getTruncateString({string:this.address,charsEnd:4,charsStart:4,truncate:"middle"})} </wui-text
          >, please wait a moment.</wui-text
        >
      `:this.isRequired?(0,d.qy)`
        <wui-text variant="paragraph-600" color="fg-100" align="center">
          ${this.appName} requires your email for authentication.
        </wui-text>
      `:(0,d.qy)`
      <wui-flex flexDirection="column" gap="xs" alignItems="center">
        <wui-text variant="paragraph-600" color="fg-100" align="center" size>
          ${this.appName} would like to collect your email.
        </wui-text>

        <wui-text variant="small-400" color="fg-200" align="center">
          Don't worry, it's optional&mdash;you can skip this step.
        </wui-text>
      </wui-flex>
    `}emailInput(){if(this.loading)return null;let a=a=>{this.email=a.detail};return(0,d.qy)`
      <wui-flex flexDirection="column">
        <wui-email-input
          .value=${this.email}
          .disabled=${this.loading}
          @inputChange=${a}
          @keydown=${a=>{"Enter"===a.key&&this.onSubmit()}}
        ></wui-email-input>

        <w3m-email-suffixes-widget
          .email=${this.email}
          @change=${a}
        ></w3m-email-suffixes-widget>
      </wui-flex>
    `}recentEmailsWidget(){return 0===this.recentEmails.length||this.loading?null:(0,d.qy)`
      <w3m-recent-emails-widget
        .emails=${this.recentEmails}
        @select=${a=>{this.email=a.detail,this.onSubmit()}}
      ></w3m-recent-emails-widget>
    `}footerActions(){return(0,d.qy)`
      <wui-flex flexDirection="row" fullWidth gap="s">
        ${this.isRequired?null:(0,d.qy)`<wui-button
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
    `}async onSubmit(){let a=h.W.getActiveCaipAddress();if(!a)throw Error("Account is not connected.");if(!this.isValidEmail(this.email))return void j.P.showError("Please provide a valid email.");try{this.loading=!0;let b=await this.siwx.requestEmailOtp({email:this.email,account:a});this.pushRecentEmail(this.email),null===b.uuid?g.I.replace("SIWXSignMessage"):g.I.replace("DataCaptureOtpConfirm",{email:this.email})}catch(a){j.P.showError("Failed to send email OTP"),this.loading=!1}}onSkip(){g.I.replace("SIWXSignMessage")}getRecentEmails(){let a=f.Ud.getItem(f.Ws.RECENT_EMAILS);return(a?a.split(","):[]).filter(this.isValidEmail.bind(this)).slice(0,3)}pushRecentEmail(a){let b=Array.from(new Set([a,...this.getRecentEmails()])).slice(0,3);f.Ud.setItem(f.Ws.RECENT_EMAILS,b.join(","))}isValidEmail(a){return/^\S+@\S+\.\S+$/u.test(a)}};x.styles=[v],w([(0,e.wk)()],x.prototype,"email",void 0),w([(0,e.wk)()],x.prototype,"address",void 0),w([(0,e.wk)()],x.prototype,"loading",void 0),w([(0,e.wk)()],x.prototype,"appName",void 0),w([(0,e.wk)()],x.prototype,"siwx",void 0),w([(0,e.wk)()],x.prototype,"isRequired",void 0),w([(0,e.wk)()],x.prototype,"recentEmails",void 0),x=w([(0,k.EM)("w3m-data-capture-view")],x);var y=c(79566),z=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let A=class extends y.W3mEmailOtpWidget{constructor(){super(...arguments),this.siwx=i.H.state.siwx,this.onOtpSubmit=async a=>{await this.siwx.confirmEmailOtp({code:a}),g.I.replace("SIWXSignMessage")},this.onOtpResend=async a=>{let b=h.W.getAccountData();if(!b?.caipAddress)throw Error("No account data found");await this.siwx.requestEmailOtp({email:a,account:b.caipAddress})}}connectedCallback(){this.siwx&&this.siwx instanceof u||j.P.showError("ReownAuthentication is not initialized."),super.connectedCallback()}shouldSubmitOnOtpChange(){return this.otp.length===y.W3mEmailOtpWidget.OTP_LENGTH}};z([(0,e.wk)()],A.prototype,"siwx",void 0),A=z([(0,k.EM)("w3m-data-capture-otp-confirm-view")],A);var B=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let C=["@gmail.com","@outlook.com","@yahoo.com","@hotmail.com","@aol.com","@icloud.com","@zoho.com"],D=class extends d.WF{constructor(){super(...arguments),this.email=""}render(){let a=C.filter(this.filter.bind(this)).map(this.item.bind(this));return 0===a.length?null:(0,d.qy)`<div class="email-sufixes">${a}</div>`}filter(a){if(!this.email)return!1;let b=this.email.split("@");if(b.length<2)return!0;let c=b.pop();return a.includes(c)&&a!==`@${c}`}item(a){return(0,d.qy)`<wui-button variant="neutral" size="sm" @click=${()=>{let b=this.email.split("@");b.length>1&&b.pop();let c=b[0]+a;this.dispatchEvent(new CustomEvent("change",{detail:c,bubbles:!0,composed:!0}))}}
      >${a}</wui-button
    >`}};D.styles=[v],B([(0,e.MZ)()],D.prototype,"email",void 0),D=B([(0,k.EM)("w3m-email-suffixes-widget")],D);var E=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let F=class extends d.WF{constructor(){super(...arguments),this.emails=[]}render(){return 0===this.emails.length?null:(0,d.qy)`<div class="recent-emails">
      <wui-text variant="micro-600" color="fg-200" class="recent-emails-heading"
        >Recently used emails</wui-text
      >
      ${this.emails.map(this.item.bind(this))}
    </div>`}item(a){return(0,d.qy)`<wui-list-item
      @click=${()=>{this.dispatchEvent(new CustomEvent("select",{detail:a,bubbles:!0,composed:!0}))}}
      ?chevron=${!0}
      icon="mail"
      iconVariant="overlay"
      class="recent-emails-list-item"
    >
      <wui-text variant="paragraph-500" color="fg-100">${a}</wui-text>
    </wui-list-item>`}};F.styles=[v],E([(0,e.MZ)()],F.prototype,"emails",void 0),F=E([(0,k.EM)("w3m-recent-emails-widget")],F)}};