import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  imports: [CommonModule, RouterModule]
})
export class NavigationComponent implements OnInit {
  currentRoute: string = '';
  isMenuOpen: boolean = false;

  navigationItems = [
    {
      path: '/strategy-dashboard',
      label: 'Strategy Dashboard',
      icon: '🎯',
      description: 'AI-powered investment strategies'
    },
    {
      path: '/home',
      label: 'Manual Trading',
      icon: '📈',
      description: 'Execute individual trades'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });
    
    this.currentRoute = this.router.url;
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isActive(path: string): boolean {
    return this.currentRoute === path;
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.isMenuOpen = false;
  }
}