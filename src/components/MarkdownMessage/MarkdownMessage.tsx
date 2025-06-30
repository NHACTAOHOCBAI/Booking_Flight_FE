import React from 'react'

interface MarkdownMessageProps {
  content: string
  className?: string
}

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content, className = '' }) => {
  // Simple markdown parsing function
  const parseMarkdown = (text: string): React.ReactElement => {
    const lines = text.split('\n')
    const elements: React.ReactElement[] = []
    let listItems: string[] = []
    let inCodeBlock = false
    let codeBlockContent: string[] = []

    const flushListItems = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside mb-2 space-y-1">
            {listItems.map((item, index) => (
              <li key={index} className="text-sm">
                {parseInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        )
        listItems = []
      }
    }

    const flushCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <pre key={`code-${elements.length}`} className="bg-gray-100 rounded-md p-3 my-2 overflow-x-auto">
            <code className="text-sm font-mono">
              {codeBlockContent.join('\n')}
            </code>
          </pre>
        )
        codeBlockContent = []
      }
    }

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock()
          inCodeBlock = false
        } else {
          flushListItems()
          inCodeBlock = true
        }
        return
      }

      if (inCodeBlock) {
        codeBlockContent.push(line)
        return
      }

      // Handle list items
      if (line.match(/^[\s]*[-*+]\s+/)) {
        const item = line.replace(/^[\s]*[-*+]\s+/, '')
        listItems.push(item)
        return
      }

      // Flush any pending list items
      flushListItems()

      // Handle empty lines
      if (line.trim() === '') {
        if (elements.length > 0) {
          elements.push(<br key={`br-${elements.length}`} />)
        }
        return
      }

      // Handle headings
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${index}`} className="text-sm font-bold mb-1 text-gray-900">
            {parseInlineMarkdown(line.substring(4))}
          </h3>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${index}`} className="text-base font-bold mb-2 text-gray-900">
            {parseInlineMarkdown(line.substring(3))}
          </h2>
        )
      } else if (line.startsWith('# ')) {
        elements.push(
          <h1 key={`h1-${index}`} className="text-lg font-bold mb-2 text-gray-900">
            {parseInlineMarkdown(line.substring(2))}
          </h1>
        )
      } else {
        // Regular paragraph
        elements.push(
          <p key={`p-${index}`} className="mb-2 last:mb-0">
            {parseInlineMarkdown(line)}
          </p>
        )
      }
    })

    // Flush any remaining items
    flushListItems()
    flushCodeBlock()

    return <>{elements}</>
  }

  // Parse inline markdown (bold, italic, code, links)
  const parseInlineMarkdown = (text: string): React.ReactNode => {
    // Handle inline code first
    const parts = text.split(/(`[^`]+`)/)
    const result: React.ReactNode[] = []

    parts.forEach((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        result.push(
          <code key={index} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
            {part.slice(1, -1)}
          </code>
        )
      } else {
        // Handle bold text
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g)
        boldParts.forEach((boldPart, boldIndex) => {
          if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
            result.push(
              <strong key={`${index}-${boldIndex}`} className="font-semibold">
                {boldPart.slice(2, -2)}
              </strong>
            )
          } else {
            // Handle italic text
            const italicParts = boldPart.split(/(\*[^*]+\*)/g)
            italicParts.forEach((italicPart, italicIndex) => {
              if (italicPart.startsWith('*') && italicPart.endsWith('*') && !italicPart.includes('**')) {
                result.push(
                  <em key={`${index}-${boldIndex}-${italicIndex}`} className="italic">
                    {italicPart.slice(1, -1)}
                  </em>
                )
              } else {
                // Handle links
                const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
                const linkParts = italicPart.split(linkRegex)
                
                for (let i = 0; i < linkParts.length; i += 3) {
                  if (linkParts[i]) {
                    result.push(linkParts[i])
                  }
                  if (linkParts[i + 1] && linkParts[i + 2]) {
                    result.push(
                      <a
                        key={`${index}-${boldIndex}-${italicIndex}-${i}`}
                        href={linkParts[i + 2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {linkParts[i + 1]}
                      </a>
                    )
                  }
                }
              }
            })
          }
        })
      }
    })

    return result.length > 0 ? <>{result}</> : text
  }

  return (
    <div className={`markdown-content ${className}`}>
      <div className="text-sm leading-relaxed">
        {parseMarkdown(content)}
      </div>
    </div>
  )
}

export default MarkdownMessage
