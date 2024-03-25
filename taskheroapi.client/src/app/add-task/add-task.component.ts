import { Component, OnInit } from '@angular/core';
import { AddTask } from '../../services/addtask.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})


export class AddTaskComponent implements OnInit{

  constructor(private AddTask: AddTask) { }

  startDate = new Date();

  minDate = new Date();
  

  ngOnInit(): void {
  }

  closeModal() {
    this.AddTask.toggleModal();
  }

}
