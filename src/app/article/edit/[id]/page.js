'use client';
import { useRef } from 'react';
import Layout from '@/components/Layout';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import img1 from '@/images/food1.webp';

export default function EditArticle() {
  const editorRef = useRef(null);
  const router = useRouter();

  const saveArticle = (e) => {
    e.preventDefault();
    // Placeholder for save functionality
    console.log('Article saved');
    router.push('/article');
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">แก้ไขบทความ</h1>
        <form onSubmit={saveArticle}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">หัวข้อ</label>

              <input
                type="text"
                name="title"
                defaultValue="Sample Article"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">รูปภาพ</label>
              <Image
                src={img1}
                alt="Article image"
                width={200}
                height={150}
                className="rounded-lg"
              />
              <input
                type="file"
                name="image"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

                </input>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">วันที่</label>
              <input
                type="date"
                name="date"
                defaultValue="2023-10-01"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">สถานะ</label>
              <select
                name="status"
                defaultValue="เผยแพร่"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="เผยแพร่">เผยแพร่</option>
                <option value="รอตรวจสอบ">รอตรวจสอบ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">เนื้อหา</label>
              <Editor
                apiKey="9b6mmzjlczkbkeiiaqzo13km2nx3zt382p2onniczet1y12u"
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  plugins: [
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                    'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste',
                    'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect',
                    'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf',
                  ],
                  toolbar:
                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                  tinycomments_mode: 'embedded',
                  tinycomments_author: 'Author name',
                  mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                  ],
                  ai_request: (request, respondWith) =>
                    respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                }}
                initialValue="This is the content of the article."
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/article')}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}