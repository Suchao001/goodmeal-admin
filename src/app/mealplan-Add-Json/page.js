'use client';
import { useState } from 'react';
import Layout from '../../components/Layout';

export default function MealPlanAddJson() {
  const [planName, setPlanName] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Parse JSON to validate format
      const parsedJson = JSON.parse(jsonInput);
      
      // Validate structure
      if (typeof parsedJson !== 'object') {
        throw new Error('JSON must be an object');
      }
      
      // Check if it has numbered days
      const dayNumbers = Object.keys(parsedJson);
      const validDays = dayNumbers.every(day => 
        /^\d+$/.test(day) && 
        parsedJson[day].meals &&
        typeof parsedJson[day].meals === 'object'
      );
      
      if (!validDays) {
        throw new Error('Invalid JSON structure. Expected numbered days with meals object.');
      }

      const requestData = {
        plan_name: planName,
        duration: duration || null,
        description: description || null,
        image: image || null,
        meal_data: parsedJson
      };

      const response = await fetch('/api/mealplan-add-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('Meal plan added successfully!');
        // Reset form
        setPlanName('');
        setDuration('');
        setDescription('');
        setImage('');
        setJsonInput('');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-4">เพิ่มแผนอาหารจาก JSON</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="ชื่อแผนอาหาร" value={planName} onChange={e => setPlanName(e.target.value)} required />
          <input className="w-full p-2 border rounded" placeholder="ระยะเวลา (วัน)" value={duration} onChange={e => setDuration(e.target.value)} required />
          <input className="w-full p-2 border rounded" placeholder="คำอธิบาย" value={description} onChange={e => setDescription(e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="URL รูปภาพ" value={image} onChange={e => setImage(e.target.value)} />
          <textarea className="w-full p-2 border rounded h-40" placeholder="วาง JSON ที่นี่" value={jsonInput} onChange={e => setJsonInput(e.target.value)} required />
          <button type="submit" disabled={isSaving} className="px-4 py-2 bg-green-600 text-white rounded">{isSaving ? 'กำลังบันทึก...' : 'บันทึกแผนอาหาร'}</button>
        </form>
      </div>
    </Layout>
  );
}
