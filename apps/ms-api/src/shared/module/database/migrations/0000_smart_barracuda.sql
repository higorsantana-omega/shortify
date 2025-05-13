CREATE TABLE `links` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`key` varchar(10) NOT NULL,
	`url` text NOT NULL,
	`expired_url` text NOT NULL,
	`domain` varchar(100) NOT NULL,
	`expires_at` datetime,
	`created_at` datetime,
	`updated_at` datetime,
	CONSTRAINT `links_id` PRIMARY KEY(`id`),
	CONSTRAINT `links_key_unique` UNIQUE(`key`)
);
