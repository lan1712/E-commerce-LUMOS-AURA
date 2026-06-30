export type VietnamWard = {
  code: number;
  name: string;
  division_type?: string;
  codename?: string;
  province_code?: number;
};

export type VietnamProvince = {
  code: number;
  name: string;
  division_type?: string;
  codename?: string;
  phone_code?: number;
  wards?: VietnamWard[];
};

export const DEFAULT_VIETNAM_POSTAL_CODE = "700000";

export const VIETNAM_ADDRESS_FALLBACK: VietnamProvince[] = [
  {
    code: 79,
    name: "Thành phố Hồ Chí Minh",
    division_type: "thành phố trung ương",
    wards: [
      { code: 26737, name: "Phường Bến Thành", province_code: 79 },
      { code: 26743, name: "Phường Cầu Ông Lãnh", province_code: 79 },
      { code: 26800, name: "Phường Thảo Điền", province_code: 79 },
      { code: 26995, name: "Phường Bình Thạnh", province_code: 79 },
      { code: 27004, name: "Phường Gia Định", province_code: 79 },
    ],
  },
  {
    code: 1,
    name: "Thành phố Hà Nội",
    division_type: "thành phố trung ương",
    wards: [
      { code: 4, name: "Phường Ba Đình", province_code: 1 },
      { code: 70, name: "Phường Hoàn Kiếm", province_code: 1 },
      { code: 166, name: "Phường Cầu Giấy", province_code: 1 },
      { code: 190, name: "Phường Tây Hồ", province_code: 1 },
    ],
  },
  {
    code: 48,
    name: "Thành phố Đà Nẵng",
    division_type: "thành phố trung ương",
    wards: [
      { code: 20194, name: "Phường Hải Châu", province_code: 48 },
      { code: 20263, name: "Phường Sơn Trà", province_code: 48 },
      { code: 20305, name: "Phường Ngũ Hành Sơn", province_code: 48 },
    ],
  },
];

export async function loadVietnamAddressData(): Promise<VietnamProvince[]> {
  try {
    const response = await fetch("https://provinces.open-api.vn/api/v2/?depth=2");
    if (!response.ok) return VIETNAM_ADDRESS_FALLBACK;
    const data = (await response.json()) as VietnamProvince[];
    return Array.isArray(data) && data.length ? data : VIETNAM_ADDRESS_FALLBACK;
  } catch {
    return VIETNAM_ADDRESS_FALLBACK;
  }
}

export function findProvince(provinces: VietnamProvince[], code: string) {
  return provinces.find((province) => String(province.code) === code);
}

export function findWard(province: VietnamProvince | undefined, code: string) {
  return province?.wards?.find((ward) => String(ward.code) === code);
}

export function composeVietnamLocation(
  province: VietnamProvince | undefined,
  ward: VietnamWard | undefined,
) {
  return [ward?.name, province?.name].filter(Boolean).join(", ");
}
