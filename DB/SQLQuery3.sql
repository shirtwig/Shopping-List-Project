USE [ShoppingListDB];
GO

INSERT INTO Categories (Name, DisplayOrder) VALUES 
(N'🥦 ירקות ופירות', 1),
(N'🧀 מוצרי חלב', 2),
(N'🥐 מאפים', 3),
(N'🍫 מתוקים', 4),
(N'🥨 חטיפים ומלוחים', 5),
(N'🧼 חומרי ניקוי', 6);

INSERT INTO Statuses (Name, ColorHex) VALUES
(N'🛒 נקנה כבר!', '#B9FBC0'),
(N'🙈 אופס, תבדקו שוב אם יש בבית', '#FFF5B7'),
(N'✨ דחוף ביותר!', '#FFCFD2');

INSERT INTO Units (Name) VALUES
(N'ק"ג'), (N'ליטר'), (N'יחידה'), (N'חבילה');
GO
