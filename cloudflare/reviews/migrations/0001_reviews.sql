CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  experience TEXT NOT NULL,
  language TEXT NOT NULL CHECK(language IN ('en','es','fr')),
  public_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected','hidden')),
  consent_version TEXT NOT NULL,
  consent_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  deletion_hash TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  flags TEXT NOT NULL DEFAULT '[]',
  moderation_reason TEXT NOT NULL DEFAULT ''
);
CREATE INDEX reviews_public ON reviews(status);
CREATE INDEX reviews_experience ON reviews(status, experience);
CREATE INDEX reviews_retention ON reviews(status, updated_at);
CREATE INDEX reviews_approved_retention ON reviews(status, created_at);
CREATE INDEX reviews_duplicates ON reviews(content_hash);
CREATE TABLE rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE INDEX rate_expiry ON rate_limits(expires_at);
CREATE TABLE moderation_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  review_id TEXT NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX log_review ON moderation_log(review_id);
