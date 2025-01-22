'use client';
import Layout from "@/components/Layout";
import { useState } from 'react';
import  imageUrl  from '../../images/imgplaceholder.jpg';
import Image from "next/image";


export default function MenuManagement() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

const categories = [
  "อาหารไทย",
  "อาหารตะวันตก",
  "อาหารญี่ปุ่น",
  "อาหารจีน",
  "อาหารเกาหลี",
  "อาหารมังสวิรัติ",
  "อาหารคลีน",
  "อาหารเพื่อสุขภาพ",
  "อาหารจานเดียว",
  "อาหารว่างและของหวาน",
  "อาหารทะเล",
  "อาหารฟิวชัน",
  "อาหารฮาลาล",
  "อาหารสำหรับเด็ก",
  "อาหารพื้นเมืองหรืออาหารท้องถิ่น",
  "อาหารแคลอรี่ต่ำ",
  "อาหารคีโต",
  "อาหารวีแกน",
  "อาหารออร์แกนิก",
  "อาหารฟาสต์ฟู้ด",
  "อาหารแช่แข็งหรืออาหารพร้อมทาน",
  "อาหารสำหรับผู้ป่วยหรืออาหารทางการแพทย์",
  "อาหารนานาชาติ",
  "อาหารพื้นบ้านไทย",
  "อาหารเสริมหรืออาหารเสริมพลังงาน",
];
const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };
  
  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

const openAddModal = () => {
  setIsAddModalOpen(true);
};

const closeAddModal = () => {
  setIsAddModalOpen(false);
};

const handleAddDish = () => {
  // เพิ่มเมนูอาหารใหม่ (ตัวอย่างเท่านั้น)
  const newDish = {
    id: dishes.length + 1,
    name: "เมนูใหม่",
    ingredients: "ส่วนผสมใหม่",
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    image: imageUrl,
  };
  setDishes([...dishes, newDish]);
  closeAddModal();
};
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: 'ผัดไทย',
      ingredients: 'เส้นจันท์, ไข่, กุ้ง, ถั่วงอก',
      calories: 400,
      carbohydrates: 50,
      protein: 15,
      fat: 10,
      image: imageUrl,
    },
    {
      id: 2,
      name: 'ต้มยำกุ้ง',
      ingredients: 'กุ้ง, ข่า, ตะไคร้, ใบมะกรูด',
      calories: 300,
      carbohydrates: 20,
      protein: 25,
      fat: 8,
      image:imageUrl,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const openModal = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  const handleSave = () => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.id === selectedDish.id ? { ...selectedDish } : dish
      )
    );
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedDish({ ...selectedDish, [name]: value });
  };

  return (
    <Layout>
    <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">การจัดการเมนูอาหาร</h1>
      <button onClick={openAddModal} className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
    + เพิ่มเมนูอาหารใหม่
  </button>
  </div>
      <div className="my-3 flex gap-4">
      <input
    type="text"
    placeholder="ค้นหาเมนูอาหาร..."
    className="w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  />
    <div className="my-3 flex justify-between items-center">
  
  <div className="flex space-x-4">
    <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      {categories.map((category) => (
        <option key={category} value={category}>
            {category}
        </option>
        ))}
    </select>
    <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="">แคลอรี่</option>
      <option value="low">น้อยกว่า 300 kcal</option>
      <option value="medium">300-500 kcal</option>
      <option value="high">มากกว่า 500 kcal</option>
    </select>
  </div>
  
</div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">ลำดับ</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">อาหาร</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">รูปภาพ</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">แคลอรี่</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dishes.map((dish, index) => (
              <tr key={dish.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{dish.name}</td>
                <td className="px-6 py-4 text-sm">
                  <Image src={dish.image} alt={dish.name} className="w-16 h-16 rounded-lg" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{dish.calories}</td>
                <td className="px-6 py-4 text-sm ">
                  <button
                    onClick={() => openModal(dish)}
                    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  >
                    แก้ไข
                  </button>
                  <button
                    
                    className="px-4 py-2 mx-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">แก้ไขเมนูอาหาร</h2>

            <div className="mb-4">
              <label className="block text-sm mb-2">ชื่ออาหาร</label>
              <input
                type="text"
                name="name"
                value={selectedDish.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">ส่วนผสม</label>
              <textarea
                name="ingredients"
                value={selectedDish.ingredients}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="3"
              ></textarea>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2">แคลอรี่</label>
                <input
                  type="number"
                  name="calories"
                  value={selectedDish.calories}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">คาร์โบไฮเดรต</label>
                <input
                  type="number"
                  name="carbohydrates"
                  value={selectedDish.carbohydrates}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">โปรตีน</label>
                <input
                  type="number"
                  name="protein"
                  value={selectedDish.protein}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">ไขมัน</label>
                <input
                  type="number"
                  name="fat"
                  value={selectedDish.fat}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Image</label>
                <Image
                    src={imageUrl}
                    alt="Image"
                    className="w-16 h-16 rounded-lg"
                />
                <input
                    type="file"
                    accept="image/*" // รับเฉพาะไฟล์รูปภาพ
                    onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                        setImageUrl(reader.result);
                        };
                        reader.readAsDataURL(file);
                    }
                    }}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    {isAddModalOpen && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 className="text-lg font-bold mb-4">เพิ่มเมนูอาหารใหม่</h2>

      {/* ชื่ออาหาร */}
      <div className="mb-4">
        <label className="block text-sm mb-2">ชื่ออาหาร</label>
        <input
          type="text"
          name="name"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* ส่วนผสม */}
      <div className="mb-4">
        <label className="block text-sm mb-2">ส่วนผสม</label>
        <textarea
          name="ingredients"
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows="3"
        ></textarea>
      </div>

      {/* ประเภทอาหาร */}
      <div className="mb-4">
        <label className="block text-sm mb-2">ประเภทอาหาร</label>
        <div className="relative">
          <button
            onClick={toggleCategoryDropdown}
            className="w-full p-2 border border-gray-300 rounded-lg text-left flex justify-between items-center"
          >
            <span>
              {selectedCategories.length > 0
                ? selectedCategories.join(", ")
                : "เลือกประเภทอาหาร"}
            </span>
            <span className="text-gray-500">+</span>
          </button>
          {isCategoryDropdownOpen && (
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`p-2 hover:bg-gray-100 cursor-pointer ${
                  selectedCategories.includes(category) ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                {category}
              </div>
            ))}
          </div>
          )}
        </div>
      </div>

      {/* แคลอรี่และสารอาหาร */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-2">แคลอรี่</label>
          <input
            type="number"
            name="calories"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">คาร์โบไฮเดรต</label>
          <input
            type="number"
            name="carbohydrates"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">โปรตีน</label>
          <input
            type="number"
            name="protein"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">ไขมัน</label>
          <input
            type="number"
            name="fat"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* รูปภาพ */}
      <div className="mb-4">
        <label className="block text-sm mb-2">รูปภาพ</label>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        />
      </div>

      {/* ปุ่มยกเลิกและบันทึก */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={closeAddModal}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          ยกเลิก
        </button>
        <button
          onClick={handleAddDish}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          บันทึก
        </button>
      </div>
    </div>
  </div>
)}
    </Layout>
  );
}
