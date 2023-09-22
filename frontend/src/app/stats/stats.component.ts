import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { slideInOut } from '../app.animations';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass'],
  animations: [slideInOut]
})
export class StatsComponent implements OnInit, AfterViewInit {
  statsData: any;
  swipeStart: {x: number, y: number, t: number}
  swiperIndex: number
  statHeight: number
  numStats: number
  swiperTransform: string
  isTransitioning: boolean

  @HostBinding('@slideInOut') get slideInOut() {return}

  constructor(private _api: ApiService, private _el: ElementRef, private _loader: LoaderService, private _viewContainer: ViewContainerRef) { }


  //@HostBinding('style.transform') hostTransform: string;

  @HostListener('touchstart', ['$event']) handleTouchstart(event: TouchEvent) {
    this.swipeStart = {x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY, t: Date.now()}
    this.isTransitioning = false
    console.log('touchstart', this.swipeStart)
  }
  @HostListener('touchmove', ['$event']) handleTouchmove(event: TouchEvent) {
    const offset: number = event.changedTouches[0].clientY - this.swipeStart.y
    this.updateTransform(offset)
  }
  @HostListener('touchend', ['$event']) handleTouchend(event: TouchEvent) {
    if (event.changedTouches[0].clientY - this.swipeStart.y > 50) {
      if (this.swiperIndex > 0) {
        this.swiperIndex--
      }
    } else if (event.changedTouches[0].clientY - this.swipeStart.y < -50) {
      console.log("down", this.swiperIndex, this.numStats-1)
      if (this.swiperIndex < this.numStats-1) {
        this.swiperIndex++
      }
    }

    this.isTransitioning = true
    this.updateTransform(0)
    localStorage.setItem('swiper_transform', this.swiperTransform)
    localStorage.setItem('swiper_index', this.swiperIndex.toString())
  }

  updateTransform(offset: number) {
    this.swiperTransform = `translateY(${-this.swiperIndex*this.statHeight + offset}px)`
    console.log("update", this.swiperTransform)
  }

  ngOnInit() {
    const swiperTransformItem = localStorage.getItem('swiper_transform')
    const swiperIndexItem = localStorage.getItem('swiper_index')

    if (swiperTransformItem !== null && swiperIndexItem !== null) {
      this.swiperTransform = swiperTransformItem
      this.swiperIndex = parseInt(swiperIndexItem)
    } else {
      localStorage.setItem('swiper_transform', 'transformY(0)')
      localStorage.setItem('swiper_index', '0')
      this.swiperTransform = 'transformY(0)'
      this.swiperIndex = 0
    }

    const statsUrl = "registry/statsdata/"
    this._loader.startLoading("lade statistiken...", this._viewContainer)
    this._api.fetchData(statsUrl).subscribe(res => {
      this._loader.endLoading()
      this.statsData = res
      this.numStats = Object.keys(this.statsData).length; console.log(this.statsData)
    })
  }

  ngAfterViewInit() {
    this.statHeight = parseInt(window.getComputedStyle(this._el.nativeElement.parentElement).height, 10)
  }

  stringWrap(val: string): string {
    return '"'+val+'"'
  }
  abs(val: number): number {
    return Math.abs(val)
  }
  min(a: number, b: number): number {
    return Math.min(a, b)
  }
  range(n: number): number[] {
    return [...Array(n).keys()]
  }
}
