-- Insertar usuarios de prueba (Contraseña para todos: admin123)
INSERT INTO users (username, password_hash, role) VALUES
('admin', '$2b$10$wDBOZlgtMVX/H2AVdX188.bIT4AWFOwDhXNFsRtq3TwF.HiizlvYy', 'admin'),
('hugo_metalhead', '$2b$10$wDBOZlgtMVX/H2AVdX188.bIT4AWFOwDhXNFsRtq3TwF.HiizlvYy', 'user');

INSERT INTO bands (name, genre, formation_year) VALUES
('Slaughter to Prevail', 'Deathcore', 2014),
('Paleface Swiss', 'Beatdown Hardcore', 2015),
('Kublai Khan TX', 'Metalcore/Beatdown', 2009),
('Gojira', 'Progressive Death Metal', 1996),
('Lorna Shore', 'Symphonic Deathcore', 2010);

INSERT INTO albums (band_id, title, release_year, cover_image_url) VALUES
(1, 'Kostolom', 2021, '/uploads/kostolom.jpg'),
(2, 'Fear & Dagger', 2022, '/uploads/fear_and_dagger.jpg'),
(3, 'Absolute', 2019, '/uploads/absolute.jpg'),
(4, 'Fortitude', 2021, '/uploads/fortitude.jpg'),
(5, 'Pain Remains', 2022, '/uploads/pain_remains.jpg');

-- Canciones para Kostolom (banda 1, album 1)
INSERT INTO songs (album_id, track_number, title, duration_seconds) VALUES
(1, 1, 'Bonebreaker', 265),
(1, 2, 'Demolisher', 216),
(1, 3, 'Zavali Ebalo', 198),
(1, 4, 'Agony', 232),
(1, 5, 'Baba Yaga', 255);

-- Canciones para Fear & Dagger (banda 2, album 2)
INSERT INTO songs (album_id, track_number, title, duration_seconds) VALUES
(2, 1, '666', 154),
(2, 2, 'Pain', 221),
(2, 3, 'Hellhole', 186),
(2, 4, 'Nail to the Tooth', 198),
(2, 5, 'Dead Man''s Diary', 234);

-- Canciones para Absolute (banda 3, album 3)
INSERT INTO songs (album_id, track_number, title, duration_seconds) VALUES
(3, 1, 'Armor of God', 140),
(3, 2, 'Boomslang', 160),
(3, 3, 'Us & Them', 184),
(3, 4, 'The Truest Love', 198),
(3, 5, 'Self-Destruct', 155);

-- Canciones para Fortitude (banda 4, album 4)
INSERT INTO songs (album_id, track_number, title, duration_seconds) VALUES
(4, 1, 'Born For One Thing', 303),
(4, 2, 'Amazonia', 300),
(4, 3, 'Another World', 264),
(4, 4, 'Hold On', 338),
(4, 5, 'New Found', 396);

-- Canciones para Pain Remains (banda 5, album 5)
INSERT INTO songs (album_id, track_number, title, duration_seconds) VALUES
(5, 1, 'Welcome Back, O'' Sleeping Dreamer', 441),
(5, 2, 'Into the Earth', 312),
(5, 3, 'Sun//Eater', 367),
(5, 4, 'Cursed to Die', 280),
(5, 5, 'Soulless Existence', 432);

-- Reseñas (Ratings)
INSERT INTO album_ratings (album_id, user_id, score, review_text) VALUES
(1, 1, 9, 'Brutal, vocales increíbles de Alex Terrible.'),
(1, 2, 8, 'Excelente disco de deathcore, aunque un poco repetitivo al final.'),
(2, 1, 10, 'Una obra maestra del beatdown moderno. 10/10.'),
(3, 2, 9, 'Riffs súper agresivos, perfecto para el moshpit.'),
(4, 1, 8, 'Muy buen álbum de Gojira, pero me gusta más From Mars to Sirius.'),
(5, 2, 10, 'Posiblemente el mejor disco de deathcore sinfónico de la década.');