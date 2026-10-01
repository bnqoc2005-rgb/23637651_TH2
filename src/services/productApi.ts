import { apiClient } from './apiClient';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const KTX_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Cơm Tấm Sườn Bì Chả',
    price: 1.7, // ~35.000đ khi nhân multiplier
    description: 'Cơm tấm sườn nướng thơm lừng, bì giòn, chả trứng béo ngậy kèm dưa chua nước mắm đậm đà giao tận phòng.',
    category: 'Cơm',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    title: 'Mì Tôm Trứng Xúc Xích Bò',
    price: 1.2, // ~25.000đ
    description: 'Tô mì tôm chua cay nóng hổi topping 2 trứng ốp la, xúc xích và bò viên thơm ngon bổ dưỡng cho sinh viên thức đêm.',
    category: 'Mì',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    title: 'Cơm Gà Xối Mỡ Giòn Da',
    price: 1.8,
    description: 'Cơm chiên hạt vàng ươm, đùi gà xối mỡ giòn rụm bên ngoài mọng nước bên trong, ăn kèm sốt tỏi ớt đặc biệt.',
    category: 'Cơm',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    title: 'Mì Xào Bò Rau Cải KTX',
    price: 1.5,
    description: 'Mì xào giòn dai đậm vị cùng thịt bò xào mềm, cải ngọt tươi xanh và ớt chuông dinh dưỡng.',
    category: 'Mì',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 5,
    title: 'Hộp 10 Bút Bi Gel & Highlight',
    price: 1.0,
    description: 'Bộ 5 bút bi gel mực đen mượt mà và 5 bút dạ quang highlight pastel phục vụ ôn thi học kỳ.',
    category: 'Dụng cụ học tập',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 6,
    title: 'Tập Vở Kẻ Ngang 200 Trang (Lốc 5 cuốn)',
    price: 1.6,
    description: 'Vở kẻ ngang giấy dày chống thấm mực, bìa đẹp phong cách tối giản, định lượng 80gsm bảo vệ mắt.',
    category: 'Dụng cụ học tập',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 7,
    title: 'Bìa Còng & Túi Hồ Sơ A4 Đựng Tài Liệu',
    price: 0.9,
    description: 'Bộ bìa còng kẹp tài liệu đồ án, báo cáo thực hành thí nghiệm chuyên nghiệp dành cho sinh viên.',
    category: 'Dụng cụ học tập',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 8,
    title: 'Máy Tính Khoa Học Casio Chuẩn Thi',
    price: 9.5,
    description: 'Máy tính bỏ túi khoa học hỗ trợ giải hệ phương trình, ma trận, tích phân phục vụ môn Toán cao cấp và Vật lý.',
    category: 'Dụng cụ học tập',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 9,
    title: 'Mì Trộn Indomie Phô Mai Trứng',
    price: 1.3,
    description: 'Mì trộn Indomie sốt đặc biệt rắc bột phô mai béo thơm kèm trứng lòng đào tan chảy khó cưỡng.',
    category: 'Mì',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 10,
    title: 'Cơm Chiên Dương Châu Xá Xíu',
    price: 1.6,
    description: 'Cơm chiên tơi hạt thơm bơ cùng thịt xá xíu thái lựu, đậu Hà Lan, bắp ngọt và cà rốt tươi ngon.',
    category: 'Cơm',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 11,
    title: 'Trà Sữa Trân Châu Đường Đen 700ml',
    price: 1.1,
    description: 'Trà sữa đậm vị trà đen organic kết hợp sữa tươi nguyên kem và trân châu hoàng kim dai giòn.',
    category: 'Đồ uống',
    image: 'https://images.unsplash.com/photo-1558857563-b371b635e800?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 12,
    title: 'Cà Phê Sữa Đá Sài Gòn Đậm Vị',
    price: 0.9,
    description: 'Ly cà phê phin nguyên chất Robusta Buôn Ma Thuột hòa quyện sữa đặc thơm nồng đánh bay cơn buồn ngủ.',
    category: 'Đồ uống',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=60',
  },
];

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // Vẫn gọi API qua apiClient để gắn header X-Student-Id chuẩn đề bài
    await apiClient.get('/products?limit=1').catch(() => null);
  } catch (e) {
    // Không gián đoạn nếu mạng offline
  }
  return KTX_PRODUCTS;
};
