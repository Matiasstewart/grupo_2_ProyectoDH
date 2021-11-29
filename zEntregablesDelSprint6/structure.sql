CREATE DATABASE belivewild_db;
USE belivewild_db;

CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `first_name` VARCHAR(40) NOT NULL,
   `last_name` VARCHAR(70) NOT NULL,
   `email` VARCHAR(50) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `function_id` INT NOT NULL,
   `user_image` VARCHAR(255) NOT NULL,
   `deleted` TINYINT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `category_id` INT NOT NULL, 
   `season_id` INT NOT NULL,
   `title` VARCHAR(70) NOT NULL,
   `description` TEXT NOT NULL,
   `price` INT NOT NULL,
   `discount` tinyint NOT NULL,
   `gender` VARCHAR(20) NOT NULL,
   `product_image` VARCHAR(255) NOT NULL,
   `deleted` TINYINT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `carts` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `user_id` INT NOT NULL,
   `total_price` INT NOT NULL,
   `total_saved` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `carts_products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `cart_id` INT NOT NULL,
   `product_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `functions` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `admin_or_user` VARCHAR(15) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `category` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `sizes` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `size` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `seasons` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `season` VARCHAR(20) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `colors` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `color` VARCHAR(20) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products_colors` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `product_id` INT,
   `color_id` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products_sizes` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `product_id` INT,
   `size_id` INT,
   PRIMARY KEY (`id`)
);


ALTER TABLE `users` ADD CONSTRAINT `FK_fb6f686f-8f1c-47db-91b9-18aea6d4658b` FOREIGN KEY (`function_id`) REFERENCES `functions`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_456edaf2-8f6c-4f3d-b6c6-d80bf0395be8` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_92b17e50-a889-4bb7-bfad-22fdef389b06` FOREIGN KEY (`season_id`) REFERENCES `seasons`(`id`)  ;

ALTER TABLE `carts` ADD CONSTRAINT `FK_0f050dfd-62d1-47ce-a4c9-68f67523277c` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)  ;

ALTER TABLE `carts_products` ADD CONSTRAINT `FK_bd8dbb01-23bd-49d0-912f-53cdba5e222d` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`)  ;

ALTER TABLE `carts_products` ADD CONSTRAINT `FK_faa822bc-1df4-4f64-9075-1374588e7d51` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)  ;

ALTER TABLE `products_colors` ADD CONSTRAINT `FK_d1a37a85-c489-40cd-8a61-f0221774f3b8` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)  ;

ALTER TABLE `products_colors` ADD CONSTRAINT `FK_97161377-e12c-4338-ab7f-cade3393d12d` FOREIGN KEY (`color_id`) REFERENCES `colors`(`id`)  ;

ALTER TABLE `products_sizes` ADD CONSTRAINT `FK_83a7ce1c-22d1-4da1-b99a-8d44bf19ce11` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)  ;

ALTER TABLE `products_sizes` ADD CONSTRAINT `FK_52c1a5fa-6340-41ad-82ae-f9c076b1fbd9` FOREIGN KEY (`size_id`) REFERENCES `sizes`(`id`)  ;

