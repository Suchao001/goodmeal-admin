'use client';
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const ArticleEditor = forwardRef(({ initialValue = "Welcome to TinyMCE!", onContentChange }, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getContent: () => {
      return editorRef.current ? editorRef.current.getContent() : '';
    },
    setContent: (content) => {
      if (editorRef.current) {
        editorRef.current.setContent(content);
      }
    }
  }));

  const handleEditorChange = (content) => {
    if (onContentChange) {
      onContentChange(content);
    }
  };

  return (
    <Editor
      apiKey="9b6mmzjlczkbkeiiaqzo13km2nx3zt382p2onniczet1y12u"
      onInit={(_, editor) => (editorRef.current = editor)}
      onEditorChange={handleEditorChange}
      init={{
        plugins: [
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
        ],
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      initialValue={initialValue}
    />
  );
});

ArticleEditor.displayName = 'ArticleEditor';

export default ArticleEditor;
