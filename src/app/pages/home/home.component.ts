import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CountryService } from './country.service';
import { IpService } from './ip.service';
import { NewsService } from './news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;
  @Input() news = {
    articles: []
  };
  @Input() countryName = '';

  searchForm = this.fb.group({
    search: ['']
  });
  

  constructor(public authSvc: AuthService, 
    public newsSvc: NewsService,
    private fb:FormBuilder,
    public ipSvc: IpService,
    public cntSvc: CountryService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 
  ngOnInit(): void {
    this.getUserCountry()
  }

  getUserCountry(): Subscription {
    return this.cntSvc.getCountry({ip: ''}).subscribe(res => {
      if (res) {
        this.countryName = res.country
        this.searchNews(res.country)
      }
    })
  }

  searchNews(search: any): Subscription {
    return this.subscription.add(
      this.newsSvc.getNews({search: search}).subscribe( res => {
        if (res) {
          this.news = res
        }
      }) 
    )
  }

  onSearch(): void {
    const formValue = this.searchForm.value;
    this.searchNews(formValue.search)
  }

}
