import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControlName,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ILossDataSerialization } from '../../models/iloss-data-serialization';
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
  colonies: string [] = [];

  // Objeto para poder enviar la información de un Post de una mascota perdida
  postLostPet: ILossPostSerialization = {
    id_user: 15, // Esto es temporal, ok?
    post_type: 'Lost',
    basic_pet_information: {
      type_pet: '',
      name: '',
      race: '',
      main_physical_characteristics: [],
      photos: [],
    },
    loss_data: {
      address: {
        zip_code: 0,
        state: '',
        municipality: '',
        colony: '',
      },
      loss_date: new Date(),
      description: '',
    },
    publication_date: new Date(),
  };

  // Pics
  photos: (string | ArrayBuffer | null)[] = Array(5).fill(null);

  constructor(
    private form: FormBuilder,
    private formBuilder: FormBuilder,
    private servicePost: PostService
  ) {
    this.formLost = this.form.group({
      //caracteristicas
      // petType: ['', Validators.required],
      // petBreed: ['', Validators.required],
      // petName: ['', Validators.required,],
      // petAge: ['', Validators.required],
      // characteristics: this.formBuilder.array([new FormControl('')]),
      // //direcciones
      // zipCode: ['', Validators.required,],
      // state: [{ value: '', disabled: true }, Validators.required],
      // municipality: [{ value: '', disabled: true }, Validators.required],
      // neighborhood: ['', Validators.required],
      // dateLost: ['', Validators.required],
      // description: ['', Validators.required],
      // lastSeen: ['', Validators.required],
      // reward: [''],

      // Datos básicos
      petType: ['', Validators.required],
      petBreed: [''],
      petName: ['', Validators.required],
      petAge: ['', Validators.required],
      characteristics: this.formBuilder.array([new FormControl('')]),
      //direcciones
      zipCode: [{ value: '29140', disabled: true }],
      state: [{ value: 'Chiapas', disabled: true }],
      municipality: [{ value: 'Ocozocoautla de Espinoza', disabled: true }],
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
        console.log("Error: " + err)
      }
    )
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

  // trackByIndex(index: number, obj: any): any {
  //   return index;
  // }

  //ENVIO DEL FORM
  // onSubmitFormLost() {
  //   if (this.formLost.valid) {
  //     console.log(this.formLost.get('petType')?.value);
  //     // aca se dee llamar la api creo??????
  //     console.log(this.formLost.value);
  //   } else {
  //     alert('Por favor completa todos los campos obligatorios.');
  //   }
  // }

  // Prueba
  onSubmitFormLost() {
    // Método que va a asignar los valores que el usuario ingresó
    this.assignValues();

    this.servicePost.createPostLostPet(this.postLostPet).subscribe(
      (response) => {
        Swal.fire({
          title: "Publicación creada",
          imageUrl: "assets/imgs/imgExcellentProcess.jpg",
          imageWidth: 400,
          imageHeight: 300
        });
      },
      (err) => {
        console.log(err)
      }
    )
  }

  async assignValues() {
    // Desestructuramos los atributos de formLost
    const {
      petType,
      petBreed,
      petName,
      petAge,
      characteristics,
      zipCode,
      state,
      municipality,
      neighborhood,
      dateLost,
      description,
      lastSeen,
      reward,
    } = this.formLost.getRawValue();

    // Datos básicos
    this.postLostPet.basic_pet_information.type_pet = petType;
    this.postLostPet.basic_pet_information.name = petName;
    this.postLostPet.basic_pet_information.race = petBreed;

    if (petAge !== '') this.postLostPet.basic_pet_information.age = petAge;

    this.postLostPet.basic_pet_information.main_physical_characteristics =
      characteristics;
    this.postLostPet.basic_pet_information.photos = await this.uploadPhotos();

    // Datos de perdida
    this.postLostPet.loss_data.address.zip_code = zipCode;
    this.postLostPet.loss_data.address.state = state;
    this.postLostPet.loss_data.address.municipality = municipality;
    this.postLostPet.loss_data.address.colony = neighborhood;
    this.postLostPet.loss_data.loss_date = new Date(dateLost);
    this.postLostPet.loss_data.description = description;

    if (lastSeen !== '') this.postLostPet.loss_data.last_seen = lastSeen;

    // Datos extras
    if (reward !== '') this.postLostPet.reward = reward;
  }

  // Form imagenes
  onFileSelect(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photos[index] = reader.result as string | ArrayBuffer;
        const photosControl = this.formLost.get('photos') as FormArray;
        if (!photosControl.at(index)) {
          photosControl.push(new FormControl(''));
        }
        photosControl.at(index).setValue(this.photos[index]);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Método para enviar las fotos a la API
  uploadPhotos(): Promise<string[]> {
    const formData = new FormData();

    this.photos.forEach((photo, index) => {
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
