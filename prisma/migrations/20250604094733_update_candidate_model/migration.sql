/*
  Warnings:

  - The `experience` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "currentCompany" TEXT,
ADD COLUMN     "currentTitle" TEXT,
ADD COLUMN     "expectedSalary" INTEGER,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "noticePeriod" INTEGER,
ADD COLUMN     "portfolioUrl" TEXT,
ADD COLUMN     "resumeUrl" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "source" TEXT,
ADD COLUMN     "stage" TEXT,
DROP COLUMN "experience",
ADD COLUMN     "experience" INTEGER;

-- CreateIndex
CREATE INDEX "Candidate_source_idx" ON "Candidate"("source");

-- CreateIndex
CREATE INDEX "Candidate_stage_idx" ON "Candidate"("stage");

-- CreateIndex
CREATE INDEX "Candidate_currentCompany_idx" ON "Candidate"("currentCompany");

-- CreateIndex
CREATE INDEX "Candidate_currentTitle_idx" ON "Candidate"("currentTitle");
