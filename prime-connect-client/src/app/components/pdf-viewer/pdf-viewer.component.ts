import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  OnInit,
} from '@angular/core';
import {
  NgxExtendedPdfViewerService,
  pdfDefaultOptions,
  NgxExtendedPdfViewerComponent,
} from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewerComponent{
  public spreadMode: 'off' | 'even' | 'odd' = 'off';
  // viewMode = "multiple";
  @Input() page = 1;
  @Input() source: string | Blob = "../../assets/sample.pdf";
  constructor(private pdfService: NgxExtendedPdfViewerService) {
    pdfDefaultOptions.doubleTapZoomFactor = '100%'; // The default value is '200%'
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5; // The default value is 4096 * 4096 pixels,
  }
}
