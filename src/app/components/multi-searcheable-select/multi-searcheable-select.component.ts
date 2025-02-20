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
  IonCheckbox,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, search } from 'ionicons/icons';
//import { TranslatePipe } from '@shared/translate/translate.pipe';

@Component({
  selector: 'multi-searcheable-select',
  standalone: true,
  imports: [
    IonCheckbox,
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
  templateUrl: './multi-searcheable-select.component.html',
  styleUrls: ['./multi-searcheable-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSearcheableSelectComponent<T> {
  readonly data = input.required<T[]>();
  readonly viewField = input.required<keyof T>();
  readonly compareField = input.required<keyof T>();
  readonly helpText = input.required<string>();
  readonly title = input.required<string>();
  readonly icon = input<string>();

  readonly select = output<T[]>();
  readonly selectedList = signal<T[]>([]);

  readonly formattedList = computed(() => {
    const list = this.selectedList();
    return list.map((item) => item[this.viewField()]).join(', ');
  });

  readonly searchTerm = signal('');

  readonly filteredData = computed(() => {
    const data = this.data();
    const field = this.viewField();
    const term = this.searchTerm().toLowerCase();
    return data.filter((i) => String(i[field]).toLowerCase().includes(term));
  });

  readonly isOpen = signal(false);

  constructor() {
    addIcons({ search, close });
  }

  isSelected(item: T) {
    const list = this.selectedList();
    const field = this.compareField();
    return list.some((i) => i[field] === item[field]);
  }

  cambiarCheck(ev: Event, item: T) {
    ev.stopPropagation();
    const selected = this.isSelected(item);
    if (selected) {
      this.quitarSeleccion(item);
    } else {
      this.seleccionarItem(item);
    }
  }

  seleccionarItem(item: T) {
    const list = this.selectedList();
    const field = this.compareField();

    const index = list.findIndex((i) => i[field] === item[field]);
    if (index >= 0) {
      list[index] = item;
    } else {
      list.push(item);
    }
    this.selectedList.set([...list]);
  }

  quitarSeleccion(item: T) {
    const list = this.selectedList();
    const field = this.compareField();

    this.selectedList.set(list.filter((i) => i[field] !== item[field]));
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
  }
}
