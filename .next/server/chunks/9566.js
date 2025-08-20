"use strict";exports.id=9566,exports.ids=[9566],exports.modules={79566:(a,b,c)=>{c.r(b),c.d(b,{W3mEmailLoginView:()=>Q,W3mEmailOtpWidget:()=>C,W3mEmailVerifyDeviceView:()=>G,W3mEmailVerifyOtpView:()=>D,W3mUpdateEmailPrimaryOtpView:()=>L,W3mUpdateEmailSecondaryOtpView:()=>M,W3mUpdateEmailWalletView:()=>K});var d,e=c(83908),f=c(40764),g=c(12335),h=c(98604),i=c(26728),j=c(71136),k=c(97543),l=c(34526),m=c(22490),n=c(50861),o=c(52827),p=c(60778);c(77838),c(73019),c(25577),c(56124);var q=c(67017),r=c(31896),s=c(76382);let t=(0,n.AH)`
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
`;var u=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let v=class extends n.WF{constructor(){super(...arguments),this.disabled=!1,this.value=""}render(){return(0,n.qy)`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};v.styles=[q.W5,q.fD,t],u([(0,o.MZ)({type:Boolean})],v.prototype,"disabled",void 0),u([(0,o.MZ)({type:String})],v.prototype,"value",void 0),v=u([(0,s.E)("wui-input-numeric")],v);let w=(0,n.AH)`
  :host {
    position: relative;
    display: block;
  }
`;var x=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let y=class extends n.WF{constructor(){super(...arguments),this.length=6,this.otp="",this.values=Array.from({length:this.length}).map(()=>""),this.numerics=[],this.shouldInputBeEnabled=a=>this.values.slice(0,a).every(a=>""!==a),this.handleKeyDown=(a,b)=>{let c=a.target,d=this.getInputElement(c);if(!d)return;["ArrowLeft","ArrowRight","Shift","Delete"].includes(a.key)&&a.preventDefault();let e=d.selectionStart;switch(a.key){case"ArrowLeft":e&&d.setSelectionRange(e+1,e+1),this.focusInputField("prev",b);break;case"ArrowRight":case"Shift":this.focusInputField("next",b);break;case"Delete":case"Backspace":""===d.value?this.focusInputField("prev",b):this.updateInput(d,b,"")}},this.focusInputField=(a,b)=>{if("next"===a){let a=b+1;if(!this.shouldInputBeEnabled(a))return;let c=this.numerics[a<this.length?a:b],d=c?this.getInputElement(c):void 0;d&&(d.disabled=!1,d.focus())}if("prev"===a){let a=b-1,c=this.numerics[a>-1?a:b],d=c?this.getInputElement(c):void 0;d&&d.focus()}}}firstUpdated(){this.otp&&(this.values=this.otp.split(""));let a=this.shadowRoot?.querySelectorAll("wui-input-numeric");a&&(this.numerics=Array.from(a)),this.numerics[0]?.focus()}render(){return(0,n.qy)`
      <wui-flex gap="xxs" data-testid="wui-otp-input">
        ${Array.from({length:this.length}).map((a,b)=>(0,n.qy)`
            <wui-input-numeric
              @input=${a=>this.handleInput(a,b)}
              @click=${a=>this.selectInput(a)}
              @keydown=${a=>this.handleKeyDown(a,b)}
              .disabled=${!this.shouldInputBeEnabled(b)}
              .value=${this.values[b]||""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `}updateInput(a,b,c){let d=this.numerics[b],e=a||(d?this.getInputElement(d):void 0);e&&(e.value=c,this.values=this.values.map((a,d)=>d===b?c:a))}selectInput(a){let b=a.target;if(b){let a=this.getInputElement(b);a?.select()}}handleInput(a,b){let c=a.target,d=this.getInputElement(c);if(d){let c=d.value;"insertFromPaste"===a.inputType?this.handlePaste(d,c,b):r.Z.isNumber(c)&&a.data?(this.updateInput(d,b,a.data),this.focusInputField("next",b)):this.updateInput(d,b,"")}this.dispatchInputChangeEvent()}handlePaste(a,b,c){let d=b[0];if(d&&r.Z.isNumber(d)){this.updateInput(a,c,d);let e=b.substring(1);if(c+1<this.length&&e.length){let a=this.numerics[c+1],b=a?this.getInputElement(a):void 0;b&&this.handlePaste(b,e,c+1)}else this.focusInputField("next",c)}else this.updateInput(a,c,"")}getInputElement(a){return a.shadowRoot?.querySelector("input")?a.shadowRoot.querySelector("input"):null}dispatchInputChangeEvent(){let a=this.values.join("");this.dispatchEvent(new CustomEvent("inputChange",{detail:a,bubbles:!0,composed:!0}))}};y.styles=[q.W5,w],x([(0,o.MZ)({type:Number})],y.prototype,"length",void 0),x([(0,o.MZ)({type:String})],y.prototype,"otp",void 0),x([(0,o.wk)()],y.prototype,"values",void 0),y=x([(0,s.E)("wui-otp")],y),c(41298);var z=c(67151);let A=(0,n.AH)`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`;var B=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let C=d=class extends n.WF{firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}constructor(){super(),this.loading=!1,this.timeoutTimeLeft=z.Q.getTimeToNextEmailLogin(),this.error="",this.otp="",this.email=j.I.state.data?.email,this.authConnector=p.a.getAuthConnector()}render(){if(!this.email)throw Error("w3m-email-otp-widget: No email provided");let a=!!this.timeoutTimeLeft,b=this.getFooterLabels(a);return(0,n.qy)`
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

        ${this.loading?(0,n.qy)`<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>`:(0,n.qy)` <wui-flex flexDirection="column" alignItems="center" gap="xs">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error?(0,n.qy)`
                    <wui-text variant="small-400" align="center" color="error-100">
                      ${this.error}. Try Again
                    </wui-text>
                  `:null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="small-400" color="fg-200">${b.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${a}>
            ${b.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `}startOTPTimeout(){this.timeoutTimeLeft=z.Q.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval(()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=z.Q.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)},1e3)}async onOtpInputChange(a){try{!this.loading&&(this.otp=a.detail,this.shouldSubmitOnOtpChange()&&(this.loading=!0,await this.onOtpSubmit?.(this.otp)))}catch(a){this.error=l.w.parseError(a),this.loading=!1}}async onResendCode(){try{if(this.onOtpResend){if(!this.loading&&!this.timeoutTimeLeft){if(this.error="",this.otp="",!p.a.getAuthConnector()||!this.email)throw Error("w3m-email-otp-widget: Unable to resend email");this.loading=!0,await this.onOtpResend(this.email),this.startOTPTimeout(),k.P.showSuccess("Code email resent")}}else this.onStartOver&&this.onStartOver()}catch(a){k.P.showError(a)}finally{this.loading=!1}}getFooterLabels(a){return this.onStartOver?{title:"Something wrong?",action:`Try again ${a?`in ${this.timeoutTimeLeft}s`:""}`}:{title:"Didn't receive it?",action:`Resend ${a?`in ${this.timeoutTimeLeft}s`:"Code"}`}}shouldSubmitOnOtpChange(){return this.authConnector&&this.otp.length===d.OTP_LENGTH}};C.OTP_LENGTH=6,C.styles=A,B([(0,o.wk)()],C.prototype,"loading",void 0),B([(0,o.wk)()],C.prototype,"timeoutTimeLeft",void 0),B([(0,o.wk)()],C.prototype,"error",void 0),C=d=B([(0,m.EM)("w3m-email-otp-widget")],C);let D=class extends C{constructor(){super(...arguments),this.onOtpSubmit=async a=>{try{if(this.authConnector){let b=e.W.state.activeChain,c=f.x.getConnections(b),d=g.H.state.remoteFeatures?.multiWallet,l=c.length>0;if(await this.authConnector.provider.connectOtp({otp:a}),h.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),b)await f.x.connectExternal(this.authConnector,b);else throw Error("Active chain is not set on ChainControll");if(h.E.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"email",name:this.authConnector.name||"Unknown"}}),g.H.state.remoteFeatures?.emailCapture)return;if(g.H.state.siwx)return void i.W.close();if(l&&d){j.I.replace("ProfileWallets"),k.P.showSuccess("New Wallet Added");return}i.W.close()}}catch(a){throw h.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:l.w.parseError(a)}}),a}},this.onOtpResend=async a=>{this.authConnector&&(await this.authConnector.provider.connectEmail({email:a}),h.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}))}}};D=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,m.EM)("w3m-email-verify-otp-view")],D),c(95007);let E=(0,n.AH)`
  wui-icon-box {
    height: var(--wui-icon-box-size-xl);
    width: var(--wui-icon-box-size-xl);
  }
`;var F=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let G=class extends n.WF{constructor(){super(),this.email=j.I.state.data?.email,this.authConnector=p.a.getAuthConnector(),this.loading=!1,this.listenForDeviceApproval()}render(){if(!this.email)throw Error("w3m-email-verify-device-view: No email provided");if(!this.authConnector)throw Error("w3m-email-verify-device-view: No auth connector provided");return(0,n.qy)`
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
    `}async listenForDeviceApproval(){if(this.authConnector)try{await this.authConnector.provider.connectDevice(),h.E.sendEvent({type:"track",event:"DEVICE_REGISTERED_FOR_EMAIL"}),h.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),j.I.replace("EmailVerifyOtp",{email:this.email})}catch(a){j.I.goBack()}}async onResendCode(){try{if(!this.loading){if(!this.authConnector||!this.email)throw Error("w3m-email-login-widget: Unable to resend email");this.loading=!0,await this.authConnector.provider.connectEmail({email:this.email}),this.listenForDeviceApproval(),k.P.showSuccess("Code email resent")}}catch(a){k.P.showError(a)}finally{this.loading=!1}}};G.styles=E,F([(0,o.wk)()],G.prototype,"loading",void 0),G=F([(0,m.EM)("w3m-email-verify-device-view")],G);var H=c(15519);c(4977),c(40263);let I=(0,n.AH)`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`;var J=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let K=class extends n.WF{constructor(){super(...arguments),this.formRef=(0,H._)(),this.initialEmail=j.I.state.data?.email??"",this.redirectView=j.I.state.data?.redirectView,this.email="",this.loading=!1}firstUpdated(){this.formRef.value?.addEventListener("keydown",a=>{"Enter"===a.key&&this.onSubmitEmail(a)})}render(){return(0,n.qy)`
      <wui-flex flexDirection="column" padding="m" gap="m">
        <form ${(0,H.K)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
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
    `}onEmailInputChange(a){this.email=a.detail}async onSubmitEmail(a){try{if(this.loading)return;this.loading=!0,a.preventDefault();let b=p.a.getAuthConnector();if(!b)throw Error("w3m-update-email-wallet: Auth connector not found");let c=await b.provider.updateEmail({email:this.email});h.E.sendEvent({type:"track",event:"EMAIL_EDIT"}),"VERIFY_SECONDARY_OTP"===c.action?j.I.push("UpdateEmailSecondaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView}):j.I.push("UpdateEmailPrimaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView})}catch(a){k.P.showError(a),this.loading=!1}}buttonsTemplate(){let a=!this.loading&&this.email.length>3&&this.email!==this.initialEmail;return this.redirectView?(0,n.qy)`
      <wui-flex gap="s">
        <wui-button size="md" variant="neutral" fullWidth @click=${j.I.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!a}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    `:(0,n.qy)`
        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!a}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `}};K.styles=I,J([(0,o.wk)()],K.prototype,"email",void 0),J([(0,o.wk)()],K.prototype,"loading",void 0),K=J([(0,m.EM)("w3m-update-email-wallet-view")],K);let L=class extends C{constructor(){super(),this.email=j.I.state.data?.email,this.onOtpSubmit=async a=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailPrimaryOtp({otp:a}),h.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),j.I.replace("UpdateEmailSecondaryOtp",j.I.state.data))}catch(a){throw h.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:l.w.parseError(a)}}),a}},this.onStartOver=()=>{j.I.replace("UpdateEmailWallet",j.I.state.data)}}};L=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,m.EM)("w3m-update-email-primary-otp-view")],L);let M=class extends C{constructor(){super(),this.email=j.I.state.data?.newEmail,this.redirectView=j.I.state.data?.redirectView,this.onOtpSubmit=async a=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailSecondaryOtp({otp:a}),h.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),this.redirectView&&j.I.reset(this.redirectView))}catch(a){throw h.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:l.w.parseError(a)}}),a}},this.onStartOver=()=>{j.I.replace("UpdateEmailWallet",j.I.state.data)}}};M=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,m.EM)("w3m-update-email-secondary-otp-view")],M);var N=c(9132),O=c(26134),P=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let Q=class extends n.WF{constructor(){super(),this.authConnector=p.a.getAuthConnector(),this.isEmailEnabled=g.H.state.remoteFeatures?.email,this.isAuthEnabled=this.checkIfAuthEnabled(p.a.state.connectors),this.connectors=p.a.state.connectors,p.a.subscribeKey("connectors",a=>{this.connectors=a,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)})}render(){if(!this.isEmailEnabled)throw Error("w3m-email-login-view: Email is not enabled");if(!this.isAuthEnabled)throw Error("w3m-email-login-view: No auth connector provided");return(0,n.qy)`<wui-flex
      flexDirection="column"
      .padding=${["3xs","m","m","m"]}
      gap="l"
    >
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `}checkIfAuthEnabled(a){let b=a.filter(a=>a.type===O.o.CONNECTOR_TYPE_AUTH).map(a=>a.chain);return N.o.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(a=>b.includes(a))}};P([(0,o.wk)()],Q.prototype,"connectors",void 0),Q=P([(0,m.EM)("w3m-email-login-view")],Q)}};