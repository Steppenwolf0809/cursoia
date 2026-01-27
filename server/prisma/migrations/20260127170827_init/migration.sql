-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PollResponse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pollId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PollResponse_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
