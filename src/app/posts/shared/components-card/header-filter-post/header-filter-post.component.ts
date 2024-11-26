import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-filter-post',
  templateUrl: './header-filter-post.component.html',
  styleUrl: './header-filter-post.component.css'
})
export class HeaderFilterPostComponent {
  @Output() executeGetRecent = new EventEmitter<void>();
  @Output() executeGetOld = new EventEmitter<void>();
  @Input() getRecent!: () => void;
  @Input() getOld!: () => void;
  @Input() title: string= "";
  value_option: number = 0;

  onOptionSelected(){
    if(this.value_option == 1)
      this.getRecentPosts();
    if(this.value_option == 2)
      this.getOldPosts();
  }

  getRecentPosts(){
    this.executeGetRecent.emit();
  }

  getOldPosts(){
    this.executeGetOld.emit();
  }
}
