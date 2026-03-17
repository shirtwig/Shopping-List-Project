import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Shopping } from '../../services/shopping';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-details.html'
})
export class ItemDetailsComponent implements OnInit {
  item: any; // המשתנה שיחזיק את נתוני המוצר שיוצגו ב-HTML

  constructor(
    private route: ActivatedRoute, // מאפשר לנו לשלוף פרמטרים מה-URL
    private shoppingService: Shopping // ה-Service שמתקשר עם ה-API
     ) {}

  ngOnInit() {
    // שליפת ה-ID מהכתובת וממיר אותו למספר(למשל מ-/details/5)
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // קריאה לפרוצדורה GetById ב-SQL
    this.shoppingService.getById(id).subscribe(data => {
      this.item = data[0]; // הפרוצדורה מחזירה מערך, אנחנו צריכים את האיבר הראשון
    });
  }
}
