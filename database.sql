CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roleId INT,
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(120),
  status VARCHAR(30) DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (roleId) REFERENCES roles(id)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sellerId INT,
  title VARCHAR(255),
  description TEXT,
  priceUsd DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'USD',
  stock INT,
  warrantyDays INT DEFAULT 0,
  minimumQty INT DEFAULT 1,
  maximumQty INT DEFAULT 1,
  seoTitle VARCHAR(255),
  seoDescription VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sellerId) REFERENCES users(id)
);

CREATE TABLE product_files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productId INT,
  url VARCHAR(255),
  type VARCHAR(50),
  FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE product_credentials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productId INT,
  label VARCHAR(255),
  value TEXT,
  FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE product_benefits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productId INT,
  benefit TEXT,
  FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  totalUsd DECIMAL(10,2),
  currency VARCHAR(10),
  status VARCHAR(50) DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orderId INT,
  productId INT,
  quantity INT,
  priceUsd DECIMAL(10,2),
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE warranties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orderItemId INT,
  expiresAt DATETIME,
  status VARCHAR(50),
  FOREIGN KEY (orderItemId) REFERENCES order_items(id)
);

CREATE TABLE coupons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) UNIQUE,
  type VARCHAR(20),
  amount DECIMAL(10,2),
  productId INT NULL,
  subscription BOOLEAN DEFAULT 0,
  expiresAt DATETIME,
  usageLimit INT,
  FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE currencies (
  code VARCHAR(10) PRIMARY KEY,
  rate DECIMAL(12,6) NOT NULL,
  active BOOLEAN DEFAULT 1
);

CREATE TABLE user_wallet (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  balanceUsd DECIMAL(12,2) DEFAULT 0,
  type VARCHAR(20) DEFAULT 'user',
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE seller_wallet (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  availableUsd DECIMAL(12,2) DEFAULT 0,
  pendingUsd DECIMAL(12,2) DEFAULT 0,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE withdraw_methods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  minUsd DECIMAL(10,2),
  feePercent DECIMAL(5,2),
  fields JSON
);

CREATE TABLE withdraw_accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  methodId INT,
  data JSON,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (methodId) REFERENCES withdraw_methods(id)
);

CREATE TABLE withdraw_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  methodId INT,
  amountUsd DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'pending',
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (methodId) REFERENCES withdraw_methods(id)
);

CREATE TABLE support_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  status VARCHAR(30) DEFAULT 'Pendiente',
  subject VARCHAR(255),
  message TEXT,
  slaHours INT DEFAULT 24,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE product_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productId INT,
  userId INT,
  rating INT,
  comment TEXT,
  FOREIGN KEY (productId) REFERENCES products(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE blog_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  categoryId INT,
  title VARCHAR(255),
  slug VARCHAR(255),
  content MEDIUMTEXT,
  seoTitle VARCHAR(255),
  seoDescription VARCHAR(255),
  published BOOLEAN DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (categoryId) REFERENCES blog_categories(id)
);

CREATE TABLE admin_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  action VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE system_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  keyName VARCHAR(120),
  value TEXT
);

CREATE TABLE affiliates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  status VARCHAR(30) DEFAULT 'active',
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE affiliate_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  affiliateId INT,
  url VARCHAR(255),
  FOREIGN KEY (affiliateId) REFERENCES affiliates(id)
);

CREATE TABLE affiliate_commissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  affiliateId INT,
  orderId INT,
  amountUsd DECIMAL(10,2),
  FOREIGN KEY (affiliateId) REFERENCES affiliates(id),
  FOREIGN KEY (orderId) REFERENCES orders(id)
);
