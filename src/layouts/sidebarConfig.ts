const sidebarConfig = [
  {
    icon: "lucide:layout-dashboard",
    name: "Trang chủ",
    path: "/dashboard",
  },
  {
    icon: "fluent:book-database-24-regular",
    name: "Đơn đặt bàn",
    path: "/books",
    child: [
      {
        name: "Đặt bàn",
        path: "/books/create",
      },
      {
        name: "Tìm kiếm",
        path: "/books/list",
      },
      {
        name: "Cập nhật đơn đặt bàn",
        path: "/books/update",
      },
    ],
  },
  {
    icon: "fluent:box-checkmark-20-regular",
    name: "Hoá đơn",
    path: "/orders",
    child: [
      {
        name: "Tìm kiếm",
        path: "/orders/list",
      },
      {
        name: "Thanh toán đơn đặt bàn",
        path: "/orders/create",
      },
    ],
  },
  {
    icon: "ph:users-three",
    name: "Khách hàng",
    path: "/users",
    child: [
      {
        name: "Tìm kiếm",
        path: "/users/list",
      },
      {
        name: "Thêm khách hàng",
        path: "/users/create",
      },
      {
        name: "Cập nhật khách hàng",
        path: "/users/update",
      },
    ],
  },
  {
    icon: "clarity:employee-group-line",
    name: "Nhân viên",
    path: "/employees",
    child: [
      {
        name: "Tìm kiếm",
        path: "/employees/list",
      },
      {
        name: "Thêm nhân viên",
        path: "/employees/create",
      },
      {
        name: "Cập nhật nhân viên",
        path: "/employees/update",
      },
    ],
  },
  // {
  //   icon: "fluent-emoji-high-contrast:shallow-pan-of-food",
  //   name: "Món ăn",
  //   path: "/foods",
  //   child: [
  //     {
  //       name: "Tìm kiếm",
  //       path: "/foods/list",
  //     },
  //     {
  //       name: "Thêm món ăn",
  //       path: "/foods/create",
  //     },
  //     {
  //       name: "Cập nhật món ăn",
  //       path: "/foods/update",
  //     },
  //   ],
  // },
  // {
  //   icon: "ep:cold-drink",
  //   name: "Đồ uống",
  //   path: "/drinks",
  //   child: [
  //     {
  //       name: "Tìm kiếm",
  //       path: "/drinks/list",
  //     },
  //     {
  //       name: "Thêm đồ uống",
  //       path: "/drinks/create",
  //     },
  //     {
  //       name: "Cập nhật đồ uống",
  //       path: "/drinks/update",
  //     },
  //   ],
  // },
  {
    icon: "cil:fastfood",
    name: "Thực phẩm",
    path: "/products",
    child: [
      {
        name: "Tìm kiếm",
        path: "/products/list",
      },
      {
        name: "Thêm thực phẩm",
        path: "/products/create",
      },
      {
        name: "Cập nhật thực phẩm",
        path: "/products/update",
      },
    ],
  },
  {
    icon: "fluent:food-24-regular",
    name: "Loại thực phẩm",
    path: "/product-types",
    child: [
      {
        name: "Tìm kiếm",
        path: "/product-types/list",
      },
      {
        name: "Thêm loại thực phẩm",
        path: "/product-types/create",
      },
      {
        name: "Cập nhật loại thực phẩm",
        path: "/product-types/update",
      },
    ],
  },
  {
    icon: "ic:outline-table-bar",
    name: "Bàn",
    path: "/tables",
    child: [
      {
        name: "Tìm kiếm",
        path: "/tables/list",
      },
      {
        name: "Thêm bàn",
        path: "/tables/create",
      },
      {
        name: "Cập nhật bàn",
        path: "/tables/update",
      },
    ],
  },
  {
    icon: "material-symbols:auto-activity-zone-outline",
    name: "Khu vực",
    path: "/areas",
    child: [
      {
        name: "Tìm kiếm",
        path: "/areas/list",
      },
      {
        name: "Thêm khu vực",
        path: "/areas/create",
      },
      {
        name: "Cập nhật khu vực",
        path: "/areas/update",
      },
    ],
  },
];

export default sidebarConfig;
