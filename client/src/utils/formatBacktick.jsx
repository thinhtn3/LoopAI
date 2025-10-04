//import theme context for code style

const codeStyle = {
  backgroundColor: "var(--home-codeBg)",
  color: "var(--home-codeText)",
  border: `1px solid var(--home-border)`,
  borderRadius: 4,
  padding: "0 4px",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: "0.9em",
  display: "inline",
};

const blockStyle = {
  backgroundColor: "var(--home-codeBg)",
  color: "var(--home-codeText)",
  border: `1px solid var(--home-border)`,
  borderRadius: 6,
  padding: "8px 10px",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: "0.9em",
  whiteSpace: "pre-wrap",
  overflowX: "auto",
  margin: "6px 0",
};

// Render inline code first preference for ``...`` then `...`
const renderInline = (text) => {
  const parts = [];
  const s = String(text ?? "");
  const re = /``([\s\S]*?)``|`([^`]+)`/g;
  let last = 0, m;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) parts.push(s.slice(last, m.index));
    const codeText = (m[1] ?? m[2]) ?? "";
    parts.push(<code key={`i-${m.index}`} style={codeStyle}>{codeText}</code>);
    last = m.index + m[0].length;
  }
  if (last < s.length) parts.push(s.slice(last));
  return parts;
};


export const formatContent = (text) => {
    const s = String(text ?? "");
    const nodes = [];
    const fence = /```(\w+)?\n([\s\S]*?)```/g;
    let last = 0, m;
    while ((m = fence.exec(s)) !== null) {
      if (m.index > last) nodes.push(renderInline(s.slice(last, m.index)));
      nodes.push(
        <pre key={`f-${m.index}`} style={blockStyle}>
          <code>{m[2]}</code>
        </pre>
      );
      last = m.index + m[0].length;
    }
    if (last < s.length) nodes.push(renderInline(s.slice(last)));
    return nodes;
  };

// Render quoted strings ("..." or '...') as inline code
const renderQuoted = (text) => {
  const parts = [];
  const s = String(text ?? "");
  const re = /"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'/g;
  let last = 0, m;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) parts.push(s.slice(last, m.index));
    const content = (m[1] ?? m[3]) ?? "";
    parts.push(<code key={`q-${m.index}`} style={codeStyle}>{content}</code>);
    last = m.index + m[0].length;
  }
  if (last < s.length) parts.push(s.slice(last));
  return parts;
};

const quotesRe = /"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'/;

// Like formatContent, but ensures the whole string is code if unquoted
export const formatStrings = (text) => {
  const s = String(text ?? "");
  if (quotesRe.test(s)) {
    return renderQuoted(s);
  }
  return [<code key="str" style={codeStyle}>{s}</code>];
};