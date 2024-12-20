export const languageData: [string, string][] = [
  ["Proto Indo-European", "Balto-Slavic"],
  ["Proto Indo-European", "Germanic"],
  ["Proto Indo-European", "Celtic"],
  ["Proto Indo-European", "Italic"],
  ["Proto Indo-European", "Hellenic"],
  ["Proto Indo-European", "Anatolian"],
  ["Proto Indo-European", "Indo-Iranian"],
  ["Proto Indo-European", "Tocharian"],
  ["Indo-Iranian", "Dardic"],
  ["Indo-Iranian", "Indic"],
  ["Indo-Iranian", "Iranian"],
  ["Germanic", "North Germanic"],
  ["Germanic", "West Germanic"],
  ["Germanic", "East Germanic"],
  ["Italic", "Latin"],
  ["Latin", "French"],
  ["Latin", "Spanish"],
  ["Latin", "Italian"],
  ["Latin", "Romanian"],
  ["West Germanic", "English"],
  ["West Germanic", "German"],
  ["West Germanic", "Dutch"],
  ["North Germanic", "Swedish"],
  ["North Germanic", "Danish"],
  ["North Germanic", "Norwegian"],
  ["North Germanic", "Icelandic"],
];

export const colorScheme = {
  "Proto Indo-European": "#FF6B6B", // Red
  "Balto-Slavic": "#4ECDC4", // Teal
  Germanic: "#45B7D1", // Blue
  Celtic: "#96CEB4", // Green
  Italic: "#FFEEAD", // Yellow
  Hellenic: "#D4A5A5", // Pink
  Anatolian: "#9B59B6", // Purple
  "Indo-Iranian": "#E67E22", // Orange
  Tocharian: "#2ECC71", // Emerald
  default: "#95A5A6", // Gray (default)
} as const;

