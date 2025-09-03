import Swal from 'sweetalert2';

/**
 * แสดงกล่อง confirm ทั่วไป และส่งคืนผลการเลือก
 * @param {string} title - หัวข้อ
 * @param {string} text - ข้อความ
 * @param {string} icon - ไอคอน: 'warning', 'error', 'success', 'info', 'question'
 * @param {string} confirmButtonText - ข้อความปุ่มยืนยัน
 * @param {string} cancelButtonText - ข้อความปุ่มยกเลิก
 * @returns {Promise<boolean>} - true ถ้ากดยืนยัน, false ถ้ากดยกเลิก
 */
export const confirmAlert = async (
  title = 'คุณแน่ใจหรือไม่?',
  text = 'คุณต้องการดำเนินการนี้ใช่หรือไม่',
  icon = 'warning',
  confirmButtonText = 'ยืนยัน',
  cancelButtonText = 'ยกเลิก'
) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText,
    cancelButtonText,
  });
  
  return result.isConfirmed;
};

/**
 * แสดงกล่อง confirm แบบยืดหยุ่น (สำหรับใช้งานทั่วไป)
 * @param {Object} options - ตัวเลือกสำหรับการแสดงผล
 * @param {string} options.title - หัวข้อ
 * @param {string} options.text - ข้อความ
 * @param {string} options.icon - ไอคอน: 'warning', 'error', 'success', 'info', 'question'
 * @param {string} options.confirmButtonText - ข้อความปุ่มยืนยัน
 * @param {string} options.cancelButtonText - ข้อความปุ่มยกเลิก
 * @param {string} options.confirmButtonColor - สีปุ่มยืนยัน
 * @param {string} options.cancelButtonColor - สีปุ่มยกเลิก
 * @returns {Promise<boolean>} - true ถ้ากดยืนยัน, false ถ้ากดยกเลิก
 */
export const showConfirm = async (options = {}) => {
  const {
    title = 'คุณแน่ใจหรือไม่?',
    text = 'คุณต้องการดำเนินการนี้ใช่หรือไม่',
    icon = 'warning',
    confirmButtonText = 'ยืนยัน',
    cancelButtonText = 'ยกเลิก',
    confirmButtonColor = '#10b981', // emerald-500
    cancelButtonColor = '#ef4444'   // red-500
  } = options;

  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    customClass: {
      popup: 'rounded-2xl',
      confirmButton: 'rounded-xl px-6 py-3 font-medium',
      cancelButton: 'rounded-xl px-6 py-3 font-medium',
    }
  });
  
  return result.isConfirmed;
};

/**
 * แสดงกล่อง alert ทั่วไป
 * @param {string} title - หัวข้อ
 * @param {string} text - ข้อความ
 * @param {string} icon - ไอคอน: 'warning', 'error', 'success', 'info'
 */
export const showAlert = (title, text, icon = 'info') => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'ตกลง',
  });
};

/**
 * แสดง toast notification
 * @param {string|Object} titleOrOptions - ข้อความหรือตัวเลือก
 * @param {string} icon - ไอคอน: 'warning', 'error', 'success', 'info', 'question'
 * @param {number} timer - ระยะเวลาที่แสดง (มิลลิวินาที)
 */
export const showToast = (titleOrOptions, icon = 'success', timer = 3000) => {
  // Support object-based calling
  if (typeof titleOrOptions === 'object') {
    const { title, icon: objIcon = 'success', timer: objTimer = 3000 } = titleOrOptions;
    return showToast(title, objIcon, objTimer);
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: {
      popup: 'rounded-xl shadow-2xl border border-emerald-100',
    }
  });
  
  Toast.fire({
    icon,
    title: titleOrOptions
  });
};

// Create shorthand methods for showToast
showToast.success = (message, timer = 3000) => showToast(message, 'success', timer);
showToast.error = (message, timer = 4000) => showToast(message, 'error', timer);
showToast.warning = (message, timer = 3500) => showToast(message, 'warning', timer);
showToast.info = (message, timer = 3000) => showToast(message, 'info', timer);

/**
 * แสดงกล่องยืนยันการลบ
 * @returns {Promise<boolean>} - true ถ้ากดยืนยัน, false ถ้ากดยกเลิก
 */
export const confirmDelete = async () => {
  return confirmAlert(
    'ยืนยันการลบ?',
    'คุณไม่สามารถย้อนกลับได้หลังจากลบข้อมูลนี้แล้ว!',
    'warning',
    'ลบ',
    'ยกเลิก'
  );
};

/**
 * แสดงกล่องแจ้งเตือนการทำงานสำเร็จ
 * @param {string} message - ข้อความ
 */
export const showSuccess = (message = 'ดำเนินการเรียบร้อยแล้ว') => {
  return showAlert('สำเร็จ!', message, 'success');
};

/**
 * แสดงกล่องแจ้งเตือนข้อผิดพลาด
 * @param {string} message - ข้อความ
 */
export const showError = (message = 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง') => {
  return showAlert('ข้อผิดพลาด!', message, 'error');
};

/**
 * แสดง toast แบบสำเร็จ
 * @param {string} message - ข้อความ
 * @param {number} timer - ระยะเวลาที่แสดง (มิลลิวินาที)
 */
export const toastSuccess = (message, timer = 3000) => {
  return showToast(message, 'success', timer);
};

/**
 * แสดง toast แบบผิดพลาด
 * @param {string} message - ข้อความ
 * @param {number} timer - ระยะเวลาที่แสดง (มิลลิวินาที)
 */
export const toastError = (message, timer = 4000) => {
  return showToast(message, 'error', timer);
};

/**
 * แสดง toast แบบเตือน
 * @param {string} message - ข้อความ
 * @param {number} timer - ระยะเวลาที่แสดง (มิลลิวินาที)
 */
export const toastWarning = (message, timer = 3500) => {
  return showToast(message, 'warning', timer);
};

/**
 * แสดง toast แบบข้อมูล
 * @param {string} message - ข้อความ
 * @param {number} timer - ระยะเวลาที่แสดง (มิลลิวินาที)
 */
export const toastInfo = (message, timer = 3000) => {
  return showToast(message, 'info', timer);
};