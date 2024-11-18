import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { PostService } from '../../services/post.service';
import { IAdoptionPostSerialization } from '../../models/iadoption-post-serialization';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-adoption',
  templateUrl: './form-adoption.component.html',
  styleUrl: './form-adoption.component.css',
})
export class FormAdoptionComponent {
  // VARIABLES
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  currentStep: number = 1;
  formAdoption: FormGroup;

  // PICS
  primer: string | ArrayBuffer | null = null;
  imageUrl: string | ArrayBuffer | null = null;

  constructor(
    private form: FormBuilder,
    private formBuilder: FormBuilder,
    private service: PostService
  ) {
    this.formAdoption = this.form.group({
      // Caracteristicas
      petType: ['', Validators.required],
      petBreed: [''],
      petName: ['', Validators.required],
      petAge: ['', Validators.required],
      characteristics: this.formBuilder.array([
        new FormControl('', Validators.required),
      ]),
      // Salud mascota
      vaccines: ['', Validators.required],
      primer: [''],
      issues: ['', Validators.required],
      issuesSentence: this.formBuilder.array([new FormControl('')]),
      operations: ['', Validators.required],
      operationsSentence: [''],
      // Pics
      photos: this.formBuilder.array(Array(5).fill('')),
    });
  }

  // Objeto para enviar la información necesaria de una publicación de una mascota en adopción
  formAdoptionToSend: IAdoptionPostSerialization = {
    id_user: 15, // Acá lo corrijiremos con el login
    post_type: 'Adoption',
    basic_pet_information: {
      type_pet: '',
      name: '',
      main_physical_characteristics: [],
      photos: [],
    },
    medical_data: {
      has_vaccines: false,
      has_physical_problems: false,
      has_operations: false,
    },
    publication_date: new Date(),
  };

  ngOnInit(): void {}

  // METODOS

  // FORM

  hasErrors(controlName: string, errorType: string): boolean | undefined {
    return (
      this.formAdoption.get(controlName)?.hasError(errorType) &&
      this.formAdoption.get(controlName)?.touched
    );
  }

