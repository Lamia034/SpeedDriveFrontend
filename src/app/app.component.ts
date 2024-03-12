import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'SpeedDriveFrontend';
}
//   export class AppComponent implements AfterViewInit {

//
//   ngAfterViewInit() {
//     // Add this script for dropdown toggle
//     const dropdownToggleBtn = document.querySelector('[data-te-dropdown-toggle-ref]');
//     const dropdownMenu = document.querySelector('[data-te-dropdown-menu-ref]');
//
//     if (dropdownToggleBtn && dropdownMenu) {
//       dropdownToggleBtn.addEventListener('click', () => {
//         dropdownMenu.classList.toggle('hidden');
//       });
//     }
//   }
// }
