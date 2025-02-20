import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import {
  IonInput,
  IonIcon,
  IonButton,
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, search } from 'ionicons/icons';
//import { TranslatePipe } from '@shared/translate/translate.pipe';

@Component({
  selector: 'single-searcheable-select',
  standalone: true,
  imports: [
    IonCard,
    IonLabel,
    IonItem,
    IonList,
    IonSearchbar,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IonModal,
    IonButton,
    IonIcon,
    IonInput,
  ],
  templateUrl: './single-searcheable-select.component.html',
  styleUrls: ['./single-searcheable-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleSearcheableSelectComponent<T> {
  readonly data = input.required<T[]>();
  readonly field = input.required<keyof T>();
  readonly helpText = input.required<string>();
  readonly title = input.required<string>();
  readonly icon = input<string>();
  readonly selected = input<T>();

  readonly select = output<T>();

  readonly searchTerm = signal('');

  readonly filteredData = computed(() => {
    const data = this.data();
    const field = this.field();
    const term = this.searchTerm().toLowerCase();
    return data.filter((i) => String(i[field]).toLowerCase().includes(term));
  });

  readonly isOpen = signal(false);

  constructor() {
    addIcons({ search, close });
  }

  selectItem(item: T) {
    this.select.emit(item);
    this.isOpen.set(false);
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
  }
}
