CREATE TABLE `link_access_logs` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`shortlink_key` varchar(10) NOT NULL,
	`accessed_at` datetime NOT NULL,
	`ip_address` varchar(45),
	`user_agent` text,
	`referrer` text,
	CONSTRAINT `link_access_logs_id` PRIMARY KEY(`id`)
);
