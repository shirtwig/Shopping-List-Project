ניהול רשימת קניות🛒

נושא הפרויקט: מערכת לניהול רשימת קניות אישית, המאפשרת מעקב אחר מוצרים, כמויות, קטגוריות וסטטוסים בזמן אמת.

ארכיטקטורה:

המערכת בנויה בשיטת 3 השכבות:

Database: SQL Server.

Server: .NET Web API המשמש כ"צינור" (Pipe) להרצת פרוצדורות.

Client: Angular (יתווסף בהמשך).

מבנה מסד הנתונים (SQL Server)הנתונים מנוהלים ב-4 טבלאות עם קשרי גומלין (Foreign Keys)


ShoppingItems: טבלה ראשית (שם, תיאור, כמות ומזהים).

Categories: ניהול קטגוריות מוצרים.

Statuses: מצבי רכישה (כולל קוד צבע Hex).

Units: יחידות מידה.

Stored Procedures (לוגיקה)כל הגישה לנתונים מתבצעת דרך SP בלבד:

AddNewShoppingItem: יצירת פריט חדש.

UpdateShoppingItem: עדכון פריט קיים.

DeleteShoppingItem: מחיקת פריט מהרשימה.

GetAllItems: שליפת הרשימה המלאה (תומך בחיפוש).

GetById: שליפת פריט ספציפי לפי מזהה
צד שרת:


(.NET Web API)השרת מממש Controller גנרי בשם ExecController:


Endpoint: POST /api/exec.

פעולה: הקונטרולר מקבל בקשה הכוללת את שם הפרוצדורה (ProcedureName) ומילון פרמטרים (Parameters), מריץ אותה מול ה-DB ומחזיר את התוצאות כ-JSON ללקוח.

אבטחה: עבודה עם SqlParameter למניעת SQL Injection.


בדיקות Postman


להלן תוצאות הבדיקות של ה-API עבור הפעולות השונות:


תצוגת כל הפריטים


![GetAll](./צילומי%20מסך%20Postman/הצגת%20כל%20הפריטים.png)

הוספת מוצר
![Add](./צילומי%20מסך%20Postman/הוספת%20מוצר.png)

עדכון פריט
![Update](./צילומי%20מסך%20Postman/עדכון%20פריט.png)

מחיקת פריט
![Delete](./צילומי%20מסך%20Postman/מחיקת%20פריט.png)

הצגת פריט מסוים
![GetById](./צילומי%20מסך%20Postman/הצגת%20פריט%20מסוים.png)

הוראות הרצה:


DB: יש להריץ את קבצי ה-SQL ב-SQL Server Management Studio ליצירת הטבלאות, הפרוצדורות והזנת נתונים ראשוניים.

Server: יש לפתוח את פרויקט ה-API, לוודא שה-Connection String ב-ExecController מצביע לשרת המקומי שלך, ולהריץ את האפליקציה.






