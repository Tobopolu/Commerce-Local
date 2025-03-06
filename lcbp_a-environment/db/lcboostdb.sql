-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : lcboost_db_host:3306
-- Généré le : mar. 04 mars 2025 à 15:53
-- Version du serveur : 9.2.0
-- Version de PHP : 8.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `lcboostdb`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id_category` int UNSIGNED NOT NULL,
  `name` varchar(64) NOT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_category`, `name`, `image`) VALUES
(1, 'Mode', '/uploads/mode.png'),
(2, 'Restauration', '/uploads/restauration.png'),
(3, 'Jardin', '/uploads/jardinage.png'),
(4, 'Alimentation', '/uploads/alimentation.png'),
(5, 'Artisanat', '/uploads/artisanat.png'),
(6, 'Bien-être', '/uploads/bienetre.png');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id_comment` int UNSIGNED NOT NULL,
  `id_user` int UNSIGNED NOT NULL,
  `id_product` int UNSIGNED NOT NULL,
  `message` varchar(3000) NOT NULL,
  `date` date NOT NULL,
  `note` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `days`
--

CREATE TABLE `days` (
  `id_day` int UNSIGNED NOT NULL,
  `day` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `days`
--

INSERT INTO `days` (`id_day`, `day`) VALUES
(1, 'monday'),
(2, 'tuesday'),
(3, 'wednesday'),
(4, 'thursday'),
(5, 'friday'),
(6, 'saturday'),
(7, 'sunday');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id_event` int UNSIGNED NOT NULL,
  `id_shop` int UNSIGNED NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `images` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hours`
--

CREATE TABLE `hours` (
  `id_hour` int UNSIGNED NOT NULL,
  `hour` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `hours`
--

INSERT INTO `hours` (`id_hour`, `hour`) VALUES
(1, '00:00'),
(2, '01:00'),
(3, '02:00'),
(4, '03:00'),
(5, '04:00'),
(6, '05:00'),
(7, '06:00'),
(8, '07:00'),
(9, '08:00'),
(10, '09:00'),
(11, '10:00'),
(12, '11:00'),
(13, '12:00'),
(14, '13:00'),
(15, '14:00'),
(16, '15:00'),
(17, '16:00'),
(18, '17:00'),
(19, '18:00'),
(20, '19:00'),
(21, '20:00'),
(22, '21:00'),
(23, '22:00'),
(24, '23:00');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id_message` int UNSIGNED NOT NULL,
  `id_sender` int UNSIGNED NOT NULL,
  `id_recipient` int UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id_message`, `id_sender`, `id_recipient`, `title`, `message`, `date`) VALUES
(1, 3, 2, 'Yo Client', 'Just Testing from Shopkeeper', '2025-02-05'),
(2, 2, 3, 'Anwser', 'Yo, just an answer from Client', '2025-02-05');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id_order` int UNSIGNED NOT NULL,
  `state` varchar(32) NOT NULL,
  `id_user` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id_order`, `state`, `id_user`) VALUES
(1, 'pending', 3);

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id_product` int UNSIGNED NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int DEFAULT NULL,
  `images` text NOT NULL,
  `promo` int DEFAULT NULL,
  `id_shop` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id_product`, `name`, `description`, `price`, `stock`, `images`, `promo`, `id_shop`) VALUES
(4, 'Product 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', NULL, 68),
(5, 'Product 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', NULL, 68),
(6, 'Product 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 20, 68),
(7, 'Product 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', NULL, 68),
(8, 'Product 5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 15, 68),
(9, 'Product 6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 20, 68),
(10, 'Product 7', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 30, 68),
(11, 'Product 8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 10, 68),
(12, 'Product 9', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 15, 68),
(13, 'Product 10', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 40, 68),
(14, 'Product 11', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', NULL, 68),
(15, 'Product 12', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', NULL, 68),
(16, 'Product 13', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 20, 68),
(17, 'Product 14', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', NULL, 68),
(18, 'Product 15', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 15, 68),
(19, 'Product 16', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 20, 68),
(20, 'Product 17', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 30, 68),
(21, 'Product 18', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 10, 68),
(22, 'Product 19', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 15, 68),
(23, 'Product 20', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 55.55, 5, '/uploads/1738944700832-Fond.jpg', 40, 68);

-- --------------------------------------------------------

--
-- Structure de la table `products_categories`
--

CREATE TABLE `products_categories` (
  `id_product_category` int UNSIGNED NOT NULL,
  `id_product` int UNSIGNED NOT NULL,
  `id_category` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `products_orders`
--

CREATE TABLE `products_orders` (
  `id_product_order` int UNSIGNED NOT NULL,
  `id_product` int UNSIGNED NOT NULL,
  `id_order` int UNSIGNED NOT NULL,
  `number` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id_role` int UNSIGNED NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id_role`, `name`) VALUES
(1, 'client'),
(2, 'shopkeeper'),
(3, 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `roles_users`
--

CREATE TABLE `roles_users` (
  `id_role_user` int UNSIGNED NOT NULL,
  `id_role` int UNSIGNED NOT NULL DEFAULT '1',
  `id_user` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `roles_users`
--

INSERT INTO `roles_users` (`id_role_user`, `id_role`, `id_user`) VALUES
(1, 3, 1),
(2, 2, 2),
(8, 1, 3),
(10, 2, 51),
(11, 2, 52),
(12, 2, 53),
(13, 2, 54),
(15, 1, 56),
(16, 2, 56);

-- --------------------------------------------------------

--
-- Structure de la table `schedules`
--

CREATE TABLE `schedules` (
  `id_schedule` int UNSIGNED NOT NULL,
  `id_day` int UNSIGNED NOT NULL,
  `id_hour` int UNSIGNED NOT NULL,
  `id_state` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `schedules`
--

INSERT INTO `schedules` (`id_schedule`, `id_day`, `id_hour`, `id_state`) VALUES
(742, 1, 2, 1),
(743, 1, 6, 2),
(744, 1, 9, 1),
(745, 1, 13, 2),
(746, 1, 15, 1),
(747, 1, 18, 2),
(748, 2, 10, 1),
(749, 2, 13, 2),
(750, 3, 10, 1),
(751, 3, 13, 2),
(752, 4, 10, 1),
(753, 4, 13, 2),
(754, 5, 10, 1),
(755, 5, 13, 2),
(756, 6, 10, 1),
(757, 6, 13, 2),
(758, 7, 10, 1),
(759, 7, 13, 2),
(760, 1, 10, 1),
(761, 1, 13, 2),
(762, 2, 10, 1),
(763, 2, 13, 2),
(764, 3, 10, 1),
(765, 3, 13, 2),
(766, 4, 10, 1),
(767, 4, 13, 2),
(768, 5, 10, 1),
(769, 5, 13, 2),
(770, 6, 10, 1),
(771, 6, 13, 2),
(772, 7, 10, 1),
(773, 7, 13, 2),
(774, 1, 10, 1),
(775, 1, 13, 2),
(776, 2, 10, 1),
(777, 2, 13, 2),
(778, 3, 10, 1),
(779, 3, 13, 2),
(780, 4, 10, 1),
(781, 4, 13, 2),
(782, 5, 10, 1),
(783, 5, 13, 2),
(784, 6, 10, 1),
(785, 6, 13, 2),
(786, 7, 10, 1),
(787, 7, 13, 2),
(788, 1, 10, 1),
(789, 1, 13, 2),
(790, 2, 10, 1),
(791, 2, 13, 2),
(792, 3, 10, 1),
(793, 3, 13, 2),
(794, 4, 10, 1),
(795, 4, 13, 2),
(796, 5, 10, 1),
(797, 5, 13, 2),
(798, 6, 10, 1),
(799, 6, 13, 2),
(800, 7, 10, 1),
(801, 7, 13, 2),
(802, 1, 10, 1),
(803, 1, 13, 2),
(804, 2, 10, 1),
(805, 2, 13, 2),
(806, 3, 10, 1),
(807, 3, 13, 2),
(808, 4, 10, 1),
(809, 4, 13, 2),
(810, 5, 10, 1),
(811, 5, 13, 2),
(812, 6, 10, 1),
(813, 6, 13, 2),
(814, 7, 10, 1),
(815, 7, 13, 2),
(816, 1, 10, 1),
(817, 1, 13, 2),
(818, 2, 10, 1),
(819, 2, 13, 2),
(820, 3, 10, 1),
(821, 3, 13, 2),
(822, 4, 10, 1),
(823, 4, 13, 2),
(824, 5, 10, 1),
(825, 5, 13, 2),
(826, 6, 10, 1),
(827, 6, 13, 2),
(828, 7, 10, 1),
(829, 7, 13, 2),
(830, 1, 10, 1),
(831, 1, 13, 2),
(832, 2, 10, 1),
(833, 2, 13, 2),
(834, 3, 10, 1),
(835, 3, 13, 2),
(836, 4, 10, 1),
(837, 4, 13, 2),
(838, 5, 10, 1),
(839, 5, 13, 2),
(840, 6, 10, 1),
(841, 6, 13, 2),
(842, 7, 10, 1),
(843, 7, 13, 2),
(844, 1, 10, 1),
(845, 1, 13, 2),
(846, 2, 10, 1),
(847, 2, 13, 2),
(848, 3, 10, 1),
(849, 3, 13, 2),
(850, 4, 10, 1),
(851, 4, 13, 2),
(852, 5, 10, 1),
(853, 5, 13, 2),
(854, 6, 10, 1),
(855, 6, 13, 2),
(856, 7, 10, 1),
(857, 7, 13, 2),
(858, 1, 10, 1),
(859, 1, 13, 2),
(860, 2, 10, 1),
(861, 2, 13, 2),
(862, 3, 10, 1),
(863, 3, 13, 2),
(864, 4, 10, 1),
(865, 4, 13, 2),
(866, 5, 10, 1),
(867, 5, 13, 2),
(868, 6, 10, 1),
(869, 6, 13, 2),
(870, 7, 10, 1),
(871, 7, 13, 2),
(872, 1, 10, 1),
(873, 1, 13, 2),
(874, 2, 10, 1),
(875, 2, 13, 2),
(876, 3, 10, 1),
(877, 3, 13, 2),
(878, 4, 10, 1),
(879, 4, 13, 2),
(880, 5, 10, 1),
(881, 5, 13, 2),
(882, 6, 10, 1),
(883, 6, 13, 2),
(884, 7, 10, 1),
(885, 7, 13, 2),
(886, 1, 10, 1),
(887, 1, 13, 2),
(888, 2, 10, 1),
(889, 2, 13, 2),
(890, 3, 10, 1),
(891, 3, 13, 2),
(892, 4, 10, 1),
(893, 4, 13, 2),
(894, 5, 10, 1),
(895, 5, 13, 2),
(896, 6, 10, 1),
(897, 6, 13, 2),
(898, 7, 10, 1),
(899, 7, 13, 2),
(900, 1, 10, 1),
(901, 1, 13, 2),
(902, 2, 10, 1),
(903, 2, 13, 2),
(904, 3, 10, 1),
(905, 3, 13, 2),
(906, 4, 10, 1),
(907, 4, 13, 2),
(908, 5, 10, 1),
(909, 5, 13, 2),
(910, 6, 10, 1),
(911, 6, 13, 2),
(912, 7, 10, 1),
(913, 7, 13, 2),
(914, 1, 10, 1),
(915, 1, 13, 2),
(916, 2, 10, 1),
(917, 2, 13, 2),
(918, 3, 10, 1),
(919, 3, 13, 2),
(920, 4, 10, 1),
(921, 4, 13, 2),
(922, 5, 10, 1),
(923, 5, 13, 2),
(924, 6, 10, 1),
(925, 6, 13, 2),
(926, 7, 10, 1),
(927, 7, 13, 2),
(928, 1, 10, 1),
(929, 1, 13, 2),
(930, 2, 10, 1),
(931, 2, 13, 2),
(932, 3, 10, 1),
(933, 3, 13, 2),
(934, 4, 10, 1),
(935, 4, 13, 2),
(936, 5, 10, 1),
(937, 5, 13, 2),
(938, 6, 10, 1),
(939, 6, 13, 2),
(940, 7, 10, 1),
(941, 7, 13, 2),
(942, 1, 10, 1),
(943, 1, 13, 2),
(944, 2, 10, 1),
(945, 2, 13, 2),
(946, 3, 10, 1),
(947, 3, 13, 2),
(948, 4, 10, 1),
(949, 4, 13, 2),
(950, 5, 10, 1),
(951, 5, 13, 2),
(952, 6, 10, 1),
(953, 6, 13, 2),
(954, 7, 10, 1),
(955, 7, 13, 2),
(956, 1, 10, 1),
(957, 1, 13, 2),
(958, 2, 10, 1),
(959, 2, 13, 2),
(960, 3, 10, 1),
(961, 3, 13, 2),
(962, 4, 10, 1),
(963, 4, 13, 2),
(964, 5, 10, 1),
(965, 5, 13, 2),
(966, 6, 10, 1),
(967, 6, 13, 2),
(968, 7, 10, 1),
(969, 7, 13, 2),
(970, 1, 10, 1),
(971, 1, 13, 2),
(972, 2, 10, 1),
(973, 2, 13, 2),
(974, 3, 10, 1),
(975, 3, 13, 2),
(976, 4, 10, 1),
(977, 4, 13, 2),
(978, 5, 10, 1),
(979, 5, 13, 2),
(980, 6, 10, 1),
(981, 6, 13, 2),
(982, 7, 10, 1),
(983, 7, 13, 2),
(984, 1, 10, 1),
(985, 1, 13, 2),
(986, 2, 10, 1),
(987, 2, 13, 2),
(988, 3, 10, 1),
(989, 3, 13, 2),
(990, 4, 10, 1),
(991, 4, 13, 2),
(992, 5, 10, 1),
(993, 5, 13, 2),
(994, 6, 10, 1),
(995, 6, 13, 2),
(996, 7, 10, 1),
(997, 7, 13, 2),
(998, 1, 10, 1),
(999, 1, 13, 2),
(1000, 2, 10, 1),
(1001, 2, 13, 2),
(1002, 3, 10, 1),
(1003, 3, 13, 2),
(1004, 4, 10, 1),
(1005, 4, 13, 2),
(1006, 5, 10, 1),
(1007, 5, 13, 2),
(1008, 6, 10, 1),
(1009, 6, 13, 2),
(1010, 7, 10, 1),
(1011, 7, 13, 2),
(1012, 1, 10, 1),
(1013, 1, 13, 2),
(1014, 2, 10, 1),
(1015, 2, 13, 2),
(1016, 3, 10, 1),
(1017, 3, 13, 2),
(1018, 4, 10, 1),
(1019, 4, 13, 2),
(1020, 5, 10, 1),
(1021, 5, 13, 2),
(1022, 6, 10, 1),
(1023, 6, 13, 2),
(1024, 7, 10, 1),
(1025, 7, 13, 2),
(1026, 1, 10, 1),
(1027, 1, 13, 2),
(1028, 2, 10, 1),
(1029, 2, 13, 2),
(1030, 3, 10, 1),
(1031, 3, 13, 2),
(1032, 4, 10, 1),
(1033, 4, 13, 2),
(1034, 5, 10, 1),
(1035, 5, 13, 2),
(1036, 6, 10, 1),
(1037, 6, 13, 2),
(1038, 7, 10, 1),
(1039, 7, 13, 2),
(1040, 1, 10, 1),
(1041, 1, 13, 2),
(1042, 2, 10, 1),
(1043, 2, 13, 2),
(1044, 3, 10, 1),
(1045, 3, 13, 2),
(1046, 4, 10, 1),
(1047, 4, 13, 2),
(1048, 5, 10, 1),
(1049, 5, 13, 2),
(1050, 6, 10, 1),
(1051, 6, 13, 2),
(1052, 7, 10, 1),
(1053, 7, 13, 2),
(1054, 1, 10, 1),
(1055, 1, 13, 2),
(1056, 2, 10, 1),
(1057, 2, 13, 2),
(1058, 3, 10, 1),
(1059, 3, 13, 2),
(1060, 4, 10, 1),
(1061, 4, 13, 2),
(1062, 5, 10, 1),
(1063, 5, 13, 2),
(1064, 6, 10, 1),
(1065, 6, 13, 2),
(1066, 7, 10, 1),
(1067, 7, 13, 2),
(1068, 1, 10, 1),
(1069, 1, 13, 2),
(1070, 2, 10, 1),
(1071, 2, 13, 2),
(1072, 3, 10, 1),
(1073, 3, 13, 2),
(1074, 4, 10, 1),
(1075, 4, 13, 2),
(1076, 5, 10, 1),
(1077, 5, 13, 2),
(1078, 6, 10, 1),
(1079, 6, 13, 2),
(1080, 7, 10, 1),
(1081, 7, 13, 2),
(1082, 1, 10, 1),
(1083, 1, 13, 2),
(1084, 2, 10, 1),
(1085, 2, 13, 2),
(1086, 3, 10, 1),
(1087, 3, 13, 2),
(1088, 4, 10, 1),
(1089, 4, 13, 2),
(1090, 5, 10, 1),
(1091, 5, 13, 2),
(1092, 6, 10, 1),
(1093, 6, 13, 2),
(1094, 7, 10, 1),
(1095, 7, 13, 2),
(1096, 1, 10, 1),
(1097, 1, 13, 2),
(1098, 2, 10, 1),
(1099, 2, 13, 2),
(1100, 3, 10, 1),
(1101, 3, 13, 2),
(1102, 4, 10, 1),
(1103, 4, 13, 2),
(1104, 5, 10, 1),
(1105, 5, 13, 2),
(1106, 6, 10, 1),
(1107, 6, 13, 2),
(1108, 7, 10, 1),
(1109, 7, 13, 2),
(1110, 1, 10, 1),
(1111, 1, 13, 2),
(1112, 2, 10, 1),
(1113, 2, 13, 2),
(1114, 3, 10, 1),
(1115, 3, 13, 2),
(1116, 4, 10, 1),
(1117, 4, 13, 2),
(1118, 5, 10, 1),
(1119, 5, 13, 2),
(1120, 6, 10, 1),
(1121, 6, 13, 2),
(1122, 7, 10, 1),
(1123, 7, 13, 2),
(1124, 1, 10, 1),
(1125, 1, 13, 2),
(1126, 2, 10, 1),
(1127, 2, 13, 2),
(1128, 3, 10, 1),
(1129, 3, 13, 2),
(1130, 4, 10, 1),
(1131, 4, 13, 2),
(1132, 5, 10, 1),
(1133, 5, 13, 2),
(1134, 6, 10, 1),
(1135, 6, 13, 2),
(1136, 7, 10, 1),
(1137, 7, 13, 2),
(1138, 1, 10, 1),
(1139, 1, 13, 2),
(1140, 2, 10, 1),
(1141, 2, 13, 2),
(1142, 3, 10, 1),
(1143, 3, 13, 2),
(1144, 4, 10, 1),
(1145, 4, 13, 2),
(1146, 5, 10, 1),
(1147, 5, 13, 2),
(1148, 6, 10, 1),
(1149, 6, 13, 2),
(1150, 7, 10, 1),
(1151, 7, 13, 2),
(1152, 1, 10, 1),
(1153, 1, 13, 2),
(1154, 2, 10, 1),
(1155, 2, 13, 2),
(1156, 3, 10, 1),
(1157, 3, 13, 2),
(1158, 4, 10, 1),
(1159, 4, 13, 2),
(1160, 5, 10, 1),
(1161, 5, 13, 2),
(1162, 6, 10, 1),
(1163, 6, 13, 2),
(1164, 7, 10, 1),
(1165, 7, 13, 2),
(1166, 1, 10, 1),
(1167, 1, 13, 2),
(1168, 2, 10, 1),
(1169, 2, 13, 2),
(1170, 3, 10, 1),
(1171, 3, 13, 2),
(1172, 4, 10, 1),
(1173, 4, 13, 2),
(1174, 5, 10, 1),
(1175, 5, 13, 2),
(1176, 6, 10, 1),
(1177, 6, 13, 2),
(1178, 7, 10, 1),
(1179, 7, 13, 2),
(1180, 1, 10, 1),
(1181, 1, 13, 2),
(1182, 2, 10, 1),
(1183, 2, 13, 2),
(1184, 3, 10, 1),
(1185, 3, 13, 2),
(1186, 4, 10, 1),
(1187, 4, 13, 2),
(1188, 5, 10, 1),
(1189, 5, 13, 2),
(1190, 6, 10, 1),
(1191, 6, 13, 2),
(1192, 7, 10, 1),
(1193, 7, 13, 2),
(1194, 1, 10, 1),
(1195, 1, 13, 2),
(1196, 2, 10, 1),
(1197, 2, 13, 2),
(1198, 3, 10, 1),
(1199, 3, 13, 2),
(1200, 4, 10, 1),
(1201, 4, 13, 2),
(1202, 5, 10, 1),
(1203, 5, 13, 2),
(1204, 6, 10, 1),
(1205, 6, 13, 2),
(1206, 7, 10, 1),
(1207, 7, 13, 2),
(1208, 1, 10, 1),
(1209, 1, 13, 2),
(1210, 2, 10, 1),
(1211, 2, 13, 2),
(1212, 3, 10, 1),
(1213, 3, 13, 2),
(1214, 4, 10, 1),
(1215, 4, 13, 2),
(1216, 5, 10, 1),
(1217, 5, 13, 2),
(1218, 6, 10, 1),
(1219, 6, 13, 2),
(1220, 7, 10, 1),
(1221, 7, 13, 2),
(1222, 1, 10, 1),
(1223, 1, 13, 2),
(1224, 2, 10, 1),
(1225, 2, 13, 2),
(1226, 3, 10, 1),
(1227, 3, 13, 2),
(1228, 4, 10, 1),
(1229, 4, 13, 2),
(1230, 5, 10, 1),
(1231, 5, 13, 2),
(1232, 6, 10, 1),
(1233, 6, 13, 2),
(1234, 7, 10, 1),
(1235, 7, 13, 2),
(1236, 1, 10, 1),
(1237, 1, 13, 2),
(1238, 2, 10, 1),
(1239, 2, 13, 2),
(1240, 3, 10, 1),
(1241, 3, 13, 2),
(1242, 4, 10, 1),
(1243, 4, 13, 2),
(1244, 5, 10, 1),
(1245, 5, 13, 2),
(1246, 6, 10, 1),
(1247, 6, 13, 2),
(1248, 7, 10, 1),
(1249, 7, 13, 2),
(1250, 1, 10, 1),
(1251, 1, 13, 2),
(1252, 2, 10, 1),
(1253, 2, 13, 2),
(1254, 3, 10, 1),
(1255, 3, 13, 2),
(1256, 4, 10, 1),
(1257, 4, 13, 2),
(1258, 5, 10, 1),
(1259, 5, 13, 2),
(1260, 6, 10, 1),
(1261, 6, 13, 2),
(1262, 7, 10, 1),
(1263, 7, 13, 2),
(1264, 1, 10, 1),
(1265, 1, 13, 2),
(1266, 2, 10, 1),
(1267, 2, 13, 2),
(1268, 3, 10, 1),
(1269, 3, 13, 2),
(1270, 4, 10, 1),
(1271, 4, 13, 2),
(1272, 5, 10, 1),
(1273, 5, 13, 2),
(1274, 6, 10, 1),
(1275, 6, 13, 2),
(1276, 7, 10, 1),
(1277, 7, 13, 2),
(1278, 1, 10, 1),
(1279, 1, 13, 2),
(1280, 2, 10, 1),
(1281, 2, 13, 2),
(1282, 3, 10, 1),
(1283, 3, 13, 2),
(1284, 4, 10, 1),
(1285, 4, 13, 2),
(1286, 5, 10, 1),
(1287, 5, 13, 2),
(1288, 6, 10, 1),
(1289, 6, 13, 2),
(1290, 7, 10, 1),
(1291, 7, 13, 2),
(1292, 1, 10, 1),
(1293, 1, 13, 2),
(1294, 2, 10, 1),
(1295, 2, 13, 2),
(1296, 3, 10, 1),
(1297, 3, 13, 2),
(1298, 4, 10, 1),
(1299, 4, 13, 2),
(1300, 5, 10, 1),
(1301, 5, 13, 2),
(1302, 6, 10, 1),
(1303, 6, 13, 2),
(1304, 7, 10, 1),
(1305, 7, 13, 2),
(1306, 1, 10, 1),
(1307, 1, 13, 2),
(1308, 2, 10, 1),
(1309, 2, 13, 2),
(1310, 3, 10, 1),
(1311, 3, 13, 2),
(1312, 4, 10, 1),
(1313, 4, 13, 2),
(1314, 5, 10, 1),
(1315, 5, 13, 2),
(1316, 6, 10, 1),
(1317, 6, 13, 2),
(1318, 7, 10, 1),
(1319, 7, 13, 2),
(1320, 1, 10, 1),
(1321, 1, 13, 2),
(1322, 2, 10, 1),
(1323, 2, 13, 2),
(1324, 3, 10, 1),
(1325, 3, 13, 2),
(1326, 4, 10, 1),
(1327, 4, 13, 2),
(1328, 5, 10, 1),
(1329, 5, 13, 2),
(1330, 6, 10, 1),
(1331, 6, 13, 2),
(1332, 7, 10, 1),
(1333, 7, 13, 2),
(1334, 1, 10, 1),
(1335, 1, 13, 2),
(1336, 2, 10, 1),
(1337, 2, 13, 2),
(1338, 3, 10, 1),
(1339, 3, 13, 2),
(1340, 4, 10, 1),
(1341, 4, 13, 2),
(1342, 5, 10, 1),
(1343, 5, 13, 2),
(1344, 6, 10, 1),
(1345, 6, 13, 2),
(1346, 7, 10, 1),
(1347, 7, 13, 2),
(1348, 1, 10, 1),
(1349, 1, 13, 2),
(1350, 2, 10, 1),
(1351, 2, 13, 2),
(1352, 3, 10, 1),
(1353, 3, 13, 2),
(1354, 4, 10, 1),
(1355, 4, 13, 2),
(1356, 5, 10, 1),
(1357, 5, 13, 2),
(1358, 6, 10, 1),
(1359, 6, 13, 2),
(1360, 7, 10, 1),
(1361, 7, 13, 2),
(1362, 1, 10, 1),
(1363, 1, 13, 2),
(1364, 2, 10, 1),
(1365, 2, 13, 2),
(1366, 3, 10, 1),
(1367, 3, 13, 2),
(1368, 4, 10, 1),
(1369, 4, 13, 2),
(1370, 5, 10, 1),
(1371, 5, 13, 2),
(1372, 6, 10, 1),
(1373, 6, 13, 2),
(1374, 7, 10, 1),
(1375, 7, 13, 2),
(1376, 1, 10, 1),
(1377, 1, 13, 2),
(1378, 2, 10, 1),
(1379, 2, 13, 2),
(1380, 3, 10, 1),
(1381, 3, 13, 2),
(1382, 4, 10, 1),
(1383, 4, 13, 2),
(1384, 5, 10, 1),
(1385, 5, 13, 2),
(1386, 6, 10, 1),
(1387, 6, 13, 2),
(1388, 7, 10, 1),
(1389, 7, 13, 2),
(1390, 1, 10, 1),
(1391, 1, 13, 2),
(1392, 2, 10, 1),
(1393, 2, 13, 2),
(1394, 3, 10, 1),
(1395, 3, 13, 2),
(1396, 4, 10, 1),
(1397, 4, 13, 2),
(1398, 5, 10, 1),
(1399, 5, 13, 2),
(1400, 6, 10, 1),
(1401, 6, 13, 2),
(1402, 7, 10, 1),
(1403, 7, 13, 2),
(1404, 1, 10, 1),
(1405, 1, 13, 2),
(1406, 2, 10, 1),
(1407, 2, 13, 2),
(1408, 3, 10, 1),
(1409, 3, 13, 2),
(1410, 4, 10, 1),
(1411, 4, 13, 2),
(1412, 5, 10, 1),
(1413, 5, 13, 2),
(1414, 6, 10, 1),
(1415, 6, 13, 2),
(1416, 7, 10, 1),
(1417, 7, 13, 2),
(1418, 1, 10, 1),
(1419, 1, 13, 2),
(1420, 2, 10, 1),
(1421, 2, 13, 2),
(1422, 3, 10, 1),
(1423, 3, 13, 2),
(1424, 4, 10, 1),
(1425, 4, 13, 2),
(1426, 5, 10, 1),
(1427, 5, 13, 2),
(1428, 6, 10, 1),
(1429, 6, 13, 2),
(1430, 7, 10, 1),
(1431, 7, 13, 2),
(1432, 1, 10, 1),
(1433, 1, 13, 2),
(1434, 2, 10, 1),
(1435, 2, 13, 2),
(1436, 3, 10, 1),
(1437, 3, 13, 2),
(1438, 4, 10, 1),
(1439, 4, 13, 2),
(1440, 5, 10, 1),
(1441, 5, 13, 2),
(1442, 6, 10, 1),
(1443, 6, 13, 2),
(1444, 7, 10, 1),
(1445, 7, 13, 2),
(1446, 1, 10, 1),
(1447, 1, 13, 2),
(1448, 2, 10, 1),
(1449, 2, 13, 2),
(1450, 3, 10, 1),
(1451, 3, 13, 2),
(1452, 4, 10, 1),
(1453, 4, 13, 2),
(1454, 5, 10, 1),
(1455, 5, 13, 2),
(1456, 6, 10, 1),
(1457, 6, 13, 2),
(1458, 7, 10, 1),
(1459, 7, 13, 2),
(1460, 1, 10, 1),
(1461, 1, 13, 2),
(1462, 2, 10, 1),
(1463, 2, 13, 2),
(1464, 3, 10, 1),
(1465, 3, 13, 2),
(1466, 4, 10, 1),
(1467, 4, 13, 2),
(1468, 5, 10, 1),
(1469, 5, 13, 2),
(1470, 6, 10, 1),
(1471, 6, 13, 2),
(1472, 7, 10, 1),
(1473, 7, 13, 2),
(1474, 1, 10, 1),
(1475, 1, 13, 2),
(1476, 2, 10, 1),
(1477, 2, 13, 2),
(1478, 3, 10, 1),
(1479, 3, 13, 2),
(1480, 4, 10, 1),
(1481, 4, 13, 2),
(1482, 5, 10, 1),
(1483, 5, 13, 2),
(1484, 6, 10, 1),
(1485, 6, 13, 2),
(1486, 7, 10, 1),
(1487, 7, 13, 2),
(1488, 1, 10, 1),
(1489, 1, 13, 2),
(1490, 2, 10, 1),
(1491, 2, 13, 2),
(1492, 3, 10, 1),
(1493, 3, 13, 2),
(1494, 4, 10, 1),
(1495, 4, 13, 2),
(1496, 5, 10, 1),
(1497, 5, 13, 2),
(1498, 6, 10, 1),
(1499, 6, 13, 2),
(1500, 7, 10, 1),
(1501, 7, 13, 2),
(1502, 1, 10, 1),
(1503, 1, 13, 2),
(1504, 2, 10, 1),
(1505, 2, 13, 2),
(1506, 3, 10, 1),
(1507, 3, 13, 2),
(1508, 4, 10, 1),
(1509, 4, 13, 2),
(1510, 5, 10, 1),
(1511, 5, 13, 2),
(1512, 6, 10, 1),
(1513, 6, 13, 2),
(1514, 7, 10, 1),
(1515, 7, 13, 2),
(1516, 1, 10, 1),
(1517, 1, 13, 2),
(1518, 2, 10, 1),
(1519, 2, 13, 2),
(1520, 3, 10, 1),
(1521, 3, 13, 2),
(1522, 4, 10, 1),
(1523, 4, 13, 2),
(1524, 5, 10, 1),
(1525, 5, 13, 2),
(1526, 6, 10, 1),
(1527, 6, 13, 2),
(1528, 7, 10, 1),
(1529, 7, 13, 2),
(1530, 1, 10, 1),
(1531, 1, 13, 2),
(1532, 2, 10, 1),
(1533, 2, 13, 2),
(1534, 3, 10, 1),
(1535, 3, 13, 2),
(1536, 4, 10, 1),
(1537, 4, 13, 2),
(1538, 5, 10, 1),
(1539, 5, 13, 2),
(1540, 6, 10, 1),
(1541, 6, 13, 2),
(1542, 7, 10, 1),
(1543, 7, 13, 2),
(1544, 1, 10, 1),
(1545, 1, 13, 2),
(1546, 2, 10, 1),
(1547, 2, 13, 2),
(1548, 3, 10, 1),
(1549, 3, 13, 2),
(1550, 4, 10, 1),
(1551, 4, 13, 2),
(1552, 5, 10, 1),
(1553, 5, 13, 2),
(1554, 6, 10, 1),
(1555, 6, 13, 2),
(1556, 7, 10, 1),
(1557, 7, 13, 2),
(1558, 1, 10, 1),
(1559, 1, 13, 2),
(1560, 2, 10, 1),
(1561, 2, 13, 2),
(1562, 3, 10, 1),
(1563, 3, 13, 2),
(1564, 4, 10, 1),
(1565, 4, 13, 2),
(1566, 5, 10, 1),
(1567, 5, 13, 2),
(1568, 6, 10, 1),
(1569, 6, 13, 2),
(1570, 7, 10, 1),
(1571, 7, 13, 2),
(1572, 1, 10, 1),
(1573, 1, 13, 2),
(1574, 1, 15, 1),
(1575, 1, 17, 2);

-- --------------------------------------------------------

--
-- Structure de la table `shoprequest`
--

CREATE TABLE `shoprequest` (
  `id_shoprequest` int UNSIGNED NOT NULL,
  `status` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `shoprequest`
--

INSERT INTO `shoprequest` (`id_shoprequest`, `status`) VALUES
(1, 'pending'),
(2, 'admitted'),
(3, 'declined');

-- --------------------------------------------------------

--
-- Structure de la table `shops`
--

CREATE TABLE `shops` (
  `id_shop` int UNSIGNED NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_user` int UNSIGNED DEFAULT NULL,
  `phone` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `siret` varchar(14) NOT NULL,
  `legalproof` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `logo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_shoprequest` int UNSIGNED NOT NULL DEFAULT '1',
  `id_status` int UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `shops`
