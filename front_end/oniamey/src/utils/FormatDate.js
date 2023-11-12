function formatDate(inputDate) {
    const parts = inputDate.split('-');
    if (parts.length === 3) {
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        // Kiểm tra xem day, month và year có đúng định dạng hay không
        if (/^\d{1,2}$/.test(day) && /^\d{1,2}$/.test(month) && /^\d{4}$/.test(year)) {
            // Chuyển đổi sang định dạng "yyyy-MM-dd"
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
    }
    return null; // Trả về null nếu định dạng đầu vào không hợp lệ
}

export default formatDate;
