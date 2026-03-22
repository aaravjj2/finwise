'use client';

import { marked } from 'marked';
import { useEffect, useState } from 'react';

interface LessonReaderProps {
  title: string;
  content: string;
}

export function LessonReader({ title, content }: LessonReaderProps): JSX.Element {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Configure marked
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    // Parse markdown to HTML
    const html = marked.parse(content);
    setHtmlContent(html as string);
  }, [content]);

  return (
    <article className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-800">
      <h1 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-white">{title}</h1>
      <div
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-a:text-primary-600 prose-li:text-neutral-700 dark:prose-headings:text-white dark:prose-p:text-neutral-300 dark:prose-li:text-neutral-300"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
