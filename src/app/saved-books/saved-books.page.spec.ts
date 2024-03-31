import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedBooksPage } from './saved-books.page';

describe('SavedBooksPage', () => {
  let component: SavedBooksPage;
  let fixture: ComponentFixture<SavedBooksPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SavedBooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
