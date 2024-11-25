import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostService } from '../../services/post.service';
import { IAdoptionPostSerialization } from '../../models/iadoption-post-serialization';
import Swal from 'sweetalert2';
import { PostsService } from '../../../posts/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { IPostSerialization } from '../../../posts/models/ipost-serialization';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-form-update-adoption',
  templateUrl: './form-update-adoption.component.html',
  styleUrl: './form-update-adoption.component.css',
})
export class FormUpdateAdoptionComponent {
  constructor(
    private form: FormBuilder,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private servicePosts: PostsService,
    private servicePost: PostService,
    private service: PostService
  ) {
    this.formAdoption = this.form.group({
      // CARACTERÍSTICAS
      petType: ['', Validators.required],
      petBreed: [''],
      petName: ['', Validators.required],
      petAge: ['', Validators.required],
      characteristics: this.formBuilder.array([
        new FormControl('', Validators.required),
      ]),
      // SALUD MASCOTA
      vaccines: ['', Validators.required],
      primer: [''],
      issues: ['', Validators.required],
      issuesSentence: this.formBuilder.array([new FormControl('')]),
      operations: ['', Validators.required],
      operationsSentence: [''],
      // PICS
      photos: this.formBuilder.array(Array(5).fill('')),
    });
  }

  // VARIABLES
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  currentStep: number = 1;
  formAdoption: FormGroup;
  modifiedImageIndexes: Set<number> = new Set();
  newImagesIndexes: Set<number> = new Set();
  primer: string | ArrayBuffer | null | SafeUrl = null;
  imageUrl: string | ArrayBuffer | null | SafeUrl = null;
  imageUrls: (string | ArrayBuffer | null | SafeUrl)[] = [
    null,
    null,
    null,
    null,
    null,
  ];
  urls: string[] = [];
  id_post: string = '';
  flag: boolean = false;

