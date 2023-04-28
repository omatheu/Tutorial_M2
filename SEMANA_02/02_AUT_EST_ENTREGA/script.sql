CREATE TABLE "Sobre mim" ( 
	endereço             TEXT     ,
	telefone             INTEGER     ,
	email                TEXT     ,
	"texto de resumo (quem eu sou)" VARCHAR(250)     ,
	CONSTRAINT "unq_Sobre mim_texto de resumo (quem eu sou)" UNIQUE ( "texto de resumo (quem eu sou)" )
 );

CREATE TABLE Experiência ( 
	"Primeira experiência" TEXT     ,
	"Segunda experiência" TEXT     ,
	experiência          TEXT     ,
	CONSTRAINT unq_Experiência_experiência UNIQUE ( experiência ),
	FOREIGN KEY ( experiência ) REFERENCES "Sobre mim"( "texto de resumo (quem eu sou)" )  
 );

CREATE TABLE Formação ( 
	Curso                TEXT     ,
	"Ano de conclusão"   INTEGER     ,
	formação             TEXT     ,
	CONSTRAINT unq_Formação_formação UNIQUE ( formação ),
	FOREIGN KEY ( formação ) REFERENCES "Sobre mim"( "texto de resumo (quem eu sou)" )  
 );

CREATE TABLE Realizações ( 
	Titulo               TEXT     ,
	"Ano da realização"  INTEGER     ,
	realizações          TEXT     ,
	CONSTRAINT unq_Realizações_realizações UNIQUE ( realizações ),
	FOREIGN KEY ( realizações ) REFERENCES "Sobre mim"( "texto de resumo (quem eu sou)" )  
 );

CREATE TABLE Currículo ( 
	experiência          TEXT     ,
	formação             TEXT     ,
	realizações          TEXT     ,
	CONSTRAINT unq_Currículo_experiência UNIQUE ( experiência ),
	FOREIGN KEY ( formação ) REFERENCES Formação( formação )  ,
	FOREIGN KEY ( experiência ) REFERENCES Experiência( experiência )  ,
	FOREIGN KEY ( realizações ) REFERENCES Realizações( realizações )  
 );
