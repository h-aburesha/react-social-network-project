
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE users
ADD COLUMN profilepic character varying(255) DEFAULT NULL,
ADD COLUMN loggedin boolean DEFAULT false;

ALTER TABLE users ALTER COLUMN profilepicurl SET DEFAULT 'https://s3.amazonaws.com/spicedling/abWAauCyoXO7Jb4ga3_dIAtCZwoi29pj.png';

ALTER TABLE users ADD COLUMN bio character varying(255) DEFAULT NULL;

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    recipient_id INTEGER NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE images(
--     id SERIAL PRIMARY KEY,
--     image_url VARCHAR NOT NULL,
--     description TEXT,
--     likes INTEGER DEFAULT 0,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     uploader_id INT NOT NULL REFERENCES users(id)
-- );