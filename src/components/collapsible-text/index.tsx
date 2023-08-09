import './style.css';

import { useState } from 'react';

export default function CollapsibleText({ content, maxWordCount, defaultContent }: {content: string, maxWordCount: number, defaultContent: any}) {
  defaultContent = defaultContent || 'No text provided';
  // Limit our initial word count. Default is 100
  const truncatedText = content.length ? `${content.split(' ').slice(0, maxWordCount).join(' ')}` : defaultContent;
  // If our provided content is > 100 words, we can expand/collapse it
  const expandable = content.length > truncatedText.length;
  // We'll use "text" as our variable for populating the view
  const [text, setText] = useState(expandable ? `${truncatedText}...` : content || defaultContent);
  // And "expanded" will help us key general state side-effects
  const [expanded, setExpanded] = useState(false);
  
  function toggle() {
    if (!expanded) {
      setText(content);
    } else {
      // NOTE - we're adding the ellipsis here which 
      // makes our initial word count logic not too
      // annoyiong
      setText(truncatedText + '...');
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
