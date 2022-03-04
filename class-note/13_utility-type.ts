interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// 1. 상품 목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product[]> {
  // ..
}

// interface ProductDetail {
//   id: number;
//   name: string;
//   price: number;
// }

type shoppingItem = Pick<Product, 'id' | 'name' | 'price'>
// 2. 상품 상세 화면을 그리기 위한 API 함수
function displayProductDetail(shoppingItem: Pick<Product, 'id' | 'name' | 'price'>) { // Product에서 id, name, price만 뽑아서 사용하겠다.
  // ..
}

// interface UpdateProduct {
//   id?: number;
//   name?: string;
//   price?: number;
//   brand?: string;
//   stock?: number;
// }

type UpdateProduct = Partial<Product>
// 3. 특정 상품 정보를 갱신(업데이트)하는 함수
function updateProductItem(productItem: Partial<Product>) {
// ..
}

// 4. 유틸리티 타입 구현하기 - Partial
interface UserProfile {
  username: string;
  email: string;
  profilePhotoUrl: string;
}
// interface UserProfileUpdate {
//   username?: string;
//   email?: string;
//   profilePhotoUrl?: string;
// }

// #1
// type UserProfileUpdate = {
//   username?: UserProfile['username'];
//   email?: UserProfile['email'];
//   profilePhotoUrl?: UserProfile['profilePhotoUrl'];
// }

// #2
// type UserProfileUpdate = {
//   [p in 'username' | 'email' | 'profilePhotoUrl']?: UserProfile[p]
// }
// type UserProfileKeys = keyof UserProfile

// #3
type UserProfileUpdate = {
  [p in keyof UserProfile]?: UserProfile[p]
}

// #4
type Subset<T> = {
  [p in keyof T]?: T[p]
}