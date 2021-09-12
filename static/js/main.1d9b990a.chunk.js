(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{103:function(t,e,s){},104:function(t,e,s){},185:function(t,e,s){"use strict";s.r(e);var n=s(0),a=s.n(n),i=s(24),r=s.n(i),o=(s(103),s(104),s(105),s(106),s(107),s(26)),c=s(27),h=s(29),d=s(28),l=s(90),p=s.n(l),u=s(25),j=s.n(u),b=s(91),f=s.n(b),O=s(3),m=function(t){Object(h.a)(s,t);var e=Object(d.a)(s);function s(){return Object(o.a)(this,s),e.apply(this,arguments)}return Object(c.a)(s,[{key:"render",value:function(){for(var t=this,e={onClick:function(e,s,n){t.props.setVideo(s.videoUrl)}},s=[{dataField:"season",text:"Season",headerStyle:function(t,e){return{width:"110px"}},filter:Object(u.textFilter)()},{dataField:"team",text:"Team",filter:Object(u.textFilter)()},{dataField:"gameTeams",text:"Game",headerStyle:function(t,e){return{width:"100px"}},filter:Object(u.textFilter)()},{dataField:"gameDate",text:"Game Date",headerStyle:function(t,e){return{width:"120px"}},sort:!0,filter:Object(u.textFilter)()},{dataField:"actionType",text:"Action Type",filter:Object(u.textFilter)()},{dataField:"distance",text:"Distance (ft.)",sort:!0,filter:Object(u.numberFilter)()},{dataField:"secsRemaining",text:"Sec. Remain",sort:!0,filter:Object(u.numberFilter)()},{dataField:"scoreMargin",text:"Score Margin",sort:!0,filterValue:function(t,e){return Math.abs(t)},filter:Object(u.numberFilter)()},{dataField:"made",text:"Made Shot",headerStyle:function(t,e){return{width:"60px"}},filter:Object(u.textFilter)()}],n=[],a=0;a<this.props.shots.length;a++){var i={team:this.props.shots[a].TEAM_NAME,player:this.props.shots[a].PLAYER_NAME,gameDate:this.props.shots[a].GameDate.split("/")[0],actionType:this.props.shots[a].ACTION_TYPE,distance:this.props.shots[a].SHOT_DISTANCE,made:this.props.shots[a].SHOT_MADE_FLAG,description:this.props.shots[a].Description,gameTeams:this.props.shots[a].AwayTeam+"@"+this.props.shots[a].HomeTeam,videoUrl:this.props.shots[a].VideoURL,season:this.props.shots[a].Season,secsRemaining:this.props.shots[a].SecondsRemaining,scoreMargin:this.props.shots[a].ScoreDiff};n.push(i)}return Object(O.jsx)("div",{className:"shots-table w-100",children:Object(O.jsx)(p.a,{keyField:"d",hover:!0,condensed:!0,data:n,columns:s,rowEvents:e,filter:j()(),pagination:f()()})})}}]),s}(a.a.Component),x=s(190),v=s(189),y=(s(162),s(97)),g=function(t){Object(h.a)(s,t);var e=Object(d.a)(s);function s(t){var n;return Object(o.a)(this,s),(n=e.call(this,t)).getPlayersAndTeams=function(){fetch("https://nbastatsvideoapi-n4b6xkst7q-de.a.run.app/players").then((function(t){return t.json()})).then((function(t){n.setState({players:t})}),(function(t){console.log(t)}));fetch("https://nbastatsvideoapi-n4b6xkst7q-de.a.run.app/teams").then((function(t){return t.json()})).then((function(t){n.setState({teams:t})}),(function(t){console.log(t)}))},n.makeRequest=function(){var t=n.state.players[n.state.playerName],e="https://nbastatsvideoapi-n4b6xkst7q-de.a.run.app/videos?player_id=".concat(t);fetch(e).then((function(t){return t.json()})).then((function(t){n.props.setShots(t)}),(function(t){console.log(t)}))},n.state={playerName:"0",players:{},teams:{}},n}return Object(c.a)(s,[{key:"componentDidMount",value:function(){this.getPlayersAndTeams()}},{key:"render",value:function(){var t=this;return Object(O.jsx)("div",{className:"search-div",children:Object(O.jsx)("div",{className:"search",children:Object(O.jsxs)(x.a,{className:"search-box",children:[Object(O.jsx)(y.a,{id:"basic-typeahead-single",placeholder:"Player Name","aria-describedby":"basic-addon1",emptyLabel:"Loading...",options:Object.keys(this.state.players),onChange:function(e){return t.setState({playerName:e})}}),Object(O.jsx)(v.a,{onClick:this.makeRequest,id:"button-addon2",children:"Search"})]})})})}}]),s}(a.a.Component),S=function(t){Object(h.a)(s,t);var e=Object(d.a)(s);function s(){return Object(o.a)(this,s),e.apply(this,arguments)}return Object(c.a)(s,[{key:"render",value:function(){return Object(O.jsx)("div",{className:"video-player",children:Object(O.jsxs)("video",{width:"810",height:"450",controls:!0,loop:!0,autoPlay:!0,playsInline:!0,children:[Object(O.jsx)("source",{src:this.props.src,type:"video/mp4"}),Object(O.jsxs)("p",{children:["Your browser doesn't support HTML5 video. Here is a ",Object(O.jsx)("a",{href:this.props.src,children:"link to the video"})," instead."]})]},this.props.src)})}}]),s}(a.a.Component),F=s(187),k=function(t){Object(h.a)(s,t);var e=Object(d.a)(s);function s(t){var n;return Object(o.a)(this,s),(n=e.call(this,t)).setShots=function(t){n.setState({shots:t}),console.log(t)},n.setVideo=function(t){n.setState({video:t}),console.log(t)},n.state={shots:[],video:""},n}return Object(c.a)(s,[{key:"render",value:function(){return Object(O.jsxs)(F.a,{className:"main-content",children:[Object(O.jsx)(g,{setShots:this.setShots}),Object(O.jsx)(S,{src:this.state.video}),Object(O.jsx)(m,{setVideo:this.setVideo,shots:this.state.shots})]})}}]),s}(a.a.Component),T=s(188),N=function(t){Object(h.a)(s,t);var e=Object(d.a)(s);function s(){return Object(o.a)(this,s),e.apply(this,arguments)}return Object(c.a)(s,[{key:"render",value:function(){return Object(O.jsx)(T.a,{bg:"dark",variant:"dark",children:Object(O.jsx)(F.a,{children:Object(O.jsx)(T.a.Brand,{href:"#home",children:"NBA Video Searcher"})})})}}]),s}(a.a.Component);var A=function(){return Object(O.jsxs)("div",{className:"app",children:[Object(O.jsx)(N,{}),Object(O.jsx)(k,{})]})},C=function(t){t&&t instanceof Function&&s.e(3).then(s.bind(null,191)).then((function(e){var s=e.getCLS,n=e.getFID,a=e.getFCP,i=e.getLCP,r=e.getTTFB;s(t),n(t),a(t),i(t),r(t)}))};r.a.render(Object(O.jsx)(a.a.StrictMode,{children:Object(O.jsx)(A,{})}),document.getElementById("root")),C()}},[[185,1,2]]]);
//# sourceMappingURL=main.1d9b990a.chunk.js.map