import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
{pathMatch: 'full', path:'', redirectTo:'/task' },
{path: 'task', component: TaskComponent},
{path: 'task/add', component: AddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
