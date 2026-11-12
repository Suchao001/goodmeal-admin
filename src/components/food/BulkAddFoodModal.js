'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { showToast } from '@/lib/sweetAlert';

export default function BulkAddFoodModal({ isOpen, onClose, categories, onBulkAddFood }) {
    const [jsonText, setJsonText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    // Example JSON structure
    const exampleJson = `[
  {
    "name": "ข้าวผัดกุ้ง",
    "description": "ข้าวผัดกุ้งสด เสิร์ฟร้อนๆ",
    "ingredients": "ข้าว, กุ้ง, ไข่, หอมใหญ่, กระเทียม",
    "calories": 450,
    "protein": 25,
    "carbs": 60,
    "fat": 12,
    "fiber": 3,
    "sugar": 5,
    "sodium": 800,
    "price": 120,
    "serving": "1 จาน (350 กรัม)",
    "categories": ["อาหารจานเดียว", "อาหารทะเล"]
  },
  {
    "name": "สลัดผัก",
    "description": "สลัดผักสดใส่น้ำสลัดโยเกิร์ต",
    "ingredients": "ผักกาดหอม, มะเขือเทศ, แครอท, แตงกวา",
    "calories": 180,
    "protein": 8,
    "carbs": 20,
    "fat": 6,
    "fiber": 8,
    "sugar": 12,
    "sodium": 200,
    "price": 80,
    "serving": "1 ชาม (200 กรัม)",
    "categories": ["สลัด", "อาหารเพื่อสุขภาพ"]
  }
]`;

    if (!isOpen) return null;

    const handlePreview = () => {
        try {
            const parsed = JSON.parse(jsonText);
            if (!Array.isArray(parsed)) {
                showToast.error('JSON ต้องเป็น Array รูปแบบ []');
                return;
            }
            
            // Validate each food item
            const validatedData = parsed.map((item, index) => {
                if (!item.name) {
                    throw new Error(`รายการที่ ${index + 1}: ต้องมี name`);
                }
                if (!item.serving) {
                    throw new Error(`รายการที่ ${index + 1}: ต้องระบุ serving`);
                }
                return {
                    ...item,
                    calories: item.calories || 0,
                    protein: item.protein || 0,
                    carbs: item.carbs || 0,
                    fat: item.fat || 0,
                    fiber: item.fiber || 0,
                    sugar: item.sugar || 0,
                    sodium: item.sodium || 0,
                    price: item.price || 0,
                    serving: item.serving,
                    categories: item.categories || []
                };
            });

            setPreviewData(validatedData);
            setShowPreview(true);
            showToast.success(`พบข้อมูล ${validatedData.length} รายการ`);
        } catch (error) {
            showToast.error('JSON ไม่ถูกต้อง: ' + error.message);
        }
    };

    const handleSubmit = async () => {
        if (!previewData) {
            showToast.error('กรุณาตรวจสอบข้อมูลก่อน');
            return;
        }

        setIsLoading(true);
        try {
            let successCount = 0;
            let errorCount = 0;

            for (const foodData of previewData) {
                try {
                    // Map category names to IDs
                    const categoryIds = foodData.categories
                        .map(catName => {
                            const category = categories.find(cat => cat.name === catName);
                            return category ? category.id : null;
                        })
                        .filter(id => id !== null);

                    const dataToSend = {
                        ...foodData,
                        serving: foodData.serving?.trim() || '',
                        categories: categoryIds
                    };

                    const res = await fetch('/api/foods', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataToSend),
                    });

                    if (res.ok) {
                        successCount++;
                    } else {
                        errorCount++;
                        console.error(`Failed to add ${foodData.name}`);
                    }
                } catch (error) {
                    errorCount++;
                    console.error(`Error adding ${foodData.name}:`, error);
                }
            }

            if (successCount > 0) {
                showToast.success(`เพิ่มข้อมูลสำเร็จ ${successCount} รายการ`);
                if (onBulkAddFood) onBulkAddFood();
            }

            if (errorCount > 0) {
                showToast.error(`เพิ่มข้อมูลไม่สำเร็จ ${errorCount} รายการ`);
            }

            // Reset form
            setJsonText('');
            setPreviewData(null);
            setShowPreview(false);
            onClose();

        } catch (error) {
            showToast.error('เกิดข้อผิดพลาด: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-md w-full max-w-6xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-emerald-600 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Icon icon="heroicons:code-bracket-20-solid" className="text-2xl" />
                            <div>
                                <h2 className="text-xl font-bold">เพิ่มข้อมูลแบบ Bulk (Dev Mode)</h2>
                                <p className="text-emerald-100 text-sm">เพิ่มข้อมูลหลายรายการด้วย JSON</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                        >
                            <Icon icon="heroicons:x-mark-20-solid" className="text-xl" />
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* JSON Input */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <Icon icon="heroicons:document-text-20-solid" className="text-emerald-600" />
                                    JSON Data
                                </h3>
                                <button
                                    onClick={() => setJsonText(exampleJson)}
                                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                                >
                                    ใช้ตัวอย่าง
                                </button>
                            </div>
                            
                            <textarea
                                value={jsonText}
                                onChange={(e) => setJsonText(e.target.value)}
                                placeholder="วาง JSON array ที่นี่..."
                                className="w-full h-96 p-4 border border-gray-300 rounded-xl font-mono text-sm resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={handlePreview}
                                    disabled={!jsonText.trim()}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Icon icon="heroicons:eye-20-solid" />
                                    ตรวจสอบข้อมูล
                                </button>
                                
                                <button
                                    onClick={handleSubmit}
                                    disabled={!previewData || isLoading}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? (
                                        <Icon icon="heroicons:arrow-path-20-solid" className="animate-spin" />
                                    ) : (
                                        <Icon icon="heroicons:plus-20-solid" />
                                    )}
                                    {isLoading ? 'กำลังเพิ่มข้อมูล...' : 'เพิ่มข้อมูล'}
                                </button>
                            </div>
                        </div>

                        {/* Preview */}
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Icon icon="heroicons:eye-20-solid" className="text-emerald-600" />
                                ตัวอย่างข้อมูล
                                {previewData && (
                                    <span className="text-sm bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                        {previewData.length} รายการ
                                    </span>
                                )}
                            </h3>
                            
                            <div className="border border-gray-200 rounded-xl h-96 overflow-y-auto bg-gray-50">
                                {showPreview && previewData ? (
                                    <div className="p-4 space-y-3">
                                        {previewData.map((item, index) => (
                                            <div key={index} className="bg-white rounded-lg p-4 border">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                                            <span>🔥 {item.calories} cal</span>
                                                            <span>💰 {item.price} ฿</span>
                                                        </div>
                                                        {item.categories.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-2">
                                                                {item.categories.map((cat, catIndex) => (
                                                                    <span key={catIndex} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                                                        {cat}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                        #{index + 1}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        <div className="text-center">
                                            <Icon icon="heroicons:document-text-20-solid" className="text-4xl mx-auto mb-2 text-gray-400" />
                                            <p>กดปุ่ม "ตรวจสอบข้อมูล" เพื่อดูตัวอย่าง</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Format Guide */}
                    <div className="mt-6 bg-blue-50 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                            <Icon icon="heroicons:information-circle-20-solid" />
                            รูปแบบ JSON
                        </h4>
                        <div className="text-sm text-blue-700 space-y-1">
                            <p>• ต้องเป็น Array รูปแบบ <code className="bg-blue-100 px-1 rounded">[]</code></p>
                            <p>• ฟิลด์ที่จำเป็น: <code className="bg-blue-100 px-1 rounded">name</code></p>
                            <p>• ฟิลด์เสริม: description, ingredients, calories, protein, carbs, fat, fiber, sugar, sodium, price</p>
                            <p>• categories: Array ของชื่อประเภทอาหาร (ต้องมีในระบบแล้ว)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
