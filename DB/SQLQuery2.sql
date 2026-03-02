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
CREATE PROCEDURE GetAllItems
AS
BEGIN
	SELECT * FROM ShoppingItems
END

GO
CREATE PROCEDURE GetById
	@Id INT
AS
BEGIN
	SELECT * FROM ShoppingItems
	WHERE Id=@Id
END

