'use client';

import { useState, ChangeEvent } from "react";
import type { StaticImageData } from "next/image";
import bgImage from '../image/background_new.jpg';
import employeesData from '../data/Asian_Holding.json';

export interface Employee {
    id: string;
    name: string;
    image: string | StaticImageData;
    department: string;
    position: string;
    status?: string;
}

export interface FilterState {
    name: string;
    department: string;
    position: string;
}

/**
 * Chuẩn hóa tiếng Việt: loại bỏ dấu thanh, chuyển về chữ thường
 */
export const normalizeStr = (str: string): string => {
    if (!str) return "";
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "d")
        .trim();
};

/**
 * Tạo các biến thể tìm kiếm (hỗ trợ kiểu gõ VNI: nhan2 -> nhan, Telex, không dấu)
 */
export const getSearchVariants = (raw: string): string[] => {
    if (!raw) return [];
    const lower = raw.toLowerCase().trim();
    const normalized = normalizeStr(raw);
    // Bỏ số (hỗ trợ kiểu gõ VNI: nhan2 -> nhan, dung1, tuyet1...)
    const withoutNumbers = normalized.replace(/[0-9]/g, "");
    // Bỏ ký tự dấu telex thừa ở cuối nếu có (s, f, r, x, j)
    const withoutTelexTail = withoutNumbers.replace(/[sfrxj]$/i, "");

    return Array.from(new Set([lower, normalized, withoutNumbers, withoutTelexTail])).filter(Boolean);
};

export const useInforLogic = () => {
    const [isPortrait, setIsPortrait] = useState<boolean>(false);
    const [filter, setFilter] = useState<FilterState>({
        name: "",
        department: "",
        position: "",
    });
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [checkedInUser, setCheckedInUser] = useState<Employee | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [imageRatio, setImageRatio] = useState<number>(3 / 4);
    const employees = employeesData as Employee[];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
        setEmployee(null);
        if (errorMessage) setErrorMessage("");
    };

    // Lọc nhân viên theo tên, phòng ban hoặc chức vụ (hỗ trợ .some duyệt qua từng từ và biến thể gõ)
    const filteredEmployees = employees.filter((emp) => {
        const isTyping = Boolean(filter.name || filter.department || filter.position);
        if (!isTyping) return false;

        // Bộ lọc Tên: dùng .some duyệt qua từng từ trong tên nhân viên và từng biến thể tìm kiếm
        let matchName = true;
        if (filter.name.trim()) {
            const nameWords = normalizeStr(emp.name).split(/\s+/);
            const empNameNormalized = normalizeStr(emp.name);
            const searchVariants = getSearchVariants(filter.name);

            // Kiểm tra tên đầy đủ hoặc dùng .some() duyệt qua từng từ trong họ tên
            const matchFullName = searchVariants.some((variant) =>
                empNameNormalized.includes(variant) || emp.name.toLowerCase().includes(variant)
            );

            const matchWords = nameWords.some((word) =>
                searchVariants.some((variant) =>
                    word.includes(variant) || variant.includes(word)
                )
            );

            matchName = matchFullName || matchWords;
        }

        // Bộ lọc Phòng ban
        let matchDepartment = true;
        if (filter.department.trim()) {
            const deptVariants = getSearchVariants(filter.department);
            const deptNorm = normalizeStr(emp.department);
            matchDepartment = deptVariants.some((variant) =>
                deptNorm.includes(variant) || emp.department.toLowerCase().includes(variant)
            );
        }

        // Bộ lọc Chức vụ
        let matchPosition = true;
        if (filter.position.trim()) {
            const posVariants = getSearchVariants(filter.position);
            const posNorm = normalizeStr(emp.position);
            matchPosition = posVariants.some((variant) =>
                posNorm.includes(variant) || emp.position.toLowerCase().includes(variant)
            );
        }

        return matchName && matchDepartment && matchPosition;
    });

    const handleSelectEmployee = (emp: Employee) => {
        setEmployee(emp);
        setFilter({
            name: emp.name,
            department: emp.department,
            position: emp.position,
        });
        if (errorMessage) setErrorMessage("");
    };

    // Xử lý Check-in: Kiểm tra đủ 3 thông tin -> Render hình -> Clean 3 ô input
    const handleCheckIn = () => {
        const { name, department, position } = filter;
        if (!name.trim() || !department.trim() || !position.trim()) {
            setErrorMessage("Vui lòng điền đầy đủ cả 3 thông tin để Check-in nha!");
            return;
        }

        // Lấy nhân viên đã chọn hoặc tìm theo tên / tạo thông tin mới
        const searchVariants = getSearchVariants(name);
        const matched = employee || employees.find((emp) => {
            const empNorm = normalizeStr(emp.name);
            const nameWords = empNorm.split(/\s+/);
            return (
                emp.name.toLowerCase() === name.trim().toLowerCase() ||
                searchVariants.some((v) => empNorm === v || empNorm.includes(v)) ||
                nameWords.some((w) => searchVariants.some((v) => w === v))
            );
        });

        const userToCheckIn: Employee = matched || {
            id: "NV" + Math.floor(100 + Math.random() * 900),
            name: name.trim(),
            department: department.trim(),
            position: position.trim(),
            image: bgImage,
        };

        setCheckedInUser(userToCheckIn);
        setErrorMessage("");

        // Reset lại 3 ô input sau khi check-in
        setFilter({
            name: "",
            department: "",
            position: "",
        });
        setEmployee(null);
    };

    return {
        isPortrait,
        setIsPortrait,
        filter,
        setFilter,
        employee,
        checkedInUser,
        errorMessage,
        filteredEmployees,
        handleInputChange,
        handleSelectEmployee,
        handleCheckIn,
    };
};
