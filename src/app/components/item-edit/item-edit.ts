import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shopping } from '../../services/shopping';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './item-edit.html'
})
export class ItemEditComponent implements OnInit {
  itemForm: FormGroup; // אובייקט שמנהל את כל שדות הטופס והערכים שלהם
  isEditMode = false;  // משתנה שעוזר לנו לדעת אם אנחנו במצב "הוספה" או "עריכה"

  // מערכים שיכילו את רשימות הבחירה שיגיעו מה-DB
  categories: any[] = [];
  statuses: any[] = [];
  units: any[] = [];

  constructor(
    private fb: FormBuilder,           // כלי לבנייה קלה של הטופס
    private shoppingService: Shopping, // ה-Service שמתקשר עם השרת
    private route: ActivatedRoute,     // כלי לשליפת נתונים מה-URL (כמו ה-ID בעריכה)
    private router: Router              // כלי למעבר בין דפים (Navigation)
  ) {
    // אתחול מבנה הטופס והגדרת בדיקות תקינות (Validators)
    this.itemForm = this.fb.group({
      Id: [0], // מזהה המוצר (0 בחדש, מספר בעריכה)
      Name: ['', Validators.required], // שם מוצר הוא שדה חובה
      Amount: [1, [Validators.required, Validators.min(0.1)]], // כמות חייבת להיות מעל אפס
      Description: [''], // תיאור - שדה אופציונלי
      CategoryId: ['', Validators.required], // חובה לבחור קטגוריה
      StatusId: ['', Validators.required],   // חובה לבחור סטטוס
      UnitId: ['', Validators.required]     // חובה לבחור יחידת מידה
    });
  }

  ngOnInit() {
    // 1. טעינת נתוני העזר לתיבות הבחירה (Dropdowns) מהמסד
    this.shoppingService.getAllCategories().subscribe(data => this.categories = data);
    this.shoppingService.getAllStatuses().subscribe(data => this.statuses = data);
    this.shoppingService.getAllUnits().subscribe(data => this.units = data);

    // 2. בדיקה האם הגענו לדף עם ID בכתובת (למשל edit/5)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true; // אם יש ID, אנחנו במצב עריכה
      // שליפת פרטי המוצר הקיים מה-DB כדי למלא את הטופס
      this.shoppingService.getById(Number(id)).subscribe(res => {
        if(res && res[0]) {
          this.itemForm.patchValue(res[0]); // "הדבקת" הנתונים לתוך השדות בטופס
        }
      });
    }
  }

  // פונקציה שמופעלת בלחיצה על כפתור השמירה
  onSubmit() {
    if (this.itemForm.valid) { // רק אם כל שדות החובה מולאו כראוי
      // בחירה איזו פרוצדורה להפעיל בהתאם למצב (עריכה או הוספה)
      const action = this.isEditMode ?
        this.shoppingService.updateItem(this.itemForm.value) :
        this.shoppingService.addItem(this.itemForm.value);

      // הרצת הפעולה וחזרה לרשימה לאחר הצלחה
      action.subscribe(() => {
        this.router.navigate(['/list']);
      });
    }
  }
}
