export const description = "Callout is the inline feedback message used across the new flows: bin capacity errors in Add Stock, the “Switched to Frankfurt Hub” confirmation, and every sign-in, OTP and password message. It has four tones, a title, an optional description and an optional action."
export const overviewNote = "Examples use real titles and descriptions from the Add Stock, Warehouse Switch and Sign in screens. The Info example uses an illustrative title — real Info callouts are on SU-02 (Already registered) and SU-06 (No profile found)."
export const contextIntro = "Where each variant is used in the screens on the 😍 Final page. Counts are instances placed in screens; “nested” means the instance sits inside another component instance."
export const auditIntro = "Findings collected while documenting this component. Nothing has been changed in the components or tokens — these are suggestions for the team to review."

export const metrics = [
  ["4","Tones"],
  ["5","Component properties"],
  ["22","Instances on the Final page"],
  ["3","Flows (Add Stock, Switch, Auth)"],
] as const

export const anatomyHeadings = ["#","Part","Details"]
export const anatomy = [
  ["1","Container","400 wide · feedback/{tone}/primary/background · feedback/{tone}/primary/border · radius/MD · Padding/MD"],
  ["2","Icon","16px tone icon (info, check, alert-triangle, alert-circle) · feedback/{tone}/primary/icon"],
  ["3","Title","Label/MD-Default · feedback/{tone}/primary/text"],
  ["4","Description","Label/SM-Regular · feedback/{tone}/primary/text. Optional (Show Description)."],
  ["5","Action","Secondary filled Button, label “Action”. Optional (Show Action)."],
] as const

export const propertiesHeadings = ["Property","Type","Values","Default"]
export const properties = [
  ["Tone","Variant","Info · Success · Warning · Error","Info"],
  ["Title","Text","Any","“Callout title”"],
  ["Description","Text","Any","“Supporting text…”"],
  ["Show Description","Boolean","true / false","true"],
  ["Show Action","Boolean","true / false","true"],
] as const

export const tonesHeadings = ["Tone","Use for","Example in the screens","Contrast"]
export const tones = [
  ["Info","Neutral information","SU-02 · Already registered · SU-06 · No profile found","6.16:1"],
  ["Success","Something finished","Password updated · Switched to Frankfurt Hub","4.79:1"],
  ["Warning","Temporary block, user can recover","Too many attempts · This code has expired","4.76:1"],
  ["Error","Action failed or input is wrong","Stock wasn’t added · That code isn’t right","5.91:1"],
] as const

export const tokensHeadings = ["Part","Token","Value"]
export const tokens = [
  ["Background · border","feedback/{tone}/primary/background · /border","Per tone"],
  ["Icon · text","feedback/{tone}/primary/icon · /text","Per tone"],
  ["Radius","radius/MD","8 px"],
  ["Spacing","Padding/MD · Padding/SM · Padding/XL · Gap/MD · Gap/SM","—"],
  ["Title · description","Label/MD-Default · Label/SM-Regular","14/20 · 12/16"],
  ["Action","Button · Secondary · Filled · Small","—"],
] as const

export const contextHeadings = ["Variant","Example","Count"]
export const context = [
  ["Error","Add Stock (capacity, bin changed, save failed) and Sign in errors — 10 screens","14"],
  ["Success","Switched to Frankfurt Hub · Password updated · New code sent — 4 screens","4"],
  ["Warning","SI-03 · Attempt limit · SI-07 · Expired code","2"],
  ["Info","SU-02 · Already registered · SU-06 · No profile found","2"],
] as const

export const contentHeadings = ["Rule","Detail","Example"]
export const content = [
  ["Title says what happened","Short, sentence case, no period.","Stock wasn’t added"],
  ["Description says what to do","One or two sentences, ends with a period.","Check your connection and try again."],
  ["Same message, same words","One wording per situation across screens.","Bin A1-L2-S3 changed while you were here"],
] as const

export const accessibilityHeadings = ["Check","Detail","Status"]
export const accessibility = [
  ["Text contrast","All four tones pass 4.5:1 (lowest: Warning 4.76:1).","Pass"],
  ["Announcement","Error/Warning → role=\"alert\"; Success/Info → role=\"status\" so screen readers hear it.","Required"],
  ["Not color only","Each tone has its own icon.","Pass"],
  ["Action label","The action is labelled “Action” in the component — screens must set a real label.","Required"],
] as const

export const auditHeadings = ["Finding","Where","Details","Severity"]
export const audit = [
  ["Action label not exposed","Callout","There is no text property for the action. Every instance has to override the nested Button. Add an “Action” text property.","Warning"],
  ["Copy errors","A1 · Error — bin changed","Description says “@Maya …” and “… free. pick another bin” (lowercase). D5 has the clean version. Use one wording.","Error"],
  ["Token name case","Callout tokens","Info tokens are “feedback/Info/…” while others are lowercase (feedback/success/…).","Info"],
  ["Tone choice","Add Stock","“30 units won’t fit in this bin” is Error, but nothing failed — the user is warned before saving. Consider Warning.","Info"],
  ["No dismiss","Callout","No close button option for messages that can be dismissed (e.g. “New code sent”).","Info"],
  ["Info example","Overview","The Info example title in Overview is illustrative. Real Info callouts are on SU-02 and SU-06.","Info"],
  ["Not tokenized","Preview spacing","Gaps between the examples in the preview areas (24–40 px) are fixed values on this page only. The components themselves are not affected.","Not tokenized"],
] as const

export const guidelines = [
  ["Put the callout next to what it is about (above the quantity, under the form title).","Use a callout for a single field error — use the field’s Error state."],
  ["Pick the tone by what happened: Warning when the user can wait or retry, Error when it failed.","Use Error for every problem."],
  ["Write the next step in the description.","Repeat the title in the description."],
] as const
