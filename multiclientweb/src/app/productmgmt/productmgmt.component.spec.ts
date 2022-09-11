import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductMgmtComponent } from './productmgmt.component';

describe('ProductMgmtComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ProductMgmtComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ProductMgmtComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'multiclientweb'`, () => {
    const fixture = TestBed.createComponent(ProductMgmtComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('multiclientweb');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ProductMgmtComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('multiclientweb app is running!');
  });
});
