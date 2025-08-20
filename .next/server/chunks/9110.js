"use strict";exports.id=9110,exports.ids=[9110],exports.modules={72880:(a,b,c)=>{c(77876)},99110:(a,b,c)=>{c.r(b),c.d(b,{W3mPayLoadingView:()=>W,W3mPayView:()=>Q,arbitrumUSDC:()=>ah,arbitrumUSDT:()=>am,baseETH:()=>ac,baseSepoliaETH:()=>ae,baseUSDC:()=>ad,ethereumUSDC:()=>af,ethereumUSDT:()=>ak,getExchanges:()=>Z,getIsPaymentInProgress:()=>aa,getPayError:()=>_,getPayResult:()=>$,openPay:()=>X,optimismUSDC:()=>ag,optimismUSDT:()=>al,pay:()=>Y,polygonUSDC:()=>ai,polygonUSDT:()=>an,solanaSOL:()=>ap,solanaUSDC:()=>aj,solanaUSDT:()=>ao});var d=c(50861),e=c(52827),f=c(24115),g=c(19898),h=c(83908),i=c(26728),j=c(34526),k=c(97543),l=c(40764),m=c(22490);c(4977),c(77838),c(42536),c(7440),c(41685),c(72880),c(1803),c(25577),c(40971),c(63999),c(41298),c(64496);var n=c(41706),o=c(75859),p=c(9132),q=c(16062),r=c(98604),s=c(71136),t=c(30558);let u={INVALID_PAYMENT_CONFIG:"INVALID_PAYMENT_CONFIG",INVALID_RECIPIENT:"INVALID_RECIPIENT",INVALID_ASSET:"INVALID_ASSET",INVALID_AMOUNT:"INVALID_AMOUNT",UNKNOWN_ERROR:"UNKNOWN_ERROR",UNABLE_TO_INITIATE_PAYMENT:"UNABLE_TO_INITIATE_PAYMENT",INVALID_CHAIN_NAMESPACE:"INVALID_CHAIN_NAMESPACE",GENERIC_PAYMENT_ERROR:"GENERIC_PAYMENT_ERROR",UNABLE_TO_GET_EXCHANGES:"UNABLE_TO_GET_EXCHANGES",ASSET_NOT_SUPPORTED:"ASSET_NOT_SUPPORTED",UNABLE_TO_GET_PAY_URL:"UNABLE_TO_GET_PAY_URL",UNABLE_TO_GET_BUY_STATUS:"UNABLE_TO_GET_BUY_STATUS"},v={[u.INVALID_PAYMENT_CONFIG]:"Invalid payment configuration",[u.INVALID_RECIPIENT]:"Invalid recipient address",[u.INVALID_ASSET]:"Invalid asset specified",[u.INVALID_AMOUNT]:"Invalid payment amount",[u.UNKNOWN_ERROR]:"Unknown payment error occurred",[u.UNABLE_TO_INITIATE_PAYMENT]:"Unable to initiate payment",[u.INVALID_CHAIN_NAMESPACE]:"Invalid chain namespace",[u.GENERIC_PAYMENT_ERROR]:"Unable to process payment",[u.UNABLE_TO_GET_EXCHANGES]:"Unable to get exchanges",[u.ASSET_NOT_SUPPORTED]:"Asset not supported by the selected exchange",[u.UNABLE_TO_GET_PAY_URL]:"Unable to get payment URL",[u.UNABLE_TO_GET_BUY_STATUS]:"Unable to get buy status"};class w extends Error{get message(){return v[this.code]}constructor(a,b){super(v[a]),this.name="AppKitPayError",this.code=a,this.details=b,Error.captureStackTrace&&Error.captureStackTrace(this,w)}}var x=c(12335);class y extends Error{}async function z(a,b){let c=function(){let a=x.H.getSnapshot().projectId;return`https://rpc.walletconnect.org/v1/json-rpc?projectId=${a}`}(),d=await fetch(c,{method:"POST",body:JSON.stringify({jsonrpc:"2.0",id:1,method:a,params:b}),headers:{"Content-Type":"application/json"}}),e=await d.json();if(e.error)throw new y(e.error.message);return e}async function A(a){return(await z("reown_getExchanges",a)).result}async function B(a){return(await z("reown_getExchangePayUrl",a)).result}async function C(a){return(await z("reown_getExchangeBuyStatus",a)).result}let D=["eip155","solana"],E={eip155:{native:{assetNamespace:"slip44",assetReference:"60"},defaultTokenNamespace:"erc20"},solana:{native:{assetNamespace:"slip44",assetReference:"501"},defaultTokenNamespace:"token"}};function F(a,b){let{chainNamespace:c,chainId:d}=q.C.parseCaipNetworkId(a),e=E[c];if(!e)throw Error(`Unsupported chain namespace for CAIP-19 formatting: ${c}`);let f=e.native.assetNamespace,g=e.native.assetReference;"native"!==b&&(f=e.defaultTokenNamespace,g=b);let h=`${c}:${d}`;return`${h}/${f}:${g}`}var G=c(26163);async function H(a){let{paymentAssetNetwork:b,activeCaipNetwork:c,approvedCaipNetworkIds:d,requestedCaipNetworks:e}=a,f=j.w.sortRequestedNetworks(d,e).find(a=>a.caipNetworkId===b);if(!f)throw new w(u.INVALID_PAYMENT_CONFIG);if(f.caipNetworkId===c.caipNetworkId)return;let g=h.W.getNetworkProp("supportsAllNetworks",f.chainNamespace);if(!(d?.includes(f.caipNetworkId)||g))throw new w(u.INVALID_PAYMENT_CONFIG);try{await h.W.switchActiveNetwork(f)}catch(a){throw new w(u.GENERIC_PAYMENT_ERROR,a)}}async function I(a,b,c){if(b!==p.o.CHAIN.EVM)throw new w(u.INVALID_CHAIN_NAMESPACE);if(!c.fromAddress)throw new w(u.INVALID_PAYMENT_CONFIG,"fromAddress is required for native EVM payments.");let d="string"==typeof c.amount?parseFloat(c.amount):c.amount;if(isNaN(d))throw new w(u.INVALID_PAYMENT_CONFIG);let e=a.metadata?.decimals??18,f=l.x.parseUnits(d.toString(),e);if("bigint"!=typeof f)throw new w(u.GENERIC_PAYMENT_ERROR);return await l.x.sendTransaction({chainNamespace:b,to:c.recipient,address:c.fromAddress,value:f,data:"0x"})??void 0}async function J(a,b){if(!b.fromAddress)throw new w(u.INVALID_PAYMENT_CONFIG,"fromAddress is required for ERC20 EVM payments.");let c=a.asset,d=b.recipient,e=Number(a.metadata.decimals),f=l.x.parseUnits(b.amount.toString(),e);if(void 0===f)throw new w(u.GENERIC_PAYMENT_ERROR);return await l.x.writeContract({fromAddress:b.fromAddress,tokenAddress:c,args:[d,f],method:"transfer",abi:G.v.getERC20Abi(c),chainNamespace:p.o.CHAIN.EVM})??void 0}async function K(a,b){if(a!==p.o.CHAIN.SOLANA)throw new w(u.INVALID_CHAIN_NAMESPACE);if(!b.fromAddress)throw new w(u.INVALID_PAYMENT_CONFIG,"fromAddress is required for Solana payments.");let c="string"==typeof b.amount?parseFloat(b.amount):b.amount;if(isNaN(c)||c<=0)throw new w(u.INVALID_PAYMENT_CONFIG,"Invalid payment amount.");try{if(!t.A.getProvider(a))throw new w(u.GENERIC_PAYMENT_ERROR,"No Solana provider available.");let d=await l.x.sendTransaction({chainNamespace:p.o.CHAIN.SOLANA,to:b.recipient,value:c,tokenMint:b.tokenMint});if(!d)throw new w(u.GENERIC_PAYMENT_ERROR,"Transaction failed.");return d}catch(a){if(a instanceof w)throw a;throw new w(u.GENERIC_PAYMENT_ERROR,`Solana payment failed: ${a}`)}}let L="unknown",M=(0,n.BX)({paymentAsset:{network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},recipient:"0x0",amount:0,isConfigured:!1,error:null,isPaymentInProgress:!1,exchanges:[],isLoading:!1,openInNewTab:!0,redirectUrl:void 0,payWithExchange:void 0,currentPayment:void 0,analyticsSet:!1,paymentId:void 0}),N={state:M,subscribe:a=>(0,n.B1)(M,()=>a(M)),subscribeKey:(a,b)=>(0,o.u$)(M,a,b),async handleOpenPay(a){this.resetState(),this.setPaymentConfig(a),this.subscribeEvents(),this.initializeAnalytics(),M.isConfigured=!0,r.E.sendEvent({type:"track",event:"PAY_MODAL_OPEN",properties:{exchanges:M.exchanges,configuration:{network:M.paymentAsset.network,asset:M.paymentAsset.asset,recipient:M.recipient,amount:M.amount}}}),await i.W.open({view:"Pay"})},resetState(){M.paymentAsset={network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},M.recipient="0x0",M.amount=0,M.isConfigured=!1,M.error=null,M.isPaymentInProgress=!1,M.isLoading=!1,M.currentPayment=void 0},setPaymentConfig(a){if(!a.paymentAsset)throw new w(u.INVALID_PAYMENT_CONFIG);try{M.paymentAsset=a.paymentAsset,M.recipient=a.recipient,M.amount=a.amount,M.openInNewTab=a.openInNewTab??!0,M.redirectUrl=a.redirectUrl,M.payWithExchange=a.payWithExchange,M.error=null}catch(a){throw new w(u.INVALID_PAYMENT_CONFIG,a.message)}},getPaymentAsset:()=>M.paymentAsset,getExchanges:()=>M.exchanges,async fetchExchanges(){try{M.isLoading=!0;let a=await A({page:0,asset:F(M.paymentAsset.network,M.paymentAsset.asset),amount:M.amount.toString()});M.exchanges=a.exchanges.slice(0,2)}catch(a){throw k.P.showError(v.UNABLE_TO_GET_EXCHANGES),new w(u.UNABLE_TO_GET_EXCHANGES)}finally{M.isLoading=!1}},async getAvailableExchanges(a){try{let b=a?.asset&&a?.network?F(a.network,a.asset):void 0;return await A({page:a?.page??0,asset:b,amount:a?.amount?.toString()})}catch(a){throw new w(u.UNABLE_TO_GET_EXCHANGES)}},async getPayUrl(a,b,c=!1){try{let d=Number(b.amount),e=await B({exchangeId:a,asset:F(b.network,b.asset),amount:d.toString(),recipient:`${b.network}:${b.recipient}`});return r.E.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{exchange:{id:a},configuration:{network:b.network,asset:b.asset,recipient:b.recipient,amount:d},currentPayment:{type:"exchange",exchangeId:a},headless:c}}),c&&(this.initiatePayment(),r.E.sendEvent({type:"track",event:"PAY_INITIATED",properties:{paymentId:M.paymentId||L,configuration:{network:b.network,asset:b.asset,recipient:b.recipient,amount:d},currentPayment:{type:"exchange",exchangeId:a}}})),e}catch(a){if(a instanceof Error&&a.message.includes("is not supported"))throw new w(u.ASSET_NOT_SUPPORTED);throw Error(a.message)}},async openPayUrl(a,b,c=!1){try{let d=await this.getPayUrl(a.exchangeId,b,c);if(!d)throw new w(u.UNABLE_TO_GET_PAY_URL);let e=a.openInNewTab??!0;return j.w.openHref(d.url,e?"_blank":"_self"),d}catch(a){throw a instanceof w?M.error=a.message:M.error=v.GENERIC_PAYMENT_ERROR,new w(u.UNABLE_TO_GET_PAY_URL)}},subscribeEvents(){M.isConfigured||(l.x.subscribeKey("connections",a=>{a.size>0&&this.handlePayment()}),g.U.subscribeKey("caipAddress",a=>{let b=l.x.hasAnyConnection(p.o.CONNECTOR_ID.WALLET_CONNECT);a&&(b?setTimeout(()=>{this.handlePayment()},100):this.handlePayment())}))},async handlePayment(){M.currentPayment={type:"wallet",status:"IN_PROGRESS"};let a=g.U.state.caipAddress;if(!a)return;let{chainId:b,address:c}=q.C.parseCaipAddress(a),d=h.W.state.activeChain;if(!c||!b||!d||!t.A.getProvider(d))return;let e=h.W.state.activeCaipNetwork;if(e&&!M.isPaymentInProgress)try{this.initiatePayment();let a=h.W.getAllRequestedCaipNetworks(),b=h.W.getAllApprovedCaipNetworkIds();switch(await H({paymentAssetNetwork:M.paymentAsset.network,activeCaipNetwork:e,approvedCaipNetworkIds:b,requestedCaipNetworks:a}),await i.W.open({view:"PayLoading"}),d){case p.o.CHAIN.EVM:"native"===M.paymentAsset.asset&&(M.currentPayment.result=await I(M.paymentAsset,d,{recipient:M.recipient,amount:M.amount,fromAddress:c})),M.paymentAsset.asset.startsWith("0x")&&(M.currentPayment.result=await J(M.paymentAsset,{recipient:M.recipient,amount:M.amount,fromAddress:c})),M.currentPayment.status="SUCCESS";break;case p.o.CHAIN.SOLANA:M.currentPayment.result=await K(d,{recipient:M.recipient,amount:M.amount,fromAddress:c,tokenMint:"native"===M.paymentAsset.asset?void 0:M.paymentAsset.asset}),M.currentPayment.status="SUCCESS";break;default:throw new w(u.INVALID_CHAIN_NAMESPACE)}}catch(a){a instanceof w?M.error=a.message:M.error=v.GENERIC_PAYMENT_ERROR,M.currentPayment.status="FAILED",k.P.showError(M.error)}finally{M.isPaymentInProgress=!1}},getExchangeById:a=>M.exchanges.find(b=>b.id===a),validatePayConfig(a){let{paymentAsset:b,recipient:c,amount:d}=a;if(!b)throw new w(u.INVALID_PAYMENT_CONFIG);if(!c)throw new w(u.INVALID_RECIPIENT);if(!b.asset)throw new w(u.INVALID_ASSET);if(null==d||d<=0)throw new w(u.INVALID_AMOUNT)},handlePayWithWallet(){let a=g.U.state.caipAddress;if(!a)return void s.I.push("Connect");let{chainId:b,address:c}=q.C.parseCaipAddress(a),d=h.W.state.activeChain;if(!c||!b||!d)return void s.I.push("Connect");this.handlePayment()},async handlePayWithExchange(a){try{M.currentPayment={type:"exchange",exchangeId:a};let{network:b,asset:c}=M.paymentAsset,d={network:b,asset:c,amount:M.amount,recipient:M.recipient},e=await this.getPayUrl(a,d);if(!e)throw new w(u.UNABLE_TO_INITIATE_PAYMENT);return M.currentPayment.sessionId=e.sessionId,M.currentPayment.status="IN_PROGRESS",M.currentPayment.exchangeId=a,this.initiatePayment(),{url:e.url,openInNewTab:M.openInNewTab}}catch(a){return a instanceof w?M.error=a.message:M.error=v.GENERIC_PAYMENT_ERROR,M.isPaymentInProgress=!1,k.P.showError(M.error),null}},async getBuyStatus(a,b){try{let c=await C({sessionId:b,exchangeId:a});return("SUCCESS"===c.status||"FAILED"===c.status)&&r.E.sendEvent({type:"track",event:"SUCCESS"===c.status?"PAY_SUCCESS":"PAY_ERROR",properties:{paymentId:M.paymentId||L,configuration:{network:M.paymentAsset.network,asset:M.paymentAsset.asset,recipient:M.recipient,amount:M.amount},currentPayment:{type:"exchange",exchangeId:M.currentPayment?.exchangeId,sessionId:M.currentPayment?.sessionId,result:c.txHash}}}),c}catch(a){throw new w(u.UNABLE_TO_GET_BUY_STATUS)}},async updateBuyStatus(a,b){try{let c=await this.getBuyStatus(a,b);M.currentPayment&&(M.currentPayment.status=c.status,M.currentPayment.result=c.txHash),("SUCCESS"===c.status||"FAILED"===c.status)&&(M.isPaymentInProgress=!1)}catch(a){throw new w(u.UNABLE_TO_GET_BUY_STATUS)}},initiatePayment(){M.isPaymentInProgress=!0,M.paymentId=crypto.randomUUID()},initializeAnalytics(){M.analyticsSet||(M.analyticsSet=!0,this.subscribeKey("isPaymentInProgress",a=>{if(M.currentPayment?.status&&"UNKNOWN"!==M.currentPayment.status){let a={IN_PROGRESS:"PAY_INITIATED",SUCCESS:"PAY_SUCCESS",FAILED:"PAY_ERROR"}[M.currentPayment.status];r.E.sendEvent({type:"track",event:a,properties:{paymentId:M.paymentId||L,configuration:{network:M.paymentAsset.network,asset:M.paymentAsset.asset,recipient:M.recipient,amount:M.amount},currentPayment:{type:M.currentPayment.type,exchangeId:M.currentPayment.exchangeId,sessionId:M.currentPayment.sessionId,result:M.currentPayment.result}}})}}))}},O=(0,d.AH)`
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  .token-display {
    padding: var(--wui-spacing-s) var(--wui-spacing-m);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-bg-125);
    margin-top: var(--wui-spacing-s);
    margin-bottom: var(--wui-spacing-s);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--wui-spacing-xs);
  }
`;var P=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let Q=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.amount="",this.tokenSymbol="",this.networkName="",this.exchanges=N.state.exchanges,this.isLoading=N.state.isLoading,this.loadingExchangeId=null,this.connectedWalletInfo=g.U.state.connectedWalletInfo,this.initializePaymentDetails(),this.unsubscribe.push(N.subscribeKey("exchanges",a=>this.exchanges=a)),this.unsubscribe.push(N.subscribeKey("isLoading",a=>this.isLoading=a)),this.unsubscribe.push(g.U.subscribe(a=>this.connectedWalletInfo=a.connectedWalletInfo)),N.fetchExchanges()}get isWalletConnected(){return"connected"===g.U.state.status}render(){return(0,d.qy)`
      <wui-flex flexDirection="column">
        <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
          ${this.renderPaymentHeader()}

          <wui-flex flexDirection="column" gap="s">
            ${this.renderPayWithWallet()} ${this.renderExchangeOptions()}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}initializePaymentDetails(){let a=N.getPaymentAsset();this.networkName=a.network,this.tokenSymbol=a.metadata.symbol,this.amount=N.state.amount.toString()}renderPayWithWallet(){return!function(a){let{chainNamespace:b}=q.C.parseCaipNetworkId(a);return D.includes(b)}(this.networkName)?(0,d.qy)``:(0,d.qy)`<wui-flex flexDirection="column" gap="s">
        ${this.isWalletConnected?this.renderConnectedView():this.renderDisconnectedView()}
      </wui-flex>
      <wui-separator text="or"></wui-separator>`}renderPaymentHeader(){let a=this.networkName;if(this.networkName){let b=h.W.getAllRequestedCaipNetworks().find(a=>a.caipNetworkId===this.networkName);b&&(a=b.name)}return(0,d.qy)`
      <wui-flex flexDirection="column" alignItems="center">
        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="large-700" color="fg-100">${this.amount||"0.0000"}</wui-text>
          <wui-flex class="token-display" alignItems="center" gap="xxs">
            <wui-text variant="paragraph-600" color="fg-100">
              ${this.tokenSymbol||"Unknown Asset"}
            </wui-text>
            ${a?(0,d.qy)`
                  <wui-text variant="small-500" color="fg-200"> on ${a} </wui-text>
                `:""}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}renderConnectedView(){let a=this.connectedWalletInfo?.name||"connected wallet";return(0,d.qy)`
      <wui-list-item
        @click=${this.onWalletPayment}
        ?chevron=${!0}
        data-testid="wallet-payment-option"
      >
        <wui-flex alignItems="center" gap="s">
          <wui-wallet-image
            size="sm"
            imageSrc=${(0,f.J)(this.connectedWalletInfo?.icon)}
            name=${(0,f.J)(this.connectedWalletInfo?.name)}
          ></wui-wallet-image>
          <wui-text variant="paragraph-500" color="inherit">Pay with ${a}</wui-text>
        </wui-flex>
      </wui-list-item>

      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="disconnect"
        @click=${this.onDisconnect}
        data-testid="disconnect-button"
        ?chevron=${!1}
      >
        <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
      </wui-list-item>
    `}renderDisconnectedView(){return(0,d.qy)`<wui-list-item
      variant="icon"
      iconVariant="overlay"
      icon="walletPlaceholder"
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="paragraph-500" color="inherit">Pay from wallet</wui-text>
    </wui-list-item>`}renderExchangeOptions(){return this.isLoading?(0,d.qy)`<wui-flex justifyContent="center" alignItems="center">
        <wui-spinner size="md"></wui-spinner>
      </wui-flex>`:0===this.exchanges.length?(0,d.qy)`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-100">No exchanges available</wui-text>
      </wui-flex>`:this.exchanges.map(a=>(0,d.qy)`
        <wui-list-item
          @click=${()=>this.onExchangePayment(a.id)}
          data-testid="exchange-option-${a.id}"
          ?chevron=${!0}
          ?disabled=${null!==this.loadingExchangeId}
        >
          <wui-flex alignItems="center" gap="s">
            ${this.loadingExchangeId===a.id?(0,d.qy)`<wui-loading-spinner color="accent-100" size="md"></wui-loading-spinner>`:(0,d.qy)`<wui-wallet-image
                  size="sm"
                  imageSrc=${(0,f.J)(a.imageUrl)}
                  name=${a.name}
                ></wui-wallet-image>`}
            <wui-text flexGrow="1" variant="paragraph-500" color="inherit"
              >Pay with ${a.name} <wui-spinner size="sm" color="fg-200"></wui-spinner
            ></wui-text>
          </wui-flex>
        </wui-list-item>
      `)}onWalletPayment(){N.handlePayWithWallet()}async onExchangePayment(a){try{this.loadingExchangeId=a;let b=await N.handlePayWithExchange(a);b&&(await i.W.open({view:"PayLoading"}),j.w.openHref(b.url,b.openInNewTab?"_blank":"_self"))}catch(a){console.error("Failed to pay with exchange",a),k.P.showError("Failed to pay with exchange")}finally{this.loadingExchangeId=null}}async onDisconnect(a){a.stopPropagation();try{await l.x.disconnect()}catch{console.error("Failed to disconnect"),k.P.showError("Failed to disconnect")}}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}};Q.styles=O,P([(0,e.wk)()],Q.prototype,"amount",void 0),P([(0,e.wk)()],Q.prototype,"tokenSymbol",void 0),P([(0,e.wk)()],Q.prototype,"networkName",void 0),P([(0,e.wk)()],Q.prototype,"exchanges",void 0),P([(0,e.wk)()],Q.prototype,"isLoading",void 0),P([(0,e.wk)()],Q.prototype,"loadingExchangeId",void 0),P([(0,e.wk)()],Q.prototype,"connectedWalletInfo",void 0),Q=P([(0,m.EM)("w3m-pay-view")],Q);var R=c(83344),S=c(60778),T=c(30221);c(66655);let U=(0,d.AH)`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }
`;var V=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let W=class extends d.WF{constructor(){super(),this.loadingMessage="",this.subMessage="",this.paymentState="in-progress",this.paymentState=N.state.isPaymentInProgress?"in-progress":"completed",this.updateMessages(),this.setupSubscription(),this.setupExchangeSubscription()}disconnectedCallback(){clearInterval(this.exchangeSubscription)}render(){return(0,d.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center"> ${this.getStateIcon()} </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            ${this.loadingMessage}
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            ${this.subMessage}
          </wui-text>
        </wui-flex>
      </wui-flex>
    `}updateMessages(){switch(this.paymentState){case"completed":this.loadingMessage="Payment completed",this.subMessage="Your transaction has been successfully processed";break;case"error":this.loadingMessage="Payment failed",this.subMessage="There was an error processing your transaction";break;default:N.state.currentPayment?.type==="exchange"?(this.loadingMessage="Payment initiated",this.subMessage="Please complete the payment on the exchange"):(this.loadingMessage="Awaiting payment confirmation",this.subMessage="Please confirm the payment transaction in your wallet")}}getStateIcon(){switch(this.paymentState){case"completed":return this.successTemplate();case"error":return this.errorTemplate();default:return this.loaderTemplate()}}setupExchangeSubscription(){N.state.currentPayment?.type==="exchange"&&(this.exchangeSubscription=setInterval(async()=>{let a=N.state.currentPayment?.exchangeId,b=N.state.currentPayment?.sessionId;a&&b&&(await N.updateBuyStatus(a,b),N.state.currentPayment?.status==="SUCCESS"&&clearInterval(this.exchangeSubscription))},4e3))}setupSubscription(){N.subscribeKey("isPaymentInProgress",a=>{a||"in-progress"!==this.paymentState||(N.state.error||!N.state.currentPayment?.result?this.paymentState="error":this.paymentState="completed",this.updateMessages(),setTimeout(()=>{"disconnected"!==l.x.state.status&&i.W.close()},3e3))}),N.subscribeKey("error",a=>{a&&"in-progress"===this.paymentState&&(this.paymentState="error",this.updateMessages())})}loaderTemplate(){let a=R.W.state.themeVariables["--w3m-border-radius-master"],b=a?parseInt(a.replace("px",""),10):4,c=this.getPaymentIcon();return(0,d.qy)`
      <wui-flex justifyContent="center" alignItems="center" style="position: relative;">
        ${c?(0,d.qy)`<wui-wallet-image size="lg" imageSrc=${c}></wui-wallet-image>`:null}
        <wui-loading-thumbnail radius=${9*b}></wui-loading-thumbnail>
      </wui-flex>
    `}getPaymentIcon(){let a=N.state.currentPayment;if(a){if("exchange"===a.type){let b=a.exchangeId;if(b){let a=N.getExchangeById(b);return a?.imageUrl}}if("wallet"===a.type){let a=g.U.state.connectedWalletInfo?.icon;if(a)return a;let b=h.W.state.activeChain;if(!b)return;let c=S.a.getConnectorId(b);if(!c)return;let d=S.a.getConnectorById(c);if(!d)return;return T.$.getConnectorImage(d)}}}successTemplate(){return(0,d.qy)`<wui-icon size="xl" color="success-100" name="checkmark"></wui-icon>`}errorTemplate(){return(0,d.qy)`<wui-icon size="xl" color="error-100" name="close"></wui-icon>`}};async function X(a){return N.handleOpenPay(a)}async function Y(a,b=3e5){if(b<=0)throw new w(u.INVALID_PAYMENT_CONFIG,"Timeout must be greater than 0");try{await X(a)}catch(a){if(a instanceof w)throw a;throw new w(u.UNABLE_TO_INITIATE_PAYMENT,a.message)}return new Promise((a,c)=>{var d;let e=!1,f=setTimeout(()=>{e||(e=!0,i(),c(new w(u.GENERIC_PAYMENT_ERROR,"Payment timeout")))},b);function g(){if(e)return;let b=N.state.currentPayment,c=N.state.error,d=N.state.isPaymentInProgress;if(b?.status==="SUCCESS"){e=!0,i(),clearTimeout(f),a({success:!0,result:b.result});return}if(b?.status==="FAILED"){e=!0,i(),clearTimeout(f),a({success:!1,error:c||"Payment failed"});return}!c||d||b||(e=!0,i(),clearTimeout(f),a({success:!1,error:c}))}let h=ab("currentPayment",g),i=(d=[h,ab("error",g),ab("isPaymentInProgress",g)],()=>{d.forEach(a=>{try{a()}catch{}})});g()})}function Z(){return N.getExchanges()}function $(){return N.state.currentPayment?.result}function _(){return N.state.error}function aa(){return N.state.isPaymentInProgress}function ab(a,b){return N.subscribeKey(a,b)}W.styles=U,V([(0,e.wk)()],W.prototype,"loadingMessage",void 0),V([(0,e.wk)()],W.prototype,"subMessage",void 0),V([(0,e.wk)()],W.prototype,"paymentState",void 0),W=V([(0,m.EM)("w3m-pay-loading-view")],W);let ac={network:"eip155:8453",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}},ad={network:"eip155:8453",asset:"0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},ae={network:"eip155:84532",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}},af={network:"eip155:1",asset:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},ag={network:"eip155:10",asset:"0x0b2c639c533813f4aa9d7837caf62653d097ff85",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},ah={network:"eip155:42161",asset:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},ai={network:"eip155:137",asset:"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},aj={network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},ak={network:"eip155:1",asset:"0xdAC17F958D2ee523a2206206994597C13D831ec7",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},al={network:"eip155:10",asset:"0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},am={network:"eip155:42161",asset:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},an={network:"eip155:137",asset:"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},ao={network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},ap={network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"native",metadata:{name:"Solana",symbol:"SOL",decimals:9}}}};