import './style.css';

import { useEffect, useState } from 'react';

export default function CollapsibleText({ content, maxWordCount, defaultContent }: {content: string, maxWordCount: number, defaultContent: any}) {
  defaultContent = defaultContent || 'No text provided';
  const truncatedText = content.length ? `${content.split(' ').slice(0, maxWordCount).join(' ')} ...` : defaultContent;
  const [text, setText] = useState(truncatedText);
  const [expanded, setExpanded] = useState(false);
  const expandable = content.length > truncatedText.length;

  function toggle() {
    if (!expanded) {
      setText(content);
    } else {
      setText(truncatedText);
    }

    setExpanded(!expanded);
  }

  return (
    <>
      { expandable ?
        <div className={`collapsible-text ${expanded ? 'expanded' : 'collapsed'}`} onClick={toggle}>
          <p>{text}</p>
        </div>
      :
        <p>{text}</p>
      }
    </>
  )
}

CollapsibleText.defaultProps = {
  maxWordCount: 100,
  content: ''
}
