export default function MarkdownRenderer({ html }) {
  return (
    <>
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <style>{`
        .article-body {
          max-width: 820px;
          margin: 0 auto;
        }

        .article-body h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: #F7F3ED;
          line-height: 1.25;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .article-body h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #F7F3ED;
          line-height: 1.3;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .article-body p {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.125rem;
          font-weight: 300;
          color: rgba(232, 224, 208, 0.75);
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }

        .article-body strong {
          color: #F7F3ED;
          font-weight: 500;
        }

        .article-body a {
          color: #8FAF9F;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .article-body a:hover {
          text-decoration: underline;
          opacity: 0.85;
        }

        .article-body ul,
        .article-body ol {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.125rem;
          font-weight: 300;
          color: rgba(232, 224, 208, 0.75);
          line-height: 1.8;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .article-body li {
          margin-bottom: 0.4rem;
        }
        .article-body li::marker {
          color: #8FAF9F;
        }

        .article-body blockquote {
          border-left: 3px solid #8FAF9F;
          margin: 2rem 0;
          padding: 1rem 1.5rem;
          background: rgba(143, 175, 159, 0.04);
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .article-body blockquote p {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.2rem;
          color: rgba(232, 224, 208, 0.6);
          margin-bottom: 0;
        }

        .article-body code {
          font-family: 'DM Mono', monospace;
          font-size: 0.9em;
          background: rgba(143, 175, 159, 0.1);
          color: #8FAF9F;
          padding: 0.15em 0.4em;
          border-radius: 4px;
        }

        .article-body pre {
          background: rgba(28, 28, 26, 0.8);
          border: 1px solid rgba(143, 175, 159, 0.1);
          border-radius: 0.75rem;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .article-body pre code {
          background: none;
          padding: 0;
          font-size: 0.875rem;
          color: rgba(232, 224, 208, 0.7);
          line-height: 1.6;
        }

        .article-body .table-scroll-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 1.5rem 0;
        }

        .article-body table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: rgba(232, 224, 208, 0.75);
        }
        .article-body th {
          text-align: left;
          font-weight: 500;
          color: #F7F3ED;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(143, 175, 159, 0.2);
          white-space: nowrap;
        }
        .article-body td {
          padding: 0.6rem 1rem;
          border-bottom: 1px solid rgba(143, 175, 159, 0.06);
        }

        .article-body img {
          width: 100%;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }

        .article-body hr {
          border: none;
          border-top: 1px solid rgba(143, 175, 159, 0.1);
          margin: 2.5rem 0;
        }
      `}</style>
    </>
  )
}
