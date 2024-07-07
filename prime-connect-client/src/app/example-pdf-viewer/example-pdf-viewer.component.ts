import { Component, ChangeDetectionStrategy,Input } from '@angular/core';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-example-pdf-viewer',
  templateUrl: './example-pdf-viewer.component.html',
  styleUrls: ['./example-pdf-viewer.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePdfViewerComponent {

  @Input() src!: string;

  constructor(private pdfService: NgxExtendedPdfViewerService) {}
}
