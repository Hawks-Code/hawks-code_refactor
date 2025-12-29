CREATE TABLE IF NOT EXISTS resources(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT  UNIQUE NOT NULL,
    path TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    title TEXT NOT NULL,
    author TEXT,
    course TEXT,
    published INTEGER NOT NULL DEFAULT 0,
    last_modified INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    indexed_at INTEGER NOT NULL,
    metadata TEXT -- JSON
);

CREATE TABLE IF NOT EXISTS tags(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS languages(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS technologies(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS concepts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS resources_tags(
    resource_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (resource_id, tag_id),
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resources_languages(
    resource_id INTEGER NOT NULL,
    language_id INTEGER NOT NULL,
    PRIMARY KEY (resource_id, language_id),
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resources_concepts(
    resource_id INTEGER NOT NULL,
    concept_id INTEGER NOT NULL,
    PRIMARY KEY (resource_id, concept_id),
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (concept_id) REFERENCES concepts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resources_technologies(
    resource_id INTEGER NOT NULL,
    technology_id INTEGER NOT NULL,
    PRIMARY KEY (resource_id, technology_id),
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE
);


CREATE INDEX IF NOT EXISTS idx_slug on resources(slug);
CREATE INDEX IF NOT EXISTS idx_path on resources(path);
CREATE INDEX IF NOT EXISTS idx_published on resources(published);
CREATE INDEX IF NOT EXISTS idx_course on resources(course);
CREATE INDEX IF NOT EXISTS idx_last_modified on resources(last_modified);
CREATE INDEX IF NOT EXISTS idx_created_at on resources(created_at);
CREATE INDEX IF NOT EXISTS idx_author on resources(author);

CREATE VIRTUAL TABLE IF NOT EXISTS resources_fts using fts5(
    slug,
    title,
    content,
    author,
    course,
    content=resources,
    content_rowid=id    
);

CREATE TRIGGER IF NOT EXISTS resources_ai AFTER INSERT ON resources BEGIN
    INSERT INTO resources_fts(rowid, slug, title, content, author, course)
    VALUES (new.id, new.slug, new.title, new.content, new.author, new.course);
END;

CREATE TRIGGER IF NOT EXISTS resources_ad AFTER DELETE ON resources BEGIN
    DELETE FROM resources_fts WHERE rowid = old.id;
END;

CREATE TRIGGER IF NOT EXISTS resources_au AFTER UPDATE ON resources BEGIN
    UPDATE resources_fts
    SET
        slug = new.slug,
        title = new.title,
        content = new.content,
        author = new.author,
        course = new.course
    WHERE rowid = new.id;
END;

