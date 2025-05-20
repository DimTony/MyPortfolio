BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[Projects] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [technologies] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [dash] NVARCHAR(1000) NOT NULL,
    [thumbnail] NVARCHAR(1000) NOT NULL,
    [releaseStatus] NVARCHAR(1000) NOT NULL,
    [maintainStatus] NVARCHAR(1000) NOT NULL,
    [date] NVARCHAR(1000) NOT NULL,
    [githubUrl] NVARCHAR(1000),
    [demoUrl] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Projects_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [descId] INT,
    CONSTRAINT [Projects_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Projects_descId_key] UNIQUE NONCLUSTERED ([descId])
);

-- CreateTable
CREATE TABLE [dbo].[ThinkTanks] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [technologies] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [dash] NVARCHAR(1000) NOT NULL,
    [thumbnail] NVARCHAR(1000) NOT NULL,
    [releaseStatus] NVARCHAR(1000) NOT NULL,
    [maintainStatus] NVARCHAR(1000) NOT NULL,
    [date] NVARCHAR(1000) NOT NULL,
    [githubUrl] NVARCHAR(1000),
    [demoUrl] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ThinkTanks_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [descId] INT,
    CONSTRAINT [ThinkTanks_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ThinkTanks_descId_key] UNIQUE NONCLUSTERED ([descId])
);

-- CreateTable
CREATE TABLE [dbo].[ProjectDescriptions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [summary] NVARCHAR(1000) NOT NULL,
    [footer] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ProjectDescriptions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Objectives] (
    [id] INT NOT NULL IDENTITY(1,1),
    [text] NVARCHAR(1000) NOT NULL,
    [descriptionId] INT NOT NULL,
    CONSTRAINT [Objectives_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Comments] (
    [id] INT NOT NULL IDENTITY(1,1),
    [content] NVARCHAR(1000) NOT NULL,
    [authorName] NVARCHAR(1000) NOT NULL,
    [avatarUrl] NVARCHAR(1000) NOT NULL CONSTRAINT [Comments_avatarUrl_df] DEFAULT '/images/user1.svg',
    [isApproved] BIT NOT NULL CONSTRAINT [Comments_isApproved_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Comments_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [projectId] INT NOT NULL,
    CONSTRAINT [Comments_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ThinkTankComment] (
    [id] INT NOT NULL IDENTITY(1,1),
    [content] NVARCHAR(1000) NOT NULL,
    [authorName] NVARCHAR(1000) NOT NULL,
    [avatarUrl] NVARCHAR(1000) NOT NULL CONSTRAINT [ThinkTankComment_avatarUrl_df] DEFAULT '/images/user2.svg',
    [isApproved] BIT NOT NULL CONSTRAINT [ThinkTankComment_isApproved_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ThinkTankComment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [thinkTankId] INT NOT NULL,
    CONSTRAINT [ThinkTankComment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ChatMessage] (
    [id] INT NOT NULL IDENTITY(1,1),
    [content] NVARCHAR(1000) NOT NULL,
    [guestName] NVARCHAR(1000),
    [sessionId] NVARCHAR(1000) NOT NULL,
    [isFromAdmin] BIT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ChatMessage_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ChatMessage_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Projects] ADD CONSTRAINT [Projects_descId_fkey] FOREIGN KEY ([descId]) REFERENCES [dbo].[ProjectDescriptions]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ThinkTanks] ADD CONSTRAINT [ThinkTanks_descId_fkey] FOREIGN KEY ([descId]) REFERENCES [dbo].[ProjectDescriptions]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Objectives] ADD CONSTRAINT [Objectives_descriptionId_fkey] FOREIGN KEY ([descriptionId]) REFERENCES [dbo].[ProjectDescriptions]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comments] ADD CONSTRAINT [Comments_projectId_fkey] FOREIGN KEY ([projectId]) REFERENCES [dbo].[Projects]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ThinkTankComment] ADD CONSTRAINT [ThinkTankComment_thinkTankId_fkey] FOREIGN KEY ([thinkTankId]) REFERENCES [dbo].[ThinkTanks]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
