CREATE TABLE [dbo].[Usuario] (
    [Id]           VARCHAR (50) NOT NULL,
    [Nome_usuario] VARCHAR (50) NOT NULL,
    [Email]        VARCHAR (50) NOT NULL,
    [Senha]        VARCHAR (50) NOT NULL,
    [Cod_Seg]      VARCHAR (50) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [dbo].[Cartao] (
    [Id]            VARCHAR (50) NOT NULL,
    [Id_Usuario]    VARCHAR (50) NOT NULL,
    [Nome_titular]  VARCHAR (50) NOT NULL,
    [Numero]        VARCHAR (50) NOT NULL,
    [Validade]      VARCHAR (50) NOT NULL,
    [Cod_seguranca] VARCHAR (50) NOT NULL,
    [Bandeira]      VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Cartões] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_id_Cartao] FOREIGN KEY ([Id_Usuario]) REFERENCES [dbo].[Usuario] ([Id])
);

CREATE TABLE [dbo].[Transacao] (
    [Id]           VARCHAR (50) NOT NULL,
    [id_Cartao]    VARCHAR (50) NOT NULL,
    [id_Donatario] VARCHAR (50) NOT NULL,
    [valor]        DECIMAL (18) NOT NULL,
    [data]         DATE         NOT NULL,
    [hora]         TIME (7)     NOT NULL,
    CONSTRAINT [PK_Transacao] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_id_Donatario] FOREIGN KEY ([id_Donatario]) REFERENCES [dbo].[Donatario] ([Id]),
    CONSTRAINT [FK_id_transacao_Cartao] FOREIGN KEY ([id_Cartao]) REFERENCES [dbo].[Cartao] ([Id])
);

CREATE TABLE [dbo].[Donatario] (
    [Id]               VARCHAR (50) NOT NULL,
    [Nome_doacao]      VARCHAR (50) NOT NULL,
    [Quant_arrecadada] NUMERIC (18) NOT NULL,
    [Quant_faltante]   NUMERIC (18) NOT NULL,
    CONSTRAINT [PK_NewTable] PRIMARY KEY CLUSTERED ([Id] ASC)
);
