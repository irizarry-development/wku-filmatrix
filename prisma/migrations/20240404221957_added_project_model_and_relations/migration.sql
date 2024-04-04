-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "projectRuntime" TEXT NOT NULL,
    "projectAspectRatio" TEXT NOT NULL,
    "projectRating" TEXT NOT NULL,
    "projectRatingCriteria" TEXT NOT NULL,
    "projectProductionNumber" TEXT NOT NULL,
    "projectCategory" TEXT NOT NULL,
    "projectGenre" TEXT NOT NULL,
    "projectLanguage" TEXT NOT NULL,
    "projectShootingFormat" TEXT NOT NULL,
    "projectFilmSound" TEXT NOT NULL,
    "projectFilmSubtitled" BOOLEAN NOT NULL DEFAULT false,
    "projectTagline" TEXT NOT NULL,
    "projectLogLine" TEXT NOT NULL,
    "project25WordPitch" TEXT NOT NULL,
    "project50WordPitch" TEXT NOT NULL,
    "project75WordPitch" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LocationToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToVendor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToProject_AB_unique" ON "_LocationToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToProject_B_index" ON "_LocationToProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToUser_AB_unique" ON "_ProjectToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToUser_B_index" ON "_ProjectToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToVendor_AB_unique" ON "_ProjectToVendor"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToVendor_B_index" ON "_ProjectToVendor"("B");

-- AddForeignKey
ALTER TABLE "_LocationToProject" ADD CONSTRAINT "_LocationToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToProject" ADD CONSTRAINT "_LocationToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToUser" ADD CONSTRAINT "_ProjectToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToUser" ADD CONSTRAINT "_ProjectToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToVendor" ADD CONSTRAINT "_ProjectToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToVendor" ADD CONSTRAINT "_ProjectToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
