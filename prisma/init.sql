-- Prisma schema translated to PostgreSQL SQL
-- Run this script against your Neon database to create all tables.

CREATE TYPE "Privacy" AS ENUM ('PUBLIC', 'UNLISTED', 'PRIVATE');

CREATE TABLE "User" (
  id TEXT PRIMARY KEY,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  "avatarUrl" TEXT,
  bio TEXT,
  "isVerified" BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE "Video" (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  duration INTEGER NOT NULL,
  "publishedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  views INTEGER NOT NULL DEFAULT 0,
  "likeCount" INTEGER NOT NULL DEFAULT 0,
  privacy "Privacy" NOT NULL DEFAULT 'PUBLIC',
  "thumbnailUrl" TEXT NOT NULL,
  "videoUrl" TEXT NOT NULL,
  "authorId" TEXT NOT NULL,
  CONSTRAINT "Video_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "QualityUrl" (
  id TEXT PRIMARY KEY,
  quality TEXT NOT NULL,
  url TEXT NOT NULL,
  "videoId" TEXT NOT NULL,
  CONSTRAINT "QualityUrl_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Playlist" (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  "isPublic" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "ownerId" TEXT NOT NULL,
  CONSTRAINT "Playlist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "PlaylistItem" (
  id TEXT PRIMARY KEY,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "playlistId" TEXT NOT NULL,
  "videoId" TEXT NOT NULL,
  CONSTRAINT "PlaylistItem_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "PlaylistItem_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Tag" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE "Comment" (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "authorId" TEXT NOT NULL,
  "videoId" TEXT NOT NULL,
  "parentId" TEXT,
  CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Comment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE "Favorite" (
  id TEXT PRIMARY KEY,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "userId" TEXT NOT NULL,
  "videoId" TEXT NOT NULL,
  CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Favorite_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "ViewHistory" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "videoId" TEXT NOT NULL,
  "watchedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  progress INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "ViewHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "ViewHistory_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Follow" (
  id TEXT PRIMARY KEY,
  "followerId" TEXT NOT NULL,
  "followingId" TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "_VideoToTag" (
  "A" TEXT NOT NULL,
  "B" TEXT NOT NULL,
  CONSTRAINT "_VideoToTag_pkey" PRIMARY KEY ("A", "B"),
  CONSTRAINT "_VideoToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Video"(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "_VideoToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"(id) ON DELETE CASCADE ON UPDATE CASCADE
);
