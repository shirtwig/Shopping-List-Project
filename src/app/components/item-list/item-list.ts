import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // הוסיפי ChangeDetectorRef
import { Shopping } from '../../services/shopping';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemListComponent implements OnInit {
items: any[] = []; // המערך המלא של המוצרים מה-DB
  searchTerm: string = ''; // הטקסט שהמשתמש מקליד בתיבת החיפוש

  constructor(
    private shoppingService: Shopping,
    private cdr: ChangeDetectorRef // כלי לעדכון התצוגה במקרה שהנתונים לא מתרעננים אוטומטית
  ) {}

  ngOnInit() {
    this.loadItems();// טעינת הרשימה ברגע שהקומפוננטה עולה
  }


  // שליפת הנתונים מהשרת דרך ה-Service
  loadItems() {
    this.shoppingService.getAllItems().subscribe({
      next: (data) => {
        console.log('נתונים הגיעו:', data);
        this.items = Array.isArray(data) ? data : [];
        this.cdr.detectChanges(); // הכרחת רענון של ה-HTML
      },
      error: (err) => console.error(err)
    });
  }



  // פונקציית חיפוש - מחזירה רשימה מסוננת לפי שם המוצר
  get filteredItems() {
    if (!this.items || this.items.length === 0) return [];

    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.items;

    return this.items.filter(item =>
      item.Name && item.Name.toLowerCase().includes(term)
    );
  }

  // מחיקת מוצר: הפעלת הפרוצדורה וטעינה מחדש של הרשימה המעודכנת
  deleteItem(id: number) {
    if(confirm('למחוק?')) {
      this.shoppingService.deleteItem(id).subscribe(() => this.loadItems());
    }
  }
}
