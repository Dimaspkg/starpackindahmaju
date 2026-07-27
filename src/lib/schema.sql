CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  interest VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'contacted', 'qualified', 'closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT,
  description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS brochures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  file_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customer_logos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(255) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Default Admin User (Username: admin, Password: admin123)
INSERT IGNORE INTO users (id, username, password, role) VALUES 
(1, 'admin', '$2b$10$jOiq3cGERpaQ5qHkmwvkIuslaeRrzeiDo4NCQKiNzOXYcKS2quuwO', 'admin');

-- Default Settings for Email Routing
INSERT IGNORE INTO settings (setting_key, setting_value, description) VALUES 
('email_routing_enabled', 'true', 'Enable or disable automatic email notifications'),
('notification_recipient', 'marketing@starpack.co.id', 'Main email address to receive lead notifications'),
('smtp_sender_name', 'Starpack Admin', 'Name that appears as the sender'),
('email_footer', 'Sent from Starpack Dashboard', 'Footer text for automated emails');

-- Default Customer Logos
INSERT IGNORE INTO customer_logos (id, name, logo_url, display_order) VALUES
(1, 'Nike', '/images/nike_logo.svg', 1);


-- Dynamic Posts Table (English only)
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  image VARCHAR(255) DEFAULT '/images/default_insight.png',
  status ENUM('draft', 'published') DEFAULT 'draft',
  author VARCHAR(255) DEFAULT 'Admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed existing posts (English only)
INSERT IGNORE INTO posts (id, slug, category, title, description, content, image, status) VALUES
(1, 'understanding-uv-coating-cosmetic-packaging', 'Educational', 'Understanding UV Coating: Elevating Cosmetic Packaging', 'Discover how UV coating technology creates premium, chemical-resistant, and scratch-resistant finishes for your cosmetic packaging.', 'In the highly competitive beauty industry, packaging is the first point of physical contact between a consumer and a brand. PT Starpack Indahmaju\'s premium UV coating solutions elevate simple plastic packaging into luxurious containers that stand out on retail shelves.\n\nUV coating involves applying a liquid resin containing photoinitiators to the plastic surface, which is then instantly cured under high-intensity ultraviolet lights. This creates an extremely hard, chemical-resistant, and high-gloss protective barrier.\n\nFor cosmetic packaging, UV coating offers several key advantages:\n\n1. Luxurious Gloss: It provides a mirror-like finish that instantly elevates the perception of product luxury and quality.\n\n2. Chemical Resistance: Cosmetic products often contain oils, solvents, and active ingredients that can degrade untreated plastics. UV coating protects the container from discoloration and chemical breakdown.\n\n3. Scratch Resistance: During transit and customer handling, packaging is subject to friction. Our UV coating ensures the surface remains flawless and scratch-free.\n\nBy combining aesthetic brilliance with extreme durability, UV coating remains the gold standard for premium beauty brands worldwide.', '/images/Beauty_&_Cosmetics/Beauty_&_Cosmetics.png', 'published'),

(2, 'science-vacuum-metallizing-process', 'Technology', 'The Science of Vacuum Metallizing: Turning Plastics into Metals', 'An in-depth look into the vacuum metallizing process, vacuum chambers, and how metal finishes are applied to electronics and automotive parts.', 'Vacuum metallizing is a physical vapor deposition (PVD) process where a metal (usually aluminum) is vaporized inside a high-vacuum chamber to create a thin, highly reflective metallic layer on plastic surfaces.\n\nAt PT Starpack Indahmaju, we utilize industrial-grade vacuum chambers to ensure precise, uniform, and stable metal deposition. This technology allows plastic components to achieve the exact look and feel of genuine metal at a fraction of the weight and cost.\n\nThis process is essential for various high-spec industries:\n\n- Automotive: Used for headlight reflectors, interior trim panels, and exterior accessories to provide a weather-resistant chrome effect.\n\n- Consumer Electronics: Delivers a premium, sleek look to mobile phone casings, buttons, and audio components.\n\n- Luxury Packaging: Adds a high-end metal shimmer to perfume bottle caps and cosmetic containers.\n\nThrough strict process control and regular adhesion cross-cut testing, we guarantee that our metallized coatings deliver superior bonding and excellent long-term durability.', '/images/Vacuum_Metallizing/Vacuum-Metallizing.png', 'published'),

(3, 'choosing-right-finish-gloss-vs-matte', 'Guide', 'Choosing the Right Finish: High Gloss vs. Matte Finish', 'A comprehensive guide to choosing the best coating effect based on your target market, brand identity, and functional product requirements.', 'Deciding between a brilliant High Gloss finish and a sophisticated Matte texture is one of the most critical design decisions for your product\'s packaging and components.\n\nHigh Gloss finishes offer a high-intensity, mirror-like reflectivity that immediately catches the eye. This effect is perfect for luxury cosmetics, high-end products, and decorative elements aiming for maximum glamour. However, gloss surfaces are more prone to showing fingerprints and smudges.\n\nOn the other hand, a Matte Finish provides a non-reflective, soft-touch texture that exudes modern sophistication and understated elegance. It is excellent at hiding fine scratches and fingerprints, making it highly popular in consumer electronics, automotive interiors, and men\'s grooming products.\n\nConsider the following factors when making your choice:\n\n1. Brand Identity: Does your brand convey high-octane luxury (gloss) or modern minimalism (matte)?\n\n2. Product Handling: For products handled frequently, a matte finish offers a cleaner, more practical everyday experience.\n\n3. Target Market: Match the coating aesthetic with the design expectations of your target consumer demographic.\n\nAt PT Starpack Indahmaju, we provide both gloss and matte coatings engineered to the highest standards, tailored to your product\'s unique requirements.', '/images/Matte_Finish/Matte_Finish.png', 'published');

