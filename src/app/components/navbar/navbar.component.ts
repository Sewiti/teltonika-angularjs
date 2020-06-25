import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() private route: string[];
  @Input() placeholder: string;
  @Output() newDialog = new EventEmitter();

  today = new Date().toLocaleDateString('lt-LT');

  search: string;
  date: Date;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParamMap.has('text')) {
      this.search = this.activatedRoute.snapshot.queryParamMap.get('text');
    }

    if (this.activatedRoute.snapshot.queryParamMap.has('date')) {
      this.date = new Date( this.activatedRoute.snapshot.queryParamMap.get('date') );
    }
  }


  searchChanged() {
    this.router.navigate(this.route, {
      queryParams: {text: (this.search === '' ? undefined : this.search)},
      queryParamsHandling: 'merge'
    });
  }


  dateChanged() {
    this.router.navigate(this.route, {
      queryParams: {
        date: (this.date ? this.date.toLocaleDateString('lt-LT') : undefined)
      },
      queryParamsHandling: 'merge'
    });
  }
}
