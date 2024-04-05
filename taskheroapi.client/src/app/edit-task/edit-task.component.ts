import { Component, NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserTasks } from '../../interfaces/usertasks.interface';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  task: IUserTasks;
  editTaskForm: FormGroup;
  startDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.task = data.task;

    this.editTaskForm = this.fb.group({
      title: [this.task.Title],
      description: [this.task.Description],
      date: [new Date(this.task.DueDate)],
      priority: [this.task.Importance]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.editTaskForm.valid) {
      const updatedTask: IUserTasks = {
        ...this.task,
        Title: this.editTaskForm.get('title')?.value,
        Description: this.editTaskForm.get('description')?.value,
        DueDate: this.editTaskForm.get('date')?.value,
        Importance: this.editTaskForm.get('priority')?.value
      };

      this.dialogRef.close(updatedTask);
    }
  }

}

@NgModule({
  declarations: [EditTaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  exports: [EditTaskComponent]
})
export class EditTaskModule { }
