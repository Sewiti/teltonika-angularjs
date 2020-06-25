import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() private route: string[];
  @Input() hasNext: boolean;

  page: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {}


  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParamMap.has('page')) {
      this.page = +this.activatedRoute.snapshot.queryParamMap.get('page');
    }
    else {
      this.page = 1;
    }
  }


  updateQuery() {
    this.router.navigate(this.route, {
      queryParams: {
        page: (this.page ? this.page : undefined)
      },
      queryParamsHandling: 'merge'
    });
  }
}
