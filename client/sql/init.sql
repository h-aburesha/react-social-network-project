
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
ADD COLUMN profilepic character varying(255) DEFAULT null,
ADD COLUMN loggedin boolean DEFAULT false;

-- CREATE TABLE images(
--     id SERIAL PRIMARY KEY,
--     image_url VARCHAR NOT NULL,
--     description TEXT,
--     likes INTEGER DEFAULT 0,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     uploader_id INT NOT NULL REFERENCES users(id)
-- );