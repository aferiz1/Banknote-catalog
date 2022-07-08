DROP TABLE IF EXISTS Denominations;

CREATE TABLE IF NOT EXISTS Denominations  (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    currencyId INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(4000),
    valid boolean NOT NULL DEFAULT true,    
    dateCreated DATETIME NOT NULL,
    userCreated VARCHAR(100) NOT NULL,
    dateModified DATETIME,    
    userModified VARCHAR(100),
    FOREIGN KEY (currencyId) REFERENCES Currencies(id)
)