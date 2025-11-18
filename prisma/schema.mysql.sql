-- Esquema MySQL equivalente a prisma/schema.prisma
-- Ajusta el nombre de la base antes de importar: CREATE DATABASE IF NOT EXISTS `DB_NAME` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `DB_NAME`;

CREATE TABLE IF NOT EXISTS `User` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NULL,
  `email` varchar(191) NOT NULL,
  `emailVerified` datetime NULL,
  `passwordHash` varchar(255) NOT NULL,
  `role` enum('ADMIN','CUSTOMER','SUPPORT') NOT NULL DEFAULT 'CUSTOMER',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Product` (
  `id` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `imageUrl` varchar(191) NULL,
  `active` boolean NOT NULL DEFAULT true,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Variant` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `priceCents` int NOT NULL,
  `currency` varchar(10) NOT NULL DEFAULT 'USD',
  `stock` int NOT NULL DEFAULT 0,
  `delivery` enum('CODE','LINK','MANUAL') NOT NULL DEFAULT 'CODE',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Variant_productId_fkey` (`productId`),
  CONSTRAINT `Variant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `DigitalCode` (
  `id` varchar(191) NOT NULL,
  `variantId` varchar(191) NOT NULL,
  `code` varchar(191) NOT NULL,
  `consumed` boolean NOT NULL DEFAULT false,
  `consumedAt` datetime(3) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DigitalCode_code_key` (`code`),
  KEY `DigitalCode_variantId_fkey` (`variantId`),
  CONSTRAINT `DigitalCode_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `Variant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Coupon` (
  `id` varchar(191) NOT NULL,
  `code` varchar(191) NOT NULL,
  `description` text NULL,
  `percentOff` int NULL,
  `amountOffCents` int NULL,
  `currency` varchar(10) NULL,
  `active` boolean NOT NULL DEFAULT true,
  `validFrom` datetime(3) NULL,
  `validTo` datetime(3) NULL,
  `maxRedemptions` int NULL,
  `timesRedeemed` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Coupon_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Order` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `status` enum('PENDING','PAID','FULFILLED','CANCELED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  `subtotalCents` int NOT NULL,
  `discountCents` int NOT NULL DEFAULT 0,
  `totalCents` int NOT NULL,
  `currency` varchar(10) NOT NULL DEFAULT 'USD',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Order_userId_fkey` (`userId`),
  CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `OrderItem` (
  `id` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL,
  `variantId` varchar(191) NOT NULL,
  `quantity` int NOT NULL DEFAULT 1,
  `unitPriceCents` int NOT NULL,
  `lineTotalCents` int NOT NULL,
  `deliveredCodeId` varchar(191) NULL,
  PRIMARY KEY (`id`),
  KEY `OrderItem_orderId_fkey` (`orderId`),
  KEY `OrderItem_variantId_fkey` (`variantId`),
  KEY `OrderItem_deliveredCodeId_fkey` (`deliveredCodeId`),
  CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `OrderItem_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `Variant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `OrderItem_deliveredCodeId_fkey` FOREIGN KEY (`deliveredCodeId`) REFERENCES `DigitalCode`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Payment` (
  `id` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL,
  `provider` varchar(50) NOT NULL,
  `providerId` varchar(191) NOT NULL,
  `status` enum('SUCCEEDED','REQUIRES_ACTION','CANCELED','REFUNDED') NOT NULL DEFAULT 'REQUIRES_ACTION',
  `amountCents` int NOT NULL,
  `currency` varchar(10) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Payment_orderId_key` (`orderId`),
  CONSTRAINT `Payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Address` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `type` enum('BILLING','SHIPPING') NOT NULL DEFAULT 'BILLING',
  `line1` varchar(191) NOT NULL,
  `line2` varchar(191) NULL,
  `city` varchar(191) NOT NULL,
  `state` varchar(191) NULL,
  `postal` varchar(20) NOT NULL,
  `country` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Address_userId_fkey` (`userId`),
  CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `AuditLog` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NULL,
  `actorRole` enum('ADMIN','CUSTOMER','SUPPORT') NULL,
  `action` varchar(191) NOT NULL,
  `meta` json NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `AuditLog_userId_fkey` (`userId`),
  CONSTRAINT `AuditLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos de referencia opcionales para entornos manuales
INSERT INTO `Coupon` (`id`, `code`, `description`, `percentOff`, `amountOffCents`, `currency`, `active`, `validFrom`, `validTo`, `maxRedemptions`, `timesRedeemed`)
VALUES
  ('seed-coupon-1', 'DESC10', '10% off', 10, NULL, NULL, true, NULL, NULL, NULL, 0),
  ('seed-coupon-2', 'USD5', '5 USD off', NULL, 500, 'USD', true, NULL, NULL, NULL, 0),
  ('seed-coupon-3', 'LIMITADO', 'Cupón por fecha', 15, NULL, NULL, true, NULL, DATE_ADD(NOW(), INTERVAL 7 DAY), NULL, 0)
ON DUPLICATE KEY UPDATE code = VALUES(code);

-- Para usuarios de ejemplo, crea hashes Argon2 y usa INSERT en la tabla `User`.
-- Alternativamente ejecuta `pnpm db:seed` para poblar usuarios, productos, variantes y códigos automáticamente.
