import { Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list';
import { ItemEditComponent } from './components/item-edit/item-edit';
import { ItemDetailsComponent} from './components/item-details/item-details';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' }, // דף הבית יהיה הרשימה
  { path: 'list', component: ItemListComponent },
  { path: 'add', component: ItemEditComponent }, // מסך הוספה
  { path: 'edit/:id', component: ItemEditComponent }, // מסך עריכה עם ID
  { path: 'details/:id', component: ItemDetailsComponent },// מסך פרטים
];
