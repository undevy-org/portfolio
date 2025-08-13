"use strict";exports.id=3611,exports.ids=[3611],exports.modules={83611:(a,b,c)=>{c.r(b),c.d(b,{W3mWalletReceiveView:()=>x});var d=c(50861),e=c(52827),f=c(24115),g=c(19898),h=c(83908),i=c(97543),j=c(30221),k=c(83344),l=c(79508),m=c(71136),n=c(34526),o=c(22490);c(10020),c(78488),c(77876),c(32490),c(56124);var p=c(67017),q=c(76382);let r=(0,d.AH)`
  button {
    display: flex;
    gap: var(--wui-spacing-xl);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-m) var(--wui-spacing-s);
  }

  wui-text {
    width: 100%;
  }

  wui-flex {
    width: auto;
  }

  .network-icon {
    width: var(--wui-spacing-2l);
    height: var(--wui-spacing-2l);
    border-radius: calc(var(--wui-spacing-2l) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`;var s=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let t=class extends d.WF{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return(0,d.qy)`
      <button>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
        <wui-flex gap="3xs" alignItems="center">
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="fg-200"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){let a=this.networkImages.slice(0,5);return(0,d.qy)` <wui-flex class="networks">
      ${a?.map(a=>(0,d.qy)` <wui-flex class="network-icon"> <wui-image src=${a}></wui-image> </wui-flex>`)}
    </wui-flex>`}};t.styles=[p.W5,p.fD,r],s([(0,e.MZ)({type:Array})],t.prototype,"networkImages",void 0),s([(0,e.MZ)()],t.prototype,"text",void 0),t=s([(0,q.E)("wui-compatible-network")],t),c(77838),c(73137),c(41298);var u=c(71452);let v=(0,d.AH)`
  wui-compatible-network {
    margin-top: var(--wui-spacing-l);
  }
`;var w=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let x=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.address=g.U.state.address,this.profileName=g.U.state.profileName,this.network=h.W.state.activeCaipNetwork,this.unsubscribe.push(g.U.subscribe(a=>{a.address?(this.address=a.address,this.profileName=a.profileName):i.P.showError("Account not found")}),h.W.subscribeKey("activeCaipNetwork",a=>{a?.id&&(this.network=a)}))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){if(!this.address)throw Error("w3m-wallet-receive-view: No account provided");let a=j.$.getNetworkImage(this.network);return(0,d.qy)` <wui-flex
      flexDirection="column"
      .padding=${["0","l","l","l"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${o.Zv.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:4*!this.profileName,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${a||""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["l","0","0","0"]}
        alignItems="center"
        gap="s"
      >
        <wui-qr-code
          size=${232}
          theme=${k.W.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${(0,f.J)(k.W.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="paragraph-500" color="fg-100" align="center">
          Copy your address or scan this QR code
        </wui-text>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){let a=h.W.getAllRequestedCaipNetworks(),b=h.W.checkIfSmartAccountEnabled(),c=h.W.state.activeCaipNetwork,e=a.filter(a=>a?.chainNamespace===c?.chainNamespace);if((0,l.lj)(c?.chainNamespace)===u.Vl.ACCOUNT_TYPES.SMART_ACCOUNT&&b)return c?(0,d.qy)`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[j.$.getNetworkImage(c)??""]}
      ></wui-compatible-network>`:null;let f=(e?.filter(a=>a?.assets?.imageId)?.slice(0,5)).map(j.$.getNetworkImage).filter(Boolean);return(0,d.qy)`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${f}
    ></wui-compatible-network>`}onReceiveClick(){m.I.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(n.w.copyToClopboard(this.address),i.P.showSuccess("Address copied"))}catch{i.P.showError("Failed to copy")}}};x.styles=v,w([(0,e.wk)()],x.prototype,"address",void 0),w([(0,e.wk)()],x.prototype,"profileName",void 0),w([(0,e.wk)()],x.prototype,"network",void 0),x=w([(0,o.EM)("w3m-wallet-receive-view")],x)}};