nodes: [
  {
    id: "A1",
    name: "營業收入",
    properties: {
      部門: "財務部",
      值: "$800,000",
      比較基準: "$750,000",
      表現評估: "良好",
      影響: ["銷貨收入", "銷貨成本", "市場需求"],
    },
    type: "指標",
  },
  {
    id: "A2",
    name: "銷貨收入",
    properties: {
      部門: "銷售部",
      值: "$500,000",
      比較基準: "$480,000",
      表現評估: "良好",
      影響: ["營業收入", "銷售組合", "內銷市場"],
    },
    type: "指標",
  },
  {
    id: "A3",
    name: "銷貨成本",
    properties: {
      部門: "供應鏈部",
      值: "$300,000",
      比較基準: "$280,000",
      表現評估: "需改善",
      影響: ["營業收入", "原物料價格"],
    },
    type: "指標",
  },
  {
    id: "A4",
    name: "營業費用",
    properties: {
      部門: "財務部",
      值: "$120,000",
      比較基準: "$100,000",
      表現評估: "一般",
      影響: ["經營效能", "技術研發"],
    },
    type: "指標",
  },
  {
    id: "A5",
    name: "原物料",
    properties: {
      部門: "採購部",
      值: "$200,000",
      比較基準: "$190,000",
      表現評估: "需改善",
      影響: ["銷貨成本", "原物料價格", "原物料走勢"],
    },
    type: "因素",
  },
  {
    id: "A6",
    name: "原物料價格",
    properties: {
      部門: "採購部",
      值: "$15,000",
      比較基準: "$14,000",
      表現評估: "需改善",
      影響: ["銷貨成本", "原物料", "市場需求"],
    },
    type: "因素",
  },
  {
    id: "A7",
    name: "內銷市場",
    properties: {
      部門: "市場部",
      值: "$700,000",
      比較基準: "$680,000",
      表現評估: "良好",
      影響: ["銷貨收入", "市場需求"],
    },
    type: "因素",
  },
  {
    id: "A8",
    name: "外銷市場",
    properties: {
      部門: "市場部",
      值: "$400,000",
      比較基準: "$380,000",
      表現評估: "良好",
      影響: ["銷貨收入", "營業收入"],
    },
    type: "因素",
  },
  {
    id: "A9",
    name: "中景氣",
    properties: {
      部門: "策略部",
      值: "92.5",
      比較基準: "90.0",
      表現評估: "良好",
      影響: ["外銷市場", "原物料價格"],
    },
    type: "因素",
  },
  {
    id: "A10",
    name: "碳費",
    properties: {
      部門: "合規部",
      值: "$50,000",
      比較基準: "$45,000",
      表現評估: "一般",
      影響: ["銷貨成本", "營業費用"],
    },
    type: "因素",
  },
  {
    id: "B1",
    name: "技術研發",
    properties: {
      部門: "研發部",
      值: "$150,000",
      比較基準: "$140,000",
      表現評估: "良好",
      影響: ["經營效能", "銷售組合"],
    },
    type: "因素",
  },
  {
    id: "B2",
    name: "市場需求",
    properties: {
      部門: "市場部",
      值: "$900,000",
      比較基準: "$850,000",
      表現評估: "良好",
      影響: ["營業收入", "原物料價格"],
    },
    type: "因素",
  },
  {
    id: "B6",
    name: "物流效率",
    properties: {
      部門: "供應鏈部",
      值: "$300,000",
      比較基準: "$280,000",
      表現評估: "良好",
      影響: ["銷貨成本", "市場需求"],
    },
    type: "策略",
  },
  {
    id: "B3",
    name: "品牌知名度",
    properties: {
      部門: "市場部",
      值: "$600,000",
      比較基準: "$580,000",
      表現評估: "良好",
      影響: ["市場需求", "銷貨收入"],
    },
    type: "策略",
  },
  {
    id: "B4",
    name: "員工效率",
    properties: {
      部門: "人事部",
      值: "$200,000",
      比較基準: "$180,000",
      表現評估: "一般",
      影響: ["技術研發", "物流效率"],
    },
    type: "策略",
  },
  {
    id: "B5",
    name: "經營效能",
    properties: {
      部門: "管理部",
      值: "$750,000",
      比較基準: "$720,000",
      表現評估: "良好",
      影響: ["營業費用", "技術研發"],
    },
    type: "指標",
  },
  {
    id: "B7",
    name: "供應鏈穩定性",
    properties: {
      部門: "供應鏈部",
      值: "$400,000",
      比較基準: "$380,000",
      表現評估: "良好",
      影響: ["物流效率", "銷貨成本"],
    },
    type: "因素",
  },
  {
    id: "B8",
    name: "顧客服務品質",
    properties: {
      部門: "客戶服務部",
      值: "$250,000",
      比較基準: "$230,000",
      表現評估: "良好",
      影響: ["銷貨收入", "品牌知名度"],
    },
    type: "策略",
  },
  {
    id: "B9",
    name: "環境法規遵循",
    properties: {
      部門: "合規部",
      值: "$90,000",
      比較基準: "$85,000",
      表現評估: "一般",
      影響: ["碳費", "供應鏈穩定性"],
    },
    type: "因素",
  },
  {
    id: "C1",
    name: "產品質量",
    properties: {
      部門: "質量管理部",
      值: "$320,000",
      比較基準: "$310,000",
      表現評估: "良好",
      影響: ["銷貨收入", "顧客服務品質"],
    },
    type: "因素",
  },
  {
    id: "C2",
    name: "數位轉型",
    properties: {
      部門: "IT部門",
      值: "$500,000",
      比較基準: "$480,000",
      表現評估: "良好",
      影響: ["經營效能", "市場需求"],
    },
    type: "策略",
  },
  {
    id: "C3",
    name: "生產效率",
    properties: {
      部門: "生產部",
      值: "$350,000",
      比較基準: "$330,000",
      表現評估: "一般",
      影響: ["銷貨成本", "產品質量"],
    },
    type: "指標",
  },
  {
    id: "C4",
    name: "新市場開發",
    properties: {
      部門: "市場部",
      值: "$450,000",
      比較基準: "$430,000",
      表現評估: "良好",
      影響: ["外銷市場", "品牌知名度"],
    },
    type: "策略",
  },
];