--

INSERT INTO `shops` (`id_shop`, `name`, `description`, `address`, `image`, `id_user`, `phone`, `siret`, `legalproof`, `logo`, `id_shoprequest`, `id_status`) VALUES
(68, 'Game Design et Development', 'ok no number no special characters etc', '34000 Montpellier', '/uploads/1738944700832-Fond.jpg', 53, '06-66-66-66-66', '12345687901234', '/uploads/1738944700873-sub_logo.png', '/uploads/1738944700873-twt_logo.png', 2, 2),
(69, 'Alimentation', 'Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation ', 'Centre commercial, 1235 All. Ulysse, 34000 Montpellier', '/uploads/1739118482378-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118482430-sub_logo.png', '/uploads/1739118482430-twt_logo.png', 1, 1),
(70, 'Alimentation', 'Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation ', '51 Rue de l\'Aiguillerie, 34000 Montpellier', '/uploads/1739118494729-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118494775-sub_logo.png', '/uploads/1739118494774-twt_logo.png', 1, 1),
(71, 'Alimentation', 'Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation Alimentation ', '8 Rue du Petit Saint-Jean, 34000 Montpellier', '/uploads/1739118495758-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118495793-sub_logo.png', '/uploads/1739118495793-twt_logo.png', 1, 1),
(81, 'Only Working Test', 'Mode ', 'Gisèle Halimi, montpellier 34000', '/uploads/1739118522975-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118523025-sub_logo.png', '/uploads/1739118523024-twt_logo.png', 1, 1),
(82, 'Mode ', 'Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode Mode ', 'Mode address', '/uploads/1739118549725-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118549773-sub_logo.png', '/uploads/1739118549773-twt_logo.png', 1, 1),
(89, 'Restauration ', 'Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration Restauration ', 'Restauration address', '/uploads/1739118575955-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118576003-sub_logo.png', '/uploads/1739118576003-twt_logo.png', 1, 1),
(97, 'Jardin ', 'Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin ', 'Jardin address', '/uploads/1739118599971-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118600032-sub_logo.png', '/uploads/1739118600032-twt_logo.png', 1, 1),
(104, 'Jardin ', 'Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin Jardin ', 'Jardin address', '/uploads/1739118602859-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118602916-sub_logo.png', '/uploads/1739118602916-twt_logo.png', 1, 1),
(105, 'Artisanat ', 'Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat ', 'Artisanat address', '/uploads/1739118628926-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118628976-sub_logo.png', '/uploads/1739118628976-twt_logo.png', 1, 1),
(111, 'Artisanat ', 'Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat Artisanat ', 'Artisanat address', '/uploads/1739118635387-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118635444-sub_logo.png', '/uploads/1739118635444-twt_logo.png', 1, 1),
(115, 'Bien-etre ', 'Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre ', 'Bien-etre address', '/uploads/1739118686701-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118686783-sub_logo.png', '/uploads/1739118686782-twt_logo.png', 1, 1),
(116, 'Bien-etre ', 'Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre ', '3 Pl. Carnot, 34470 Pérols', '/uploads/1739118686736-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118686792-sub_logo.png', '/uploads/1739118686792-twt_logo.png', 1, 1),
(117, 'Bien-etre ', 'Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre Bien-etre ', '44 La Canebière, 13001 Marseille', '/uploads/1739118688818-Fond.jpg', 54, '66-66-66-66-66', '19892874659203', '/uploads/1739118688844-sub_logo.png', '/uploads/1739118688844-twt_logo.png', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `shops_categories`
--

CREATE TABLE `shops_categories` (
  `id_shop_category` int UNSIGNED NOT NULL,
  `id_shop` int UNSIGNED NOT NULL,
  `id_category` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `shops_categories`
--

INSERT INTO `shops_categories` (`id_shop_category`, `id_shop`, `id_category`) VALUES
(64, 68, 6),
(65, 69, 4),
(66, 70, 4),
(67, 71, 4),
(77, 81, 1),
(78, 82, 1),
(85, 89, 2),
(93, 97, 3),
(100, 104, 3),
(101, 105, 5),
(107, 111, 5),
(111, 115, 6),
(112, 116, 6),
(113, 117, 6);

-- --------------------------------------------------------

--
-- Structure de la table `shops_schedules`
--

CREATE TABLE `shops_schedules` (
  `id_shop_schedule` int UNSIGNED NOT NULL,
  `id_shop` int UNSIGNED NOT NULL,
  `id_schedule` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `shops_schedules`
--

INSERT INTO `shops_schedules` (`id_shop_schedule`, `id_shop`, `id_schedule`) VALUES
(169, 68, 742),
(170, 68, 743),
(171, 68, 744),
(172, 68, 745),
(173, 68, 746),
(174, 68, 747),
(175, 68, 748),
(176, 68, 749),
(177, 68, 750),
(178, 68, 751),
(179, 68, 752),
(180, 68, 753),
(181, 68, 754),
(182, 68, 755),
(183, 68, 756),
(184, 68, 757),
(185, 68, 758),
(186, 68, 759),
(187, 69, 760),
(188, 69, 761),
(189, 69, 762),
(190, 69, 763),
(191, 69, 764),
(192, 69, 765),
(193, 69, 766),
(194, 69, 767),
(195, 69, 768),
(196, 69, 769),
(197, 69, 770),
(198, 69, 771),
(199, 69, 772),
(200, 69, 773),
(201, 70, 774),
(202, 70, 775),
(203, 70, 776),
(204, 70, 777),
(205, 70, 778),
(206, 70, 779),
(207, 70, 780),
(208, 70, 781),
(209, 70, 782),
(210, 70, 783),
(211, 70, 784),
(212, 70, 785),
(213, 70, 786),
(214, 70, 787),
(215, 71, 788),
(216, 71, 789),
(217, 71, 790),
(218, 71, 791),
(219, 71, 792),
(220, 71, 793),
(221, 71, 794),
(222, 71, 795),
(223, 71, 796),
(224, 71, 797),
(225, 71, 798),
(226, 71, 799),
(227, 71, 800),
(228, 71, 801),
(355, 81, 928),
(356, 81, 929),
(357, 81, 930),
(358, 81, 931),
(359, 81, 932),
(360, 81, 933),
(361, 81, 934),
(362, 81, 935),
(363, 81, 936),
(364, 81, 937),
(365, 81, 938),
(366, 81, 939),
(367, 81, 940),
(368, 81, 941),
(369, 82, 942),
(370, 82, 943),
(371, 82, 944),
(372, 82, 945),
(373, 82, 946),
(374, 82, 947),
(375, 82, 948),
(376, 82, 949),
(377, 82, 950),
(378, 82, 951),
(379, 82, 952),
(380, 82, 953),
(381, 82, 954),
(382, 82, 955),
(467, 89, 1040),
(468, 89, 1041),
(469, 89, 1042),
(470, 89, 1043),
(471, 89, 1044),
(472, 89, 1045),
(473, 89, 1046),
(474, 89, 1047),
(475, 89, 1048),
(476, 89, 1049),
(477, 89, 1050),
(478, 89, 1051),
(479, 89, 1052),
(480, 89, 1053),
(579, 97, 1152),
(580, 97, 1153),
(581, 97, 1154),
(582, 97, 1155),
(583, 97, 1156),
(584, 97, 1157),
(585, 97, 1158),
(586, 97, 1159),
(587, 97, 1160),
(588, 97, 1161),
(589, 97, 1162),
(590, 97, 1163),
(591, 97, 1164),
(592, 97, 1165),
(677, 104, 1250),
(678, 104, 1251),
(679, 104, 1252),
(680, 104, 1253),
(681, 104, 1254),
(682, 104, 1255),
(683, 104, 1256),
(684, 104, 1257),
(685, 104, 1258),
(686, 104, 1259),
(687, 104, 1260),
(688, 104, 1261),
(689, 104, 1262),
(690, 104, 1263),
(691, 105, 1264),
(692, 105, 1265),
(693, 105, 1266),
(694, 105, 1267),
(695, 105, 1268),
(696, 105, 1269),
(697, 105, 1270),
(698, 105, 1271),
(699, 105, 1272),
(700, 105, 1273),
(701, 105, 1274),
(702, 105, 1275),
(703, 105, 1276),
(704, 105, 1277),
(775, 111, 1348),
(776, 111, 1349),
(777, 111, 1350),
(778, 111, 1351),
(779, 111, 1352),
(780, 111, 1353),
(781, 111, 1354),
(782, 111, 1355),
(783, 111, 1356),
(784, 111, 1357),
(785, 111, 1358),
(786, 111, 1359),
(787, 111, 1360),
(788, 111, 1361),
(831, 115, 1404),
(832, 115, 1405),
(833, 115, 1406),
(834, 115, 1407),
(835, 115, 1408),
(836, 115, 1409),
(837, 115, 1410),
(838, 115, 1411),
(839, 115, 1412),
(840, 115, 1413),
(841, 115, 1414),
(842, 115, 1415),
(843, 115, 1416),
(844, 115, 1417),
(845, 116, 1418),
(846, 116, 1419),
(847, 116, 1420),
(848, 116, 1421),
(849, 116, 1422),
(850, 116, 1423),
(851, 116, 1424),
(852, 116, 1425),
(853, 116, 1426),
(854, 116, 1427),
(855, 116, 1428),
(856, 116, 1429),
(857, 116, 1430),
(858, 116, 1431),
(859, 117, 1432),
(860, 117, 1433),
(861, 117, 1434),
(862, 117, 1435),
(863, 117, 1436),
(864, 117, 1437),
(865, 117, 1438),
(866, 117, 1439),
(867, 117, 1440),
(868, 117, 1441),
(869, 117, 1442),
(870, 117, 1443),
(871, 117, 1444),
(872, 117, 1445);

-- --------------------------------------------------------

--
-- Structure de la table `states`
--

CREATE TABLE `states` (
  `id_state` int UNSIGNED NOT NULL,
  `state` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `states`
--

INSERT INTO `states` (`id_state`, `state`) VALUES
(1, 'open'),
(2, 'close');

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

CREATE TABLE `status` (
  `id_status` int UNSIGNED NOT NULL,
  `status` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`id_status`, `status`) VALUES
(1, 'inactive'),
(2, 'active');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int UNSIGNED NOT NULL,
  `firstname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(500) NOT NULL,
  `phone` varchar(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `firstname`, `lastname`, `email`, `password`, `phone`) VALUES
(1, 'admin', 'admin', 'admin@admin', '$2a$10$i1s9GTp9jKKIn2/gqackOeWfd6M1Y.zYbQOxqVZ4zuR6/Gm6afQXK', '66-66-66-66-66'),
(2, 'TestClient', 'TestClient', 'TestClient@gmail.com', '$2a$10$aI3o5..FL.P4U/N0E7eUVeTA.ODY1HX/Qjf31abIvPK78pjVvkscy', '06-66-66-66-66'),
(3, 'Shop', 'Keeper', 'ShopKeeper@', '$2a$10$SSGoTzXI6iLL1MC4PlJ5QeqZckbHX.ilHj1wGOnddkhM/mEEzL7bS', '06-66-66-66-66'),
(46, 'TestClientFirst', 'TestClientFirst', 'TestClientFirst@gmail.com', '$2a$10$JcxTdrZFQ5aw3Cxkaa34auYAaIhfpIb.cFHdiSf3XAZytxzvgDPuC', '07-77-77-77-77'),
(51, 'anythin', 'anythin', 'Test4@', '$2a$10$BhethF9tarxUK5V7AsmgUeNk/ljdulWrC6EUFoFKrM5zR06EB9i9q', '98-72-69-87-62'),
(52, 'Test', 'Test', 'Test5@', '$2a$10$w8fTtpDdIvSLZCojKwsk4OlvIPqcsmx6Fuy7Ygy5sOEtji7kJtoSi', '66-66-66-66-66'),
(53, 'TestDev', 'DevTest', 'TestDev@', '$2a$10$mgrnomZwcAXzRPOmJSxKQ.LDzdoiwr/ecH5kac8KDnaYORjFkcoQG', '06-66-66-66-66'),
(54, 'Alim', 'Alimen', 'Alimentation@', '$2a$10$o6Fyrdd4r3N7shDnmBdc4.sGNKLhyzKnGznZafUUbKoTbl7UCCm9a', '66-66-66-66-66'),
(56, 'lila', 'lilili', 'lila@gmail.com', '$2a$10$qleYn5aLXlRiTXWjVIeeMOTXvJ.LwII1Q4dUOWuRgmFXbNip2duxa', '00-00-00-00-00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `comment_user` (`id_user`),
  ADD KEY `comment_product` (`id_product`);

--
-- Index pour la table `days`
--
ALTER TABLE `days`
  ADD PRIMARY KEY (`id_day`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id_event`),
  ADD KEY `event_shop` (`id_shop`);

--
-- Index pour la table `hours`
--
ALTER TABLE `hours`
  ADD PRIMARY KEY (`id_hour`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `message_sender` (`id_sender`),
  ADD KEY `message_recipient` (`id_recipient`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `order_user` (`id_user`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `product_shop` (`id_shop`);

--
-- Index pour la table `products_categories`
--
ALTER TABLE `products_categories`
  ADD PRIMARY KEY (`id_product_category`),
  ADD KEY `product_category` (`id_category`),
  ADD KEY `category_product` (`id_product`);

--
-- Index pour la table `products_orders`
--
ALTER TABLE `products_orders`
  ADD PRIMARY KEY (`id_product_order`),
  ADD KEY `product_order` (`id_order`),
  ADD KEY `order_product` (`id_product`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`);

--
-- Index pour la table `roles_users`
--
ALTER TABLE `roles_users`
  ADD PRIMARY KEY (`id_role_user`),
  ADD KEY `role_user` (`id_user`),
  ADD KEY `user_role` (`id_role`);

--
-- Index pour la table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id_schedule`),
  ADD KEY `schedule_day` (`id_day`),
  ADD KEY `schedule_hour` (`id_hour`),
  ADD KEY `schedule_state` (`id_state`);

--
-- Index pour la table `shoprequest`
--
ALTER TABLE `shoprequest`
  ADD PRIMARY KEY (`id_shoprequest`);

--
-- Index pour la table `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`id_shop`),
  ADD KEY `shop_user` (`id_user`),
  ADD KEY `shop_request` (`id_shoprequest`),
  ADD KEY `shop_status` (`id_status`);

--
-- Index pour la table `shops_categories`
--
ALTER TABLE `shops_categories`
  ADD PRIMARY KEY (`id_shop_category`),
  ADD KEY `shop_category` (`id_category`),
  ADD KEY `category_shop` (`id_shop`);

--
-- Index pour la table `shops_schedules`
--
ALTER TABLE `shops_schedules`
  ADD PRIMARY KEY (`id_shop_schedule`),
  ADD KEY `schedule_shop` (`id_shop`),
  ADD KEY `shop_schedule` (`id_schedule`);

--
-- Index pour la table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id_state`);

--
-- Index pour la table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id_status`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `days`
--
ALTER TABLE `days`
  MODIFY `id_day` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id_event` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `hours`
--
ALTER TABLE `hours`
  MODIFY `id_hour` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id_message` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `products_categories`
--
ALTER TABLE `products_categories`
  MODIFY `id_product_category` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `products_orders`
--
ALTER TABLE `products_orders`
  MODIFY `id_product_order` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `roles_users`
--
ALTER TABLE `roles_users`
  MODIFY `id_role_user` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id_schedule` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1576;

--
-- AUTO_INCREMENT pour la table `shoprequest`
--
ALTER TABLE `shoprequest`
  MODIFY `id_shoprequest` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `shops`
--
ALTER TABLE `shops`
  MODIFY `id_shop` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT pour la table `shops_categories`
--
ALTER TABLE `shops_categories`
  MODIFY `id_shop_category` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT pour la table `shops_schedules`
--
ALTER TABLE `shops_schedules`
  MODIFY `id_shop_schedule` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1003;

--
-- AUTO_INCREMENT pour la table `states`
--
ALTER TABLE `states`
  MODIFY `id_state` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `status`
--
ALTER TABLE `status`
  MODIFY `id_status` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comment_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `event_shop` FOREIGN KEY (`id_shop`) REFERENCES `shops` (`id_shop`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `message_recipient` FOREIGN KEY (`id_recipient`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `message_sender` FOREIGN KEY (`id_sender`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `order_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `product_shop` FOREIGN KEY (`id_shop`) REFERENCES `shops` (`id_shop`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `products_categories`
--
ALTER TABLE `products_categories`
  ADD CONSTRAINT `category_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `products_orders`
--
ALTER TABLE `products_orders`
  ADD CONSTRAINT `order_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_order` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `roles_users`
--
ALTER TABLE `roles_users`
  ADD CONSTRAINT `role_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_role` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedule_day` FOREIGN KEY (`id_day`) REFERENCES `days` (`id_day`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `schedule_hour` FOREIGN KEY (`id_hour`) REFERENCES `hours` (`id_hour`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `schedule_state` FOREIGN KEY (`id_state`) REFERENCES `states` (`id_state`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `shops`
--
ALTER TABLE `shops`
  ADD CONSTRAINT `shop_request` FOREIGN KEY (`id_shoprequest`) REFERENCES `shoprequest` (`id_shoprequest`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `shop_status` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `shop_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `shops_categories`
--
ALTER TABLE `shops_categories`
  ADD CONSTRAINT `category_shop` FOREIGN KEY (`id_shop`) REFERENCES `shops` (`id_shop`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shop_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Contraintes pour la table `shops_schedules`
--
ALTER TABLE `shops_schedules`
  ADD CONSTRAINT `schedule_shop` FOREIGN KEY (`id_shop`) REFERENCES `shops` (`id_shop`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shop_schedule` FOREIGN KEY (`id_schedule`) REFERENCES `schedules` (`id_schedule`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
