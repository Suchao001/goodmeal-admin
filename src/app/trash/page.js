'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import placeholderImage from '@/images/imgplaceholder.jpg';
import { showConfirm, showToast } from '@/lib/sweetAlert';

const TABS = [
  {
    key: 'foodmenu',
    label: 'เมนูอาหาร',
    icon: 'fluent:food-16-filled',
    description: 'จัดการเมนูอาหารที่ถูกย้ายลงถังขยะ',
  },
  {
    key: 'foodcategories',
    label: 'ประเภทอาหาร',
    icon: 'material-symbols:category',
    description: 'จัดการประเภทอาหารที่ถูกย้ายลงถังขยะ',
  },
  {
    key: 'mealplan',
    label: 'แผนอาหาร',
    icon: 'material-symbols:food-bank-rounded',
    description: 'จัดการแผนอาหารที่ถูกย้ายลงถังขยะ',
  },
];

const createInitialState = () => ({
  items: [],
  isLoading: false,
  hasError: false,
});

const buildFoodImageSrc = (img) => {
  if (!img) return null;
  if (img.startsWith('http') || img.startsWith('/')) return img;
  return `/foods/${img}`;
};

const formatNumber = (value) => new Intl.NumberFormat('th-TH').format(Number.isFinite(value) ? value : 0);

const formatThaiDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function TrashManagementPage() {
  const [activeTab, setActiveTab] = useState('foodmenu');
  const [foodState, setFoodState] = useState(() => createInitialState());
  const [categoryState, setCategoryState] = useState(() => createInitialState());
  const [planState, setPlanState] = useState(() => createInitialState());
  const [foodSearch, setFoodSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [planSearch, setPlanSearch] = useState('');
  const [selectedFoodIds, setSelectedFoodIds] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedPlanIds, setSelectedPlanIds] = useState([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  const loadFoods = useCallback(async () => {
    setFoodState((prev) => ({ ...prev, isLoading: true, hasError: false }));
    try {
      const response = await fetch('/api/foods/trash');
      if (!response.ok) {
        throw new Error('Failed to fetch deleted foods');
      }
      const data = await response.json();
      setFoodState({ items: data, isLoading: false, hasError: false });
      setSelectedFoodIds([]);
    } catch (error) {
      console.error('Error fetching deleted foods:', error);
      setFoodState((prev) => ({ ...prev, isLoading: false, hasError: true }));
      showToast.error('ไม่สามารถดึงข้อมูลเมนูในถังขยะได้');
    }
  }, []);

  const loadCategories = useCallback(async () => {
    setCategoryState((prev) => ({ ...prev, isLoading: true, hasError: false }));
    try {
      const response = await fetch('/api/foodcategories/trash');
      if (!response.ok) {
        throw new Error('Failed to fetch deleted categories');
      }
      const data = await response.json();
      setCategoryState({ items: data, isLoading: false, hasError: false });
      setSelectedCategoryIds([]);
    } catch (error) {
      console.error('Error fetching deleted categories:', error);
      setCategoryState((prev) => ({ ...prev, isLoading: false, hasError: true }));
      showToast.error('ไม่สามารถดึงข้อมูลประเภทอาหารในถังขยะได้');
    }
  }, []);

  const loadPlans = useCallback(async () => {
    setPlanState((prev) => ({ ...prev, isLoading: true, hasError: false }));
    try {
      const response = await fetch('/api/meal-plans/trash');
      if (!response.ok) {
        throw new Error('Failed to fetch deleted meal plans');
      }
      const data = await response.json();
      setPlanState({ items: data, isLoading: false, hasError: false });
      setSelectedPlanIds([]);
    } catch (error) {
      console.error('Error fetching deleted meal plans:', error);
      setPlanState((prev) => ({ ...prev, isLoading: false, hasError: true }));
      showToast.error('ไม่สามารถดึงข้อมูลแผนอาหารในถังขยะได้');
    }
  }, []);

  useEffect(() => {
    setIsBulkProcessing(false);
    setSelectedFoodIds([]);
    setSelectedCategoryIds([]);
    setSelectedPlanIds([]);

    if (activeTab === 'foodmenu') {
      loadFoods();
    } else if (activeTab === 'foodcategories') {
      loadCategories();
    } else if (activeTab === 'mealplan') {
      loadPlans();
    }
  }, [activeTab, loadFoods, loadCategories, loadPlans]);

  const filteredFoods = useMemo(() => {
    const term = foodSearch.trim().toLowerCase();
    if (!term) return foodState.items;
    return foodState.items.filter((food) => food.name?.toLowerCase().includes(term));
  }, [foodState.items, foodSearch]);

  const filteredCategories = useMemo(() => {
    const term = categorySearch.trim().toLowerCase();
    if (!term) return categoryState.items;
    return categoryState.items.filter((category) => category.name?.toLowerCase().includes(term));
  }, [categoryState.items, categorySearch]);

  const filteredPlans = useMemo(() => {
    const term = planSearch.trim().toLowerCase();
    if (!term) return planState.items;
    return planState.items.filter((plan) => plan.plan_name?.toLowerCase().includes(term));
  }, [planState.items, planSearch]);

  const foodCountByCategory = useMemo(() => {
    const categoryCount = new Map();
    filteredFoods.forEach((food) => {
      if (!food.categories || food.categories.length === 0) {
        categoryCount.set('ไม่ระบุหมวดหมู่', (categoryCount.get('ไม่ระบุหมวดหมู่') || 0) + 1);
        return;
      }
      food.categories.forEach((cat) => {
        categoryCount.set(cat.name, (categoryCount.get(cat.name) || 0) + 1);
      });
    });
    return Array.from(categoryCount.entries());
  }, [filteredFoods]);

  const selectedFilteredFoodIds = useMemo(
    () => selectedFoodIds.filter((id) => filteredFoods.some((food) => food.id === id)),
    [selectedFoodIds, filteredFoods]
  );

  const selectedFilteredCategoryIds = useMemo(
    () => selectedCategoryIds.filter((id) => filteredCategories.some((category) => category.id === id)),
    [selectedCategoryIds, filteredCategories]
  );

  const selectedFilteredPlanIds = useMemo(
    () => selectedPlanIds.filter((id) => filteredPlans.some((plan) => plan.plan_id === id)),
    [selectedPlanIds, filteredPlans]
  );

  const summaryCards = useMemo(() => {
    if (activeTab === 'foodmenu') {
      return [
        { key: 'foods', title: 'เมนูในถังขยะ', value: filteredFoods.length },
        { key: 'categories', title: 'หมวดหมู่ที่พบ', value: foodCountByCategory.length },
      ];
    }

    if (activeTab === 'foodcategories') {
      const totalLinkedFoods = filteredCategories.reduce((sum, category) => sum + (category.totalFoods || 0), 0);
      return [
        { key: 'categories', title: 'ประเภทในถังขยะ', value: filteredCategories.length },
        { key: 'linkedFoods', title: 'เมนูที่เกี่ยวข้อง', value: totalLinkedFoods },
      ];
    }

    if (activeTab === 'mealplan') {
      const totalDuration = filteredPlans.reduce((sum, plan) => sum + (Number(plan.duration) || 0), 0);
      return [
        { key: 'plans', title: 'แผนในถังขยะ', value: filteredPlans.length },
        { key: 'totalDuration', title: 'รวมระยะเวลา (วัน)', value: totalDuration },
      ];
    }

    return [];
  }, [activeTab, filteredFoods, foodCountByCategory.length, filteredCategories, filteredPlans]);

  const handleToggleFoodSelect = (id) => {
    setSelectedFoodIds((prev) =>
      prev.includes(id) ? prev.filter((foodId) => foodId !== id) : [...prev, id]
    );
  };

  const handleToggleAllFoods = () => {
    const filteredIds = filteredFoods.map((food) => food.id);
    const allSelected = filteredIds.every((id) => selectedFilteredFoodIds.includes(id));

    if (allSelected) {
      setSelectedFoodIds((prev) => prev.filter((id) => !filteredIds.includes(id)));
    } else {
      setSelectedFoodIds((prev) => Array.from(new Set([...prev, ...filteredIds])));
    }
  };

  const handleToggleCategorySelect = (id) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const handleToggleAllCategories = () => {
    const filteredIds = filteredCategories.map((category) => category.id);
    const allSelected = filteredIds.every((id) => selectedFilteredCategoryIds.includes(id));

    if (allSelected) {
      setSelectedCategoryIds((prev) => prev.filter((id) => !filteredIds.includes(id)));
    } else {
      setSelectedCategoryIds((prev) => Array.from(new Set([...prev, ...filteredIds])));
    }
  };

  const handleTogglePlanSelect = (id) => {
    setSelectedPlanIds((prev) =>
      prev.includes(id) ? prev.filter((planId) => planId !== id) : [...prev, id]
    );
  };

  const handleToggleAllPlans = () => {
    const filteredIds = filteredPlans.map((plan) => plan.plan_id);
    const allSelected = filteredIds.every((id) => selectedFilteredPlanIds.includes(id));

    if (allSelected) {
      setSelectedPlanIds((prev) => prev.filter((id) => !filteredIds.includes(id)));
    } else {
      setSelectedPlanIds((prev) => Array.from(new Set([...prev, ...filteredIds])));
    }
  };

  const handleRestoreFood = async (food) => {
    const confirmed = await showConfirm({
      title: 'กู้คืนเมนู?',
      text: `ต้องการกู้คืน "${food.name}" จากถังขยะหรือไม่?`,
      confirmButtonText: 'กู้คืน',
      cancelButtonText: 'ยกเลิก',
      icon: 'question',
    });

    if (!confirmed) return;

    try {
      const response = await fetch('/api/foods/trash', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: food.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Restore failed');
      }

      showToast.success('กู้คืนเมนูเรียบร้อยแล้ว');
      await loadFoods();
    } catch (error) {
      console.error('Restore error:', error);
      showToast.error('ไม่สามารถกู้คืนเมนูได้');
    }
  };

  const handleDeleteFood = async (food) => {
    const confirmed = await showConfirm({
      title: 'ลบถาวร?',
      text: `การลบ "${food.name}" จะไม่สามารถกู้คืนได้ คุณต้องการดำเนินการต่อหรือไม่?`,
      confirmButtonText: 'ลบถาวร',
      cancelButtonText: 'ยกเลิก',
      icon: 'warning',
      confirmButtonColor: '#dc2626',
    });

    if (!confirmed) return;

    try {
      const response = await fetch('/api/foods/trash', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: food.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Permanent delete failed');
      }

      showToast.success('ลบเมนูออกจากถังขยะถาวรแล้ว');
      await loadFoods();
    } catch (error) {
      console.error('Permanent delete error:', error);
      showToast.error('ไม่สามารถลบเมนูออกจากถังขยะได้');
    }
  };

  const handleBulkRestoreFoods = async () => {
    if (selectedFilteredFoodIds.length === 0) return;

    const confirmed = await showConfirm({
      title: 'กู้คืนหลายเมนู?',
      text: `ต้องการกู้คืนเมนูจำนวน ${selectedFilteredFoodIds.length} รายการหรือไม่?`,
      confirmButtonText: 'กู้คืนทั้งหมด',
      cancelButtonText: 'ยกเลิก',
      icon: 'question',
    });

    if (!confirmed) return;

    setIsBulkProcessing(true);
    try {
      for (const id of selectedFilteredFoodIds) {
        const response = await fetch('/api/foods/trash', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Restore failed');
        }
      }

      showToast.success(`กู้คืนเมนู ${selectedFilteredFoodIds.length} รายการเรียบร้อยแล้ว`);
      await loadFoods();
    } catch (error) {
      console.error('Bulk restore foods error:', error);
      showToast.error('ไม่สามารถกู้คืนเมนูทั้งหมดได้');
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleBulkDeleteFoods = async () => {
    if (selectedFilteredFoodIds.length === 0) return;

    const confirmed = await showConfirm({
      title: 'ลบเมนูถาวรหลายรายการ?',
      text: `การลบ ${selectedFilteredFoodIds.length} รายการจะไม่สามารถกู้คืนได้ ต้องการดำเนินการต่อหรือไม่?`,
      confirmButtonText: 'ลบถาวรทั้งหมด',
      cancelButtonText: 'ยกเลิก',
      icon: 'warning',
      confirmButtonColor: '#dc2626',
    });

    if (!confirmed) return;

    setIsBulkProcessing(true);
    try {
      for (const id of selectedFilteredFoodIds) {
        const response = await fetch('/api/foods/trash', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Permanent delete failed');
        }
      }

      showToast.success(`ลบเมนู ${selectedFilteredFoodIds.length} รายการออกจากถังขยะแล้ว`);
      await loadFoods();
    } catch (error) {
      console.error('Bulk delete foods error:', error);
      showToast.error('ไม่สามารถลบเมนูทั้งหมดออกจากถังขยะได้');
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleRestoreCategory = async (category) => {
    const confirmed = await showConfirm({
      title: 'กู้คืนประเภท?',
      text: `ต้องการกู้คืนประเภท "${category.name}" หรือไม่?`,
      confirmButtonText: 'กู้คืน',
      cancelButtonText: 'ยกเลิก',
      icon: 'question',
    });

    if (!confirmed) return;

    try {
      const response = await fetch('/api/foodcategories/trash', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: category.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Restore failed');
      }

      showToast.success('กู้คืนประเภทอาหารเรียบร้อยแล้ว');
      await loadCategories();
    } catch (error) {
      console.error('Restore category error:', error);
      showToast.error('ไม่สามารถกู้คืนประเภทอาหารได้');
    }
  };

  const handleDeleteCategory = async (category) => {
    const confirmed = await showConfirm({
      title: 'ลบประเภทถาวร?',
      text: `การลบประเภท "${category.name}" จะตัดการเชื่อมต่อกับเมนูทั้งหมด คุณต้องการดำเนินการต่อหรือไม่?`,
      confirmButtonText: 'ลบถาวร',
      cancelButtonText: 'ยกเลิก',
      icon: 'warning',
      confirmButtonColor: '#dc2626',
    });

    if (!confirmed) return;

    try {
      const response = await fetch('/api/foodcategories/trash', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: category.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Permanent delete failed');
      }

      showToast.success('ลบประเภทอาหารออกจากถังขยะถาวรแล้ว');
      await loadCategories();
    } catch (error) {
      console.error('Permanent delete category error:', error);
      showToast.error('ไม่สามารถลบประเภทอาหารจากถังขยะได้');
    }
  };

  const handleBulkRestoreCategories = async () => {
    if (selectedFilteredCategoryIds.length === 0) return;

    const confirmed = await showConfirm({
      title: 'กู้คืนหลายประเภท?',
      text: `ต้องการกู้คืนประเภทอาหารจำนวน ${selectedFilteredCategoryIds.length} รายการหรือไม่?`,
      confirmButtonText: 'กู้คืนทั้งหมด',
      cancelButtonText: 'ยกเลิก',
      icon: 'question',
    });

    if (!confirmed) return;

    setIsBulkProcessing(true);
    try {
      for (const id of selectedFilteredCategoryIds) {
        const response = await fetch('/api/foodcategories/trash', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Restore failed');
        }
      }

      showToast.success(`กู้คืนประเภทอาหาร ${selectedFilteredCategoryIds.length} รายการเรียบร้อยแล้ว`);
      await loadCategories();
    } catch (error) {
      console.error('Bulk restore categories error:', error);
      showToast.error('ไม่สามารถกู้คืนประเภทอาหารทั้งหมดได้');
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleBulkDeleteCategories = async () => {
    if (selectedFilteredCategoryIds.length === 0) return;

    const confirmed = await showConfirm({
      title: 'ลบประเภทอาหารถาวรหลายรายการ?',
      text: `การลบประเภทอาหาร ${selectedFilteredCategoryIds.length} รายการจะลบการเชื่อมต่อทั้งหมดและไม่สามารถกู้คืนได้ ต้องการดำเนินการต่อหรือไม่?`,
      confirmButtonText: 'ลบถาวรทั้งหมด',
      cancelButtonText: 'ยกเลิก',
      icon: 'warning',
      confirmButtonColor: '#dc2626',
    });

    if (!confirmed) return;

    setIsBulkProcessing(true);
    try {
      for (const id of selectedFilteredCategoryIds) {
        const response = await fetch('/api/foodcategories/trash', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Permanent delete failed');
        }
      }

      showToast.success(`ลบประเภทอาหาร ${selectedFilteredCategoryIds.length} รายการออกจากถังขยะแล้ว`);
      await loadCategories();
    } catch (error) {
      console.error('Bulk delete categories error:', error);
      showToast.error('ไม่สามารถลบประเภทอาหารทั้งหมดออกจากถังขยะได้');
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleRestorePlan = async (plan) => {
    const confirmed = await showConfirm({
      title: 'กู้คืนแผนอาหาร?',
      text: `ต้องการกู้คืน "${plan.plan_name}" หรือไม่?`,
      confirmButtonText: 'กู้คืน',
      cancelButtonText: 'ยกเลิก',
      icon: 'question',
    });

    if (!confirmed) return;

    try {
      const response = await fetch('/api/meal-plans/trash', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_id: plan.plan_id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Restore failed');
      }

      showToast.success('กู้คืนแผนอาหารเรียบร้อยแล้ว');
      await loadPlans();
    } catch (error) {
      console.error('Restore meal plan error:', error);
      showToast.error('ไม่สามารถกู้คืนแผนอาหารได้');
    }
  };

  const handleDeletePlan = async (plan) => {
    const confirmed = await showConfirm({
      title: 'ลบแผนถาวร?',
      text: `การลบ "${plan.plan_name}" จะลบรายละเอียดทั้งหมดและไม่สามารถกู้คืนได้ คุณต้องการดำเนินการต่อหรือไม่?`,
      confirmButtonText: 'ลบถาวร',
      cancelButtonText: 'ยกเลิก',
      icon: 'warning',
      confirmButtonColor: '#dc2626',
    });

    if (!confirmed) return;

    try {
      const response = await fetch('/api/meal-plans/trash', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_id: plan.plan_id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Permanent delete failed');
      }

      showToast.success('ลบแผนอาหารออกจากถังขยะถาวรแล้ว');
      await loadPlans();
    } catch (error) {
      console.error('Permanent delete meal plan error:', error);
      showToast.error('ไม่สามารถลบแผนอาหารจากถังขยะได้');
    }
  };

  const handleBulkRestorePlans = async () => {
    if (selectedFilteredPlanIds.length === 0) return;

    const confirmed = await showConfirm({
      title: 'กู้คืนหลายแผน?',
      text: `ต้องการกู้คืนแผนอาหารจำนวน ${selectedFilteredPlanIds.length} รายการหรือไม่?`,
      confirmButtonText: 'กู้คืนทั้งหมด',
      cancelButtonText: 'ยกเลิก',
      icon: 'question',
    });

    if (!confirmed) return;

    setIsBulkProcessing(true);
    try {
      for (const plan_id of selectedFilteredPlanIds) {
        const response = await fetch('/api/meal-plans/trash', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan_id }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Restore failed');
        }
      }

      showToast.success(`กู้คืนแผนอาหาร ${selectedFilteredPlanIds.length} รายการเรียบร้อยแล้ว`);
      await loadPlans();
    } catch (error) {
      console.error('Bulk restore meal plans error:', error);
      showToast.error('ไม่สามารถกู้คืนแผนอาหารทั้งหมดได้');
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleBulkDeletePlans = async () => {
    if (selectedFilteredPlanIds.length === 0) return;

    const confirmed = await showConfirm({
      title: 'ลบแผนอาหารถาวรหลายรายการ?',
      text: `การลบแผนอาหาร ${selectedFilteredPlanIds.length} รายการจะลบรายละเอียดทั้งหมดและไม่สามารถกู้คืนได้ ต้องการดำเนินการต่อหรือไม่?`,
      confirmButtonText: 'ลบถาวรทั้งหมด',
      cancelButtonText: 'ยกเลิก',
      icon: 'warning',
      confirmButtonColor: '#dc2626',
    });

    if (!confirmed) return;

    setIsBulkProcessing(true);
    try {
      for (const plan_id of selectedFilteredPlanIds) {
        const response = await fetch('/api/meal-plans/trash', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan_id }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Permanent delete failed');
        }
      }

      showToast.success(`ลบแผนอาหาร ${selectedFilteredPlanIds.length} รายการออกจากถังขยะแล้ว`);
      await loadPlans();
    } catch (error) {
      console.error('Bulk delete meal plans error:', error);
      showToast.error('ไม่สามารถลบแผนอาหารทั้งหมดออกจากถังขยะได้');
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const renderLoadingState = (message = 'กำลังโหลดข้อมูล...') => (
    <div className="py-20 flex flex-col items-center gap-4 text-emerald-600">
      <Icon icon="svg-spinners:180-ring" className="text-4xl" />
      <span className="font-medium">{message}</span>
    </div>
  );

  const renderErrorState = (message) => (
    <div className="py-16 text-center">
      <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-red-50 text-red-600">
        <Icon icon="heroicons:exclamation-triangle-20-solid" className="text-xl" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );

  const renderFoodTable = () => {
    if (foodState.isLoading) return renderLoadingState('กำลังโหลดเมนูอาหาร...');
    if (foodState.hasError) return renderErrorState('เกิดข้อผิดพลาดในการโหลดเมนูอาหาร');

    if (foodState.items.length === 0) {
      return (
        <div className="py-16 text-center">
          <div className="flex flex-col items-center gap-4 text-slate-500">
            <Icon icon="heroicons:trash-20-solid" className="text-4xl text-emerald-500/60" />
            <div className="text-lg font-semibold">ถังขยะว่างเปล่า</div>
            <div className="text-sm text-slate-400">ยังไม่มีเมนูที่ถูกย้ายมายังถังขยะ</div>
          </div>
        </div>
      );
    }

    if (filteredFoods.length === 0) {
      return (
        <div className="py-16 text-center">
          <div className="flex flex-col items-center gap-4 text-slate-500">
            <Icon icon="heroicons:magnifying-glass-20-solid" className="text-4xl text-emerald-500/60" />
            <div className="text-lg font-semibold">ไม่พบเมนูที่ต้องการ</div>
            <div className="text-sm text-slate-400">ลองค้นหาด้วยคำอื่นหรือเคลียร์ช่องค้นหา</div>
          </div>
        </div>
      );
    }

    const allSelected = filteredFoods.length > 0 && filteredFoods.every((food) => selectedFilteredFoodIds.includes(food.id));
    const hasSelection = selectedFilteredFoodIds.length > 0;

    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between rounded-2xl border border-emerald-100 bg-emerald-50/50 px-4 py-3">
          <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-700">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                checked={allSelected}
                onChange={handleToggleAllFoods}
              />
              <span>เลือกทั้งหมด ({selectedFilteredFoodIds.length}/{filteredFoods.length})</span>
            </label>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Icon icon="heroicons:magnifying-glass-20-solid" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                type="text"
                value={foodSearch}
                onChange={(e) => setFoodSearch(e.target.value)}
                placeholder="ค้นหาชื่อเมนู"
                className="w-full rounded-xl border border-emerald-200 bg-white/90 pl-10 pr-4 py-2.5 text-sm text-emerald-800 placeholder:text-emerald-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleBulkRestoreFoods}
                disabled={!hasSelection || isBulkProcessing}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  !hasSelection || isBulkProcessing
                    ? 'bg-emerald-200 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md'
                }`}
              >
                <Icon icon="heroicons:arrow-uturn-left-20-solid" className="text-base" />
                กู้คืนที่เลือก
              </button>
              <button
                type="button"
                onClick={handleBulkDeleteFoods}
                disabled={!hasSelection || isBulkProcessing}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  !hasSelection || isBulkProcessing
                    ? 'bg-red-200 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white shadow-md'
                }`}
              >
                <Icon icon="heroicons:trash-20-solid" className="text-base" />
                ลบถาวรที่เลือก
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-emerald-50/60 text-emerald-800 text-sm font-semibold uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4 w-12 text-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                    checked={allSelected}
                    onChange={handleToggleAllFoods}
                  />
                </th>
                <th className="px-6 py-4">ลำดับ</th>
                <th className="px-6 py-4">เมนูอาหาร</th>
                <th className="px-6 py-4">รูปภาพ</th>
                <th className="px-6 py-4">หมวดหมู่</th>
                <th className="px-6 py-4">แคลอรี่</th>
                <th className="px-6 py-4 text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100/60">
              {filteredFoods.map((food, index) => {
                const checked = selectedFilteredFoodIds.includes(food.id);
                return (
                  <tr key={food.id} className={`transition-colors duration-150 ${checked ? 'bg-emerald-100/40' : 'hover:bg-emerald-50/40'}`}>
                    <td className="px-6 py-5 text-center">
                      <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                        checked={checked}
                        onChange={() => handleToggleFoodSelect(food.id)}
                      />
                    </td>
                    <td className="px-6 py-5 font-semibold text-emerald-600">{index + 1}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-slate-800 text-lg">{food.name}</span>
                        {food.ingredients && (
                          <span className="text-sm text-slate-500 line-clamp-2">{food.ingredients}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50/50">
                        <Image
                          src={buildFoodImageSrc(food.img) || placeholderImage}
                          alt={food.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {food.categories && food.categories.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {food.categories.map((category) => (
                            <span
                              key={`${food.id}-${category.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"
                            >
                              <Icon icon="material-symbols:category" className="text-sm" />
                              {category.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">ไม่ระบุ</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold text-emerald-600 bg-emerald-50">
                        <Icon icon="heroicons:fire-20-solid" className="text-base" />
                        {food.calories || 0} kcal
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleRestoreFood(food)}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                          disabled={isBulkProcessing}
                        >
                          <Icon icon="heroicons:arrow-uturn-left-20-solid" className="text-base" />
                          กู้คืน
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteFood(food)}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white text-sm font-medium shadow-lg shadow-red-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                          disabled={isBulkProcessing}
                        >
                          <Icon icon="heroicons:trash-20-solid" className="text-base" />
                          ลบถาวร
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderCategoryTable = () => {
    if (categoryState.isLoading) return renderLoadingState('กำลังโหลดประเภทอาหาร...');
    if (categoryState.hasError) return renderErrorState('เกิดข้อผิดพลาดในการโหลดประเภทอาหาร');

    if (categoryState.items.length === 0) {
      return (
        <div className="py-16 text-center">
          <div className="flex flex-col items-center gap-4 text-slate-500">
            <Icon icon="material-symbols:category" className="text-4xl text-emerald-500/60" />
            <div className="text-lg font-semibold">ยังไม่มีประเภทอาหารในถังขยะ</div>
            <div className="text-sm text-slate-400">เมื่อมีการลบประเภทอาหาร จะปรากฏในหน้านี้เพื่อให้กู้คืนหรือจัดการต่อ</div>
          </div>
        </div>
      );
    }

    if (filteredCategories.length === 0) {
      return (
        <div className="py-16 text-center">
          <div className="flex flex-col items-center gap-4 text-slate-500">
            <Icon icon="heroicons:magnifying-glass-20-solid" className="text-4xl text-emerald-500/60" />
            <div className="text-lg font-semibold">ไม่พบประเภทอาหารที่ต้องการ</div>
            <div className="text-sm text-slate-400">ลองค้นหาด้วยคำอื่นหรือเคลียร์ช่องค้นหา</div>
          </div>
        </div>
      );
    }

    const allSelected = filteredCategories.length > 0 && filteredCategories.every((category) => selectedFilteredCategoryIds.includes(category.id));
    const hasSelection = selectedFilteredCategoryIds.length > 0;

    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between rounded-2xl border border-emerald-100 bg-emerald-50/50 px-4 py-3">
          <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-700">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                checked={allSelected}
                onChange={handleToggleAllCategories}
              />
              <span>เลือกทั้งหมด ({selectedFilteredCategoryIds.length}/{filteredCategories.length})</span>
            </label>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Icon icon="heroicons:magnifying-glass-20-solid" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="ค้นหาชื่อประเภท"
                className="w-full rounded-xl border border-emerald-200 bg-white/90 pl-10 pr-4 py-2.5 text-sm text-emerald-800 placeholder:text-emerald-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleBulkRestoreCategories}
                disabled={!hasSelection || isBulkProcessing}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  !hasSelection || isBulkProcessing
                    ? 'bg-emerald-200 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md'
                }`}
              >
                <Icon icon="heroicons:arrow-uturn-left-20-solid" className="text-base" />
                กู้คืนที่เลือก
              </button>
              <button
                type="button"
                onClick={handleBulkDeleteCategories}
                disabled={!hasSelection || isBulkProcessing}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  !hasSelection || isBulkProcessing
                    ? 'bg-red-200 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white shadow-md'
                }`}
              >
                <Icon icon="heroicons:trash-20-solid" className="text-base" />
                ลบถาวรที่เลือก
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-emerald-50/60 text-emerald-800 text-sm font-semibold uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4 w-12 text-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                    checked={allSelected}
                    onChange={handleToggleAllCategories}
                  />
                </th>
                <th className="px-6 py-4">ลำดับ</th>
                <th className="px-6 py-4">ประเภทอาหาร</th>
                <th className="px-6 py-4">จำนวนเมนูที่เกี่ยวข้อง</th>
                <th className="px-6 py-4 text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100/60">
              {filteredCategories.map((category, index) => {
                const checked = selectedFilteredCategoryIds.includes(category.id);
                return (
                  <tr key={category.id} className={`transition-colors duration-150 ${checked ? 'bg-emerald-100/40' : 'hover:bg-emerald-50/40'}`}>
                    <td className="px-6 py-5 text-center">
                      <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                        checked={checked}
                        onChange={() => handleToggleCategorySelect(category.id)}
                      />
                    </td>
                    <td className="px-6 py-5 font-semibold text-emerald-600">{index + 1}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-sm">
                          <Icon icon="material-symbols:category" className="text-lg" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-lg">{category.name}</div>
                          <div className="text-xs text-slate-500 mt-1">รวม {formatNumber(category.totalFoods)} เมนู</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          <Icon icon="heroicons:check-circle-20-solid" className="text-sm" />
                          ใช้งาน {formatNumber(category.activeFoods)}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                          <Icon icon="heroicons:archive-box-20-solid" className="text-sm" />
                          อยู่ในถังขยะ {formatNumber(category.deletedFoods)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleRestoreCategory(category)}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                          disabled={isBulkProcessing}
                        >
                          <Icon icon="heroicons:arrow-uturn-left-20-solid" className="text-base" />
                          กู้คืน
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(category)}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white text-sm font-medium shadow-lg shadow-red-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                          disabled={isBulkProcessing}
                        >
                          <Icon icon="heroicons:trash-20-solid" className="text-base" />
                          ลบถาวร
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderMealPlanTable = () => {
    if (planState.isLoading) return renderLoadingState('กำลังโหลดแผนอาหาร...');
    if (planState.hasError) return renderErrorState('เกิดข้อผิดพลาดในการโหลดแผนอาหาร');

    if (planState.items.length === 0) {
      return (
        <div className="py-16 text-center">
          <div className="flex flex-col items-center gap-4 text-slate-500">
            <Icon icon="material-symbols:food-bank-rounded" className="text-4xl text-emerald-500/60" />
            <div className="text-lg font-semibold">ยังไม่มีแผนอาหารในถังขยะ</div>
            <div className="text-sm text-slate-400">เมื่อย้ายแผนอาหารมาถังขยะ จะสามารถกู้คืนหรือเลือกเพื่อลบถาวรได้ที่นี่</div>
          </div>
        </div>
      );
    }

    if (filteredPlans.length === 0) {
      return (
        <div className="py-16 text-center">
          <div className="flex flex-col items-center gap-4 text-slate-500">
            <Icon icon="heroicons:magnifying-glass-20-solid" className="text-4xl text-emerald-500/60" />
            <div className="text-lg font-semibold">ไม่พบแผนอาหารที่ต้องการ</div>
            <div className="text-sm text-slate-400">ลองค้นหาด้วยคำอื่นหรือเคลียร์ช่องค้นหา</div>
          </div>
        </div>
      );
    }

    const allSelected = filteredPlans.length > 0 && filteredPlans.every((plan) => selectedFilteredPlanIds.includes(plan.plan_id));
    const hasSelection = selectedFilteredPlanIds.length > 0;

    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between rounded-2xl border border-emerald-100 bg-emerald-50/50 px-4 py-3">
          <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-700">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                checked={allSelected}
                onChange={handleToggleAllPlans}
              />
              <span>เลือกทั้งหมด ({selectedFilteredPlanIds.length}/{filteredPlans.length})</span>
            </label>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Icon icon="heroicons:magnifying-glass-20-solid" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                type="text"
                value={planSearch}
                onChange={(e) => setPlanSearch(e.target.value)}
                placeholder="ค้นหาชื่อแผนอาหาร"
                className="w-full rounded-xl border border-emerald-200 bg-white/90 pl-10 pr-4 py-2.5 text-sm text-emerald-800 placeholder:text-emerald-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleBulkRestorePlans}
                disabled={!hasSelection || isBulkProcessing}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  !hasSelection || isBulkProcessing
                    ? 'bg-emerald-200 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md'
                }`}
              >
                <Icon icon="heroicons:arrow-uturn-left-20-solid" className="text-base" />
                กู้คืนที่เลือก
              </button>
              <button
                type="button"
                onClick={handleBulkDeletePlans}
                disabled={!hasSelection || isBulkProcessing}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  !hasSelection || isBulkProcessing
                    ? 'bg-red-200 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white shadow-md'
                }`}
              >
                <Icon icon="heroicons:trash-20-solid" className="text-base" />
                ลบถาวรที่เลือก
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-emerald-50/60 text-emerald-800 text-sm font-semibold uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4 w-12 text-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                    checked={allSelected}
                    onChange={handleToggleAllPlans}
                  />
                </th>
                <th className="px-6 py-4">ลำดับ</th>
                <th className="px-6 py-4">แผนอาหาร</th>
                <th className="px-6 py-4">รายละเอียด</th>
                <th className="px-6 py-4">รูปภาพ</th>
                <th className="px-6 py-4 text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100/60">
              {filteredPlans.map((plan, index) => {
                const checked = selectedFilteredPlanIds.includes(plan.plan_id);
                return (
                  <tr key={plan.plan_id} className={`transition-colors duration-150 ${checked ? 'bg-emerald-100/40' : 'hover:bg-emerald-50/40'}`}>
                    <td className="px-6 py-5 text-center">
                      <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                        checked={checked}
                        onChange={() => handleTogglePlanSelect(plan.plan_id)}
                      />
                    </td>
                    <td className="px-6 py-5 font-semibold text-emerald-600">{index + 1}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-slate-800 text-lg">{plan.plan_name}</span>
                        <span className="text-xs text-slate-500">สร้างเมื่อ {formatThaiDate(plan.created_at)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-600 bg-emerald-50">
                          <Icon icon="heroicons:calendar-days-20-solid" className="text-sm" />
                          ระยะเวลา {plan.duration ? `${formatNumber(Number(plan.duration))} วัน` : 'ไม่ระบุ'}
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {plan.description || 'ไม่มีคำอธิบาย'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="w-24 h-20 rounded-2xl overflow-hidden border border-emerald-100 bg-emerald-50/50">
                        {plan.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={plan.image}
                            alt={plan.plan_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Image
                            src={placeholderImage}
                            alt={plan.plan_name}
                            width={96}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleRestorePlan(plan)}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                          disabled={isBulkProcessing}
                        >
                          <Icon icon="heroicons:arrow-uturn-left-20-solid" className="text-base" />
                          กู้คืน
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePlan(plan)}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white text-sm font-medium shadow-lg shadow-red-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                          disabled={isBulkProcessing}
                        >
                          <Icon icon="heroicons:trash-20-solid" className="text-base" />
                          ลบถาวร
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-cyan-50/30 -m-6 p-6">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-teal-600/5 to-cyan-600/5 rounded-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-emerald-100/60 shadow-xl shadow-emerald-900/5 px-8 py-10 overflow-hidden">
            <div className="flex flex-wrap lg:flex-nowrap gap-8 items-center">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium shadow-sm">
                  <Icon icon="heroicons:trash-20-solid" className="text-base" />
                  ถังขยะระบบ
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-black text-emerald-800 tracking-tight flex items-center gap-3">
                    <span>จัดการถังขยะ</span>
                  </h1>
                  <p className="mt-3 text-emerald-700/70 leading-relaxed max-w-2xl">
                    ตรวจสอบและจัดการข้อมูลที่ถูกย้ายมายังถังขยะ สามารถกู้คืนรายการที่ต้องการหรือเลือกลบถาวรเพื่อเพิ่มพื้นที่จัดเก็บได้
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
                {summaryCards.map((card) => (
                  <div key={card.key} className="bg-white/80 backdrop-blur rounded-2xl border border-emerald-100/60 shadow-sm px-6 py-4">
                    <div className="text-sm text-emerald-500 font-semibold uppercase tracking-wide">{card.title}</div>
                    <div className="mt-2 text-3xl font-bold text-emerald-700">{formatNumber(card.value)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-emerald-100/60 shadow-xl shadow-emerald-900/5">
          <div className="border-b border-emerald-100/60 px-6 pt-6">
            <div className="flex flex-wrap gap-3">
              {TABS.map((tab) => {
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                      active
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/20'
                        : 'bg-white text-emerald-700 border border-emerald-100 hover:border-emerald-200 hover:bg-emerald-50/80 shadow-sm'
                    }`}
                  >
                    <Icon icon={tab.icon} className="text-lg" />
                    <span>{tab.label}</span>
                    {active && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 mb-6 text-sm text-emerald-600/80 flex items-center gap-2">
              <Icon icon="heroicons:information-circle-20-solid" className="text-lg" />
              {TABS.find((tab) => tab.key === activeTab)?.description}
            </p>
          </div>

          <div className="p-6">
            {activeTab === 'foodmenu' && renderFoodTable()}
            {activeTab === 'foodcategories' && renderCategoryTable()}
            {activeTab === 'mealplan' && renderMealPlanTable()}
          </div>
        </div>
      </div>
    </Layout>
  );
}
