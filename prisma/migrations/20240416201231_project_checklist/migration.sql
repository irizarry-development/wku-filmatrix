-- CreateTable
CREATE TABLE "ProjectTodo" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "approvedDT" TIMESTAMP(3),
    "approverId" TEXT,

    CONSTRAINT "ProjectTodo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectTodo" ADD CONSTRAINT "ProjectTodo_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTodo" ADD CONSTRAINT "ProjectTodo_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
