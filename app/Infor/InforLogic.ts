'use client';

import { useState, useEffect, ChangeEvent } from "react";
import type { StaticImageData } from "next/image";
import employeesData from "../data/Asian_Holding.json";

export interface Employee {
    id: string;
    name: string;
    image?: string | StaticImageData;
    department: string;
    position: string;
    status?: string;
    isNotInList?: boolean;
}

export interface FilterState {
    name: string;
    department: string;
    position: string;
}

/**
 * Chuẩn hóa chuỗi:
 * - Chuyển chữ thường.
 * - Loại bỏ dấu tiếng Việt.
 * - Chuyển đ thành d.
 * - Chuẩn hóa khoảng trắng.
 */
export const normalizeStr = (str: string): string => {
    if (!str) return "";

    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/\s+/g, " ")
        .trim();
};

/**
 * Tạo biến thể tìm kiếm.
 * Không tự động xóa ký tự cuối vì có thể làm sai từ khóa.
 */
export const getSearchVariants = (raw: string): string[] => {
    if (!raw) return [];

    const normalized = normalizeStr(raw);

    return Array.from(
        new Set([
            raw.toLowerCase().trim(),
            normalized,
        ])
    ).filter(Boolean);
};

/**
 * Bí danh phòng ban.
 *
 * Key là từ khóa người dùng có thể nhập.
 * Value là những cách gọi tương đương.
 */
const DEPARTMENT_ALIASES: Record<string, string[]> = {
    hr: ["nhân sự", "nhan su", "human resources"],
    nsv: ["nhân sự"],
    "nhan su": ["hr", "human resources"],
    sales: ["kinh doanh", "nhân viên kinh doanh"],
    "kinh doanh": ["sales"],
    marketing: ["marketing", "truyền thông"],
    kt: ["kế toán"],
    "ke toan": ["kt", "accountant"],
};

/**
 * Bí danh chức vụ.
 *
 * NCVP được hiểu theo yêu cầu là:
 * "Nhân viên chuyên viên".
 *
 * Chỉ thêm những bí danh phù hợp với quy ước thực tế.
 */
const POSITION_ALIASES: Record<string, string[]> = {
    hr: ["nhân sự", "human resources"],
    "nhân sự": ["hr"],
    "nhan su": ["hr"],
    ncvp: ["nhân viên chuyên viên"],
    "nhan vien chuyen vien": ["ncvp"],
    sales: ["nhân viên kinh doanh", "kinh doanh"],
    "nhân viên kinh doanh": ["sales", "kinh doanh"],
    editor: ["biên tập", "biên tập viên"],
    "biên tập": ["editor"],
    accountant: ["kế toán"],
    "kế toán": ["accountant"],
    "pho giam doc marketing": ["phó giám đốc marketing"],
};

/**
 * Tìm kiếm một trường theo nội dung và bí danh.
 *
 * Hỗ trợ:
 * - Không phân biệt dấu.
 * - Không phân biệt chữ hoa/chữ thường.
 * - Tìm chuỗi con.
 * - Tìm nhiều từ khóa trong cùng trường.
 * - Tìm từ viết tắt thông qua alias.
 */
