import {Component, OnDestroy, OnInit} from '@angular/core'
import {PostsService} from '../../shared/posts.service'
import {Post} from '../../shared/interfaces'
import {Subscription} from 'rxjs'
import {AlertService} from '../shared/services/alert.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements
  OnInit,
  OnDestroy
{

  posts: Post[] = []
  pSub: Subscription
  rSub: Subscription
  searchStr = ''

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts
    })
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }

  remove(id: string) {
    this.rSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
    })
    this.alertService.warning('Post has been deleted')
  }
}
