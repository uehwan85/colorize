DROP DATABASE IF EXISTS `colorize`;
CREATE DATABASE `colorize`;
USE `colorize`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `userMail` VARCHAR(20) NOT NULL,
  `userPassword` VARCHAR(50) NOT NULL,
  `userName` VARCHAR(20) NOT NULL,
  `userDetails_id` INTEGER NOT NULL,
  `birthDate` DATE NOT NULL,
  `gender` VARCHAR(10) NOT NULL,
  `userTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `colorFamilies`;
CREATE TABLE `colorFamilies` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `familyName` VARCHAR(10) NOT NULL,
  `familyRGB` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `items_id` INTEGER NOT NULL,
  `reviewPhoto` VARCHAR(50) NOT NULL,
  `reviewRating` INTEGER NOT NULL,
  `users_id` INTEGER NOT NULL,
  `reviewTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reviewMessage` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `categories2_id` INTEGER NOT NULL,
  `brands_id` INTEGER NOT NULL,
  `itemName` VARCHAR(50) NOT NULL,
  `itemVolume` VARCHAR(10) NULL DEFAULT NULL,
  `itemPrice` INTEGER NOT NULL,
  `itemDetail` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `tones`;
CREATE TABLE `tones` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `toneName` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `skins`;
CREATE TABLE `skins` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `skinName` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `userDetails`;
CREATE TABLE `userDetails` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `toneDetails_id` INTEGER NOT NULL,
  `skins_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `toneDetails`;
CREATE TABLE `toneDetails` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `tones_id` INTEGER NOT NULL,
  `toneDetail` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `brandName` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `wishLists`;
CREATE TABLE `wishLists` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `items_id` INTEGER NOT NULL,
  `users_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `users_id` INTEGER NOT NULL,
  `url` VARCHAR(10) NOT NULL,
  `logTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `categories2`;
CREATE TABLE `categories2` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `categories_id` INTEGER NOT NULL,
  `category2Name` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `colorFamilies_itemColors`;
CREATE TABLE `colorFamilies_itemColors` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `itemColors_id` INTEGER NOT NULL,
  `colorFamilies_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `itemColors`;
CREATE TABLE `itemColors` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `items_id` INTEGER NOT NULL,
  `itemPhoto` VARCHAR(255) NOT NULL,
  `itemColor` VARCHAR(20) NOT NULL,
  `itemRGB` VARCHAR(20) NOT NULL,
  `itemRelease` DATE NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `reviewLikes`;
CREATE TABLE `reviewLikes` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `reviews_id` INTEGER NOT NULL,
  `users_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `users` ADD FOREIGN KEY (userDetails_id) REFERENCES `userDetails` (`id`);
ALTER TABLE `reviews` ADD FOREIGN KEY (items_id) REFERENCES `items` (`id`);
ALTER TABLE `reviews` ADD FOREIGN KEY (users_id) REFERENCES `users` (`id`);
ALTER TABLE `items` ADD FOREIGN KEY (categories2_id) REFERENCES `categories2` (`id`);
ALTER TABLE `items` ADD FOREIGN KEY (brands_id) REFERENCES `brands` (`id`);
ALTER TABLE `userDetails` ADD FOREIGN KEY (toneDetails_id) REFERENCES `toneDetails` (`id`);
ALTER TABLE `userDetails` ADD FOREIGN KEY (skins_id) REFERENCES `skins` (`id`);
ALTER TABLE `toneDetails` ADD FOREIGN KEY (tones_id) REFERENCES `tones` (`id`);
ALTER TABLE `wishLists` ADD FOREIGN KEY (items_id) REFERENCES `items` (`id`);
ALTER TABLE `wishLists` ADD FOREIGN KEY (users_id) REFERENCES `users` (`id`);
ALTER TABLE `logs` ADD FOREIGN KEY (users_id) REFERENCES `users` (`id`);
ALTER TABLE `categories2` ADD FOREIGN KEY (categories_id) REFERENCES `categories` (`id`);
ALTER TABLE `colorFamilies_itemColors` ADD FOREIGN KEY (itemColors_id) REFERENCES `itemColors` (`id`);
ALTER TABLE `colorFamilies_itemColors` ADD FOREIGN KEY (colorFamilies_id) REFERENCES `colorFamilies` (`id`);
ALTER TABLE `itemColors` ADD FOREIGN KEY (items_id) REFERENCES `items` (`id`);
ALTER TABLE `reviewLikes` ADD FOREIGN KEY (reviews_id) REFERENCES `reviews` (`id`);
ALTER TABLE `reviewLikes` ADD FOREIGN KEY (users_id) REFERENCES `users` (`id`);

ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `colorFamilies` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `items` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `tones` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `skins` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `userDetails` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `toneDetails` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `brands` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `categories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `wishLists` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `logs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `categories2` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `colorFamilies_itemColors` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `itemColors` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `reviewLikes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;