  // BOTONES NEXT Y BACK DEL FORMULARIO
  onNext(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
      this.nextStep.emit();
    }
  }

  onBack(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.previousStep.emit();
    }
  }

  // CARACTERÍSTICAS

  get characteristics(): FormArray {
    return this.formAdoption.get('characteristics') as FormArray;
  }

  addCharacteristic(): void {
    const lastControl = this.characteristics.at(
      this.characteristics.length - 1
    );
    if (lastControl && lastControl.value.trim() !== '') {
      this.characteristics.push(new FormControl(''));
    } else {
      alert('Debes llenar el input anterior antes de agregar otro.');
    }
  }

  get physicalProblems(): FormArray {
    return this.formAdoption.get('issuesSentence') as FormArray;
  }

  addPhysicalProblems(): void {
    const lastControl = this.physicalProblems.at(
      this.physicalProblems.length - 1
    );

    if (lastControl && lastControl.value.trim() !== '') {
      this.physicalProblems.push(new FormControl(''));
    } else {
      alert('Debes llenar el input anterior antes de agregar otro');
    }
  }

  // ENVÍO DEL FORM
  async onSubmitFormAdoption() {
    try {
      if (this.formAdoption.valid) {
        await this.assignValues();
        this.service.createPostAdoptionPet(this.formAdoptionToSend).subscribe(
          (response) => {
            Swal.fire({
              title: 'Publicación creada exitosamente',
              imageUrl: 'assets/imgs/img.svg',
              imageWidth: 250,
              imageHeight: 250,
              width: '400px',
              background: 'rgb(35, 155, 205)',
              color: '#ffffff',
              showConfirmButton: false,
              timer: 1800,
            });
          },
          (err) => {
            console.log('Erro: ' + err);
          }
        );
      } else {
        alert('Por favor completa todos los campos obligatorios.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async assignValues() {
    try {
      // Desestructuramos los atributos de formAdoption
      const {
        petType,
        petBreed,
        petName,
        petAge,
        characteristics,
        //salud mascota
        vaccines,
        issues,
        issuesSentence,
        operations,
        operationsSentence,
      } = this.formAdoption.value;

      // Datos básicos
      this.formAdoptionToSend.basic_pet_information.type_pet = petType;
      this.formAdoptionToSend.basic_pet_information.name = petName;

      if (petBreed !== '')
        this.formAdoptionToSend.basic_pet_information.race = petBreed;

      if (petAge !== '')
        this.formAdoptionToSend.basic_pet_information.age = petAge;

      this.formAdoptionToSend.basic_pet_information.main_physical_characteristics =
        characteristics;

      // Datos médicos
      this.formAdoptionToSend.medical_data.has_vaccines = vaccines;
      if (vaccines === 'Si') {
        const photo = await this.uploadPrimer();
        this.formAdoptionToSend.medical_data.primer = photo[0];
      }

      this.formAdoptionToSend.medical_data.has_physical_problems = issues;

      if (issues === 'Si')
        this.formAdoptionToSend.medical_data.physical_problems = issuesSentence;

      this.formAdoptionToSend.medical_data.has_operations = operations;

      if (operations === 'Si')
        this.formAdoptionToSend.medical_data.operations = operationsSentence;

      // Fotos
      // this.formAdoptionToSend.basic_pet_information.photos =
      //   await this.uploadPhotos();
    } catch (err) {
      console.log(err);
    }
  }

  // Form imagenes
  // onFileSelect(event: Event, index: number) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.photos[index] = reader.result as string | ArrayBuffer;
  //       const photosControl = this.formAdoption.get('photos') as FormArray;
  //       if (!photosControl.at(index)) {
  //         photosControl.push(new FormControl(''));
  //       }
  //       photosControl.at(index).setValue(this.photos[index]);
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }

  imageUrls: (string | ArrayBuffer | null)[] = [null, null, null, null, null]; // Array para almacenar las imágenes

  // Método para manejar el clic y abrir el selector de archivos
  triggerFileInputs(input: HTMLInputElement): void {
    input.click();
  }

  // Método para manejar la selección de una imagen
  onFileSelect(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        // Guardamos la URL de la imagen en el índice correspondiente
        this.imageUrls[index] = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Dispara el clic del input oculto
  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  // Maneja el evento de selección de archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files && input.files[0]) {
      const file = input.files[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecciona un archivo de imagen.');
      }
    }
  }

  // Maneja el evento de selección de una foto de la cartilla
  onPrimerSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.primer = reader.result;
        const primerControl = this.formAdoption.get('primer');
        if (primerControl) {
          primerControl.setValue(this.primer);
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Método para enviar las fotos de la mascota a la API
  // uploadPhotos(): Promise<string[]> {
  //   const formData = new FormData();

  //   this.photos.forEach((photo, index) => {
  //     if (photo && typeof photo === 'string') {
  //       const blob = this.dataURLtoBlob(photo);
  //       formData.append('files', blob, `photo_${index}.jpg`);
  //     }
  //   });

  //   return new Promise((resolve, reject) => {
  //     this.service.saveImagesDrive(formData).subscribe(
  //       (response) => {
  //         resolve(response);
  //       },
  //       (err) => {
  //         console.error('Error al subir los archivos', err);
  //         reject(err);
  //       }
  //     );
  //   });
  // }

  // Método para enviar la foto de la cartilla a la API
  uploadPrimer(): Promise<string[]> {
    const formData = new FormData();

    // Añadir la cartilla
    if (this.primer && typeof this.primer === 'string') {
      const blob = this.dataURLtoBlob(this.primer);
      formData.append('files', blob, 'primer.jpg');
    }

    return new Promise((resolve, reject) => {
      this.service.saveImagesDrive(formData).subscribe(
        (response) => {
          resolve(response);
        },
        (err) => {
          console.error('Error al subir los archivos', err);
          reject(err);
        }
      );
    });
  }

  dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/jpeg' });
  }
}
