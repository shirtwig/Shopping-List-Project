import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Shopping {
// כתובת ה-API שמקשרת בין האנגולר לשרת ה-NET.
private apiUrl = 'http://localhost:5246/api/Exec';
constructor(private http: HttpClient) { }



// פונקציה גנרית ששולחת שם פרוצדורה ופרמטרים לשרת
private execute(procedureName:string, parameters: any={}): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl,{
      procedureName: procedureName,
      parameters: parameters
    });
  }

  //  שליפת כל מוצרי הקניות מהמסד נתונים
  getAllItems() {
      return this.execute('GetAllItems');
  }


  // הוספת מוצר חדש למסד נתונים
  addItem(item: any) {
    const { Id, ...itemWithoutId } = item;
    return this.execute('AddNewShoppingItem', itemWithoutId);
  }

  // שליפת מוצר לפי מזהה
  getById(id: number) {
      return this.execute('GetById', { Id: id });
  }


  // עדכון מוצר קיים במסד נתונים
  updateItem(item: any) {
    return this.execute('UpdateShoppingItem', item);
  }


  // מחיקת מוצר מהמסד נתונים לפי מזהה
  deleteItem(id: number) {
    return this.execute('DeleteShoppingItem', { Id: id });
  }


  // פונקציות עזר לכל הקטגוריות, סטטוסים ויחידות המדידה מהמסד נתונים
  getAllCategories() {
  return this.execute('GetAllCategories');
  }
  getAllStatuses() {
    return this.execute('GetAllStatuses');
  }
  getAllUnits() {
    return this.execute('GetAllUnits');
  }
}
