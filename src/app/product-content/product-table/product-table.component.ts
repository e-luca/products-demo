import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/Product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent implements OnInit {

  @Input() set products (data: Product[]) {
    this.productData = [...data];
    this.cd.detectChanges();
  }
  @Input() set categories (data: string[]) {
    this.categoryData = [...data];
    this.cd.detectChanges();
  }
  @Output() onRowSelect: EventEmitter<Set<string>> = new EventEmitter();

  productData: Product[] = []
  columns: string[] = ['Title', 'Price', 'Stock', 'Brand', 'Category'];
  categoryData: string[] = [];
  expanededRows: Set<string> = new Set();
  expandedColumns: Set<string> = new Set();
  showDifferentDesign: boolean = false;

  constructor(
    private service: ProductService,
    private cd: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.columns.forEach(c => this.expandedColumns.add(c.toLowerCase()));
  }

  expandRow(category: string): void {
    if (this.expanededRows.has(category)) {
      this.expanededRows.delete(category);
    } else {
      this.expanededRows.add(category);
    }

    this.onRowSelect.emit(this.expanededRows);
  }

  expandColumn(column: string) {
    const lowercased = column.toLowerCase();

    if (this.expandedColumns.has(lowercased)) {
      this.expandedColumns.delete(lowercased);
      return;
    }

    this.expandedColumns.add(lowercased);
  }

  filteredProducts(category: string): Product[] {
    const transformedCategory = this.service.transformCategory(category);

    return this.productData.filter(p => p.category === transformedCategory);
  }

  changeDesign(): void {
    this.showDifferentDesign = !this.showDifferentDesign;
  }
}
