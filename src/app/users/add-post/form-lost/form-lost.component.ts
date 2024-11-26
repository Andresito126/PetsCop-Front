import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ILossPostSerialization } from '../../models/iloss-post-serialization';
import { PostService } from '../../services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-lost',
  templateUrl: './form-lost.component.html',
  styleUrl: './form-lost.component.css',
})
export class FormLostComponent implements OnInit {
  // Variables
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  currentStep: number = 1;
  formLost: FormGroup;
  colonies: string[] = [];
  imageUrls: (string | ArrayBuffer | null)[] = [null, null, null, null, null];
  idUser = localStorage.getItem('id_user');

  // Objeto para poder enviar la información de un Post de una mascota perdida
  postLostPet: ILossPostSerialization = {
    id_user: this.idUser ? JSON.parse(this.idUser) : 0,
    post_type: 'Lost',
    basic_pet_information: {
      type_pet: '',
      name: '',
      main_physical_characteristics: [],
      photos: [],
    },
    loss_data: {
      address: {
        zip_code: 29140,
        state: 'Chiapas',
        municipality: 'Ocozocoautla de Espinoza',
        colony: '',
      },
      loss_date: new Date(),
      description: '',
    },
    publication_date: new Date(),
  };

  constructor(
    private form: FormBuilder,
    private formBuilder: FormBuilder,
    private servicePost: PostService
  ) {
    this.formLost = this.form.group({
      // Datos básicos
      petType: ['', Validators.required],
      petBreed: [''],
      petName: ['', Validators.required],
      petAge: ['', Validators.required],
      characteristics: this.formBuilder.array([new FormControl('')]),
      // Datos de perdida
      neighborhood: ['', Validators.required],
      dateLost: ['', Validators.required],
      description: ['', Validators.required],
      lastSeen: [''],
      reward: [''],

      //pics
      photos: this.formBuilder.array(Array(5).fill('')),
    });
  }

  ngOnInit(): void {
    this.servicePost.showColonies().subscribe(
      (response) => {
        this.colonies = response;
      },
      (err) => {
        console.log('Error: ' + err);
      }
    );
  }

  //METODOS

  //Form
  hasErrors(controlName: string, errorType: string) {
    return (
      this.formLost.get(controlName)?.hasError(errorType) &&
      this.formLost.get(controlName)?.touched
    );
  }

  // botones next y back del form
  onNext() {
    if (this.currentStep < 3) {
      this.currentStep++;
      this.nextStep.emit();
    }
  }

  onBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.previousStep.emit();
    }
  }

  //caracteristoicas
  get characteristics(): FormArray {
    return this.formLost.get('characteristics') as FormArray;
  }

  addCharacteristic() {
    const lastControl = this.characteristics.at(
      this.characteristics.length - 1
    );
    if (lastControl && lastControl.value.trim() !== '') {
      this.characteristics.push(new FormControl(''));
    } else {
      alert('Debes llenar el input anterior antes de agregar otro.');
    }
  }

  // ENVIO DEL FORM
  async onSubmitFormLost() {
    // Método que va a asignar los valores que el usuario ingresó
    try {
      await this.assignValues();
      if (this.formLost.valid) {
        this.servicePost.createPostLostPet(this.postLostPet).subscribe(
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
            console.log(err);
          }
        );
      } else {
        alert('Por favor completa todos los campos obligatorios.');
      }
    } catch (err) {
      console.log('Error ' + err);
    }
  }

  async assignValues() {
    try {
      // Desestructuramos los atributos de formLost
      const {
        petType,
        petBreed,
        petName,
        petAge,
        characteristics,
        neighborhood,
        dateLost,
        description,
        lastSeen,
        reward,
      } = this.formLost.value;

      // Datos básicos
      this.postLostPet.basic_pet_information.type_pet = petType;
      this.postLostPet.basic_pet_information.name = petName;

      if (petBreed !== '') this.postLostPet.basic_pet_information.race = petBreed;
      

      if (petAge !== '') this.postLostPet.basic_pet_information.age = petAge;

      this.postLostPet.basic_pet_information.main_physical_characteristics =
        characteristics;

      // Datos de perdida
      this.postLostPet.loss_data.address.zip_code = 29140;
      this.postLostPet.loss_data.address.state = 'Chiapas';
      this.postLostPet.loss_data.address.municipality =
        'Ocozocoautla de Espinoza';
      this.postLostPet.loss_data.address.colony = neighborhood;
      this.postLostPet.loss_data.loss_date = new Date(dateLost);
      this.postLostPet.loss_data.description = description;

      if (lastSeen !== '') this.postLostPet.loss_data.last_seen = lastSeen;

      // Datos extras
      if (reward !== '') this.postLostPet.reward = reward;

      // Imágenes de la mascota
      this.postLostPet.basic_pet_information.photos = await this.uploadPhotos();
    } catch (err) {
      console.log(err);
    }
  }

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
        this.imageUrls[index] = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Método para enviar las fotos a la API
  uploadPhotos(): Promise<string[]> {
    const formData = new FormData();

    this.imageUrls.forEach((photo, index) => {
      if (photo && typeof photo === 'string') {
        const blob = this.dataURLtoBlob(photo);
        formData.append('files', blob, `photo_${index}.jpg`);
      }
    });

    return new Promise((resolve, reject) => {
      this.servicePost.saveImagesDrive(formData).subscribe(
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
