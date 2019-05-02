/* global Tesseract */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-ocr';
  outputMsg = '';
  percentage = 0;

  handleFileInput(files: FileList) {
    const imgUpload = files.item(0);
    console.log(imgUpload);
    if (imgUpload) {
      Tesseract.recognize(imgUpload)
        .progress( obj => {
          this.percentage = obj.progress * 100;
          document.getElementById('progressBar').setAttribute('style', `width: ${this.percentage.toString()}px;`);
          document.getElementById('progressBar').setAttribute('aria-valuenow', this.percentage.toString());
        })
        .then(obj => {
          const lines = [];
          obj.lines.forEach(line => {
            lines.push(line.text);
          });
          
          this.outputMsg = lines.join('<br>');
        })
        .finally(() => {
          console.log(1);
        })
    }
  }
}
