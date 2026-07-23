import{n as e}from"./rolldown-runtime-DAXXjFlN.js";import{t}from"./jsx-runtime-CFwixLRt.js";import{i as n}from"./react-B0KOWr-5.js";import{a as r,o as i}from"./blocks-CyhruDHS.js";import{n as a,r as o,t as s}from"./Guidance-DlJl9zzV.js";function c(e){let t={em:`em`,h1:`h1`,h2:`h2`,p:`p`,strong:`strong`,...n(),...e.components},{Do:r,DoDont:i,Dont:a,Note:o,WhenNotToUse:s,WhenToUse:c}=t;return r||u(`Do`,!0),i||u(`DoDont`,!0),a||u(`Dont`,!0),o||u(`Note`,!0),s||u(`WhenNotToUse`,!0),c||u(`WhenToUse`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h1,{id:`button`,children:`Button`}),`
`,(0,d.jsxs)(t.p,{children:[`Design intent for the Button component. This page answers `,(0,d.jsx)(t.em,{children:`why`}),` and `,(0,d.jsx)(t.em,{children:`when`}),` — the
live component, its variants and its API live under `,(0,d.jsx)(t.strong,{children:`Components › Button`}),`.`]}),`
`,(0,d.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,d.jsx)(t.p,{children:`Buttons trigger an action or a change of state. They are the most direct way for
a user to tell the interface to do something, so their visual weight should match
the importance of the action behind them.`}),`
`,(0,d.jsx)(c,{children:(0,d.jsx)(t.p,{children:`Use a button for a clear, discrete action the user takes on the current screen —
submitting a form, confirming a choice, opening a dialog.`})}),`
`,(0,d.jsx)(s,{children:(0,d.jsx)(t.p,{children:`Don't use a button to navigate between pages — that's a link. If the primary
result is "go somewhere else", use a link so it behaves correctly with the
browser.`})}),`
`,(0,d.jsx)(t.h2,{id:`hierarchy`,children:`Hierarchy`}),`
`,(0,d.jsx)(t.p,{children:`Every screen should have at most one primary button. Use secondary and tertiary
buttons for lower-priority actions so the primary action stays unmistakable.`}),`
`,(0,d.jsxs)(i,{children:[(0,d.jsx)(r,{children:`Pair one primary button with secondary or tertiary supporting actions.`}),(0,d.jsx)(a,{children:`Place two primary buttons side by side and remove the hierarchy.`})]}),`
`,(0,d.jsx)(t.h2,{id:`behaviour`,children:`Behaviour`}),`
`,(0,d.jsx)(o,{title:`Loading and disabled states`,children:(0,d.jsx)(t.p,{children:`While an action is in progress, show a loading state rather than removing the
button, so the layout doesn't shift. Only disable a button when the action is
genuinely unavailable.`})})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var d,f=e((()=>{d=t(),o()}));function p(e){return(0,h.jsxs)(h.Fragment,{children:[`
`,(0,h.jsx)(r,{title:`Design Guidance/Button`}),`
`,(0,h.jsx)(l,{components:s})]})}function m(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;e((()=>{h=t(),o(),i(),a(),f()}))();export{m as default};