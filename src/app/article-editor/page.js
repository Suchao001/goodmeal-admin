'use client';
import React, { useRef } from 'react';
import Layout from '@/components/Layout';
import { ArticleEditor } from '@/components/article';

export default function ArticleEditorPage() {
  const editorRef = useRef(null);

  const exportContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      alert(content);
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Article Editor</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <ArticleEditor ref={editorRef} />
          <button
            onClick={exportContent}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Export Content
          </button>
        </div>
      </div>
    </Layout>
  );
}
