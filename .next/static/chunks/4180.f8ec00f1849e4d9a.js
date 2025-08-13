"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4180],{64180:(e,t,i)=>{i.r(t),i.d(t,{W3mEmailLoginView:()=>U,W3mEmailOtpWidget:()=>A,W3mEmailVerifyDeviceView:()=>D,W3mEmailVerifyOtpView:()=>T,W3mUpdateEmailPrimaryOtpView:()=>N,W3mUpdateEmailSecondaryOtpView:()=>V,W3mUpdateEmailWalletView:()=>L});var n,r=i(90906),a=i(14796),o=i(96641),l=i(32836),s=i(33806),c=i(19628),u=i(5517),h=i(35558),d=i(52515),p=i(28312),m=i(745),w=i(54252);i(98160),i(82786),i(72873),i(43804);var f=i(97265),g=i(59970),v=i(54166);let E=(0,p.AH)`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 50px;
    height: 50px;
    background: var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
    font-family: var(--wui-font-family);
    font-size: var(--wui-font-size-large);
    font-weight: var(--wui-font-weight-regular);
    letter-spacing: var(--wui-letter-spacing-large);
    text-align: center;
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
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

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
    background: var(--wui-color-gray-glass-005);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-accent-100);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }
`;var y=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let b=class extends p.WF{constructor(){super(...arguments),this.disabled=!1,this.value=""}render(){return(0,p.qy)`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};b.styles=[f.W5,f.fD,E],y([(0,m.MZ)({type:Boolean})],b.prototype,"disabled",void 0),y([(0,m.MZ)({type:String})],b.prototype,"value",void 0),b=y([(0,v.E)("wui-input-numeric")],b);let x=(0,p.AH)`
  :host {
    position: relative;
    display: block;
  }
`;var I=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let O=class extends p.WF{constructor(){super(...arguments),this.length=6,this.otp="",this.values=Array.from({length:this.length}).map(()=>""),this.numerics=[],this.shouldInputBeEnabled=e=>this.values.slice(0,e).every(e=>""!==e),this.handleKeyDown=(e,t)=>{let i=e.target,n=this.getInputElement(i);if(!n)return;["ArrowLeft","ArrowRight","Shift","Delete"].includes(e.key)&&e.preventDefault();let r=n.selectionStart;switch(e.key){case"ArrowLeft":r&&n.setSelectionRange(r+1,r+1),this.focusInputField("prev",t);break;case"ArrowRight":case"Shift":this.focusInputField("next",t);break;case"Delete":case"Backspace":""===n.value?this.focusInputField("prev",t):this.updateInput(n,t,"")}},this.focusInputField=(e,t)=>{if("next"===e){let e=t+1;if(!this.shouldInputBeEnabled(e))return;let i=this.numerics[e<this.length?e:t],n=i?this.getInputElement(i):void 0;n&&(n.disabled=!1,n.focus())}if("prev"===e){let e=t-1,i=this.numerics[e>-1?e:t],n=i?this.getInputElement(i):void 0;n&&n.focus()}}}firstUpdated(){this.otp&&(this.values=this.otp.split(""));let e=this.shadowRoot?.querySelectorAll("wui-input-numeric");e&&(this.numerics=Array.from(e)),this.numerics[0]?.focus()}render(){return(0,p.qy)`
      <wui-flex gap="xxs" data-testid="wui-otp-input">
        ${Array.from({length:this.length}).map((e,t)=>(0,p.qy)`
            <wui-input-numeric
              @input=${e=>this.handleInput(e,t)}
              @click=${e=>this.selectInput(e)}
              @keydown=${e=>this.handleKeyDown(e,t)}
              .disabled=${!this.shouldInputBeEnabled(t)}
              .value=${this.values[t]||""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `}updateInput(e,t,i){let n=this.numerics[t],r=e||(n?this.getInputElement(n):void 0);r&&(r.value=i,this.values=this.values.map((e,n)=>n===t?i:e))}selectInput(e){let t=e.target;if(t){let e=this.getInputElement(t);e?.select()}}handleInput(e,t){let i=e.target,n=this.getInputElement(i);if(n){let i=n.value;"insertFromPaste"===e.inputType?this.handlePaste(n,i,t):g.Z.isNumber(i)&&e.data?(this.updateInput(n,t,e.data),this.focusInputField("next",t)):this.updateInput(n,t,"")}this.dispatchInputChangeEvent()}handlePaste(e,t,i){let n=t[0];if(n&&g.Z.isNumber(n)){this.updateInput(e,i,n);let r=t.substring(1);if(i+1<this.length&&r.length){let e=this.numerics[i+1],t=e?this.getInputElement(e):void 0;t&&this.handlePaste(t,r,i+1)}else this.focusInputField("next",i)}else this.updateInput(e,i,"")}getInputElement(e){return e.shadowRoot?.querySelector("input")?e.shadowRoot.querySelector("input"):null}dispatchInputChangeEvent(){let e=this.values.join("");this.dispatchEvent(new CustomEvent("inputChange",{detail:e,bubbles:!0,composed:!0}))}};O.styles=[f.W5,x],I([(0,m.MZ)({type:Number})],O.prototype,"length",void 0),I([(0,m.MZ)({type:String})],O.prototype,"otp",void 0),I([(0,m.wk)()],O.prototype,"values",void 0),O=I([(0,v.E)("wui-otp")],O),i(22724);var C=i(519);let k=(0,p.AH)`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`;var R=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let A=n=class extends p.WF{firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}constructor(){super(),this.loading=!1,this.timeoutTimeLeft=C.Q.getTimeToNextEmailLogin(),this.error="",this.otp="",this.email=c.I.state.data?.email,this.authConnector=w.a.getAuthConnector()}render(){if(!this.email)throw Error("w3m-email-otp-widget: No email provided");let e=!!this.timeoutTimeLeft,t=this.getFooterLabels(e);return(0,p.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["l","0","l","0"]}
        gap="l"
      >
        <wui-flex
          class="email-display"
          flexDirection="column"
          alignItems="center"
          .padding=${["0","xl","0","xl"]}
        >
          <wui-text variant="paragraph-400" color="fg-100" align="center">
            Enter the code we sent to
          </wui-text>
          <wui-text variant="paragraph-500" color="fg-100" lineClamp="1" align="center">
            ${this.email}
          </wui-text>
        </wui-flex>

        <wui-text variant="small-400" color="fg-200">The code expires in 20 minutes</wui-text>

        ${this.loading?(0,p.qy)`<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>`:(0,p.qy)` <wui-flex flexDirection="column" alignItems="center" gap="xs">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error?(0,p.qy)`
                    <wui-text variant="small-400" align="center" color="error-100">
                      ${this.error}. Try Again
                    </wui-text>
                  `:null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="small-400" color="fg-200">${t.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${e}>
            ${t.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `}startOTPTimeout(){this.timeoutTimeLeft=C.Q.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval(()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=C.Q.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)},1e3)}async onOtpInputChange(e){try{!this.loading&&(this.otp=e.detail,this.shouldSubmitOnOtpChange()&&(this.loading=!0,await this.onOtpSubmit?.(this.otp)))}catch(e){this.error=h.w.parseError(e),this.loading=!1}}async onResendCode(){try{if(this.onOtpResend){if(!this.loading&&!this.timeoutTimeLeft){if(this.error="",this.otp="",!w.a.getAuthConnector()||!this.email)throw Error("w3m-email-otp-widget: Unable to resend email");this.loading=!0,await this.onOtpResend(this.email),this.startOTPTimeout(),u.P.showSuccess("Code email resent")}}else this.onStartOver&&this.onStartOver()}catch(e){u.P.showError(e)}finally{this.loading=!1}}getFooterLabels(e){return this.onStartOver?{title:"Something wrong?",action:`Try again ${e?`in ${this.timeoutTimeLeft}s`:""}`}:{title:"Didn't receive it?",action:`Resend ${e?`in ${this.timeoutTimeLeft}s`:"Code"}`}}shouldSubmitOnOtpChange(){return this.authConnector&&this.otp.length===n.OTP_LENGTH}};A.OTP_LENGTH=6,A.styles=k,R([(0,m.wk)()],A.prototype,"loading",void 0),R([(0,m.wk)()],A.prototype,"timeoutTimeLeft",void 0),R([(0,m.wk)()],A.prototype,"error",void 0),A=n=R([(0,d.EM)("w3m-email-otp-widget")],A);let T=class extends A{constructor(){super(...arguments),this.onOtpSubmit=async e=>{try{if(this.authConnector){let t=r.W.state.activeChain,i=a.x.getConnections(t),n=o.H.state.remoteFeatures?.multiWallet,h=i.length>0;if(await this.authConnector.provider.connectOtp({otp:e}),l.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),t)await a.x.connectExternal(this.authConnector,t);else throw Error("Active chain is not set on ChainControll");if(l.E.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"email",name:this.authConnector.name||"Unknown"}}),o.H.state.remoteFeatures?.emailCapture)return;if(o.H.state.siwx)return void s.W.close();if(h&&n){c.I.replace("ProfileWallets"),u.P.showSuccess("New Wallet Added");return}s.W.close()}}catch(e){throw l.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:h.w.parseError(e)}}),e}},this.onOtpResend=async e=>{this.authConnector&&(await this.authConnector.provider.connectEmail({email:e}),l.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}))}}};T=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o}([(0,d.EM)("w3m-email-verify-otp-view")],T),i(36698);let S=(0,p.AH)`
  wui-icon-box {
    height: var(--wui-icon-box-size-xl);
    width: var(--wui-icon-box-size-xl);
  }
`;var P=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let D=class extends p.WF{constructor(){super(),this.email=c.I.state.data?.email,this.authConnector=w.a.getAuthConnector(),this.loading=!1,this.listenForDeviceApproval()}render(){if(!this.email)throw Error("w3m-email-verify-device-view: No email provided");if(!this.authConnector)throw Error("w3m-email-verify-device-view: No auth connector provided");return(0,p.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xxl","s","xxl","s"]}
        gap="l"
      >
        <wui-icon-box
          size="xl"
          iconcolor="accent-100"
          backgroundcolor="accent-100"
          icon="verify"
          background="opaque"
        ></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="s">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-400" color="fg-100">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="paragraph-400" color="fg-100"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="small-400" color="fg-200" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="xs">
            <wui-text variant="small-400" color="fg-100" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}async listenForDeviceApproval(){if(this.authConnector)try{await this.authConnector.provider.connectDevice(),l.E.sendEvent({type:"track",event:"DEVICE_REGISTERED_FOR_EMAIL"}),l.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),c.I.replace("EmailVerifyOtp",{email:this.email})}catch(e){c.I.goBack()}}async onResendCode(){try{if(!this.loading){if(!this.authConnector||!this.email)throw Error("w3m-email-login-widget: Unable to resend email");this.loading=!0,await this.authConnector.provider.connectEmail({email:this.email}),this.listenForDeviceApproval(),u.P.showSuccess("Code email resent")}}catch(e){u.P.showError(e)}finally{this.loading=!1}}};D.styles=S,P([(0,m.wk)()],D.prototype,"loading",void 0),D=P([(0,d.EM)("w3m-email-verify-device-view")],D);var _=i(74236);i(54279),i(60567);let $=(0,p.AH)`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`;var F=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let L=class extends p.WF{constructor(){super(...arguments),this.formRef=(0,_._)(),this.initialEmail=c.I.state.data?.email??"",this.redirectView=c.I.state.data?.redirectView,this.email="",this.loading=!1}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{"Enter"===e.key&&this.onSubmitEmail(e)})}render(){return(0,p.qy)`
      <wui-flex flexDirection="column" padding="m" gap="m">
        <form ${(0,_.K)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `}onEmailInputChange(e){this.email=e.detail}async onSubmitEmail(e){try{if(this.loading)return;this.loading=!0,e.preventDefault();let t=w.a.getAuthConnector();if(!t)throw Error("w3m-update-email-wallet: Auth connector not found");let i=await t.provider.updateEmail({email:this.email});l.E.sendEvent({type:"track",event:"EMAIL_EDIT"}),"VERIFY_SECONDARY_OTP"===i.action?c.I.push("UpdateEmailSecondaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView}):c.I.push("UpdateEmailPrimaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView})}catch(e){u.P.showError(e),this.loading=!1}}buttonsTemplate(){let e=!this.loading&&this.email.length>3&&this.email!==this.initialEmail;return this.redirectView?(0,p.qy)`
      <wui-flex gap="s">
        <wui-button size="md" variant="neutral" fullWidth @click=${c.I.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    `:(0,p.qy)`
        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `}};L.styles=$,F([(0,m.wk)()],L.prototype,"email",void 0),F([(0,m.wk)()],L.prototype,"loading",void 0),L=F([(0,d.EM)("w3m-update-email-wallet-view")],L);let N=class extends A{constructor(){super(),this.email=c.I.state.data?.email,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailPrimaryOtp({otp:e}),l.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),c.I.replace("UpdateEmailSecondaryOtp",c.I.state.data))}catch(e){throw l.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:h.w.parseError(e)}}),e}},this.onStartOver=()=>{c.I.replace("UpdateEmailWallet",c.I.state.data)}}};N=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o}([(0,d.EM)("w3m-update-email-primary-otp-view")],N);let V=class extends A{constructor(){super(),this.email=c.I.state.data?.newEmail,this.redirectView=c.I.state.data?.redirectView,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailSecondaryOtp({otp:e}),l.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),this.redirectView&&c.I.reset(this.redirectView))}catch(e){throw l.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:h.w.parseError(e)}}),e}},this.onStartOver=()=>{c.I.replace("UpdateEmailWallet",c.I.state.data)}}};V=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o}([(0,d.EM)("w3m-update-email-secondary-otp-view")],V);var j=i(60500),W=i(99836),M=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let U=class extends p.WF{constructor(){super(),this.authConnector=w.a.getAuthConnector(),this.isEmailEnabled=o.H.state.remoteFeatures?.email,this.isAuthEnabled=this.checkIfAuthEnabled(w.a.state.connectors),this.connectors=w.a.state.connectors,w.a.subscribeKey("connectors",e=>{this.connectors=e,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)})}render(){if(!this.isEmailEnabled)throw Error("w3m-email-login-view: Email is not enabled");if(!this.isAuthEnabled)throw Error("w3m-email-login-view: No auth connector provided");return(0,p.qy)`<wui-flex
      flexDirection="column"
      .padding=${["3xs","m","m","m"]}
      gap="l"
    >
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `}checkIfAuthEnabled(e){let t=e.filter(e=>e.type===W.o.CONNECTOR_TYPE_AUTH).map(e=>e.chain);return j.o.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(e=>t.includes(e))}};M([(0,m.wk)()],U.prototype,"connectors",void 0),U=M([(0,d.EM)("w3m-email-login-view")],U)}}]);