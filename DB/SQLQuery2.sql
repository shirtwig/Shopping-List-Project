USE [ShoppingListDB]; 

CREATE PROCEDURE AddNewShoppingItem
	@Name NVARCHAR(50),
	@Amount DECIMAL(10,2),
	@Description NVARCHAR(200),
	@CategoryId INT,
	@StatusId INT,
	@UnitId INT
AS
BEGIN
	INSERT INTO ShoppingItems(Name,Amount,Description,CategoryId,StatusId,UnitId)
	VALUES(@Name,@Amount,@Description,@CategoryId,@StatusId,@UnitId)
END


GO
CREATE PROCEDURE UpdateShoppingItem
	@Id INT,
	@Name NVARCHAR(50),
	@Amount DECIMAL(10,2),
	@Description NVARCHAR(200),
	@CategoryId INT,
	@StatusId INT,
	@UnitId INT
AS
BEGIN
	UPDATE ShoppingItems
	SET Name = @Name,
		Amount = @Amount,
		Description = @Description,
		CategoryId = @CategoryId,
		StatusId = @StatusId,
		UnitId = @UnitId
	WHERE Id = @Id
END

GO
CREATE PROCEDURE DeleteShoppingItem
	@Id INT
AS
BEGIN
	DELETE FROM ShoppingItems
	WHERE Id = @Id
END

GO
CREATE OR ALTER PROCEDURE GetAllItems
AS
BEGIN
    SELECT 
        SI.*, 
        C.Name as CategoryName, 
        S.Name as StatusName, 
        S.ColorHex,
        U.Name as UnitName
    FROM ShoppingItems SI
    LEFT JOIN Categories C ON SI.CategoryId = C.Id
    LEFT JOIN Statuses S ON SI.StatusId = S.Id
    LEFT JOIN Units U ON SI.UnitId = U.Id
END
GO

CREATE OR ALTER PROCEDURE GetById
	@Id INT
AS
BEGIN
	SELECT SI.*, C.Name as CategoryName, S.Name as StatusName, U.Name as UnitName
	FROM ShoppingItems SI
	LEFT JOIN Categories C ON SI.CategoryId = C.Id
	LEFT JOIN Statuses S ON SI.StatusId = S.Id
	LEFT JOIN Units U ON SI.UnitId = U.Id
	WHERE SI.Id = @Id
END
GO

-- 2. יצירת פרוצדורות העזר עבור ה-Select (הן אלו שחסרות ל-API)
CREATE OR ALTER PROCEDURE GetAllCategories 
AS 
BEGIN 
    SELECT * FROM Categories 
END
GO

CREATE OR ALTER PROCEDURE GetAllStatuses 
AS 
BEGIN 
    SELECT * FROM Statuses 
END
GO

CREATE OR ALTER PROCEDURE GetAllUnits 
AS 
BEGIN 
    SELECT * FROM Units 
END
GO


