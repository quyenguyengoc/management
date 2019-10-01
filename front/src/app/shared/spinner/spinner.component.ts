import {
  Component,
} from '@angular/core';

import { SpinnerService } from '../../services/common/spinner.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent {
  public onRequest: Subject<boolean> = this.spinner.onRequest;

  constructor(private spinner: SpinnerService) {
  }
}
