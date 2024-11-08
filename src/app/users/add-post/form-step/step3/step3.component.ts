import { Component, EventEmitter,Output, Input } from '@angular/core';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css'
})
export class Step3Component {
  //variables
  @Input() mainImage: string = ''; 
  @Input() additionalImages: string[] = [
  ]; 
  @Input() mainPlaceholderIcon: string = '';  
  @Input() additionalPlaceholderIcons: string[] = [];
  mainPhoto: string | ArrayBuffer | null = this.mainImage;
  additionalPhotos: (string | ArrayBuffer | null)[] = [...this.additionalImages];

  @Output() submitForm1 = new EventEmitter<any>();
  @Output() submitForm2 = new EventEmitter<any>();

  //metodos
  onFileSelect(event: Event, index: number | 'main') {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (index === 'main') {
          this.mainPhoto = reader.result;
        } else {
          this.additionalPhotos[index] = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.isAdoptionForm()) {
      this.submitForm1.emit();  
    } else {
      this.submitForm2.emit(); 
    }
  }

  
  isAdoptionForm(): boolean {
    //ira logica de diferenciacion
    return true;  
  }
}