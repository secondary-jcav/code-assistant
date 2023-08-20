import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FrontendComponent } from './frontend/frontend.component';
import { LineBreakPipe } from './frontend/line-break.pipe';

@NgModule({
  declarations: [FrontendComponent, LineBreakPipe],
  imports: [CommonModule, FormsModule],
  exports: [FrontendComponent],
})
export class AssistantModule {}
