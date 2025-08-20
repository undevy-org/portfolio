"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3771],{63771:(e,t,i)=>{i.r(t),i.d(t,{W3mWalletReceiveView:()=>N});var r=i(28312),o=i(745),s=i(51882),a=i(11076),c=i(90906),l=i(5517),n=i(34735),w=i(7478),u=i(54846),d=i(19628),p=i(35558),h=i(52515);i(38254),i(23499),i(25322),i(98750),i(43804);var f=i(97265),m=i(54166);let g=(0,r.AH)`
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
`;var k=function(e,t,i,r){var o,s=arguments.length,a=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(s<3?o(a):s>3?o(t,i,a):o(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let v=class extends r.WF{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return(0,r.qy)`
      <button>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
        <wui-flex gap="3xs" alignItems="center">
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="fg-200"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){let e=this.networkImages.slice(0,5);return(0,r.qy)` <wui-flex class="networks">
      ${e?.map(e=>(0,r.qy)` <wui-flex class="network-icon"> <wui-image src=${e}></wui-image> </wui-flex>`)}
    </wui-flex>`}};v.styles=[f.W5,f.fD,g],k([(0,o.MZ)({type:Array})],v.prototype,"networkImages",void 0),k([(0,o.MZ)()],v.prototype,"text",void 0),v=k([(0,m.E)("wui-compatible-network")],v),i(98160),i(4146),i(22724);var b=i(45312);let y=(0,r.AH)`
  wui-compatible-network {
    margin-top: var(--wui-spacing-l);
  }
`;var x=function(e,t,i,r){var o,s=arguments.length,a=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(s<3?o(a):s>3?o(t,i,a):o(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a};let N=class extends r.WF{constructor(){super(),this.unsubscribe=[],this.address=a.U.state.address,this.profileName=a.U.state.profileName,this.network=c.W.state.activeCaipNetwork,this.unsubscribe.push(a.U.subscribe(e=>{e.address?(this.address=e.address,this.profileName=e.profileName):l.P.showError("Account not found")}),c.W.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.address)throw Error("w3m-wallet-receive-view: No account provided");let e=n.$.getNetworkImage(this.network);return(0,r.qy)` <wui-flex
      flexDirection="column"
      .padding=${["0","l","l","l"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${h.Zv.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:4*!this.profileName,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${e||""}
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
          theme=${w.W.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${(0,s.J)(w.W.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="paragraph-500" color="fg-100" align="center">
          Copy your address or scan this QR code
        </wui-text>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){let e=c.W.getAllRequestedCaipNetworks(),t=c.W.checkIfSmartAccountEnabled(),i=c.W.state.activeCaipNetwork,o=e.filter(e=>e?.chainNamespace===i?.chainNamespace);if((0,u.lj)(i?.chainNamespace)===b.Vl.ACCOUNT_TYPES.SMART_ACCOUNT&&t)return i?(0,r.qy)`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[n.$.getNetworkImage(i)??""]}
      ></wui-compatible-network>`:null;let s=(o?.filter(e=>e?.assets?.imageId)?.slice(0,5)).map(n.$.getNetworkImage).filter(Boolean);return(0,r.qy)`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${s}
    ></wui-compatible-network>`}onReceiveClick(){d.I.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(p.w.copyToClopboard(this.address),l.P.showSuccess("Address copied"))}catch{l.P.showError("Failed to copy")}}};N.styles=y,x([(0,o.wk)()],N.prototype,"address",void 0),x([(0,o.wk)()],N.prototype,"profileName",void 0),x([(0,o.wk)()],N.prototype,"network",void 0),N=x([(0,h.EM)("w3m-wallet-receive-view")],N)}}]);