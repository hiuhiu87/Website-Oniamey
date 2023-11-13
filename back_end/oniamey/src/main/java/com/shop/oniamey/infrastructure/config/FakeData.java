//package com.shop.oniamey.infrastructure.config;
//
//<<<<<<< HEAD
//import com.shop.oniamey.entity.Brand;
//import com.shop.oniamey.entity.Category;
//import com.shop.oniamey.entity.Collar;
//import com.shop.oniamey.entity.Color;
//import com.shop.oniamey.entity.Material;
//import com.shop.oniamey.entity.Product;
//import com.shop.oniamey.entity.Size;
//import com.shop.oniamey.entity.SleeveLength;
//=======
//import com.shop.oniamey.entity.Promotion;
//import com.shop.oniamey.entity.PromotionProductDetail;
//import com.shop.oniamey.infrastructure.constant.RoleType;
//import com.shop.oniamey.repository.promotion.PromotionProductDetailRepository;
//import com.shop.oniamey.repository.promotion.PromotionRepository;
//import com.shop.oniamey.util.DateTimeUtil;
//import com.shop.oniamey.util.QRCodeProduct;
//import org.springframework.stereotype.Component;
//import com.shop.oniamey.entity.Address;
//import com.shop.oniamey.entity.Brand;
//import com.shop.oniamey.entity.Cart;
//import com.shop.oniamey.entity.CartDetail;
//import com.shop.oniamey.entity.Category;
//import com.shop.oniamey.entity.Collar;
//import com.shop.oniamey.entity.Color;
//import com.shop.oniamey.entity.Customer;
//import com.shop.oniamey.entity.Image;
//import com.shop.oniamey.entity.Material;
//import com.shop.oniamey.entity.OrderDetail;
//import com.shop.oniamey.entity.OrderHistory;
//import com.shop.oniamey.entity.OrderPaymentMethod;
//import com.shop.oniamey.entity.Orders;
//import com.shop.oniamey.entity.PaymentMethod;
//import com.shop.oniamey.entity.Product;
//import com.shop.oniamey.entity.ProductDetail;
//import com.shop.oniamey.entity.Size;
//import com.shop.oniamey.entity.SleeveLength;
//import com.shop.oniamey.entity.User;
//import com.shop.oniamey.entity.Voucher;
//import com.shop.oniamey.entity.base.EnumStatus;
//import com.shop.oniamey.repository.customer.AddressRepository;
//import com.shop.oniamey.repository.customer.CartDetailRepository;
//import com.shop.oniamey.repository.customer.CartRepository;
//import com.shop.oniamey.repository.customer.CustomerRepository;
//import com.shop.oniamey.repository.order.OrderDetailRepository;
//import com.shop.oniamey.repository.order.OrderHistoryRepository;
//import com.shop.oniamey.repository.order.OrderPaymentMethodRepository;
//import com.shop.oniamey.repository.order.OrderRepository;
//import com.shop.oniamey.repository.order.PaymentMethodRepository;
//>>>>>>> develop_merge_branch
//import com.shop.oniamey.repository.product.BrandRepository;
//import com.shop.oniamey.repository.product.CategoryRepository;
//import com.shop.oniamey.repository.product.CollarRepository;
//import com.shop.oniamey.repository.product.ColorRepository;
//import com.shop.oniamey.repository.product.ImageRepository;
//import com.shop.oniamey.repository.product.MaterialRepository;
//import com.shop.oniamey.repository.product.ProductDetailRepository;
//import com.shop.oniamey.repository.product.ProductRepository;
//import com.shop.oniamey.repository.product.SizeRepository;
//import com.shop.oniamey.repository.product.SleeveLengthRepository;
//<<<<<<< HEAD
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//
//@Component
//@RequiredArgsConstructor
//public class FakeData {
//
//    private final BrandRepository brandRepository;
//
//    private final CategoryRepository categoryRepository;
//
//    private final CollarRepository collarRepository;
//
//    private final ColorRepository colorRepository;
//
//    private final ImageRepository imageRepository;
//
//    private final MaterialRepository materialRepository;
//
//    private final ProductDetailRepository productDetailRepository;
//
//    private final ProductRepository productRepository;
//
//    private final SizeRepository sizeRepository;
//
//    private final SleeveLengthRepository sleeveLengthRepository;
//
//    @PostConstruct
//    public void fakeAllDataWebsiteOniamey() {
//
////        fakeDataProduct();
//
//        fakeDataBrand();
//
//        fakeDataCategory();
//
//        fakeDataCollar();
//
//        fakeDataColor();
//
//        fakeDataMaterial();
//
//        fakeDataSize();
//
//        fakeDataSleeveLength();
//
//    }
//
////    public void fakeDataProduct() {
////        Product product = new Product();
////        product.setProductName("Áo 1");
//=======
//import com.shop.oniamey.repository.user.UserRepository;
//import com.shop.oniamey.repository.voucher.VoucherRepository;
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.Date;
//import java.util.List;
//import java.util.Optional;
//
//
//
//@Component
//public class FakeData {
////
////    @Autowired
////    private AddressRepository addressRepository;
////
////    @Autowired
////    private CartDetailRepository cartDetailRepository;
////
////    @Autowired
////    private CartRepository cartRepository;
////
////    @Autowired
////    private CustomerRepository customerRepository;
////
////    @Autowired
////    private OrderDetailRepository orderDetailRepository;
////
////    @Autowired
////    private OrderHistoryRepository orderHistoryRepository;
////
////    @Autowired
////    private OrderPaymentMethodRepository orderPaymentMethodRepository;
////
////    @Autowired
////    private OrderRepository orderRepository;
////
////    @Autowired
////    private PaymentMethodRepository paymentMethodRepository;
////
////    @Autowired
////    private BrandRepository brandRepository;
////
////    @Autowired
////    private CategoryRepository categoryRepository;
////
////    @Autowired
////    private CollarRepository collarRepository;
////
////    @Autowired
////    private ColorRepository colorRepository;
////
////    @Autowired
////    private ImageRepository imageRepository;
////
////    @Autowired
////    private MaterialRepository materialRepository;
////
////    @Autowired
////    private ProductDetailRepository productDetailRepository;
////
////    @Autowired
////    private ProductRepository productRepository;
////
////    @Autowired
////    private SizeRepository sizeRepository;
////
////    @Autowired
////    private SleeveLengthRepository sleeveLengthRepository;
////
////
////    @Autowired
////    private UserRepository userRepository;
////
////    @Autowired
////    private VoucherRepository voucherRepository;
////
////    @Autowired
////    private PromotionRepository promotionRepository;
////
////    @Autowired
////    private PromotionProductDetailRepository promotionProductDetailRepository;
////
////    @PostConstruct
////    public void fakeAllDataWebsiteOniamey() {
////
////        fakeDataProduct();
////
////        fakeDataBrand();
////
////        fakeDataCategory();
////
////        fakeDataCollar();
////
////        fakeDataColor();
////
////        fakeDataMaterial();
////
////        fakeDataSize();
////
////        fakeDataSleeveLength();
////
////        fakeDataProductDetail();
////
////        // done ProductDetail
////
////        fakeDataImage();
////
////        // done imageProductDetail
////
////        fakeDataUser();
////
////        // done User
////
////        fakeDataCustomer();
////
////        fakeDataAddress();
////
////        // done Customer
////
////        fakeDataCart();
////
////        fakeDataCartDetail();
////
////        // done Cart
////
////        fakeDataVoucher();
////
////        // done Voucher
////
////        fakeDataOrders();
////        ;
////
////        fakeDataOrderDetail();
////
////        fakeDataOrderHistory();
////
////        fakeDataPaymentMethod();
////
////        fakeDataOrderPaymentMethod();
////
////        fakeDataPromotion();
////
////        fakeDataPromotionProductDetail();
////
////    }
////
////    public void fakeDataProduct() {
////        Product product = new Product();
////        product.setName("sản phẩm 1");
//>>>>>>> develop_merge_branch
////        product.setCode(QRCodeProduct.generateRandomCode());
////        product.setDescription("Áo Phông cao cấp");
////        product.setDeleted(false);
////        productRepository.save(product);
////
////        Product product1 = new Product();
//<<<<<<< HEAD
////        product1.setProductName("Áo 2");
//=======
////        product1.setName("sản phẩm 2");
//>>>>>>> develop_merge_branch
////        product1.setCode(QRCodeProduct.generateRandomCode());
////        product1.setDescription("Áo Phông rẻ tiền");
////        product1.setDeleted(true);
////        productRepository.save(product1);
////
//<<<<<<< HEAD
////        Product product2 = new Product();
////        product2.setProductName("Áo 3");
//=======
////
////        Product product2 = new Product();
////        product2.setName("sản phẩm 3");
//>>>>>>> develop_merge_branch
////        product2.setCode(QRCodeProduct.generateRandomCode());
////        product2.setDescription("Áo Phông cao cấp");
////        product2.setDeleted(false);
////        productRepository.save(product2);
//<<<<<<< HEAD
////
////        Product product3 = new Product();
////        product3.setProductName("Áo 4");
//=======
////        Product product3 = new Product();
////        product3.setName("sản phẩm 4");
//>>>>>>> develop_merge_branch
////        product3.setCode(QRCodeProduct.generateRandomCode());
////        product3.setDescription("Áo Phông rẻ tiền");
////        product3.setDeleted(true);
////        productRepository.save(product3);
////
////        Product product4 = new Product();
//<<<<<<< HEAD
////        product4.setProductName("Áo 5");
//=======
////        product4.setName("sản phẩm 5");
//>>>>>>> develop_merge_branch
////        product4.setCode(QRCodeProduct.generateRandomCode());
////        product4.setDescription("Áo Phông cao cấp");
////        product4.setDeleted(false);
////        productRepository.save(product4);
////    }
//<<<<<<< HEAD
//
//    public void fakeDataBrand() {
//        Brand brand = new Brand();
//        brand.setName("Brand 1");
//        brand.setDeleted(false);
//        brandRepository.save(brand);
//
//        Brand brand1 = new Brand();
//        brand1.setName("Brand 2");
//        brand1.setDeleted(true);
//        brandRepository.save(brand1);
//    }
//
//    public void fakeDataCategory() {
//        Category category = new Category();
//        category.setName("Category 1");
//        category.setDeleted(false);
//        categoryRepository.save(category);
//
//        Category category1 = new Category();
//        category1.setName("Category 2");
//        category1.setDeleted(true);
//        categoryRepository.save(category1);
//    }
//
//    public void fakeDataCollar() {
//        Collar collar = new Collar();
//        collar.setName("Collar 1");
//        collar.setDeleted(false);
//        collarRepository.save(collar);
//
//        Collar collar1 = new Collar();
//        collar1.setName("Collar 2");
//        collar1.setDeleted(true);
//        collarRepository.save(collar1);
//    }
//
//    public void fakeDataColor() {
//        Color color = new Color();
//        color.setName("Color 1");
//        color.setDeleted(false);
//        colorRepository.save(color);
//
//        Color color1 = new Color();
//        color1.setName("Color 2");
//        color1.setDeleted(true);
//        colorRepository.save(color1);
//    }
//
//    public void fakeDataMaterial() {
//        Material material = new Material();
//        material.setName("Material 1");
//        material.setDeleted(false);
//        materialRepository.save(material);
//
//        Material material1 = new Material();
//        material1.setName("Material 2");
//        material1.setDeleted(true);
//        materialRepository.save(material1);
//    }
//
//    public void fakeDataSize() {
//        Size size = new Size();
//        size.setName("S");
//        size.setDeleted(false);
//        sizeRepository.save(size);
//
//        Size size2 = new Size();
//        size2.setName("M");
//        size2.setDeleted(true);
//        sizeRepository.save(size2);
//
//        Size size3 = new Size();
//        size3.setName("L");
//        size3.setDeleted(false);
//        sizeRepository.save(size3);
//    }
//
//    public void fakeDataSleeveLength() {
//        SleeveLength sleeveLength1 = new SleeveLength();
//        sleeveLength1.setName("Ngắn tay");
//        sleeveLength1.setDeleted(false);
//        sleeveLengthRepository.save(sleeveLength1);
//
//        // Tạo chiều dài tay 2
//        SleeveLength sleeveLength2 = new SleeveLength();
//        sleeveLength2.setName("Dài tay");
//        sleeveLength2.setDeleted(true);
//        sleeveLengthRepository.save(sleeveLength2);
//
//    }
//
//=======
////
////    public void fakeDataBrand() {
////        Brand brand = new Brand();
////        brand.setName("IOS");
////        brand.setDeleted(false);
////        brandRepository.save(brand);
////
////        Brand brand1 = new Brand();
////        brand1.setName("Androi");
////        brand1.setDeleted(true);
////        brandRepository.save(brand1);
////
////        Brand brand2 = new Brand();
////        brand2.setName("ENDIVIA");
////        brand2.setDeleted(false);
////        brandRepository.save(brand2);
////
////        Brand brand3 = new Brand();
////        brand3.setName("Khan");
////        brand3.setDeleted(true);
////        brandRepository.save(brand3);
////
////        Brand brand4 = new Brand();
////        brand4.setName("Faker");
////        brand4.setDeleted(false);
////        brandRepository.save(brand4);
////    }
////
////    public void fakeDataCategory() {
////        Category category = new Category();
////        category.setName("le1");
////        category.setDeleted(false);
////        categoryRepository.save(category);
////
////        Category category1 = new Category();
////        category1.setName("leo pats");
////        category1.setDeleted(true);
////        categoryRepository.save(category1);
////
////        Category category2 = new Category();
////        category2.setName("leo teko");
////        category2.setDeleted(false);
////        categoryRepository.save(category2);
////
////        Category category3 = new Category();
////        category3.setName("ko tac");
////        category3.setDeleted(true);
////        categoryRepository.save(category3);
////
////        Category category4 = new Category();
////        category4.setName("kiasx");
////        category4.setDeleted(false);
////        categoryRepository.save(category4);
////    }
////
////    public void fakeDataCollar() {
////        Collar collar = new Collar();
////        collar.setName("cổ bẻ");
////        collar.setDeleted(false);
////        collarRepository.save(collar);
////
////        Collar collar1 = new Collar();
////        collar1.setName("cổ đứng");
////        collar1.setDeleted(true);
////        collarRepository.save(collar1);
////
////        Collar collar2 = new Collar();
////        collar2.setName("cổ xẻ");
////        collar2.setDeleted(false);
////        collarRepository.save(collar2);
////
////        Collar collar3 = new Collar();
////        collar3.setName("cổ xếp");
////        collar3.setDeleted(true);
////        collarRepository.save(collar3);
////
////        Collar collar4 = new Collar();
////        collar4.setName("new cổ");
////        collar4.setDeleted(false);
////        collarRepository.save(collar4);
////    }
////
////    public void fakeDataColor() {
////        Color color = new Color();
////        color.setName("Màu trắng");
//////        color.setCode("FFFFFF");
////        color.setDeleted(false);
////        colorRepository.save(color);
////
////        Color color1 = new Color();
////        color1.setName("Màu hồng");
//////        color.setCode("FFFFFF");
////        color1.setDeleted(true);
////        colorRepository.save(color1);
////
////        Color color2 = new Color();
////        color2.setName("Màu lilim");
//////        color.setCode("FFFFFF");
////        color2.setDeleted(false);
////        colorRepository.save(color2);
////
////        Color color3 = new Color();
////        color3.setName("Màu tím");
//////        color.setCode("FFFFFF");
////        color3.setDeleted(true);
////        colorRepository.save(color3);
////
////        Color color4 = new Color();
////        color4.setName("Màu xám");
//////        color.setCode("FFFFFF");
////        color4.setDeleted(false);
////        colorRepository.save(color4);
////    }
////
////    public void fakeDataMaterial() {
////        Material material = new Material();
////        material.setName("Cotton");
////        material.setDeleted(false);
////        materialRepository.save(material);
////
////        // Tạo chất liệu 1
////        Material material1 = new Material();
////        material1.setName("laotoon");
////        material1.setDeleted(true);
////        materialRepository.save(material1);
////
////        // Tạo chất liệu 2
////        Material material2 = new Material();
////        material2.setName("Polyester");
////        material2.setDeleted(false);
////        materialRepository.save(material2);
////
////        // Tạo chất liệu 3
////        Material material3 = new Material();
////        material3.setName("Silk");
////        material3.setDeleted(true);
////        materialRepository.save(material3);
////
////        // Tạo chất liệu 4
////        Material material4 = new Material();
////        material4.setName("Wool");
////        material4.setDeleted(false);
////        materialRepository.save(material4);
////    }
////
////    public void fakeDataSize() {
////        Size size = new Size();
////        size.setName("S");
////        size.setDeleted(false);
////        sizeRepository.save(size);
////
////        // Tạo kích thước 2
////        Size size2 = new Size();
////        size2.setName("M");
////        size2.setDeleted(true);
////        sizeRepository.save(size2);
////
////        // Tạo kích thước 3
////        Size size3 = new Size();
////        size3.setName("L");
////        size3.setDeleted(false);
////        sizeRepository.save(size3);
////
////        // Tạo kích thước 4
////        Size size4 = new Size();
////        size4.setName("XL");
////        size4.setDeleted(true);
////        sizeRepository.save(size4);
////
////        // Tạo kích thước 5
////        Size size5 = new Size();
////        size5.setName("XXL");
////        size5.setDeleted(false);
////        sizeRepository.save(size5);
////    }
////
////    public void fakeDataSleeveLength() {
////        SleeveLength sleeveLength1 = new SleeveLength();
////        sleeveLength1.setName("Ngắn tay");
////        sleeveLength1.setDeleted(false);
////        sleeveLengthRepository.save(sleeveLength1);
////
////        // Tạo chiều dài tay 2
////        SleeveLength sleeveLength2 = new SleeveLength();
////        sleeveLength2.setName("Dài tay");
////        sleeveLength2.setDeleted(true);
////        sleeveLengthRepository.save(sleeveLength2);
////
////        // Tạo chiều dài tay 3
////        SleeveLength sleeveLength3 = new SleeveLength();
////        sleeveLength3.setName("3/4 tay");
////        sleeveLength3.setDeleted(false);
////        sleeveLengthRepository.save(sleeveLength3);
////
////        // Tạo chiều dài tay 4
////        SleeveLength sleeveLength4 = new SleeveLength();
////        sleeveLength4.setName("Tay lỡ");
////        sleeveLength4.setDeleted(true);
////        sleeveLengthRepository.save(sleeveLength4);
////
////        // Tạo chiều dài tay 5
////        SleeveLength sleeveLength = new SleeveLength();
////        sleeveLength.setName("Tay phồng");
////        sleeveLength.setDeleted(false);
////        sleeveLengthRepository.save(sleeveLength);
////    }
////
////    public void fakeDataProductDetail() {
////        ProductDetail productDetail1 = new ProductDetail();
////
////        Optional<Category> optionalCategory1 = categoryRepository.findById(1L);
////        Optional<Size> optionalSize1 = sizeRepository.findById(1L);
////        Optional<Product> optionalProduct1 = productRepository.findById(1L);
////        Optional<Material> optionalMaterial1 = materialRepository.findById(1L);
////        Optional<Brand> optionalBrand1 = brandRepository.findById(1L);
////        Optional<Color> optionalColor1 = colorRepository.findById(1L);
////        Optional<Collar> optionalCollar1 = collarRepository.findById(1L);
////        Optional<SleeveLength> optionalSleeveLength1 = sleeveLengthRepository.findById(1L);
////
////        productDetail1.setCategory(optionalCategory1.get());
////        productDetail1.setSize(optionalSize1.get());
////        productDetail1.setProduct(optionalProduct1.get());
////        productDetail1.setMaterial(optionalMaterial1.get());
////        productDetail1.setBrand(optionalBrand1.get());
////        productDetail1.setColor(optionalColor1.get());
////        productDetail1.setCollar(optionalCollar1.get());
////        productDetail1.setSleeveLength(optionalSleeveLength1.get());
////        productDetail1.setCode(QRCodeProduct.generateRandomCode());
////        productDetail1.setName("Tên sản phẩm 1");
////        productDetail1.setGender(true);
////        productDetail1.setPrice(100.0f);
////        productDetail1.setQuantity(50L);
////        productDetail1.setWeight(0.5f);
////        productDetail1.setDeleted(true);
////        productDetailRepository.save(productDetail1);
////
////        // Sản phẩm chi tiết 2
////        ProductDetail productDetail2 = new ProductDetail();
////
////        Optional<Category> optionalCategory2 = categoryRepository.findById(2L);
////        Optional<Size> optionalSize2 = sizeRepository.findById(2L);
////        Optional<Product> optionalProduct2 = productRepository.findById(2L);
////        Optional<Material> optionalMaterial2 = materialRepository.findById(2L);
////        Optional<Brand> optionalBrand2 = brandRepository.findById(2L);
////        Optional<Color> optionalColor2 = colorRepository.findById(2L);
////        Optional<Collar> optionalCollar2 = collarRepository.findById(2L);
////        Optional<SleeveLength> optionalSleeveLength2 = sleeveLengthRepository.findById(2L);
////
////        productDetail2.setCategory(optionalCategory2.get());
////        productDetail2.setSize(optionalSize2.get());
////        productDetail2.setProduct(optionalProduct2.get());
////        productDetail2.setMaterial(optionalMaterial2.get());
////        productDetail2.setBrand(optionalBrand2.get());
////        productDetail2.setColor(optionalColor2.get());
////        productDetail2.setCollar(optionalCollar2.get());
////        productDetail2.setSleeveLength(optionalSleeveLength2.get());
////        productDetail2.setCode(QRCodeProduct.generateRandomCode());
////        productDetail2.setName("Tên sản phẩm 2");
////        productDetail2.setGender(false);
////        productDetail2.setPrice(75.0f);
////        productDetail2.setQuantity(30L);
////        productDetail2.setWeight(0.4f);
////        productDetail2.setDeleted(true);
////
////        productDetailRepository.save(productDetail2);
////
////        ProductDetail productDetail3 = new ProductDetail();
////
////        Optional<Category> optionalCategory3 = categoryRepository.findById(3L);
////        Optional<Size> optionalSize3 = sizeRepository.findById(3L);
////        Optional<Product> optionalProduct3 = productRepository.findById(3L);
////        Optional<Material> optionalMaterial3 = materialRepository.findById(3L);
////        Optional<Brand> optionalBrand3 = brandRepository.findById(3L);
////        Optional<Color> optionalColor3 = colorRepository.findById(3L);
////        Optional<Collar> optionalCollar3 = collarRepository.findById(3L);
////        Optional<SleeveLength> optionalSleeveLength3 = sleeveLengthRepository.findById(3L);
////
////        productDetail3.setCategory(optionalCategory3.get());
////        productDetail3.setSize(optionalSize3.get());
////        productDetail3.setProduct(optionalProduct3.get());
////        productDetail3.setMaterial(optionalMaterial3.get());
////        productDetail3.setBrand(optionalBrand3.get());
////        productDetail3.setColor(optionalColor3.get());
////        productDetail3.setCollar(optionalCollar3.get());
////        productDetail3.setSleeveLength(optionalSleeveLength3.get());
////        productDetail3.setCode(QRCodeProduct.generateRandomCode());
////        productDetail3.setName("Tên sản phẩm 3");
////        productDetail3.setGender(false);
////        productDetail3.setPrice(100.0f);
////        productDetail3.setQuantity(20L);
////        productDetail3.setWeight(0.5f);
////        productDetail3.setDeleted(true);
////
////        productDetailRepository.save(productDetail3);
////
////        ProductDetail productDetail4 = new ProductDetail();
////
////        Optional<Category> optionalCategory4 = categoryRepository.findById(4L);
////        Optional<Size> optionalSize4 = sizeRepository.findById(4L);
////        Optional<Product> optionalProduct4 = productRepository.findById(4L);
////        Optional<Material> optionalMaterial4 = materialRepository.findById(4L);
////        Optional<Brand> optionalBrand4 = brandRepository.findById(4L);
////        Optional<Color> optionalColor4 = colorRepository.findById(4L);
////        Optional<Collar> optionalCollar4 = collarRepository.findById(4L);
////        Optional<SleeveLength> optionalSleeveLength4 = sleeveLengthRepository.findById(4L);
////        productDetail4.setCategory(optionalCategory4.get());
////        productDetail4.setSize(optionalSize4.get());
////        productDetail4.setProduct(optionalProduct4.get());
////        productDetail4.setMaterial(optionalMaterial4.get());
////        productDetail4.setBrand(optionalBrand4.get());
////        productDetail4.setColor(optionalColor4.get());
////        productDetail4.setCollar(optionalCollar4.get());
////        productDetail4.setSleeveLength(optionalSleeveLength4.get());
////        productDetail4.setCode(QRCodeProduct.generateRandomCode());
////        productDetail4.setName("Tên sản phẩm 4");
////        productDetail4.setGender(true);
////        productDetail4.setPrice(110.0f);
////        productDetail4.setQuantity(30L);
////        productDetail4.setWeight(0.6f);
////        productDetail4.setDeleted(true);
////        productDetailRepository.save(productDetail4);
////
////// Sản phẩm chi tiết 5
////        ProductDetail productDetail5 = new ProductDetail();
////
////        Optional<Category> optionalCategory5 = categoryRepository.findById(5L);
////        Optional<Size> optionalSize5 = sizeRepository.findById(5L);
////        Optional<Product> optionalProduct5 = productRepository.findById(5L);
////        Optional<Material> optionalMaterial5 = materialRepository.findById(5L);
////        Optional<Brand> optionalBrand5 = brandRepository.findById(5L);
////        Optional<Color> optionalColor5 = colorRepository.findById(5L);
////        Optional<Collar> optionalCollar5 = collarRepository.findById(5L);
////        Optional<SleeveLength> optionalSleeveLength5 = sleeveLengthRepository.findById(5L);
////
////        productDetail5.setCategory(optionalCategory5.get());
////        productDetail5.setSize(optionalSize5.get());
////        productDetail5.setProduct(optionalProduct5.get());
////        productDetail5.setMaterial(optionalMaterial5.get());
////        productDetail5.setBrand(optionalBrand5.get());
////        productDetail5.setColor(optionalColor5.get());
////        productDetail5.setCollar(optionalCollar5.get());
////        productDetail5.setSleeveLength(optionalSleeveLength5.get());
////        productDetail5.setCode(QRCodeProduct.generateRandomCode());
////        productDetail5.setName("Tên sản phẩm 5");
////        productDetail5.setGender(false);
////        productDetail5.setPrice(120.0f);
////        productDetail5.setQuantity(25L);
////        productDetail5.setWeight(0.7f);
////        productDetail5.setDeleted(false);
////        productDetailRepository.save(productDetail5);
////
////
////    }
////
////    public void fakeDataImage() {
////
////        for (int j = 0; j < 5; j++) {
////
////            Long id = j + 1L;
////
////            Optional<ProductDetail> optionalProductDetail = productDetailRepository.findById(id);
////
////            if (optionalProductDetail.isPresent()) {
////                ProductDetail productDetail = optionalProductDetail.get();
////
////                // Tạo và lưu danh sách các hình ảnh cho sản phẩm chi tiết
////                for (int i = 1; i <= Image.MAXIMUM_IMAGE_PER_PRODUCT; i++) {
////                    Image image = new Image();
////                    image.setProductDetail(productDetail);
////                    image.setImageUrl("Image URL " + i);
////                    image.setCover("imageCover");
////                    imageRepository.save(image);
////                }
////            }
////        }
////
////    }
////
////    public void fakeDataUser() {
////        // Tạo người dùng với vai trò USER
////        User user1 = new User();
////        user1.setFullName("User 1");
////        user1.setBirthDate(new Date());
////        user1.setPhoneNumber("1234567890");
////        user1.setPassword("password1");
////        user1.setEmail("user1@example.com");
////        user1.setGender(1); // Ví dụ: 1 cho nam, 0 cho nữ
////        user1.setRole(RoleType.ROLE_USER);
////        user1.setIdentityCard("34534");
////        user1.setUsername("Nghia");
////        user1.setDeleted(true);
////        userRepository.save(user1);
////
////        // Tạo người dùng với vai trò ADMIN
////        User admin = new User();
////        admin.setFullName("Admin");
////        admin.setBirthDate(new Date());
////        admin.setPhoneNumber("9876543210");
////        admin.setPassword("ádssa");
////        admin.setEmail("admin@example.com");
////        admin.setGender(1); // Ví dụ: 1 cho nam, 0 cho nữ
////        admin.setRole(RoleType.ROLE_ADMIN);
////        admin.setIdentityCard("23423");
////        admin.setUsername("Hieu");
////        user1.setDeleted(true);
////        userRepository.save(admin);
////    }
////
////    public void fakeDataCustomer() {
////        for (int i = 1; i <= 5; i++) {
////            Customer customer = new Customer();
////            customer.setFullName("Customer " + i);
////            // Thiết lập ngày sinh, số điện thoại, mật khẩu, email, giới tính, avatar theo nhu cầu.
////            customer.setBirthDate(new Date()); // Ví dụ: Ngày sinh
////            customer.setPhoneNumber("123456789" + i); // Số điện thoại
////            customer.setPassword("password" + i); // Mật khẩu
////            customer.setEmail("customer" + i + "@example.com"); // Email
////            customer.setGender(1); // Ví dụ: 1 cho nam, 0 cho nữ
////            customer.setAvatar("avatar-url-" + i); // Đường dẫn đến ảnh đại diện
////            customer.setDeleted(true);
////            // Lưu khách hàng vào cơ sở dữ liệu
////            customerRepository.save(customer);
////        }
////    }
////
////
////    public void fakeDataAddress() {
////        Customer customer1 = customerRepository.findById(1L).orElse(null); // Thay thế bằng cách tìm khách hàng thực sự trong cơ sở dữ liệu
////        Customer customer2 = customerRepository.findById(2L).orElse(null);
////        Customer customer3 = customerRepository.findById(3L).orElse(null);
////        Customer customer4 = customerRepository.findById(4L).orElse(null);
////        Customer customer5 = customerRepository.findById(5L).orElse(null);
////
////        if (customer1 != null) {
////            Address address1 = new Address();
////            address1.setLine("123 Main St");
////            address1.setWard("Ward 1");
////            address1.setDistrict("Ho Chi Minh City");
////            address1.setProvince("HCM");
////            address1.setCountry("Vietnam");
////            address1.setIsDefault(true);
////            address1.setCustomer(customer1);
//////            address1.setReceiverPhoneNumber("1234567890");
//////            address1.setReceiverName("Receiver 1");
////            addressRepository.save(address1);
////        }
////
////        if (customer2 != null) {
////            Address address2 = new Address();
////            address2.setLine("456 Elm St");
////            address2.setWard("Ward 2");
////            address2.setDistrict("Hanoi");
////            address2.setProvince("HN");
////            address2.setCountry("Vietnam");
////            address2.setIsDefault(true);
////            address2.setCustomer(customer2);
//////            address2.setReceiverPhoneNumber("1234367890");
//////            address2.setReceiverName("Receiver 9");
////            addressRepository.save(address2);
////        }
////
////        if (customer3 != null) {
////            Address address3 = new Address();
////            address3.setLine("789 Oak St");
////            address3.setWard("Ward 3");
////            address3.setDistrict("Danang");
////            address3.setProvince("DN");
////            address3.setCountry("Vietnam");
////            address3.setIsDefault(true);
////            address3.setCustomer(customer3);
//////            address3.setReceiverPhoneNumber("1214567890");
//////            address3.setReceiverName("Receiver 0");
////            addressRepository.save(address3);
////        }
////
////        if (customer4 != null) {
////            Address address4 = new Address();
////            address4.setLine("101 Pine St");
////            address4.setWard("Ward 4");
////            address4.setDistrict("Hue");
////            address4.setProvince("HUE");
////            address4.setCountry("Vietnam");
////            address4.setIsDefault(true);
////            address4.setCustomer(customer4);
//////            address4.setReceiverPhoneNumber("12345678934");
//////            address4.setReceiverName("Receiver 21");
////            addressRepository.save(address4);
////        }
////
////        if (customer5 != null) {
////            Address address5 = new Address();
////            address5.setLine("111 Cedar St");
////            address5.setWard("Ward 5");
////            address5.setDistrict("Nha Trang");
////            address5.setProvince("NT");
////            address5.setCountry("Vietnam");
////            address5.setIsDefault(true);
////            address5.setCustomer(customer5);
//////            address5.setReceiverPhoneNumber("12974567890");
//////            address5.setReceiverName("Receiver 15");
////            addressRepository.save(address5);
////        }
////    }
////
////    public void fakeDataCart() {
////        Customer customer1 = customerRepository.findById(1L).orElse(null);
////        Customer customer2 = customerRepository.findById(2L).orElse(null);
////        Customer customer3 = customerRepository.findById(3L).orElse(null);
////        Customer customer4 = customerRepository.findById(4L).orElse(null);
////        Customer customer5 = customerRepository.findById(5L).orElse(null);
////
////        Cart cart1 = new Cart();
////        cart1.setCustomer(customer1);
////        cartRepository.save(cart1);
////
////        Cart cart2 = new Cart();
////        cart2.setCustomer(customer2);
////        cartRepository.save(cart2);
////
////        Cart cart3 = new Cart();
////        cart3.setCustomer(customer3);
////        cartRepository.save(cart3);
////
////        Cart cart4 = new Cart();
////        cart4.setCustomer(customer4);
////        cartRepository.save(cart4);
////
////        Cart cart5 = new Cart();
////        cart5.setCustomer(customer5);
////        cartRepository.save(cart5);
////    }
////
////    public void fakeDataCartDetail() {
////        // Lấy danh sách giỏ hàng và sản phẩm chi tiết từ cơ sở dữ liệu
////        List<Cart> carts = cartRepository.findAll();
////        List<ProductDetail> productDetails = productDetailRepository.findAll();
////
////        if (carts.size() == 0 || productDetails.size() == 0) {
////            // Nếu không có giỏ hàng hoặc sản phẩm chi tiết, không thể tạo dữ liệu cho CartDetail
////            return;
////        }
////
////        // Lấy các giá trị Cart và ProductDetail từ danh sách
////        Cart cart1 = carts.get(0);
////        Cart cart2 = carts.get(1);
////        Cart cart3 = carts.get(2);
////        Cart cart4 = carts.get(3);
////        Cart cart5 = carts.get(4);
////
////        ProductDetail productDetail1 = productDetails.get(0);
////        ProductDetail productDetail2 = productDetails.get(1);
////        ProductDetail productDetail3 = productDetails.get(2);
////        ProductDetail productDetail4 = productDetails.get(3);
////        ProductDetail productDetail5 = productDetails.get(4);
////
////        CartDetail cartDetail1 = new CartDetail();
////        cartDetail1.setCart(cart1);
////        cartDetail1.setProductDetail(productDetail1);
////        cartDetail1.setQuantity(2L);
////        cartDetailRepository.save(cartDetail1);
////
////        CartDetail cartDetail2 = new CartDetail();
////        cartDetail2.setCart(cart2);
////        cartDetail2.setProductDetail(productDetail2);
////        cartDetail2.setQuantity(3L);
////        cartDetailRepository.save(cartDetail2);
////
////        CartDetail cartDetail3 = new CartDetail();
////        cartDetail3.setCart(cart3);
////        cartDetail3.setProductDetail(productDetail3);
////        cartDetail3.setQuantity(1L);
////        cartDetailRepository.save(cartDetail3);
////
////        CartDetail cartDetail4 = new CartDetail();
////        cartDetail4.setCart(cart4);
////        cartDetail4.setProductDetail(productDetail4);
////        cartDetail4.setQuantity(4L);
////        cartDetailRepository.save(cartDetail4);
////
////        CartDetail cartDetail5 = new CartDetail();
////        cartDetail5.setCart(cart5);
////        cartDetail5.setProductDetail(productDetail5);
////        cartDetail5.setQuantity(2L);
////        cartDetailRepository.save(cartDetail5);
////    }
////
////    public void fakeDataVoucher() {
////        Voucher voucher1 = new Voucher();
////        voucher1.setVoucherName("Voucher A");
////        voucher1.setVoucherCode(QRCodeProduct.generateRandomCode());
////        voucher1.setQuantity(100L);
////        voucher1.setValue(10.0);
////        voucher1.setMinimumDiscount(5.0);
////        voucher1.setMaximumDiscount(20.0);
////        voucher1.setStartDate(new Date());
////        voucher1.setEndDate(new Date());
////        voucher1.setType("Discount");
////        voucherRepository.save(voucher1);
////
////        Voucher voucher2 = new Voucher();
////        voucher2.setVoucherName("Voucher B");
////        voucher2.setVoucherCode(QRCodeProduct.generateRandomCode());
////        voucher2.setQuantity(50L);
////        voucher2.setValue(15.0);
////        voucher2.setMinimumDiscount(10.0);
////        voucher2.setMaximumDiscount(25.0);
////        voucher2.setStartDate(new Date());
////        voucher2.setEndDate(new Date());
////        voucher2.setType("Discount");
////        voucherRepository.save(voucher2);
////
////        Voucher voucher3 = new Voucher();
////        voucher3.setVoucherName("Voucher C");
////        voucher3.setVoucherCode(QRCodeProduct.generateRandomCode());
////        voucher3.setQuantity(75L);
////        voucher3.setValue(5.0);
////        voucher3.setMinimumDiscount(3.0);
////        voucher3.setMaximumDiscount(15.0);
////        voucher3.setStartDate(new Date());
////        voucher3.setEndDate(new Date());
////        voucher3.setType("Discount");
////        voucherRepository.save(voucher3);
////
////        Voucher voucher4 = new Voucher();
////        voucher4.setVoucherName("Voucher D");
////        voucher4.setVoucherCode(QRCodeProduct.generateRandomCode());
////        voucher4.setQuantity(200L);
////        voucher4.setValue(20.0);
////        voucher4.setMinimumDiscount(10.0);
////        voucher4.setMaximumDiscount(30.0);
////        voucher4.setStartDate(new Date());
////        voucher4.setEndDate(new Date());
////        voucher4.setType("Discount");
////        voucherRepository.save(voucher4);
////
////        Voucher voucher5 = new Voucher();
////        voucher5.setVoucherName("Voucher E");
////        voucher5.setVoucherCode(QRCodeProduct.generateRandomCode());
////        voucher5.setQuantity(150L);
////        voucher5.setValue(10.0);
////        voucher5.setMinimumDiscount(5.0);
////        voucher5.setMaximumDiscount(20.0);
////        voucher5.setStartDate(new Date());
////        voucher5.setEndDate(new Date());
////        voucher5.setType("Discount");
////        voucherRepository.save(voucher5);
////    }
////
////    public void fakeDataOrders() {
////        Orders order1 = new Orders();
////        // Điền thông tin của order1
////        order1.setPhoneNumber("1234567890");
////        order1.setAddress("Địa chỉ 1");
////        order1.setUserName("Người dùng 1");
////        order1.setTotalMoney(100.0);
////        order1.setConfirmationDate(new Date());
////        order1.setShipDate(new Date());
////        order1.setReceiveDate(new Date());
////        order1.setCompletionDate(new Date());
////        order1.setType("Loại 1");
////        order1.setNote("Ghi chú 1");
////        order1.setMoneyShip(10.0);
////        order1.setStatus(EnumStatus.AWAITING_PAYMENT); // Chọn trạng thái tương ứng
////
////        // Lấy user, customer, và voucher từ cơ sở dữ liệu và gán cho order1
////        User user1 = userRepository.findById(1L).orElse(null);
////        Customer customer1 = customerRepository.findById(1L).orElse(null);
////        Voucher voucher1 = voucherRepository.findById(1L).orElse(null);
////        order1.setUser(user1);
////        order1.setCustomer(customer1);
////        order1.setVoucher(voucher1);
////
////        orderRepository.save(order1);
////
////        Orders order2 = new Orders();
////// Điền thông tin của order2
////        order2.setPhoneNumber("0987654321");
////        order2.setAddress("Địa chỉ 2");
////        order2.setUserName("Người dùng 2");
////        order2.setTotalMoney(150.0);
////        order2.setConfirmationDate(new Date());
////        order2.setShipDate(new Date());
////        order2.setReceiveDate(new Date());
////        order2.setCompletionDate(new Date());
////        order2.setType("Loại 2");
////        order2.setNote("Ghi chú 2");
////        order2.setMoneyShip(12.0);
////        order2.setStatus(EnumStatus.PENDING); // Chọn trạng thái tương ứng
////
////        User user2 = userRepository.findById(2L).orElse(null);
////        Customer customer2 = customerRepository.findById(2L).orElse(null);
////        Voucher voucher2 = voucherRepository.findById(2L).orElse(null);
////        order2.setUser(user2);
////        order2.setCustomer(customer2);
////        order2.setVoucher(voucher2);
////
////        orderRepository.save(order2);
////
////        Orders order3 = new Orders();
////// Điền thông tin của order3
////        order3.setPhoneNumber("0123456789");
////        order3.setAddress("Địa chỉ 3");
////        order3.setUserName("Người dùng 3");
////        order3.setTotalMoney(200.0);
////        order3.setConfirmationDate(new Date());
////        order3.setShipDate(new Date());
////        order3.setReceiveDate(new Date());
////        order3.setCompletionDate(new Date());
////        order3.setType("Loại 3");
////        order3.setNote("Ghi chú 3");
////        order3.setMoneyShip(15.0);
////        order3.setStatus(EnumStatus.CANCEL); // Chọn trạng thái tương ứng
////
////        User user3 = userRepository.findById(3L).orElse(null);
////        Customer customer3 = customerRepository.findById(3L).orElse(null);
////        Voucher voucher3 = voucherRepository.findById(3L).orElse(null);
////        order3.setUser(user3);
////        order3.setCustomer(customer3);
////        order3.setVoucher(voucher3);
////
////        orderRepository.save(order3);
////
////        Orders order4 = new Orders();
////// Điền thông tin của order4
////        order4.setPhoneNumber("0901234567");
////        order4.setAddress("Địa chỉ 4");
////        order4.setUserName("Người dùng 4");
////        order4.setTotalMoney(175.0);
////        order4.setConfirmationDate(new Date());
////        order4.setShipDate(new Date());
////        order4.setReceiveDate(new Date());
////        order4.setCompletionDate(new Date());
////        order4.setType("Loại 4");
////        order4.setNote("Ghi chú 4");
////        order4.setMoneyShip(20.0);
////        order4.setStatus(EnumStatus.SHIPPED); // Chọn trạng thái tương ứng
////
////        User user4 = userRepository.findById(4L).orElse(null);
////        Customer customer4 = customerRepository.findById(4L).orElse(null);
////        Voucher voucher4 = voucherRepository.findById(4L).orElse(null);
////        order4.setUser(user4);
////        order4.setCustomer(customer4);
////        order4.setVoucher(voucher4);
////
////        orderRepository.save(order4);
////
////        Orders order5 = new Orders();
////// Điền thông tin của order5
////        order5.setPhoneNumber("0912345678");
////        order5.setAddress("Địa chỉ 5");
////        order5.setUserName("Người dùng 5");
////        order5.setTotalMoney(210.0);
////        order5.setConfirmationDate(new Date());
////        order5.setShipDate(new Date());
////        order5.setReceiveDate(new Date());
////        order5.setCompletionDate(new Date());
////        order5.setType("Loại 5");
////        order5.setNote("Ghi chú 5");
////        order5.setMoneyShip(25.0);
////        order5.setStatus(EnumStatus.CANCEL); // Chọn trạng thái tương ứng
////
////        User user5 = userRepository.findById(5L).orElse(null);
////        Customer customer5 = customerRepository.findById(5L).orElse(null);
////        Voucher voucher5 = voucherRepository.findById(5L).orElse(null);
////        order5.setUser(user5);
////        order5.setCustomer(customer5);
////        order5.setVoucher(voucher5);
////
////        orderRepository.save(order5);
////
////    }
////
////    public void fakeDataOrderDetail() {
////        OrderDetail orderDetail1 = new OrderDetail();
////// Điền thông tin của orderDetail1
////        orderDetail1.setQuantity(2L);
////        orderDetail1.setPrice(50.0);
////        orderDetail1.setTotalMoney(100.0);
////
////        ProductDetail productDetail1 = productDetailRepository.findById(1L).orElse(null);
////        Orders order1 = orderRepository.findById(1L).orElse(null);
////
////        orderDetail1.setProductDetail(productDetail1);
////        orderDetail1.setOrder(order1);
////
////        orderDetailRepository.save(orderDetail1);
////
////        OrderDetail orderDetail2 = new OrderDetail();
////// Điền thông tin của orderDetail2
////        orderDetail2.setQuantity(3L);
////        orderDetail2.setPrice(40.0);
////        orderDetail2.setTotalMoney(120.0);
////
////        ProductDetail productDetail2 = productDetailRepository.findById(2L).orElse(null);
////        Orders order2 = orderRepository.findById(2L).orElse(null);
////
////        orderDetail2.setProductDetail(productDetail2);
////        orderDetail2.setOrder(order2);
////
////        orderDetailRepository.save(orderDetail2);
////
////        OrderDetail orderDetail3 = new OrderDetail();
////// Điền thông tin của orderDetail3
////        orderDetail3.setQuantity(4L);
////        orderDetail3.setPrice(30.0);
////        orderDetail3.setTotalMoney(120.0);
////
////        ProductDetail productDetail3 = productDetailRepository.findById(3L).orElse(null);
////        Orders order3 = orderRepository.findById(3L).orElse(null);
////
////        orderDetail3.setProductDetail(productDetail3);
////        orderDetail3.setOrder(order3);
////
////        orderDetailRepository.save(orderDetail3);
////
////        OrderDetail orderDetail4 = new OrderDetail();
////// Điền thông tin của orderDetail4
////        orderDetail4.setQuantity(2L);
////        orderDetail4.setPrice(60.0);
////        orderDetail4.setTotalMoney(120.0);
////
////        ProductDetail productDetail4 = productDetailRepository.findById(4L).orElse(null);
////        Orders order4 = orderRepository.findById(4L).orElse(null);
////
////        orderDetail4.setProductDetail(productDetail4);
////        orderDetail4.setOrder(order4);
////
////        orderDetailRepository.save(orderDetail4);
////
////        OrderDetail orderDetail5 = new OrderDetail();
////// Điền thông tin của orderDetail5
////        orderDetail5.setQuantity(5L);
////        orderDetail5.setPrice(25.0);
////        orderDetail5.setTotalMoney(125.0);
////
////        ProductDetail productDetail5 = productDetailRepository.findById(5L).orElse(null);
////        Orders order5 = orderRepository.findById(5L).orElse(null);
////
////        orderDetail5.setProductDetail(productDetail5);
////        orderDetail5.setOrder(order5);
////
////        orderDetailRepository.save(orderDetail5);
////
////    }
////
////    public void fakeDataOrderHistory() {
////        OrderHistory orderHistory1 = new OrderHistory();
////// Điền thông tin của orderHistory1
////        orderHistory1.setActionDescription("Đã tiếp nhận đơn hàng");
////
////        Orders order1 = orderRepository.findById(1L).orElse(null);
////
////        orderHistory1.setOrder(order1);
////
////        orderHistoryRepository.save(orderHistory1);
////
////        OrderHistory orderHistory2 = new OrderHistory();
////// Điền thông tin của orderHistory2
////        orderHistory2.setActionDescription("Đang đóng gói sản phẩm");
////
////        Orders order2 = orderRepository.findById(2L).orElse(null);
////
////        orderHistory2.setOrder(order2);
////
////        orderHistoryRepository.save(orderHistory2);
////
////        OrderHistory orderHistory3 = new OrderHistory();
////// Điền thông tin của orderHistory3
////        orderHistory3.setActionDescription("Đã giao cho dịch vụ vận chuyển");
////
////        Orders order3 = orderRepository.findById(3L).orElse(null);
////
////        orderHistory3.setOrder(order3);
////
////        orderHistoryRepository.save(orderHistory3);
////
////        OrderHistory orderHistory4 = new OrderHistory();
////// Điền thông tin của orderHistory4
////        orderHistory4.setActionDescription("Đang vận chuyển");
////
////        Orders order4 = orderRepository.findById(4L).orElse(null);
////
////        orderHistory4.setOrder(order4);
////
////        orderHistoryRepository.save(orderHistory4);
////
////        OrderHistory orderHistory5 = new OrderHistory();
////// Điền thông tin của orderHistory5
////        orderHistory5.setActionDescription("Đã giao hàng thành công");
////
////        Orders order5 = orderRepository.findById(5L).orElse(null);
////
////        orderHistory5.setOrder(order5);
////
////        orderHistoryRepository.save(orderHistory5);
////    }
////
////    public void fakeDataPaymentMethod() {
////        PaymentMethod paymentMethod1 = new PaymentMethod();
////// Điền thông tin của paymentMethod1
////        paymentMethod1.setMethodName("Thanh toán bằng thẻ Visa");
////        paymentMethod1.setDescription("Thanh toán bằng thẻ Visa - hình thức thanh toán an toàn và tiện lợi");
////
////        paymentMethodRepository.save(paymentMethod1);
////
////        PaymentMethod paymentMethod2 = new PaymentMethod();
////// Điền thông tin của paymentMethod2
////        paymentMethod2.setMethodName("Thanh toán bằng thẻ MasterCard");
////        paymentMethod2.setDescription("Thanh toán bằng thẻ MasterCard - hình thức thanh toán toàn cầu");
////
////        paymentMethodRepository.save(paymentMethod2);
////
////        PaymentMethod paymentMethod3 = new PaymentMethod();
////// Điền thông tin của paymentMethod3
////        paymentMethod3.setMethodName("Thanh toán qua PayPal");
////        paymentMethod3.setDescription("Thanh toán qua PayPal - dịch vụ thanh toán trực tuyến phổ biến");
////
////        paymentMethodRepository.save(paymentMethod3);
////
////        PaymentMethod paymentMethod4 = new PaymentMethod();
////// Điền thông tin của paymentMethod4
////        paymentMethod4.setMethodName("Thanh toán khi nhận hàng");
////        paymentMethod4.setDescription("Thanh toán khi nhận hàng - thanh toán tiền mặt khi nhận sản phẩm");
////
////        paymentMethodRepository.save(paymentMethod4);
////
////        PaymentMethod paymentMethod5 = new PaymentMethod();
////// Điền thông tin của paymentMethod5
////        paymentMethod5.setMethodName("Chuyển khoản ngân hàng");
////        paymentMethod5.setDescription("Thanh toán bằng chuyển khoản ngân hàng - cung cấp thông tin tài khoản");
////
////        paymentMethodRepository.save(paymentMethod5);
////
////    }
////
////    public void fakeDataOrderPaymentMethod() {
////        OrderPaymentMethod orderPaymentMethod1 = new OrderPaymentMethod();
////// Điền thông tin của orderPaymentMethod1
////        PaymentMethod paymentMethod1 = paymentMethodRepository.findById(1L).orElse(null);
////        Orders order1 = orderRepository.findById(1L).orElse(null);
////        orderPaymentMethod1.setPaymentMethod(paymentMethod1);
////        orderPaymentMethod1.setOrder(order1);
////        orderPaymentMethod1.setTotalMoney(100.0);
////        orderPaymentMethod1.setCode(QRCodeProduct.generateRandomCode());
////
////        orderPaymentMethodRepository.save(orderPaymentMethod1);
////
////        OrderPaymentMethod orderPaymentMethod2 = new OrderPaymentMethod();
////// Điền thông tin của orderPaymentMethod2
////        PaymentMethod paymentMethod2 = paymentMethodRepository.findById(2L).orElse(null);
////        Orders order2 = orderRepository.findById(2L).orElse(null);
////        orderPaymentMethod2.setPaymentMethod(paymentMethod2);
////        orderPaymentMethod2.setOrder(order2);
////        orderPaymentMethod2.setTotalMoney(150.0);
////        orderPaymentMethod2.setCode(QRCodeProduct.generateRandomCode());
////
////        orderPaymentMethodRepository.save(orderPaymentMethod2);
////
////        OrderPaymentMethod orderPaymentMethod3 = new OrderPaymentMethod();
////// Điền thông tin của orderPaymentMethod3
////        PaymentMethod paymentMethod3 = paymentMethodRepository.findById(3L).orElse(null);
////        Orders order3 = orderRepository.findById(3L).orElse(null);
////        orderPaymentMethod3.setPaymentMethod(paymentMethod3);
////        orderPaymentMethod3.setOrder(order3);
////        orderPaymentMethod3.setTotalMoney(120.0);
////        orderPaymentMethod3.setCode(QRCodeProduct.generateRandomCode());
////
////        orderPaymentMethodRepository.save(orderPaymentMethod3);
////
////        OrderPaymentMethod orderPaymentMethod4 = new OrderPaymentMethod();
////// Điền thông tin của orderPaymentMethod4
////        PaymentMethod paymentMethod4 = paymentMethodRepository.findById(4L).orElse(null);
////        Orders order4 = orderRepository.findById(4L).orElse(null);
////        orderPaymentMethod4.setPaymentMethod(paymentMethod4);
////        orderPaymentMethod4.setOrder(order4);
////        orderPaymentMethod4.setTotalMoney(180.0);
////        orderPaymentMethod4.setCode(QRCodeProduct.generateRandomCode());
////
////        orderPaymentMethodRepository.save(orderPaymentMethod4);
////
////        OrderPaymentMethod orderPaymentMethod5 = new OrderPaymentMethod();
////// Điền thông tin của orderPaymentMethod5
////        PaymentMethod paymentMethod5 = paymentMethodRepository.findById(5L).orElse(null);
////        Orders order5 = orderRepository.findById(5L).orElse(null);
////        orderPaymentMethod5.setPaymentMethod(paymentMethod5);
////        orderPaymentMethod5.setOrder(order5);
////        orderPaymentMethod5.setTotalMoney(130.0);
////        orderPaymentMethod5.setCode(QRCodeProduct.generateRandomCode());
////
////        orderPaymentMethodRepository.save(orderPaymentMethod5);
////
////    }
////
////    public void fakeDataPromotion() {
////        DateTimeUtil dateTimeUtil = new DateTimeUtil();
////
////        Promotion promotion1 = new Promotion();
////        promotion1.setPromotionCode(QRCodeProduct.generateRandomCode());
////        promotion1.setPromotionName("asdas");
////        Long startDate = dateTimeUtil.convertDateToTimeStampSecond();
////        Long endDate = dateTimeUtil.convertDateToTimeStampSecond();
////        promotion1.setStartDate(startDate);
////        promotion1.setEndDate(endDate);
////        promotion1.setValue(20D);
////        promotion1.setType("Percentage");
////        promotion1.setDeleted(true);
////        promotionRepository.save(promotion1);
////
////        Promotion promotion2 = new Promotion();
////        promotion2.setPromotionCode(QRCodeProduct.generateRandomCode());
////        promotion2.setPromotionName("Promo2");
////        promotion2.setStartDate(endDate);
////        promotion2.setEndDate(endDate);
////        promotion2.setValue(15D);
////        promotion2.setType("Percentage"); // Set the promotion type as a string, e.g., "Percentage"
////        promotion2.setDeleted(false);
////        promotionRepository.save(promotion2);
////
////// Promotion 3
////        Promotion promotion3 = new Promotion();
////        promotion3.setPromotionCode(QRCodeProduct.generateRandomCode());
////        promotion3.setPromotionName("Promo3");
////        promotion3.setStartDate(endDate);
////        promotion3.setEndDate(endDate);
////        promotion3.setValue(30D);
////        promotion3.setType("Fixed Amount"); // Set the promotion type as a string, e.g., "Fixed Amount"
////        promotion3.setDeleted(false);
////        promotionRepository.save(promotion3);
////
////// Promotion 4
////        Promotion promotion4 = new Promotion();
////        promotion4.setPromotionCode(QRCodeProduct.generateRandomCode());
////        promotion4.setPromotionName("Promo4");
////        promotion4.setStartDate(endDate);
////        promotion4.setEndDate(endDate);
////        promotion4.setValue(25D);
////        promotion4.setType("Percentage"); // Set the promotion type as a string, e.g., "Percentage"
////        promotion4.setDeleted(true);
////        promotionRepository.save(promotion4);
////
////// Promotion 5
////        Promotion promotion5 = new Promotion();
////        promotion5.setPromotionCode(QRCodeProduct.generateRandomCode());
////        promotion5.setPromotionName("Promo5");
////        promotion5.setStartDate(endDate);
////        promotion5.setEndDate(endDate);
////        promotion5.setValue(50D);
////        promotion5.setType("Fixed Amount"); // Set the promotion type as a string, e.g., "Fixed Amount"
////        promotion5.setDeleted(false);
////        promotionRepository.save(promotion5);
////
////    }
////
////    public void fakeDataPromotionProductDetail() {
////        // Create and save 5 PromotionProductDetail records
////
////        // PromotionProductDetail 1
////        Optional<Promotion> promotion1 = promotionRepository.findById(1L);
////        Optional<ProductDetail> productDetail1 = productDetailRepository.findById(1L);
////        PromotionProductDetail ppd1 = new PromotionProductDetail();
////        ppd1.setPromotion(promotion1.get()); // Assuming you have a Promotion object named 'promotion1'
////        ppd1.setProductDetail(productDetail1.get()); // Assuming you have a ProductDetail object named 'productDetail1'
////        promotionProductDetailRepository.save(ppd1);
////
////        Optional<Promotion> promotion11 = promotionRepository.findById(1L);
////        Optional<ProductDetail> productDetail11 = productDetailRepository.findById(3L);
////        PromotionProductDetail ppd11 = new PromotionProductDetail();
////        ppd11.setPromotion(promotion11.get()); // Assuming you have a Promotion object named 'promotion1'
////        ppd11.setProductDetail(productDetail11.get()); // Assuming you have a ProductDetail object named 'productDetail1'
////        promotionProductDetailRepository.save(ppd11);
////
////        // PromotionProductDetail 2
////        Optional<Promotion> promotion2 = promotionRepository.findById(2L);
////        Optional<ProductDetail> productDetail2 = productDetailRepository.findById(2L);
////        PromotionProductDetail ppd2 = new PromotionProductDetail();
////        ppd2.setPromotion(promotion2.get()); // Assuming you have a Promotion object named 'promotion2'
////        ppd2.setProductDetail(productDetail2.get()); // Assuming you have a ProductDetail object named 'productDetail2'
////        promotionProductDetailRepository.save(ppd2);
////
////        Optional<Promotion> promotion22 = promotionRepository.findById(2L);
////        Optional<ProductDetail> productDetail22 = productDetailRepository.findById(5L);
////        PromotionProductDetail ppd22 = new PromotionProductDetail();
////        ppd22.setPromotion(promotion22.get()); // Assuming you have a Promotion object named 'promotion2'
////        ppd22.setProductDetail(productDetail22.get()); // Assuming you have a ProductDetail object named 'productDetail2'
////        promotionProductDetailRepository.save(ppd22);
////
////        // PromotionProductDetail 3
////        Optional<Promotion> promotion3 = promotionRepository.findById(3L);
////        Optional<ProductDetail> productDetail3 = productDetailRepository.findById(3L);
////        PromotionProductDetail ppd3 = new PromotionProductDetail();
////        ppd3.setPromotion(promotion3.get()); // Assuming you have a Promotion object named 'promotion3'
////        ppd3.setProductDetail(productDetail3.get()); // Assuming you have a ProductDetail object named 'productDetail3'
////        promotionProductDetailRepository.save(ppd3);
////
////        Optional<Promotion> promotion33 = promotionRepository.findById(3L);
////        Optional<ProductDetail> productDetail33 = productDetailRepository.findById(1L);
////        PromotionProductDetail ppd33 = new PromotionProductDetail();
////        ppd33.setPromotion(promotion33.get()); // Assuming you have a Promotion object named 'promotion3'
////        ppd33.setProductDetail(productDetail33.get()); // Assuming you have a ProductDetail object named 'productDetail3'
////        promotionProductDetailRepository.save(ppd33);
////
////        // PromotionProductDetail 4
////        Optional<Promotion> promotion4 = promotionRepository.findById(4L);
////        Optional<ProductDetail> productDetail4 = productDetailRepository.findById(4L);
////        PromotionProductDetail ppd4 = new PromotionProductDetail();
////        ppd4.setPromotion(promotion4.get()); // Assuming you have a Promotion object named 'promotion4'
////        ppd4.setProductDetail(productDetail4.get()); // Assuming you have a ProductDetail object named 'productDetail4'
////        promotionProductDetailRepository.save(ppd4);
////
////        Optional<Promotion> promotion44 = promotionRepository.findById(4L);
////        Optional<ProductDetail> productDetail44 = productDetailRepository.findById(2L);
////        PromotionProductDetail ppd44 = new PromotionProductDetail();
////        ppd44.setPromotion(promotion44.get()); // Assuming you have a Promotion object named 'promotion4'
////        ppd44.setProductDetail(productDetail44.get()); // Assuming you have a ProductDetail object named 'productDetail4'
////        promotionProductDetailRepository.save(ppd44);
////
////        // PromotionProductDetail 5
////        Optional<Promotion> promotion5 = promotionRepository.findById(5L);
////        Optional<ProductDetail> productDetail5 = productDetailRepository.findById(5L);
////        PromotionProductDetail ppd5 = new PromotionProductDetail();
////        ppd5.setPromotion(promotion5.get()); // Assuming you have a Promotion object named 'promotion5'
////        ppd5.setProductDetail(productDetail5.get()); // Assuming you have a ProductDetail object named 'productDetail5'
////        promotionProductDetailRepository.save(ppd5);
////
////        Optional<Promotion> promotion55 = promotionRepository.findById(5L);
////        Optional<ProductDetail> productDetail55 = productDetailRepository.findById(3L);
////        PromotionProductDetail ppd55 = new PromotionProductDetail();
////        ppd55.setPromotion(promotion55.get()); // Assuming you have a Promotion object named 'promotion5'
////        ppd55.setProductDetail(productDetail55.get()); // Assuming you have a ProductDetail object named 'productDetail5'
////        promotionProductDetailRepository.save(ppd55);
////
////
////    }
//>>>>>>> develop_merge_branch
//}