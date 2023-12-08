import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductComponent } from './delete-product.component';

describe('DeleteItemComponent', () => {
  let component: DeleteProductComponent;
  let fixture: ComponentFixture<DeleteProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
