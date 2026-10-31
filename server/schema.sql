CREATE DATABASE IF NOT EXISTS little_paws CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE little_paws;

CREATE TABLE IF NOT EXISTS puppies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  gender ENUM('Girl', 'Boy') NOT NULL,
  age_months TINYINT UNSIGNED NOT NULL,
  location ENUM('Dubai', 'Coming soon', 'Gone home') NOT NULL DEFAULT 'Dubai',
  image_url TEXT NOT NULL,
  photo_urls JSON NULL,
  description TEXT NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  origin ENUM('local', 'imported') NOT NULL DEFAULT 'local',
  collection VARCHAR(80) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  puppy_id INT NULL,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(190) NULL,
  area VARCHAR(120) NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_inquiry_puppy FOREIGN KEY (puppy_id) REFERENCES puppies(id) ON DELETE SET NULL
);

INSERT IGNORE INTO puppies (slug, name, breed, gender, age_months, location, image_url, description) VALUES
('olive-cavapoo', 'Olive', 'Cavapoo', 'Girl', 3, 'Dubai', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85', 'A gentle, curious little companion with a soft apricot coat and a very sweet nature.'),
('milo-pomeranian', 'Milo', 'Pomeranian', 'Boy', 2, 'Dubai', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=85', 'Playful, fluffy, and happiest when he is close to his people.'),
('cleo-maltipoo', 'Cleo', 'Maltipoo', 'Girl', 3, 'Dubai', 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=85', 'A bright and affectionate Maltipoo who loves a cuddle and a new adventure.'),
('archie-toy-poodle', 'Archie', 'Toy Poodle', 'Boy', 2, 'Coming soon', 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=85', 'A clever little soul with a soft curl coat, getting ready to meet his family.'),
('poppy-shih-tzu', 'Poppy', 'Shih Tzu', 'Girl', 2, 'Dubai', 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1000&q=85', 'A cuddly, people-loving puppy with a playful streak and a tender heart.'),
('biscuit-cavapoo', 'Biscuit', 'Cavapoo', 'Boy', 3, 'Dubai', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85', 'A happy-go-lucky companion who is ready to bring a little sunshine home.'),
('luna-pomeranian', 'Luna', 'Pomeranian', 'Girl', 3, 'Dubai', 'https://images.unsplash.com/photo-1611003228941-98852ba62227?auto=format&fit=crop&w=1000&q=85', 'A dainty bundle of curiosity who loves gentle company and a little lap time.'),
('copper-cavapoo', 'Copper', 'Cavapoo', 'Boy', 2, 'Dubai', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85', 'A sunny-natured little companion with a soft coat and a playful side.'),
('teddy-shih-tzu', 'Teddy', 'Shih Tzu', 'Boy', 2, 'Dubai', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=85', 'A gentle little friend who is happiest curled up beside someone he loves.'),
('daisy-maltipoo', 'Daisy', 'Maltipoo', 'Girl', 2, 'Dubai', 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=85', 'A sweet, attentive puppy who enjoys discovering new people and places.'),
('peanut-toy-poodle', 'Peanut', 'Toy Poodle', 'Boy', 2, 'Coming soon', 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=85', 'A bright little explorer, nearly ready to meet his new family.'),
('maple-cavapoo', 'Maple', 'Cavapoo', 'Girl', 3, 'Dubai', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85', 'A loving companion with a calm nature and a fondness for cuddles.'),
('benny-pomeranian', 'Benny', 'Pomeranian', 'Boy', 2, 'Dubai', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=85', 'A cheerful little character ready to fill a home with happy energy.'),
('rosie-maltipoo', 'Rosie', 'Maltipoo', 'Girl', 3, 'Coming soon', 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=85', 'A tender-hearted little puppy who is looking forward to a family of her own.'),
('shitzu-male', 'Shih Tzu', 'Shih Tzu', 'Boy', 2, 'Coming soon', 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1400&q=85', 'A sweet-natured little companion with a soft coat, a curious spirit, and a fondness for gentle company.'),
('pearl-toy-poodle', 'Pearl', 'Toy Poodle', 'Girl', 2, 'Coming soon', 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=85', 'A clever and affectionate little companion getting ready for her next chapter.'),
('korean-maltipoo', 'Sora', 'Korean Teacup Maltipoo', 'Girl', 2, 'Coming soon', 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1000&q=85', 'A tiny, gentle companion with a soft coat and a curious little spirit.'),
('korean-poodle', 'Bomi', 'Korean Teacup Poodle', 'Girl', 2, 'Coming soon', 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=85', 'A bright, affectionate little puppy getting ready to meet her family.'),
('korean-pomeranian', 'Duri', 'Korean Teacup Pomeranian', 'Boy', 2, 'Coming soon', 'https://images.unsplash.com/photo-1611003228941-98852ba62227?auto=format&fit=crop&w=1000&q=85', 'A little ball of fluff with a happy, people-loving nature.');

UPDATE puppies SET origin = 'imported', collection = 'korean-teacup' WHERE slug IN ('korean-maltipoo', 'korean-poodle', 'korean-pomeranian');
UPDATE puppies SET origin = 'imported' WHERE location = 'Coming soon' AND collection IS NULL;
UPDATE puppies SET photo_urls = JSON_ARRAY(
  'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1400&q=85'
) WHERE slug = 'shitzu-male';

INSERT IGNORE INTO puppies (slug, name, breed, gender, age_months, location, image_url, description, available) VALUES
('hazel-pomeranian', 'Hazel', 'Pomeranian', 'Girl', 3, 'Gone home', 'https://images.unsplash.com/photo-1611003228941-98852ba62227?auto=format&fit=crop&w=1000&q=85', 'Hazel has found her forever family.', FALSE),
('leo-toy-poodle', 'Leo', 'Toy Poodle', 'Boy', 3, 'Gone home', 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=85', 'Leo has found his forever family.', FALSE),
('mimi-maltipoo', 'Mimi', 'Maltipoo', 'Girl', 3, 'Gone home', 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=85', 'Mimi has found her forever family.', FALSE),
('toby-cavapoo', 'Toby', 'Cavapoo', 'Boy', 2, 'Gone home', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85', 'Toby has found his forever family.', FALSE);
