import { Metadata } from 'next';

type PageMetadata = {
  title: string;
  description: string;
  keywords: string[];
};

const metadataTranslations: Record<string, Record<string, PageMetadata>> = {
  en: {
    home: {
      title: "UV Coating & Vacuum Metallizing Plastic Company Indonesia | PT STARPACK INDAHMAJU",
      description: "Get the best UV plastic coating & vacuum metallizing plastic coating services in Indonesia. PT Starpack Indahmaju offers premium, consistent, and ISO 9001:2015 certified plastic coating services.",
      keywords: ["uv coating indonesia", "vacuum metallizing indonesia", "plastic coating services indonesia", "jasa uv coating indonesia", "jasa vacuum metallizing indonesia", "PT Starpack Indahmaju", "plastic coating company"]
    },
    about: {
      title: "About Us - UV Coating & Vacuum Metallizing Company | PT STARPACK INDAHMAJU",
      description: "History, mission, and values of PT Starpack Indahmaju. We are ISO 9001:2015 certified UV Coating and Vacuum Metallizing specialists in Indonesia.",
      keywords: ["About Starpack", "Plastic Coating Company", "Jakarta Coating Factory", "ISO 9001:2015"]
    },
    contact: {
      title: "Contact Us - Plastic Coating Service Consultation | PT STARPACK INDAHMAJU",
      description: "Contact PT Starpack Indahmaju in Jakarta to discuss your plastic product UV coating and vacuum metallizing requirements, pricing, and specifications.",
      keywords: ["Contact Starpack", "Coating Factory Address Jakarta", "UV Plastic Coating Price", "Vacuum Metallizing Service"]
    },
    quality: {
      title: "Quality & Certification - ISO 9001:2015 Certified | PT STARPACK INDAHMAJU",
      description: "Discover our rigorous quality control procedures and ISO 9001:2015 certification for premium UV coating and vacuum metallizing in Indonesia.",
      keywords: ["Starpack Certification", "ISO 9001:2015 Coating", "Quality Control Plastic", "Standard Quality Jakarta"]
    },
    technology: {
      title: "Advanced Plastic Coating Technology & Machinery | PT STARPACK INDAHMAJU",
      description: "Explore our state-of-the-art facilities equipped with advanced UV coating systems and industrial vacuum metallizing chambers in Indonesia.",
      keywords: ["plastic coating technology indonesia", "uv coating machine indonesia", "vacuum metallizing technology", "industrial plastic coating", "PT Starpack Indahmaju"]
    },
    "uv-coating": {
      title: "Advanced UV Coating Technology for Plastics | PT STARPACK INDAHMAJU",
      description: "Innovative UV plastic coating services offering high-gloss, matte, soft touch, and specialized tactile finishes with instant UV curing.",
      keywords: ["uv coating indonesia", "uv plastic coating indonesia", "jasa uv coating indonesia", "uv coating services jakarta", "soft touch coating", "matte uv coating"]
    },
    "vacuum-metallizing": {
      title: "Premium Vacuum Metallizing Plastic Plating | PT STARPACK INDAHMAJU",
      description: "Industrial vacuum metallizing services in Indonesia. Get high-reflective chrome, gold, and colorful metallic finishes on plastic products.",
      keywords: ["vacuum metallizing indonesia", "vacuum metallizing jakarta", "jasa vacuum metallizing indonesia", "plastic chrome plating indonesia", "reflective metal coating", "vacuum chamber plating"]
    },
    industries: {
      title: "Industries Served - Custom Plastic Coating Solutions | PT STARPACK INDAHMAJU",
      description: "Custom plastic coating services for cosmetic packaging, automotive parts, consumer electronics, home lifestyle, and fashion accessories.",
      keywords: ["Cosmetic Packaging Coating", "Automotive Parts Coating", "Electronic Plastic Finish", "Accessories Plating"]
    },
    "beauty-cosmetics": {
      title: "Cosmetic & Beauty Packaging UV Coating | PT STARPACK INDAHMAJU",
      description: "Elevate your cosmetics brand with premium UV coating and vacuum metallizing for lipstick tubes, mascara caps, creams, and compacts.",
      keywords: ["Cosmetic Bottle Coating", "Lipstick Cap Plating", "Beauty Product Finishing", "Premium Cosmetics Packaging"]
    },
    electronics: {
      title: "Consumer Electronics Plastic Coating Services | PT STARPACK INDAHMAJU",
      description: "Durable and protective UV coating and metallized finishes for consumer electronics, home appliances, and custom components.",
      keywords: ["Electronic Component Coating", "Appliance Plastic Finish", "Protective UV Coating", "Electronic Shell Metallizing"]
    },
    fashion: {
      title: "Fashion Products Aesthetic Plastic Coating | PT STARPACK INDAHMAJU",
      description: "Stunning metallic chrome, glossy, and custom colored plastic coating to add premium aesthetic value to fashion products and retail displays.",
      keywords: ["Fashion Component Plating", "High-Gloss Fashion Finish", "Aesthetic Plastic Coating", "Creative Color Coating"]
    },
    "fashion-accessories": {
      title: "Fashion Accessories Decorative Plating | PT STARPACK INDAHMAJU",
      description: "High-precision decorative metal plating and UV coating for bag parts, shoe components, buttons, and custom fashion accessories.",
      keywords: ["Shoe Accessory Plating", "Bag Component Coating", "Decorative Accessory Finish", "Metal Look Plastics"]
    },
    accessories: {
      title: "Premium Accessories Plastic Coating & Plating | PT STARPACK INDAHMAJU",
      description: "High-precision decorative plating and custom coating solutions for diverse plastic accessory components and product elements.",
      keywords: ["Plastic Accessories Plating", "Custom Component Coating", "Decorative Plastic Finishing", "Starpack Accessories"]
    },
    "home-lifestyle": {
      title: "Home & Lifestyle Products Durable Coating | PT STARPACK INDAHMAJU",
      description: "Protective and highly aesthetic UV coating and vacuum metallizing for home decor, kitchenware, furniture parts, and lifestyle products.",
      keywords: ["Home Decor Coating", "Furniture Plastic Finishing", "Durable Kitchenware Coating", "Lifestyle Product Plating"]
    },
    automotive: {
      title: "Automotive Interior & Exterior Plastic Coating | PT STARPACK INDAHMAJU",
      description: "Robust, scratch-resistant, and high-precision UV coating and vacuum metallizing services for automotive plastic trims and components.",
      keywords: ["Automotive Plastic Trim", "Car Interior Coating", "Scratch-Resistant Plastic Plating", "Auto Component Metallizing"]
    },
    footwear: {
      title: "Footwear Accessories Plastic Coating & Plating | PT STARPACK INDAHMAJU",
      description: "Specialized coating and vacuum metallizing for footwear components, heels, buckles, and decorative elements to ensure durability and style.",
      keywords: ["Heel Coating Services", "Footwear Buckle Plating", "Durable Shoe Component Finish", "Starpack Footwear"]
    },
    "many-more": {
      title: "Diverse Industrial Plastic Coating Services | PT STARPACK INDAHMAJU",
      description: "Discover our specialized custom coating solutions for toys, medical devices, promotional items, and other diverse plastic products.",
      keywords: ["Toy Plastic Coating", "Medical Device Shell Finish", "Custom Industrial Plating", "Specialized Coating Jakarta"]
    },
    insights: {
      title: "Company Insights & News - UV Coating Industry | PT STARPACK INDAHMAJU",
      description: "Stay updated with the latest news, industrial insights, quality standards, and technology trends in plastic coating and metallizing.",
      keywords: ["Starpack News", "Plastic Coating Trends", "Industrial Vacuum Metallizing Articles", "Quality Coating Updates"]
    },
    sitemap: {
      title: "Sitemap - PT STARPACK INDAHMAJU",
      description: "Find and navigate through all pages, industries, technologies, and services of PT Starpack Indahmaju.",
      keywords: ["Starpack Sitemap", "Website Map", "Starpack Pages Navigation"]
    },
    portfolio: {
      title: "Our Client Portfolio - Brand Partners | PT STARPACK INDAHMAJU",
      description: "Explore the brands and manufacturers that trust PT Starpack Indahmaju for premium UV coating and vacuum metallizing plastic finishing in Indonesia.",
      keywords: ["Starpack portfolio", "client brand logos", "cosmetic brand partners", "plastic finishing portfolio", "vacuum metallizing portfolio", "uv coating client list"]
    }
  },
  id: {
    home: {
      title: "Perusahaan UV Coating & Vacuum Metallizing Plastik Indonesia | PT STARPACK INDAHMAJU",
      description: "Dapatkan jasa UV plastic coating & vacuum metallizing plastic coating terbaik di Indonesia. PT Starpack Indahmaju menawarkan coating plastic service premium, konsisten, dan bersertifikasi ISO 9001:2015.",
      keywords: ["uv coating indonesia", "vacuum metallizing indonesia", "jasa uv coating indonesia", "jasa vacuum metallizing indonesia", "pabrik uv coating indonesia", "pabrik vacuum metallizing indonesia", "PT Starpack Indahmaju"]
    },
    about: {
      title: "Tentang Kami - Perusahaan UV Coating & Vacuum Metallizing | PT STARPACK INDAHMAJU",
      description: "Sejarah, misi, dan nilai-nilai PT Starpack Indahmaju. Kami adalah spesialis UV Coating dan Vacuum Metallizing bersertifikasi ISO 9001:2015 di Indonesia.",
      keywords: ["Tentang Starpack", "Perusahaan Coating Plastik", "Pabrik UV Coating Jakarta", "Vacuum Metallizing Indonesia"]
    },
    contact: {
      title: "Hubungi Kami - Konsultasi Jasa Coating Plastik | PT STARPACK INDAHMAJU",
      description: "Hubungi tim ahli PT Starpack Indahmaju di Jakarta untuk mendiskusikan kebutuhan harga dan spesifikasi UV coating & vacuum metallizing produk Anda.",
      keywords: ["Kontak Starpack", "Alamat Pabrik Coating Jakarta", "Harga UV Coating Plastik", "Jasa Vacuum Metallizing"]
    },
    quality: {
      title: "Kualitas & Sertifikasi - Terakreditasi ISO 9001:2015 | PT STARPACK INDAHMAJU",
      description: "Temukan prosedur kontrol kualitas yang ketat dan sertifikasi ISO 9001:2015 kami untuk UV coating dan vacuum metallizing premium di Indonesia.",
      keywords: ["Sertifikasi Starpack", "Coating ISO 9001:2015", "Kontrol Kualitas Plastik", "Standar Kualitas Jakarta"]
    },
    technology: {
      title: "Teknologi & Mesin Coating Plastik Canggih | PT STARPACK INDAHMAJU",
      description: "Jelajahi fasilitas modern kami yang dilengkapi dengan sistem UV coating canggih dan kamar vacuum metallizing industri terbaik di Indonesia.",
      keywords: ["teknologi coating indonesia", "kamar vakum jakarta", "mesin uv curing indonesia", "mesin coating plastik", "PT Starpack Indahmaju"]
    },
    "uv-coating": {
      title: "Teknologi UV Coating Plastik Terdepan | PT STARPACK INDAHMAJU",
      description: "Jasa UV plastic coating inovatif menawarkan hasil akhir high-gloss, matte, soft touch, dan efek taktil khusus dengan pengeringan UV instan.",
      keywords: ["uv coating indonesia", "jasa uv coating indonesia", "jasa uv coating jakarta", "uv plastic coating indonesia", "pabrik uv coating jakarta", "coating plastik premium"]
    },
    "vacuum-metallizing": {
      title: "Jasa Vacuum Metallizing & Chrome Plastik Premium | PT STARPACK INDAHMAJU",
      description: "Layanan vacuum metallizing industri di Indonesia. Dapatkan finishing chrome reflektif tinggi, emas, dan logam berwarna pada produk plastik.",
      keywords: ["vacuum metallizing indonesia", "jasa vacuum metallizing indonesia", "jasa vacuum metallizing jakarta", "jasa chrome plastik indonesia", "chrome plastik jakarta", "pabrik vacuum metallizing"]
    },
    industries: {
      title: "Bidang Industri - Solusi Kustom Coating Plastik | PT STARPACK INDAHMAJU",
      description: "Jasa pelapisan plastik kustom untuk kemasan kosmetik, suku cadang otomotif, elektronik konsumen, peralatan rumah tangga, dan aksesoris fashion.",
      keywords: ["Coating Kemasan Kosmetik", "Coating Komponen Otomotif", "Finishing Plastik Elektronik", "Plating Aksesoris"]
    },
    "beauty-cosmetics": {
      title: "Coating Kemasan Kosmetik & Kecantikan Premium | PT STARPACK INDAHMAJU",
      description: "Tingkatkan nilai merek kosmetik Anda dengan UV coating dan vacuum metallizing premium untuk lipstik, maskara, wadah krim, dan bedak kompak.",
      keywords: ["Coating Botol Kosmetik", "Plating Tutup Lipstik", "Finishing Produk Kecantikan", "Kemasan Kosmetik Premium"]
    },
    electronics: {
      title: "Jasa Coating Plastik Elektronik Konsumen | PT STARPACK INDAHMAJU",
      description: "Finishing UV coating dan metallizing yang tahan lama dan protektif untuk produk elektronik konsumen, peralatan rumah tangga, dan suku cadang.",
      keywords: ["Coating Komponen Elektronik", "Finishing Plastik Alat Rumah Tangga", "UV Coating Protektif", "Metalisasi Casing Elektronik"]
    },
    fashion: {
      title: "Coating Plastik Estetis Produk Fashion | PT STARPACK INDAHMAJU",
      description: "Finishing chrome logam, glossy, dan warna kustom yang memukau untuk menambahkan nilai estetika premium pada produk fashion dan pajangan ritel.",
      keywords: ["Plating Komponen Fashion", "Finishing Fashion High-Gloss", "Coating Plastik Estetis", "Coating Warna Kreatif"]
    },
    "fashion-accessories": {
      title: "Plating Dekoratif Aksesoris Fashion | PT STARPACK INDAHMAJU",
      description: "Plating logam dekoratif presisi tinggi dan UV coating untuk komponen tas, sepatu, kancing baju, dan aksesoris fashion kustom.",
      keywords: ["Plating Aksesoris Sepatu", "Coating Komponen Tas", "Finishing Aksesoris Dekoratif", "Plastik Tampilan Logam"]
    },
    accessories: {
      title: "Jasa Coating & Plating Aksesoris Premium | PT STARPACK INDAHMAJU",
      description: "Solusi plating dekoratif presisi tinggi dan pelapisan kustom untuk berbagai komponen aksesoris plastik dan elemen produk.",
      keywords: ["Plating Aksesoris Plastik", "Coating Komponen Kustom", "Finishing Dekoratif Plastik", "Aksesoris Starpack"]
    },
    "home-lifestyle": {
      title: "Coating Tahan Lama Produk Rumah Tangga & Gaya Hidup | PT STARPACK INDAHMAJU",
      description: "UV coating dan vacuum metallizing pelindung bernilai estetika tinggi untuk dekorasi rumah, peralatan dapur, suku cadang furnitur, dan produk gaya hidup.",
      keywords: ["Coating Dekorasi Rumah", "Finishing Plastik Furnitur", "Coating Alat Dapur Kuat", "Plating Produk Gaya Hidup"]
    },
    automotive: {
      title: "Coating Plastik Otomotif Interior & Eksterior | PT STARPACK INDAHMAJU",
      description: "Jasa UV coating dan vacuum metallizing tahan gores presisi tinggi untuk trim plastik dan komponen eksterior/interior otomotif.",
      keywords: ["Trim Plastik Otomotif", "Coating Interior Mobil", "Plating Plastik Tahan Gores", "Metalisasi Komponen Mobil"]
    },
    footwear: {
      title: "Coating & Plating Plastik Aksesoris Sepatu/Alas Kaki | PT STARPACK INDAHMAJU",
      description: "Pelapisan khusus dan vacuum metallizing untuk komponen alas kaki, hak sepatu (heels), gesper, dan elemen dekoratif untuk ketahanan dan gaya.",
      keywords: ["Jasa Coating Hak Sepatu", "Plating Gesper Alas Kaki", "Finishing Komponen Sepatu Awet", "Footwear Starpack"]
    },
    "many-more": {
      title: "Layanan Coating Plastik Berbagai Sektor Industri | PT STARPACK INDAHMAJU",
      description: "Temukan solusi coating kustom khusus kami untuk mainan anak, wadah alat medis, produk promosi, dan produk plastik industri lainnya.",
      keywords: ["Coating Plastik Mainan", "Finishing Wadah Alat Medis", "Plating Kustom Industri", "Coating Khusus Jakarta"]
    },
    insights: {
      title: "Wawasan & Berita Perusahaan - Industri UV Coating | PT STARPACK INDAHMAJU",
      description: "Ikuti perkembangan berita terbaru, wawasan industri, standar kualitas, dan tren teknologi dalam pelapisan plastik dan metalisasi.",
      keywords: ["Berita Starpack", "Tren Coating Plastik", "Artikel Vacuum Metallizing Industri", "Update Kualitas Coating"]
    },
    sitemap: {
      title: "Peta Situs (Sitemap) - PT STARPACK INDAHMAJU",
      description: "Temukan dan jelajahi seluruh halaman, industri, teknologi, dan layanan dari PT Starpack Indahmaju.",
      keywords: ["Sitemap Starpack", "Peta Navigasi Situs", "Navigasi Halaman Starpack"]
    },
    portfolio: {
      title: "Portofolio Klien Kami - Mitra Brand | PT STARPACK INDAHMAJU",
      description: "Jelajahi merek dan produsen terkemuka yang mempercayakan PT Starpack Indahmaju untuk layanan finishing plastik UV coating dan vacuum metallizing premium di Indonesia.",
      keywords: ["portofolio Starpack", "logo brand klien", "mitra merek kosmetik", "portofolio finishing plastik", "mitra vacuum metallizing", "daftar klien uv coating"]
    }
  },
  zh: {
    home: {
      title: "印尼塑料UV喷涂与真空电镀加工厂 | PT STARPACK INDAHMAJU",
      description: "获取印尼最优质的塑料UV喷涂与真空电镀服务。PT Starpack Indahmaju提供优质、一致且通过ISO 9001:2015认证的塑料表面涂装加工服务。",
      keywords: ["塑料涂装服务", "印尼真空电镀加工", "塑料UV喷涂", "PT Starpack Indahmaju"]
    },
    about: {
      title: "关于我们 - 塑料UV喷涂与真空电镀公司 | PT STARPACK INDAHMAJU",
      description: "PT Starpack Indahmaju的发展历程、企业使命和价值观。我们是印尼通过ISO 9001:2015认证的专业塑料UV喷涂与真空电镀加工服务商。",
      keywords: ["关于Starpack", "塑料涂装公司", "雅加达喷涂厂", "ISO 9001:2015认证"]
    },
    contact: {
      title: "联系我们 - 塑料涂装及电镀技术咨询 | PT STARPACK INDAHMAJU",
      description: "联系位于雅加达的PT Starpack Indahmaju专家团队，共同商讨您的塑料制品UV喷涂与真空电镀的产品规格、价格及定制要求。",
      keywords: ["联系Starpack", "雅加达涂装厂地址", "UV塑料喷涂价格", "真空电镀服务"]
    },
    quality: {
      title: "品质与认证 - ISO 9001:2015国际标准 | PT STARPACK INDAHMAJU",
      description: "了解我们严格的品质控制流程以及针对高端UV喷涂与真空电镀所取得的ISO 9001:2015国际质量管理体系认证。",
      keywords: ["Starpack品质认证", "ISO 9001:2015涂装", "塑料质量检测", "雅加达高标准制造"]
    },
    technology: {
      title: "先进塑料表面涂装技术与专业设备 | PT STARPACK INDAHMAJU",
      description: "探索我们位于印尼的现代化制造工厂，配备先进的自动化UV喷涂生产线以及工业级真空电镀镀膜舱。",
      keywords: ["涂装工艺技术", "雅加达真空镀膜舱", "UV光固化机", "塑料表面处理设备"]
    },
    "uv-coating": {
      title: "先进塑料UV喷涂及光固化表面处理 | PT STARPACK INDAHMAJU",
      description: "创新的塑料UV涂装服务，提供高光、哑光、亲肤触感（Soft Touch）及各种特殊效果的表面工艺与瞬间UV固化。",
      keywords: ["塑料UV喷涂", "亲肤触感涂层", "涂装表面效果", "哑光UV喷涂"]
    },
    "vacuum-metallizing": {
      title: "优质真空电镀与塑料表面金属化 | PT STARPACK INDAHMAJU",
      description: "印尼专业的工业级真空电镀服务。为您提供塑料制品的镜面铬（Chrome）、金属金以及丰富多彩的金属色电镀层。",
      keywords: ["真空电镀", "塑料镀铬加工", "高反光金属涂层", "真空镀膜服务"]
    },
    industries: {
      title: "服务行业 - 定制塑料表面处理解决方案 | PT STARPACK INDAHMAJU",
      description: "为化妆品包装、汽车内外饰件、消费电子、家居生活及服饰配饰提供定制化塑料涂装与电镀处理服务。",
      keywords: ["化妆品包装涂装", "汽车塑料件电镀", "电子塑料表面处理", "配饰金属化加工"]
    },
    "beauty-cosmetics": {
      title: "化妆品及美容包材高端UV喷涂与电镀 | PT STARPACK INDAHMAJU",
      description: "为口红管、睫毛膏盖、面霜瓶及粉盒等提供高级UV喷涂与真空电镀工艺，全面提升您的化妆品品牌溢价。",
      keywords: ["化妆品瓶涂装", "口红管盖电镀", "美容产品表面处理", "高端美妆包装"]
    },
    electronics: {
      title: "消费电子塑料外壳涂装与电镀加工 | PT STARPACK INDAHMAJU",
      description: "为消费电子产品、家用电器外壳及定制配件提供耐磨、防刮且美观的UV喷涂与真空金属化电镀保护层。",
      keywords: ["电子配件喷涂", "家电塑料表面处理", "保护性UV涂层", "电子外壳真空电镀"]
    },
    fashion: {
      title: "时尚潮流产品美学塑料涂装服务 | PT STARPACK INDAHMAJU",
      description: "迷人的镜面铬、高光及定制多色涂装，为各类潮流单品、时尚配件以及零售展示道具增添高端美学价值。",
      keywords: ["时尚单品电镀", "高光时尚表面", "美学塑料涂装", "创意彩色喷涂"]
    },
    "fashion-accessories": {
      title: "时尚配饰及箱包鞋材装饰性电镀 | PT STARPACK INDAHMAJU",
      description: "为包扣、鞋材配件、钮扣及各类定制时尚饰品提供高精度装饰性金属电镀与耐磨UV保护层处理。",
      keywords: ["鞋材配件电镀", "箱包配件喷涂", "装饰性饰品涂装", "金属质感塑料"]
    },
    accessories: {
      title: "高端配饰塑料涂装与高精度电镀 | PT STARPACK INDAHMAJU",
      description: "为多种塑料配饰部件、日用品构件以及定制产品元素提供高精度装饰性电镀与表面涂装解决方案。",
      keywords: ["塑料配饰电镀", "定制配件涂装", "装饰性塑料加工", "Starpack配饰服务"]
    },
    "home-lifestyle": {
      title: "家居及生活用品耐用性塑料表面处理 | PT STARPACK INDAHMAJU",
      description: "为家居装饰品、高端餐具、家具塑料件及生活方式用品提供具备高防护性和极佳视觉美感的UV喷涂与真空电镀服务。",
      keywords: ["家居装饰涂装", "家具塑料表面处理", "耐用餐具喷涂", "生活用品电镀加工"]
    },
    automotive: {
      title: "汽车内饰与外观塑料件高规格喷涂 | PT STARPACK INDAHMAJU",
      description: "为汽车塑料格栅、内饰饰条及各类汽车塑件提供耐候、抗刮擦且高精度的高规格UV喷涂与真空电镀加工。",
      keywords: ["汽车塑料内饰", "汽车中控饰条喷涂", "抗刮擦塑料电镀", "汽车塑件金属化"]
    },
    footwear: {
      title: "鞋类塑料配件及鞋跟高光电镀与涂装 | PT STARPACK INDAHMAJU",
      description: "为鞋跟（Heels）、鞋扣及各类鞋类装饰件提供高附着力的电镀与真空表面处理，确保美观与卓越的耐用度。",
      keywords: ["鞋跟电镀加工", "鞋扣装饰性涂装", "鞋类配件表面处理", "Starpack鞋材"]
    },
    "many-more": {
      title: "多领域工业及消费塑料表面处理 | PT STARPACK INDAHMAJU",
      description: "为儿童玩具、医疗器械塑料外壳、创意促销礼品等更多领域的塑料制品提供专业的定制喷涂与电镀加工。",
      keywords: ["玩具塑料喷涂", "医疗外壳表面处理", "定制工业电镀", "雅加达专业塑件涂装"]
    },
    insights: {
      title: "行业资讯与企业动态 - 塑料涂装前沿 | PT STARPACK INDAHMAJU",
      description: "密切关注塑料喷涂与真空电镀领域的最新行业新闻、技术升级、质量标准及最新的表面效果设计趋势。",
      keywords: ["Starpack动态", "塑料涂装趋势", "真空电镀文章", "质量标准更新"]
    },
    sitemap: {
      title: "网站地图 (Sitemap) - PT STARPACK INDAHMAJU",
      description: "快速查找并浏览 PT Starpack Indahmaju 的所有网页、所服务行业、核心技术及表面加工效果。",
      keywords: ["Starpack网站地图", "页面指南", "网站导航"]
    },
    portfolio: {
      title: "客户案例与品牌合作伙伴 | PT STARPACK INDAHMAJU",
      description: "了解信赖 PT Starpack Indahmaju 的品牌和制造商，我们在印尼提供优质的塑料UV喷涂与真空电镀加工服务。",
      keywords: ["Starpack客户案例", "品牌标识", "化妆品品牌伙伴", "塑料表面涂装案例", "真空电镀案例", "UV喷涂客户列表"]
    }
  },
  jp: {
    home: {
      title: "インドネシアのプラスチックUVコーティング＆真空蒸着加工メーカー | PT STARPACK INDAHMAJU",
      description: "インドネシアで最高のプラスチックUVコーティングおよび真空蒸着サービスを提供します。PT Starpack Indahmajuは、プレミアムで一貫した、ISO 9001:2015認証のプラスチックコーティングサービスを提供します。",
      keywords: ["プラスチックコーティングサービス", "インドネシア真空蒸着加工", "プラスチックUV塗装", "PT Starpack Indahmaju"]
    },
    about: {
      title: "会社概要 - UVコーティング＆真空蒸着メーカー | PT STARPACK INDAHMAJU",
      description: "PT Starpack Indahmajuの沿革、使命、価値観。インドネシアでISO 9001:2015認証を取得したUVコーティングおよび真空蒸着のスペシャリストです。",
      keywords: ["Starpackについて", "プラスチックコーティング企業", "ジャカルタ塗装工場", "ISO 9001:2015認証"]
    },
    contact: {
      title: "お問い合わせ - プラスチック塗装・蒸着の仕様相談 | PT STARPACK INDAHMAJU",
      description: "プラスチック製品のUV塗装や真空蒸着の価格、仕様、ご要望について、ジャカルタのPT Starpack Indahmajuの専門チームへお気軽にご相談ください。",
      keywords: ["Starpack連絡先", "ジャカルタ工場住所", "UV塗装価格", "真空蒸着サービス"]
    },
    quality: {
      title: "品質と認証 - ISO 9001:2015国際規格取得 | PT STARPACK INDAHMAJU",
      description: "インドネシアにおけるプレミアムなUVコーティングおよび真空蒸着サービスを支える、当社の厳格な品質管理プロセスとISO 9001:2015認証についてご紹介します。",
      keywords: ["Starpack品質認証", "ISO 9001:2015コーティング", "プラスチック品質検査", "ジャカルタ品質管理"]
    },
    technology: {
      title: "先進プラスチックコーティング技術と最先端設備 | PT STARPACK INDAHMAJU",
      description: "インドネシアで稼働する、高度な自動化UV塗装ラインおよび工業用真空蒸着チャンバーを備えた最新鋭の製造施設をご案内します。",
      keywords: ["コーティング技術プロセス", "ジャカルタ真空チャンバー", "UV照射硬化機", "プラスチック表面処理設備"]
    },
    "uv-coating": {
      title: "高度なプラスチックUVコーティングと表面保護 | PT STARPACK INDAHMAJU",
      description: "瞬間UV硬化プロセスを用いた、高光沢、つや消し（マット）、ソフトタッチ、特殊質感などのプラスチック製品向け革新的UV塗装サービス。",
      keywords: ["プラスチックUV塗装", "ソフトタッチコーティング", "塗装仕上がり効果", "マットUV塗装"]
    },
    "vacuum-metallizing": {
      title: "高品質真空蒸着とプラスチック鏡面メッキ | PT STARPACK INDAHMAJU",
      description: "インドネシアの工業用真空蒸着加工サービス。プラスチック製品に高反射鏡面クローム、ゴールド、および様々なカラーメタリック加工を施します。",
      keywords: ["真空蒸着加工", "プラスチッククロームメッキ", "高反射金属コーティング", "蒸着チャンバーサービス"]
    },
    industries: {
      title: "提供業界 - カスタムプラスチックコーティング解決策 | PT STARPACK INDAHMAJU",
      description: "化粧品容器パッケージ、自動車内装・外装用プラスチック部品、家電、生活用品、およびファッションアクセサリー向けの塗装・蒸着加工。",
      keywords: ["化粧品パッケージ塗装", "自動車部品コーティング", "電子機器プラスチック処理", "ファッションアクセサリーメッキ"]
    },
    "beauty-cosmetics": {
      title: "高級化粧品・美容容器向けUVコーティング＆蒸着 | PT STARPACK INDAHMAJU",
      description: "口紅チューブ、マスカラキャップ、クリームジャー、コンパクトケース等に上質なUV塗装と真空蒸着を施し、コスメブランドの価値を高めます。",
      keywords: ["化粧品ボトル塗装", "口紅キャップメッキ", "コスメ仕上げ処理", "高級美包装パッケージ"]
    },
    electronics: {
      title: "家電・電子機器プラスチック外装のコーティング塗装 | PT STARPACK INDAHMAJU",
      description: "コンシューマー電子機器、家庭用電化製品のプラスチック製筐体や部品向けに、耐久性・耐擦傷性の高いUV塗装と蒸着加工を提供します。",
      keywords: ["電子部品塗装", "家電プラスチック仕上げ", "保護用UVコーティング", "電子機器外装真空蒸着"]
    },
    fashion: {
      title: "ファッション製品向け意匠性プラスチックコーティング | PT STARPACK INDAHMAJU",
      description: "鏡面クローム、高光沢、カスタムカラーなど、アパレルやディスプレイ用品のプラスチック部に高い審美性と付加価値をもたらす塗装処理。",
      keywords: ["ファッションパーツメッキ", "高光沢メタリック仕上げ", "意匠性プラスチック塗装", "カラーコーティング"]
    },
    "fashion-accessories": {
      title: "ファッション小物品・靴材・鞄パーツの装飾メッキ | PT STARPACK INDAHMAJU",
      description: "バッグ用金具、靴用ヒールパーツ、ボタン、各種カスタムアクセサリーに高精度な装飾金属メッキおよびUV塗装層を施します。",
      keywords: ["靴材パーツメッキ", "バッグバックル塗装", "装飾用金具コーティング", "金属感プラスチック加工"]
    },
    accessories: {
      title: "高級アクセサリープラスチック塗装＆高精度メッキ | PT STARPACK INDAHMAJU",
      description: "様々なプラスチック製装飾部材、日用品パーツ、カスタムプロダクトエレメント向けに高精度な装飾メッキおよび表面塗装の解決策を提供します。",
      keywords: ["プラスチックアクセサリーメッキ", "カスタム部品コーティング", "装飾用プラスチック処理", "Starpack部材処理"]
    },
    "home-lifestyle": {
      title: "生活雑貨・インテリア用品向け耐久性プラスチックコーティング | PT STARPACK INDAHMAJU",
      description: "ホームデコレーション、テーブルウェア、家具用プラスチックパーツ、生活雑貨向けに、意匠性と耐久性を兼ね備えたUV塗装と真空蒸着を提供します。",
      keywords: ["インテリア装飾塗装", "家具部材プラスチック仕上げ", "耐久食器コーティング", "生活雑貨メッキ加工"]
    },
    automotive: {
      title: "自動車内装・外装用プラスチック部品の耐候塗装 | PT STARPACK INDAHMAJU",
      description: "自動車用フロントグリル、内装用プラスチックトリム、各種パーツ向けに、高耐候性・耐擦傷性に優れたUV塗装および真空蒸着を提供します。",
      keywords: ["自動車プラスチック内装", "カーステレオパネル塗装", "耐擦傷プラスチックメッキ", "オートパーツ真空蒸着"]
    },
    footwear: {
      title: "フットウェア靴材・ヒール・バックルの装飾メッキと塗装 | PT STARPACK INDAHMAJU",
      description: "ヒールパーツ（Heels）、靴バックル、各種装飾エレメント向けに、密着性が高く耐久性に優れたメッキおよび真空表面処理加工を施します。",
      keywords: ["ヒール塗装加工", "靴バックルメッキ", "フットウェア部品処理", "Starpack靴材加工"]
    },
    "many-more": {
      title: "多様な産業・玩具・玩具向けプラスチックコーティング | PT STARPACK INDAHMAJU",
      description: "子供用玩具、医療機器のプラスチック製筐体、各種ノベルティプロモーション製品などの多様なプラスチック製品に対応したカスタム塗装＆電鍍ソリューション。",
      keywords: ["玩具プラスチック塗装", "医療用カバー表面処理", "カスタム工業用電鍍", "ジャカルタプラスチック塗装"]
    },
    insights: {
      title: "インサイトと企業活動ニュース - コーティング業界動向 | PT STARPACK INDAHMAJU",
      description: "プラスチック塗装および真空蒸着業界における最新ニュース、技術進歩、品質規格、最新デザインのトレンドについて発信します。",
      keywords: ["Starpackニュース", "プラスチック塗装トレンド", "真空蒸着技術記事", "品質管理更新"]
    },
    sitemap: {
      title: "サイトマップ (Sitemap) - PT STARPACK INDAHMAJU",
      description: "PT Starpack Indahmaju のすべてのWebページ、提供業界、保有技術、および仕上がり効果を一覧から探せます。",
      keywords: ["Starpackサイトマップ", "ページ一覧案内", "サイトナビゲーション"]
    },
    portfolio: {
      title: "実績・クライアント紹介 | PT STARPACK INDAHMAJU",
      description: "インドネシアでプレミアムなUVコーティングと真空蒸着プラスチック加工を提供するPT Starpack Indahmajuを信頼するブランドとメーカーをご紹介します。",
      keywords: ["Starpack実績", "クライアントブランドロゴ", "化粧品ブランドパートナー", "プラスチック加工ポートフォリオ", "真空蒸着実績", "UVコーティング顧客リスト"]
    }
  }
};

