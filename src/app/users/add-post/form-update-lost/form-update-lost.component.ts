import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ILossPostSerialization } from '../../models/iloss-post-serialization';
import { PostService } from '../../services/post.service';
import { PostsService } from '../../../posts/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { IPostSerialization } from '../../../posts/models/ipost-serialization';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-update-lost',
  templateUrl: './form-update-lost.component.html',
  styleUrl: './form-update-lost.component.css',
})
export class FormUpdateLostComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private formBuilder: FormBuilder,
    private servicePost: PostService,
    private servicePosts: PostsService,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    this.formLost = this.form.group({
      // Datos básicos
      petType: ['', Validators.required],
      petBreed: [''],
      petName: ['', Validators.required],
      petAge: ['', Validators.required],
      characteristics: this.formBuilder.array([
        new FormControl('', Validators.required),
      ]),
      // Datos de perdida
      neighborhood: ['', Validators.required],
      dateLost: ['', Validators.required],
      description: ['', Validators.required],
      lastSeen: [''],
      reward: ['', Validators.pattern(/^\d+$/)],

      //pics
      photos: this.formBuilder.array(Array(5).fill('')),
    });
  }

  // VARIABLES
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  currentStep: number = 1;
  formLost: FormGroup;
  colonies: string[] = [];
  imageUrls: (string | ArrayBuffer | null | SafeUrl)[] = [
    null,
    null,
    null,
    null,
    null,
  ];
  urls: string[] = [];
  modifiedImageIndexes: Set<number> = new Set();
  newImagesIndexes: Set<number> = new Set();
  id_post: string = '';

  // OBJETO PARA PODER ENVIAR LA INFORMACIÓN DE UN POST DE UNA MASCOTA PERDIDA
  postLostPet: ILossPostSerialization = {
    id_user: 0,
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

  ngOnInit(): void {
    const id_post = this.route.snapshot.paramMap.get('id_post');

    this.servicePosts.getInformationPost(id_post).subscribe(
      (response) => {
        this.pathValue(response);
        this.servicePost.showColonies().subscribe(
          (response) => {
            this.colonies = response;
          },
          (err) => {
            console.log('Error: ' + err);
          }
        );
      },
      (err) => {
        console.log('Error ' + err);
      }
    );
  }

  // MÉTODOS
  pathValue(response: IPostSerialization): void {
    const formattedDate = response.loss_data?.loss_date
      ? new Date(response.loss_data.loss_date).toISOString().substring(0, 10)
      : null;

    const characteristicsArray = this.formBuilder.array([]);
    response.basic_pet_information.main_physical_characteristics.forEach(
      (char: string) => {
        characteristicsArray.push(new FormControl(char, Validators.required));
      }
    );

    this.formLost.setControl('characteristics', characteristicsArray);

    this.formLost.patchValue({
      // DATOS BÁSICOS
      petType: response.basic_pet_information.type_pet,
      petBreed: response.basic_pet_information.race,
      petName: response.basic_pet_information.name,
      petAge: response.basic_pet_information.age,
      photos: response.basic_pet_information.photos,
      // DATOS DE PERDIDA
      neighborhood: response.loss_data?.address.colony,
      dateLost: formattedDate,
      description: response.loss_data?.description,
      lastSeen: response.loss_data?.last_seen,
      reward: response.reward,
    });

    this.id_post = response._id;
    this.postLostPet.id_user = response.id_user;

    this.urls = response.basic_pet_information.photos.filter(
      (url) => url.trim() !== ''
    );

    if (this.urls.length > 0) this.assingImgs(this.urls);
  }

  assingImgs(urls: string[]) {
    urls.forEach((url, index) => {
      this.servicePosts.getPhotosFromMongo(url).subscribe(
        (response) => {
          const img = URL.createObjectURL(response);
          this.imageUrls[index] = this.domSanitizer.bypassSecurityTrustUrl(img);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

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

  // CARACTERÍSTICAS
  get characteristics(): FormArray {
    return this.formLost.get('characteristics') as FormArray;
  }

  addCharacteristic() {
    const lastControl = this.characteristics.at(
      this.characteristics.length - 1
    );
    if (lastControl && lastControl.value.trim() !== '') {
      this.characteristics.push(new FormControl('', Validators.required));
    } else {
      alert('Debes llenar el input anterior antes de agregar otro.');
    }
  }

  removeCharacteristic(index: number): void {
    if (this.characteristics.length > 1) {
      this.characteristics.removeAt(index);
    } else {
      alert('Debe de tener mínimo una característica');
    }
  }

  // ENVÍO DEL FORM
  async onSubmitFormLost() {
    try {
      if (this.formLost.valid) {
        await this.assignValues();

        this.servicePost
          .updateInformationPost(this.id_post, this.postLostPet)
          .subscribe(
            (response) => {
              Swal.fire({
                title: 'Publicación actualizada exitosamente',
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
      // DESESTRUCTURAMOS LOS ATRIBUTOS DE FORMLOST
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

      // DATOS BÁSICOS
      this.postLostPet.basic_pet_information.type_pet = petType;
      this.postLostPet.basic_pet_information.name = petName;

      if (petBreed !== '')
        this.postLostPet.basic_pet_information.race = petBreed;

      if (petAge !== '') this.postLostPet.basic_pet_information.age = petAge;

      this.postLostPet.basic_pet_information.main_physical_characteristics =
        characteristics;

      // DATOS DE PERDIDA
      this.postLostPet.loss_data.address.zip_code = 29140;
      this.postLostPet.loss_data.address.state = 'Chiapas';
      this.postLostPet.loss_data.address.municipality =
        'Ocozocoautla de Espinoza';
      this.postLostPet.loss_data.address.colony = neighborhood;
      this.postLostPet.loss_data.loss_date = new Date(dateLost);
      this.postLostPet.loss_data.description = description;

      if (lastSeen !== '') this.postLostPet.loss_data.last_seen = lastSeen;

      // DATOS EXTRAS
      if (reward !== '') this.postLostPet.reward = reward;

      // IMÁGENES DE LA MASCOTA
      if (
        this.modifiedImageIndexes.size > 0 ||
        this.newImagesIndexes.size > 0
      ) {
        this.postLostPet.basic_pet_information.photos =
          await this.uploadPhotos();
        console.log(this.postLostPet.basic_pet_information.photos);
      } else {
        this.postLostPet.basic_pet_information.photos = this.urls.filter(
          (value: string) => value.trim() !== ''
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  // MÉTODO PARA MANEJAR EL CLIC Y ABRIR EL SELECTOR DE ARCHIVOS
  triggerFileInputs(input: HTMLInputElement): void {
    input.click();
  }

  // MANEJA EL EVENTO DE SELECCIÓN DE LA FOTO DE LA MASCOTA
  onFileSelect(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (this.imageUrls[index] && this.imageUrls[index] !== '') {
          this.modifiedImageIndexes.add(index);
        } else {
          this.newImagesIndexes.add(index);
        }

        this.imageUrls[index] = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // MÉTODO PARA ENVIAR LAS FOTOS A LA API
  async uploadPhotos(): Promise<string[]> {
    const formData = new FormData();
    const changedIndexes = Array.from(this.modifiedImageIndexes);
    let new_url_imgs: string[] = [...this.urls];

    this.imageUrls.forEach((photo, index) => {
      if (photo && typeof photo === 'string') {
        new_url_imgs[index] = photo;
      }
    });

    new_url_imgs = new_url_imgs.filter((url) => url !== '');

    const filteredArray = new_url_imgs.filter((item) =>
      item.startsWith('data:image/')
    );

    filteredArray.forEach((url, index) => {
      const photo = filteredArray[index];
      if (photo && typeof photo === 'string') {
        const blob = this.dataURLtoBlob(photo);
        formData.append('files', blob, `photo_${index}.jpg`);
      }
    });

    return new Promise((resolve, reject) => {
      if (formData.has('files')) {
        this.servicePost.saveImagesDrive(formData).subscribe(
          (response) => {
            changedIndexes.forEach((index, idx) => {
              this.urls[index] = response[index];
            });

            let remainingImages = response.filter(
              (img) => !this.urls.includes(img)
            );

            let newArray = [...this.urls, ...remainingImages];

            resolve(newArray);
          },
          (err) => {
            console.error('Error al subir los archivos', err);
            reject(err);
          }
        );
      } else {
        resolve([]);
      }
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