  // OBJETO PARA ENVIAR LA INFORMACIÓN NECESARIA DE UNA PUBLICACIÓN DE UNA MASCOTA EN ADOPCIÓN
  formAdoptionToSend: IAdoptionPostSerialization = {
    id_user: 0,
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

  ngOnInit(): void {
    const id_post = this.route.snapshot.paramMap.get('id_post');

    this.servicePosts.getInformationPost(id_post).subscribe(
      (response) => {
        this.pathValue(response);
      },
      (err) => {
        console.log('Error ' + err);
      }
    );
  }

  // METODOS

  pathValue(response: IPostSerialization): void {
    const characteristicsArray = this.formBuilder.array([]);
    response.basic_pet_information.main_physical_characteristics.forEach(
      (char: string) => {
        characteristicsArray.push(new FormControl(char, Validators.required));
      }
    );

    const issuesSentence = this.formBuilder.array([]);
    response.medical_data?.physical_problems?.forEach(
      (char: string) => {
        issuesSentence.push(new FormControl(char, Validators.required));
      }
    );

    this.formAdoption.setControl('characteristics', characteristicsArray);
    this.formAdoption.setControl('issuesSentence', issuesSentence);

    this.formAdoption.patchValue({
      // DATOS BÁSICOS DE LA MASCOTA
      petType: response.basic_pet_information.type_pet,
      petBreed: response.basic_pet_information.race,
      petName: response.basic_pet_information.name,
      petAge: response.basic_pet_information.age,
      photos: response.basic_pet_information.photos,
      // DATOS DE LA SALUD DE LA MASCOTA
      vaccines: response.medical_data?.has_vaccines,
      primer: response.medical_data?.primer,
      issues: response.medical_data?.has_physical_problems,
      issuesSentence: response.medical_data?.physical_problems,
      operations: response.medical_data?.has_operations,
      operationsSentence: response.medical_data?.operations,
    });

    this.id_post = response._id;
    this.formAdoptionToSend.id_user = response.id_user;

    if (response.medical_data?.has_vaccines === 'Si') {
      this.assignVaccines(response.medical_data.primer);
    }

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

  assignVaccines(primer: string | undefined) {
    this.servicePosts.getPhotosFromMongo(primer).subscribe(
      (response) => {
        const img = URL.createObjectURL(response);
        this.imageUrl = this.domSanitizer.bypassSecurityTrustUrl(img)
      },
      (err) => {
        console.log(err)
      }
    );
  }

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

  removeCharacteristic(index: number): void {
    if (this.characteristics.length > 1) {
      this.characteristics.removeAt(index);
    } else {
      alert('Debe de tener mínimo una característica');
    }
  }

  // PROBLEMAS FÍSICOS
  get physicalProblems(): FormArray {
    return this.formAdoption.get('issuesSentence') as FormArray;
  }

  addPhysicalProblems(): void {

    if (this.physicalProblems.length === 0) {
      this.physicalProblems.push(new FormControl(''));
    } else {
      const lastControl = this.physicalProblems.at(
        this.physicalProblems.length - 1
      );
  
      if (lastControl && lastControl.value.trim() !== '') {
        this.physicalProblems.push(new FormControl(''));
      } else {
        alert('Debes agregar algún valor al capo')
      }
    }
    
  }

  removePhysicalProblems(index: number): void {
    this.physicalProblems.removeAt(index);
  }

  // ENVÍO DEL FORM
  async onSubmitFormAdoption() {
    try {
      if (this.formAdoption.valid) {
        await this.assignValues();
        this.service.updateInformationPost(this.id_post,this.formAdoptionToSend).subscribe(
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
      // DESESTRUCTURAMOS LOS ATRIBUTOS DE FORMADOPTION
      const {
        petType,
        petBreed,
        petName,
        petAge,
        characteristics,
        vaccines,
        issues,
        issuesSentence,
        operations,
        operationsSentence,
      } = this.formAdoption.value;

      // DATOS BÁSICOS
      this.formAdoptionToSend.basic_pet_information.type_pet = petType;
      this.formAdoptionToSend.basic_pet_information.name = petName;

      if (petBreed !== '')
        this.formAdoptionToSend.basic_pet_information.race = petBreed;

      if (petAge !== '')
        this.formAdoptionToSend.basic_pet_information.age = petAge;

      this.formAdoptionToSend.basic_pet_information.main_physical_characteristics =
        characteristics;

      // DATOS MÉDICOS
      this.formAdoptionToSend.medical_data.has_vaccines = vaccines;
      if (vaccines === 'Si') {
        if (this.flag === true) {
          const photo = await this.uploadPrimer();
          this.formAdoptionToSend.medical_data.primer = photo[0];
        } else {

        }
      }

      this.formAdoptionToSend.medical_data.has_physical_problems = issues;

      if (issues === 'Si') {
        this.formAdoptionToSend.medical_data.physical_problems = issuesSentence;
      } 

      this.formAdoptionToSend.medical_data.has_operations = operations;

      if (operations === 'Si')
        this.formAdoptionToSend.medical_data.operations = operationsSentence;

      // FOTOS
      if (
        this.modifiedImageIndexes.size > 0 ||
        this.newImagesIndexes.size > 0
      ) {
        this.formAdoptionToSend.basic_pet_information.photos =
          await this.uploadPhotos();
      } else {
        this.formAdoptionToSend.basic_pet_information.photos = this.urls.filter(
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

  // MÉTODO PARA MANEJAR LA SELECCIÓN DE UNA IMÁGEN DE LA MASCOTA
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

  // DISPARA EL CLIC DEL INPUT OCULTO
  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  // MANEJA EL EVENTO DE SELECCIÓN DE ARCHIVO DE LA VACUNA DE LA MASCOTA
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files && input.files[0]) {
      const file = input.files[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.flag = true;
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecciona un archivo de imagen.');
      }
    }
  }

  // MANEJA EL EVENTO DE SELECCIÓN DE LA FOTO DE LA CARTILLA
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

  // MÉTODO PARA ENVIAR LAS FOTOS DE LA MASCOTA A LA API
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

  // MÉTODO PARA ENVIAR LA FOTO DE LA CARTILLA A LA API
  async uploadPrimer(): Promise<string[]> {
    const formData = new FormData();

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
