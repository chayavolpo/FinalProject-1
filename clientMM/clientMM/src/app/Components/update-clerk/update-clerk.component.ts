import { Component, OnInit } from '@angular/core';
import { Clerk } from 'src/app/Models/clerks.model';
import { ClerksService } from 'src/app/Services/clerks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-clerk',
  templateUrl: './update-clerk.component.html',
  styleUrls: ['./update-clerk.component.scss']
})
export class UpdateClerkComponent implements OnInit {
  clerksList: Clerk[];
  constructor(private clerkService: ClerksService, private router: Router) { }

  ngOnInit(): void {
    this.clerkService.getAllClerks().subscribe(clerks => {
      this.clerksList = clerks;
      console.log(clerks);
      console.log(this.clerksList);
    },
      err => {
        alert("שגיאה בייבוא פקידים")
      });
  }
  clerkSelected(clerk: Clerk) {
    this.clerkService.selectedClerk = clerk;
    console.log(clerk);
    console.log(this.clerkService.selectedClerk)
    this.router.navigate(["clerks/updateSelectedClerks"]);
  }
  backToHomePage() {
    this.router.navigate(["login"]);
  }
  logOut() {
    localStorage.clear();
    this.router.navigate([""]);
  }
}