export function getMetadataTranslation(lang: string, pageKey: string): PageMetadata {
  const normalizedLang = lang === 'ja' ? 'jp' : lang; // handle ja vs jp mapping
  const langData = metadataTranslations[normalizedLang] || metadataTranslations.id;
  const pageData = langData[pageKey] || langData.home;
  return pageData;
}

export function generateDynamicMetadata(lang: string, pageKey: string, baseMetadata: Partial<Metadata> = {}): Metadata {
  const data = getMetadataTranslation(lang, pageKey);
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://starpack.co.id';
  const siteUrl = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;
  
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: data.title,
      template: "%s | PT STARPACK INDAHMAJU"
    },
    description: data.description,
    keywords: data.keywords,
    alternates: {
      languages: {
        'id': `/id/${pageKey === 'home' ? '' : pageKey}`,
        'en': `/en/${pageKey === 'home' ? '' : pageKey}`,
        'zh': `/zh/${pageKey === 'home' ? '' : pageKey}`,
        'ja': `/jp/${pageKey === 'home' ? '' : pageKey}`
      },
    },
    openGraph: {
      type: "website",
      locale: lang === 'en' ? "en_US" : lang === 'zh' ? "zh_CN" : lang === 'ja' ? "ja_JP" : "id_ID",
      url: `${siteUrl}/${lang}/${pageKey === 'home' ? '' : pageKey}`,
      title: data.title,
      description: data.description,
      siteName: "PT STARPACK INDAHMAJU",
      images: [
        {
          url: "/images/og-starpack.png",
          width: 1200,
          height: 630,
          alt: data.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: ["/images/og-starpack.png"],
    },
    ...baseMetadata
  };
}
