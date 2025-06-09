CREATE TABLE Servico (
	idServico NUMBER (10) PRIMARY KEY,
    Preco DECIMAL(10, 2),
    Tipo VARCHAR2(100)
);

CREATE TABLE Produtos (
    idProdutos NUMBER (10) PRIMARY KEY,
    Produtos VARCHAR2(100),
    Categoria VARCHAR2(100),
    IdServico NUMBER (10),
    FOREIGN KEY (idServico) REFERENCES Servico(idServico)
);

CREATE TABLE Cliente (
    idCliente NUMBER (10) PRIMARY KEY,
    Nome VARCHAR2(100),
    CPF VARCHAR2(14),
    Logradouro VARCHAR2(100),
    Bairro VARCHAR2(100),
    Numero VARCHAR2(10),
    CEP VARCHAR2(10),
    Complemento VARCHAR2(20),
    Idade DATE,
    Contato VARCHAR2(100),
    idServico NUMBER (10),
    FOREIGN KEY (idServico) REFERENCES Servico(idServico)
);

CREATE TABLE Contato (
    idContato NUMBER (10) PRIMARY KEY,
    Telefone VARCHAR2(15),
    Email VARCHAR2(100),
    idCliente NUMBER (10),
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente)
);

CREATE TABLE Comercio (
    idComercio NUMBER (10) PRIMARY KEY,
    Nome VARCHAR2(100),
    CPF_CNPJ VARCHAR2(14),
    Logradouro VARCHAR2(100),
    Bairro VARCHAR2(100),
    Numero VARCHAR2(10),
    CEP VARCHAR2(10),
    Complemento VARCHAR2(20),
    idChatbot NUMBER (10),
    idServico NUMBER (10),
    FOREIGN KEY (idChatbot) REFERENCES Chatbot(idChatbot),
    FOREIGN KEY (idServico) REFERENCES Servico(idServico)
);

CREATE TABLE Chatbot (
    idChatbot NUMBER (10) PRIMARY KEY,
    Pergunta VARCHAR2(100),
    Resposta VARCHAR2(100)
);

CREATE TABLE Telefone (
    idTelefone NUMBER (10) PRIMARY KEY,
    Telefone VARCHAR2(15),
    idComercio NUMBER (10),
    FOREIGN KEY (idComercio) REFERENCES Comercio(idComercio)
);

CREATE TABLE RedeSociais (
    idRedeSociais NUMBER (10) PRIMARY KEY,
    Instagram VARCHAR2(30),
    Whatsapp VARCHAR2(15),
    idComercio NUMBER (10),
    FOREIGN KEY (idComercio) REFERENCES Comercio(idComercio)
);

CREATE TABLE Pagamento (
    idPagamento NUMBER (10) PRIMARY KEY,
    Forma_Pagamento VARCHAR2(30),
    idComercio NUMBER (10),
    FOREIGN KEY (idComercio) REFERENCES Comercio(idComercio)
);

CREATE TABLE Email (
    idEmail NUMBER (10) PRIMARY KEY,
    Email VARCHAR2(100),
    idComercio NUMBER (10),
    FOREIGN KEY (idComercio) REFERENCES Comercio(idComercio)
);
CREATE TABLE Pedidos (
    idPedidos NUMBER (10) PRIMARY KEY,
    Valor DECIMAL(10, 2),
    Hora_compra DATE,
    idCliente NUMBER (10),
    idProdutos NUMBER (10),
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
    FOREIGN KEY (idProdutos) REFERENCES Produtos(idProdutos)
);
    
    
