import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{i as t,j as n,n as r}from"./iframe-DDRvr_3V.js";var i,a,o,s,c,l,u,d;function f(){return(f=e((()=>{r(),i=n(),a={title:`Foundations`,parameters:{layout:`padded`}},o=({name:e,value:n})=>(0,i.jsxs)(`div`,{style:{width:140},children:[(0,i.jsx)(`div`,{style:{height:56,borderRadius:t.radius.sm,background:n,border:`1px solid ${t.color.neutral.border}`}}),(0,i.jsxs)(`div`,{style:{fontSize:t.font.size.sm,marginTop:6},children:[(0,i.jsx)(`div`,{style:{fontWeight:t.font.weight.semibold},children:e}),(0,i.jsx)(`code`,{children:n})]})]}),s={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:t.space.md},children:[(0,i.jsx)(o,{name:`primary`,value:t.color.primary.main}),(0,i.jsx)(o,{name:`secondary`,value:t.color.secondary.main}),(0,i.jsx)(o,{name:`success`,value:t.color.success.main}),(0,i.jsx)(o,{name:`error`,value:t.color.error.main}),(0,i.jsx)(o,{name:`neutral.border`,value:t.color.neutral.border}),(0,i.jsx)(o,{name:`neutral.bg`,value:t.color.neutral.bg})]})},c={render:()=>(0,i.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:t.space.sm},children:Object.entries(t.space).map(([e,n])=>(0,i.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:t.space.md},children:[(0,i.jsxs)(`code`,{style:{width:80},children:[e,` (`,n,`)`]}),(0,i.jsx)(`div`,{style:{height:16,width:n,background:t.color.primary.main}})]},e))})},l={render:()=>(0,i.jsx)(`div`,{style:{display:`flex`,gap:t.space.lg},children:Object.entries(t.radius).map(([e,n])=>(0,i.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,i.jsx)(`div`,{style:{height:72,width:72,borderRadius:n,background:t.color.secondary.main}}),(0,i.jsxs)(`code`,{children:[e,` (`,n,`)`]})]},e))})},u={render:()=>(0,i.jsxs)(`div`,{style:{fontFamily:t.font.family.base},children:[Object.entries(t.font.size).map(([e,n])=>(0,i.jsxs)(`p`,{style:{fontSize:n,margin:`${t.space.sm}px 0`},children:[e,` — The quick brown fox (`,n,`)`]},e)),(0,i.jsx)(`p`,{style:{fontWeight:t.font.weight.regular},children:`Regular weight (400)`}),(0,i.jsx)(`p`,{style:{fontWeight:t.font.weight.semibold},children:`Semibold weight (600)`})]})},d=[`Colours`,`Spacing`,`Radius`,`Typography`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.space.md
  }}>
      <Swatch name="primary" value={tokens.color.primary.main} />
      <Swatch name="secondary" value={tokens.color.secondary.main} />
      <Swatch name="success" value={tokens.color.success.main} />
      <Swatch name="error" value={tokens.color.error.main} />
      <Swatch name="neutral.border" value={tokens.color.neutral.border} />
      <Swatch name="neutral.bg" value={tokens.color.neutral.bg} />
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space.sm
  }}>
      {Object.entries(tokens.space).map(([name, value]) => <div key={name} style={{
      display: 'flex',
      alignItems: 'center',
      gap: tokens.space.md
    }}>
          <code style={{
        width: 80
      }}>
            {name} ({value})
          </code>
          <div style={{
        height: 16,
        width: value,
        background: tokens.color.primary.main
      }} />
        </div>)}
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: tokens.space.lg
  }}>
      {Object.entries(tokens.radius).map(([name, value]) => <div key={name} style={{
      textAlign: 'center'
    }}>
          <div style={{
        height: 72,
        width: 72,
        borderRadius: value,
        background: tokens.color.secondary.main
      }} />
          <code>
            {name} ({value})
          </code>
        </div>)}
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    fontFamily: tokens.font.family.base
  }}>
      {Object.entries(tokens.font.size).map(([name, value]) => <p key={name} style={{
      fontSize: value,
      margin: \`\${tokens.space.sm}px 0\`
    }}>
          {name} — The quick brown fox ({value})
        </p>)}
      <p style={{
      fontWeight: tokens.font.weight.regular
    }}>Regular weight (400)</p>
      <p style={{
      fontWeight: tokens.font.weight.semibold
    }}>Semibold weight (600)</p>
    </div>
}`,...u.parameters?.docs?.source}}}})))()}f();export{s as Colours,l as Radius,c as Spacing,u as Typography,d as __namedExportsOrder,a as default};