export const matchesSearch = (
    query: string,
    value: string,
    aliases: Record<string, string[]> = {}
): boolean => {
    const normalizedQuery = normalizeStr(query);
    const normalizedValue = normalizeStr(value);

    if (!normalizedQuery) return true;
    if (!normalizedValue) return false;

    // Khớp trực tiếp toàn bộ chuỗi.
    if (normalizedValue.includes(normalizedQuery)) {
        return true;
    }

    // Kiểm tra bí danh của toàn bộ truy vấn.
    const directAliases = aliases[normalizedQuery] ?? [];

    if (
        directAliases.some((alias) => {
            const normalizedAlias = normalizeStr(alias);

            return (
                normalizedValue.includes(normalizedAlias) ||
                normalizedAlias
                    .split(/\s+/)
                    .every((word) => normalizedValue.includes(word))
            );
        })
    ) {
        return true;
    }

    // Mọi từ khóa phải tìm thấy trong trường đang lọc.
    const queryWords = normalizedQuery.split(/\s+/);

    return queryWords.every((word) => {
        // Từ khóa có trong nội dung gốc.
        if (normalizedValue.includes(word)) {
            return true;
        }

        // Từ khóa có bí danh khớp với nội dung gốc.
        const wordAliases = aliases[word] ?? [];

        return wordAliases.some((alias) =>
            normalizedValue.includes(normalizeStr(alias))
        );
    });
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
    const [userIp, setUserIp] = useState<string>("");

    const employees = employeesData as Employee[];

    /**
     * Lấy public IP, nếu thất bại thì thử API nội bộ.
     */
    useEffect(() => {
        const fetchIp = async () => {
            try {
                const res = await fetch(
                    "https://api.ipify.org?format=json"
                );

                if (!res.ok) {
                    throw new Error("Không thể lấy Public IP");
                }

                const data: { ip?: string } = await res.json();

                if (!data.ip) {
                    throw new Error("Public IP không hợp lệ");
                }

                setUserIp(data.ip);

                console.log(
                    "🌐 IP máy đăng nhập (Public IP):",
                    data.ip
                );
            } catch {
                try {
                    const res = await fetch("/api/get-ip");

                    if (!res.ok) {
                        throw new Error("Không thể lấy IP nội bộ");
                    }

                    const data: { ip?: string } = await res.json();

                    if (!data.ip) {
                        throw new Error("Network IP không hợp lệ");
                    }

                    setUserIp(data.ip);

                    console.log(
                        "🖥️ IP máy đăng nhập (Network IP):",
                        data.ip
                    );
                } catch {
                    console.warn(
                        "⚠️ Không thể xác định IP máy đăng nhập"
                    );
                }
            }
        };

        void fetchIp();
    }, []);

    /**
     * Xử lý thay đổi input.
     */
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        if (
            name !== "name" &&
            name !== "department" &&
            name !== "position"
        ) {
            return;
        }

        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));

        setEmployee(null);

        if (errorMessage) {
            setErrorMessage("");
        }
    };

    /**
     * Lọc nhân viên theo tên, phòng ban và chức vụ.
     *
     * Ba bộ lọc được kết hợp bằng AND:
     * Tên AND Phòng ban AND Chức vụ.
     */
    const filteredEmployees = employees.filter((emp) => {
        const isTyping = Boolean(
            filter.name.trim() ||
            filter.department.trim() ||
            filter.position.trim()
        );

        // Không hiển thị danh sách khi chưa nhập gì.
        if (!isTyping) return false;

        const matchName = matchesSearch(
            filter.name,
            emp.name
        );

        const matchDepartment = matchesSearch(
            filter.department,
            emp.department,
            DEPARTMENT_ALIASES
        );

        const matchPosition = matchesSearch(
            filter.position,
            emp.position,
            POSITION_ALIASES
        );

        return matchName && matchDepartment && matchPosition;
    });

    /**
     * Chọn nhân viên từ danh sách kết quả.
     */
    const handleSelectEmployee = (emp: Employee) => {
        setEmployee(emp);

        setFilter({
            name: emp.name,
            department: emp.department,
            position: emp.position,
        });

        if (errorMessage) {
            setErrorMessage("");
        }
    };

    /**
     * Check-in.
     *
     * Ưu tiên nhân viên đã chọn.
     * Nếu chưa chọn, chỉ tự nhận diện khi tên khớp chính xác.
     * Nếu không có trong danh sách thì tạo thông tin check-in mới.
     */
    const handleCheckIn = () => {
        const { name, department, position } = filter;

        if (
            !name.trim() ||
            !department.trim() ||
            !position.trim()
        ) {
            setErrorMessage(
                "Vui lòng điền đầy đủ cả 3 thông tin để Check-in nha!"
            );
            return;
        }

        const normalizedName = normalizeStr(name);

        const matched =
            employee &&
            normalizeStr(employee.name) === normalizedName
                ? employee
                : employees.find(
                      (emp) =>
                          normalizeStr(emp.name) === normalizedName
                  );

        const userToCheckIn: Employee = matched
            ? {
                  ...matched,
                  isNotInList: false,
              }
            : {
                  id: `NV${Math.floor(
                      100 + Math.random() * 900
                  )}`,
                  name: name.trim(),
                  department: department.trim(),
                  position: position.trim(),
                  image: "",
                  isNotInList: true,
              };

        setCheckedInUser(userToCheckIn);
        setErrorMessage("");

        console.log(
            `📌 [Check-in] Họ tên: "${userToCheckIn.name}" | ` +
                `IP máy: ${userIp || "Đang lấy..."} | ` +
                `Thời gian: ${new Date().toLocaleTimeString("vi-VN")}`
        );

        // Xóa nội dung ba ô nhập sau khi check-in.
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
        imageRatio,
        setImageRatio,
        userIp,

        filteredEmployees,

        handleInputChange,
        handleSelectEmployee,
        handleCheckIn,
    };
};
