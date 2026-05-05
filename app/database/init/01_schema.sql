-- Limpieza inicial: Destruye las tablas si existen, incluyendo dependencias
DROP TABLE IF EXISTS album_ratings CASCADE;
DROP TABLE IF EXISTS songs CASCADE;
DROP TABLE IF EXISTS albums CASCADE;
DROP TABLE IF EXISTS bands CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Creación de tablas
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE bands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    formation_year INT
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    band_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    release_year INT,
    cover_image_url TEXT,
    CONSTRAINT fk_band FOREIGN KEY (band_id) REFERENCES bands(id) ON DELETE CASCADE
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    album_id INT NOT NULL,
    track_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    duration_seconds INT,
    CONSTRAINT fk_album FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);

-- Tabla para el Challenge de Sistema de Rating (30 pts)
CREATE TABLE album_ratings (
    id SERIAL PRIMARY KEY,
    album_id INT NOT NULL,
    user_id INT NOT NULL,
    score INT CHECK (score >= 1 AND score <= 10),
    review_text TEXT,
    CONSTRAINT fk_album_rating FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_rating FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);