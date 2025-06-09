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
 * @param {string} title - ข้อความ
 * @param {string} icon - ไอคอน: 'warning', 'error', 'success', 'info', 'question'
 * @param {number} timer - ระยะเวลาที่แสดง (มิลลิวินาที)
 */
export const showToast = (title, icon = 'success', timer = 3000) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
  
  Toast.fire({
    icon,
    title
  });
};

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